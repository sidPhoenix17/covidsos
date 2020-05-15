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
import {isAuthorisedUserLoggedIn, makeApiCall} from "../../utils/utils";
import config from "../../config/config";
import {filter, map, uniq, uniqBy} from "lodash";
import Popup from "reactjs-popup";
import RequestsSlide from "../Carousels/RequestsSlide";
import moment from "moment";
import RequestsCarousel from "../Carousels/RequestsCarousel";

class RequestsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props.desiredType);
    this.fetchRequests();
  }

  getDefaultState(desiredType) {
    return {
      allRequests: [],
      requestsToDisplay: [],
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
      popupContent: null,
      isLoading: true,
      // For un-authorised user, it is always pending requests only
      type: isAuthorisedUserLoggedIn() ? desiredType : 'pending'
    }
  }

  addToArray(arr, reqList, type) {
    if (!reqList) {
      return arr;
    }
    reqList.forEach(r => {
      r.type = type;
      r.timestampMillis = moment(r.timestamp || r.request_time, "ddd, DD MMM YY, hh:mmA").valueOf()
      arr.push(r);
    });
    return arr;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.desiredType !== this.props.desiredType) {
      this.setState(this.getDefaultState(this.props.desiredType), () => this.fetchRequests());
    }
  }

  fetchRequests() {
    const {type} = this.state;
    let url = config.pendingRequests;
    if (isAuthorisedUserLoggedIn()) {
      url = config.adminAllRequests;
      if (type) {
        switch (type) {
          case 'new':
            url = config.newRequests;
            break;
          case 'in-progress':
            url = config.inProgressRequests;
            break;
          case 'completed':
            url = config.adminCompletedRequests;
            break;
          default:
            url = config.adminPendingRequests;
            break;
        }
      }
    }
    makeApiCall(url, 'GET', {}, (response) => {
      let allRequests = [];
      if (type) {
        allRequests = this.addToArray(allRequests, response, type);
      } else {
        allRequests = this.addToArray(allRequests, response.unverified_requests, 'new');
        allRequests = this.addToArray(allRequests, response.assigned_requests, 'in-progress');
        allRequests = this.addToArray(allRequests, response.pending_requests, 'pending');
        allRequests = this.addToArray(allRequests, response.completed_requests, 'completed');
      }
      let filterData = {
        source: uniq(map(allRequests, 'source')),
        city: uniq(map(allRequests, 'city')),
        managed_by: uniqBy(
            map(allRequests, ({managed_by, managed_by_id}) => ({managed_by, managed_by_id})),
            'managed_by_id')
      }
      allRequests = this.sortRequestsByTime(allRequests);
      this.setState({allRequests, requestsToDisplay: allRequests, filterData, isLoading: false});
    }, false);
  }

  sortRequestsByTime(req) {
    return req.sort((a, b) => {
      return a.timestampMillis < b.timestampMillis
    });
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
    const requestsToDisplay = this.sortRequestsByTime(filter(allRequests, filtersObj));
    this.setState({requestsToDisplay});
  }

  getCount(type) {
    const {allRequests, isLoading} = this.state;
    if (isLoading) {
      return 'Loading';
    }
    if (!type) {
      return (allRequests && allRequests.length) || 0;
    }
    return (allRequests && allRequests.filter(r => r.type === type).length) || 0
  }

  getRequestTypesDropDown() {
    return (
        <Row className="justify-content-center mx-0">
          <Col sm={4} className="text-uppercase pt-2 text-center h3">
            <InputGroup className="input-group-alternative mr-0 ml-auto">
              <Input placeholder="Status" type="select"
                     value={this.state.filters.type}
                     onChange={e => this.handleFilter('type', e.target.value)}>
                <option value="any">All Requests ({this.getCount()})</option>
                <option value="new">New Requests ({this.getCount('new')})</option>
                <option value="pending">Pending Requests ({this.getCount('pending')})</option>
                <option value="in-progress">In-Progress Requests ({this.getCount('in-progress')})
                </option>
                <option value="completed">Completed Requests ({this.getCount('completed')})</option>
              </Input>
            </InputGroup>
          </Col>
        </Row>
    );
  }

  getHeader(desiredType, isAuthorisedUser) {
    if (desiredType) {
      return (
          <>
            {desiredType} Requests ({this.getCount()})
          </>
      )
    }
    if (isAuthorisedUser) {
      return this.getRequestTypesDropDown();
    }
    return (
        <a href="/pending-requests">Pending Requests ({this.getCount()})</a>
    )
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
                <div className="request-details-popup pre-scrollable-full-height-popup">
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

  openPopup(popupHeader, popupContent) {
    this.setState({isPopupOpen: true, popupHeader, popupContent});
  }

  render() {
    const {requestsToDisplay} = this.state;
    const {desiredType} = this.props;
    const isAuthorisedUser = isAuthorisedUserLoggedIn();
    const currentUserID = parseInt(localStorage.getItem(config.userIdStorageKey));
    return (
        <Container fluid>
          {this.getPopup()}
          <Card className="requests-container pt-2 pb-2 mt--6">
            <Col xs={12} className="text-uppercase pt-2 text-center h3">
              {this.getHeader(desiredType, isAuthorisedUser)}
            </Col>
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
              {isAuthorisedUser && this.getFilter("source", 'Source')}
              {isAuthorisedUser && this.getFilter("managed_by", 'Managed By',
                  'managed_by_id', ({managed_by, managed_by_id}) => {
                    return (
                        <option key={managed_by_id} value={managed_by_id}>{managed_by}</option>);
                  })}
            </Row>
            {!isAuthorisedUser && !desiredType && <RequestsCarousel
                data={requestsToDisplay}
                openPopup={(popupHeader, popupContent) => this.openPopup(popupHeader, popupContent)}
                isAuthorisedUser={isAuthorisedUser}
                currentUserID={currentUserID}
            />}
            {
              (isAuthorisedUser || desiredType) &&
              <Row className="mx-0">
                {requestsToDisplay.map((datum, i) => {
                  return (
                      <Col md={4} key={`CarouselSlide${i}`} className="mt-3">
                        <Card className="full-height-card">
                          <RequestsSlide request={datum} index={i} key={`RequestsSlide${i}`}
                                         openPopup={(popupHeader, popupContent) => this.openPopup(
                                             popupHeader, popupContent)}
                                         isAuthorisedUser={isAuthorisedUser}
                                         currentUserID={currentUserID}/>
                        </Card>
                      </Col>
                  )
                })}
              </Row>
            }
          </Card>
        </Container>
    )
  }
}

export default RequestsContainer;