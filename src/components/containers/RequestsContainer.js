import React from "react";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import AutoCompleteAddress from "../AutoComplete/Adress";
import haversine from "haversine-distance";
import MyCarousel from "../MyCarousel/MyCarousel";
import {isAuthorisedUserLoggedIn, makeApiCall} from "../../utils/utils";
import config from "../../config/config";
import {filter, map, uniq, uniqBy} from "lodash";
import Popup from "reactjs-popup";

class RequestsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allRequests: [],
      requestsToDisplay: [],
      assignedRequests: [],
      filters: {
        type: '',
        source: '',
        managed_by_id: '',
        city: ''
      },
      filterData: {
        source: [],
        city: [],
        managed_by: []
      },
      isPopupOpen: false,
      popupHeader: null,
      popupContent: null
    }
    this.fetchRequests();
  }

  addToArray(arr, reqList, type) {
    if (!reqList) {
      return arr;
    }
    reqList.forEach(r => {
      r.type = type;
      arr.push(r);
    });
    return arr;
  }

  fetchRequests() {
    if (isAuthorisedUserLoggedIn()) {
      makeApiCall(config.adminAllRequests, 'GET', {}, (response) => {
        let allRequests = [];
        allRequests = this.addToArray(allRequests, response.unverified_requests, 'unverified');
        allRequests = this.addToArray(allRequests, response.assigned_requests, 'assigned');
        allRequests = this.addToArray(allRequests, response.pending_requests, 'pending');
        allRequests = this.addToArray(allRequests, response.completed_requests, 'completed');
        this.processRequests(allRequests);
      }, false);
    } else {
      makeApiCall(config.pendingRequests, 'GET', {}, (response) => {
        let allRequests = [];
        allRequests = this.addToArray(allRequests, response, 'pending');
        this.processRequests(allRequests);
      }, false);
    }
  }

  processRequests(allRequests) {
    let filterData = {
      source: uniq(map(allRequests, 'source')),
      city: uniq(map(allRequests, 'city')),
      managed_by: uniqBy(
          map(allRequests, ({managed_by, managed_by_id}) => ({managed_by, managed_by_id})),
          'managed_by_id')
    }
    this.setState({allRequests, requestsToDisplay: allRequests, filterData});
  }

  handleAssignToMe = (uuid) => {
    makeApiCall(config.addRequestManager, 'POST', {request_uuid: uuid}, (response) => {
      this.setState({
        assignedRequests: [...this.state.assignedRequests, uuid]
      })
    }, true);
  }

  handleFilter = (key, value) => {
    const {filters} = this.state;
    this.setState({filters: {...filters, [key]: value}}, () => this.updateRequestsToDisplay());
  }

  updateRequestsToDisplay() {
    const {allRequests, filters} = this.state;
    let filtersObj = {};
    if (!!filters.type && filters.type !== '' && filters.type !== 'any') {
      filtersObj = {...filtersObj, type: filters.type}
    }
    if (!!filters.source && filters.source !== '' && filters.source !== 'any') {
      filtersObj = {...filtersObj, source: filters.source}
    }
    if (!!filters.managed_by_id && filters.managed_by_id !== '' && filters.managed_by_id
        !== 'any') {
      filtersObj = {...filtersObj, managed_by_id: parseInt(filters.managed_by_id)}
    }

    if (!!filters.city && filters.city !== '' && filters.city !== 'any') {
      filtersObj = {...filtersObj, city: filters.city}
    }
    const requestsToDisplay = filter(allRequests, filtersObj);
    this.setState({requestsToDisplay});
  }

  getRequestTypesDropDown() {
    const {allRequests} = this.state;
    return (
        <Row className="justify-content-center mx-0">
          <Col sm={4} className="text-uppercase pt-2 text-center h3">
            <InputGroup className="input-group-alternative mr-0 ml-auto">
              <Input placeholder="Status" type="select"
                     value={this.state.filters.type}
                     onChange={e => this.handleFilter('type', e.target.value)}>
                <option value="any">All Requests
                  ({(this.state.allRequests && this.state.allRequests.length) || 0})
                </option>
                <option value="unverified">New Requests
                  ({(allRequests && allRequests.filter(r => r.type === 'unverified').length) || 0})
                </option>
                <option value="assigned">Assigned Requests
                  ({(allRequests && allRequests.filter(r => r.type === 'assigned').length) || 0})
                </option>
                <option value="pending">Pending Requests
                  ({(allRequests && allRequests.filter(r => r.type === 'pending').length) || 0})
                </option>
                <option value="completed">Completed Requests
                  ({(allRequests && allRequests.filter(r => r.type === 'completed').length) || 0})
                </option>
              </Input>
            </InputGroup>
          </Col>
        </Row>
    );
  }

  getFilter(key, name, val_key, mapperFunc = (val) => {
    return (<option key={val} value={val}>{val}</option>);
  }) {
    const {filterData, filters} = this.state
    return (filterData[key] &&
        <Col md={2} xs={6} className="pt-3">
          <InputGroup className="input-group-alternative r-filter">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fas fa-filter"/>
              </InputGroupText>
            </InputGroupAddon>
            <Input
                placeholder={name}
                type="select"
                value={filters[val_key || key]}
                onChange={e => {
                  let value = e.target.value;
                  this.handleFilter(val_key || key, value);
                }}>
              <option value="">{name}</option>
              <option value="any">Any</option>
              {filterData[key].map(mapperFunc)}
            </Input>
          </InputGroup>
        </Col>);
  }

  getPopup() {
    const {popupHeader, popupContent} = this.state;
    return (<Popup open={this.state.isPopupOpen} closeOnEscape closeOnDocumentClick
                   position="right center"
                   contentStyle={{
                     borderRadius: "0.375rem",
                     minWidth: "50%",
                     width: "unset",
                     padding: "0px"
                   }}
                   overlayStyle={{background: "rgba(0, 0, 0, 0.85)"}}
                   className="col-md-6"
                   onClose={() => this.setState({isPopupOpen: false})}>
          {
            close => (
                <div className="request-details-popup pre-scrollable-request-popup">
                  <CardHeader>
                    <Row className="justify-content-end">
                      <Button onClick={close}
                              className="close btn-icon btn-link border-0 text-dark">
                        <i className="fas fa-times" style={{fontSize: '1rem'}}/>
                      </Button>
                    </Row>
                    <Row className="justify-content-start">
                      <Col>
                        <img alt='logo' src={require("assets/img/icons/requestAccept.png")}/>
                      </Col>
                    </Row>

                    {popupHeader}
                  </CardHeader>
                  {popupContent}
                </div>
            )}
        </Popup>
    );
  }

  render() {
    const {requestsToDisplay} = this.state
    return (
        <Container fluid>
          {this.getPopup()}
          <Card className="requests-container pt-2 pb-2 mt--6">
            {isAuthorisedUserLoggedIn() ? this.getRequestTypesDropDown() :
                <Col xs={12} className="text-uppercase pt-2 text-center h3">
                  Pending Requests
                </Col>
            }
            <Row className="mx-0">
              <Col md={4} className="pt-3">
                <AutoCompleteAddress
                    className="search-box"
                    iconClass="fas fa-map-marker"
                    placeholder="Enter your location to see requests nearby"
                    domID='pending-requests-search-address'
                    onSelect={({latitude, longitude}) => {
                      this.setState({
                        requestsToDisplay: requestsToDisplay.sort((r1, r2) => {
                          const r1HaversineDistance = haversine(
                              {lat: r1.latitude, lng: r1.longitude},
                              {lat: latitude, lng: longitude});
                          const r2HaversineDistance = haversine(
                              {lat: r2.latitude, lng: r2.longitude},
                              {lat: latitude, lng: longitude});
                          return r1HaversineDistance - r2HaversineDistance;
                        }),
                      });
                    }}
                    showError={false}
                />
              </Col>

              {this.getFilter("city", 'City')}
              {isAuthorisedUserLoggedIn() && this.getFilter("source", 'Source')}
              {isAuthorisedUserLoggedIn() && this.getFilter("managed_by", 'Managed By',
                  'managed_by_id', ({managed_by, managed_by_id}) => {
                    return (
                        <option key={managed_by_id} value={managed_by_id}>{managed_by}</option>);
                  })}
            </Row>
            <MyCarousel
                data={requestsToDisplay}
                renderer="RequestsSlide"
                openPopup={(popupHeader, popupContent) => {
                  this.setState({isPopupOpen: true, popupHeader, popupContent});
                }}
            />
          </Card>
        </Container>
    )
  }
}

export default RequestsContainer;