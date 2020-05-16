import React from "react";
import {
  Badge,
  Button,
  Card, CardBody, CardFooter,
  CardHeader,
  Col,
  Container, Form,
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
import {
  displayRequestCardDetails, getShareButtons,
  getVolunteerOptionsFormByDistance
} from "../../utils/request_utils";

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
      distanceBreakdown: false,
      // For un-authorised user, it is always pending requests only
      type: isAuthorisedUserLoggedIn() ? desiredType : 'pending',
      isVolunteerListLoading: false,
      assignVolunteer: false,
      volunteerList: [],
      assignData: {},
      isSubmitClicked: false,
      popupRequest: {},
      popupRequestDetails: {},
      currentUserID: parseInt(localStorage.getItem(config.userIdStorageKey))
    }
  }

  enableAssignVolunteerForm() {
    this.setState({isVolunteerListLoading: true, assignVolunteer: true},
        () => makeApiCall(config.mapAuthEndpoint, 'GET',
            {},
            (response) => {
              this.setState({isVolunteerListLoading: false, volunteerList: response.Volunteers});
            }, false));
  }

  updateAssignVolunteerId = (v_id) => {
    this.setState({assignData: {volunteer_id: v_id}, isSubmitClicked: false});
  };

  isAssignSubmitDisabled() {
    const {assignData, isSubmitClicked} = this.state;
    return isSubmitClicked || !assignData.volunteer_id;
  }

  assignVolunteerSubmit = (event) => {
    event.preventDefault();
    if (this.isAssignSubmitDisabled()) {
      return;
    }
    this.setState({isSubmitClicked: true});
    const {assignData, popupRequest, currentUserID} = this.state;
    assignData.request_id = popupRequest.r_id;
    assignData.matched_by = currentUserID;
    makeApiCall(config.assignEndpoint, 'POST', assignData, () => {
      this.setState({
        assignVolunteer: false,
        isSubmitClicked: false,
        assignData: {},
        popupRequest: {...popupRequest, v_id: assignData.volunteer_id}
      })
    });
  };

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
    // noinspection HtmlUnknownTarget
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

  getPopup(isAuthorisedUser) {
    const {isPopupOpen, popupRequest, popupRequestDetails, isVolunteerListLoading, assignVolunteer, volunteerList, assignData} = this.state;
    const {name, location, why, requestStr, source, helpText} = popupRequestDetails;
    return (<Popup open={isPopupOpen} closeOnEscape closeOnDocumentClick
                   position="right center"
                   contentStyle={{
                     borderRadius: "0.375rem",
                     minWidth: "50%",
                     width: "unset",
                     padding: "0px"
                   }}
                   overlayStyle={{background: "rgba(0, 0, 0, 0.85)"}}
                   className="col-md-6"
                   onClose={() => this.setState(
                       {isPopupOpen: false, assignVolunteer: false, assignData: {}})}>
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
                    <Row className="justify-content-start mt-2">
                      <Col className="h2">{name} nearby needs help!</Col>
                    </Row>
                    <Row className="justify-content-start">
                      <Col>
                        <div className="col-1 d-inline-block"
                             style={{height: "100%", verticalAlign: "top"}}>
                          <span className="h2 text-red">&#9432;&nbsp;</span>
                        </div>
                        <div className="col-10 d-inline-block">
                          <span>
                            {popupRequest.urgent === "yes" ? 'This is an urgent request.'
                                : 'This request needs to be completed in 1-2 days.'}
                          </span>
                          <br/>
                          <span>
                            {popupRequest.financial_assistance === 1
                                ? 'Monetary assistance will be required.'
                                : 'Monetary assistance is not required.'}
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {displayRequestCardDetails('Address', location)}
                    {displayRequestCardDetails('Received via', source)}
                    {displayRequestCardDetails('Reason', why)}
                    {displayRequestCardDetails('Help Required', requestStr)}
                    {isAuthorisedUser && popupRequest.requestor_mob_number
                    && displayRequestCardDetails('Requestor Mob', <a
                        href={'tel:'
                        + popupRequest.requestor_mob_number}>{popupRequest.requestor_mob_number}</a>)}
                    {isAuthorisedUser && popupRequest.volunteer_name && displayRequestCardDetails(
                        'Volunteer Name',
                        popupRequest.volunteer_name)}
                    {isAuthorisedUser && popupRequest.volunteer_mob_number
                    && displayRequestCardDetails('Volunteer Mob', <a
                        href={'tel:'
                        + popupRequest.volunteer_mob_number}>{popupRequest.volunteer_mob_number}</a>)}
                    {isAuthorisedUser && popupRequest.assignment_time && displayRequestCardDetails(
                        'Time of request assignment', <Badge
                            color="warning">{popupRequest.assignment_time}</Badge>)}
                    {
                      popupRequest.type === 'pending' && !isAuthorisedUserLoggedIn() &&
                      <>
                        <Col className="text-center">
                          <a href={popupRequest.accept_link}>
                            <Button color="primary">Accept</Button>
                          </a>
                        </Col>
                      </>
                    }
                    {
                      assignVolunteer && isVolunteerListLoading &&
                      <Col className="text-center h3">
                        Loading
                      </Col>
                    }
                    {
                      assignVolunteer && !isVolunteerListLoading &&
                      <Form role="form" onSubmit={this.assignVolunteerSubmit}>
                        {getVolunteerOptionsFormByDistance(volunteerList, popupRequest.latitude,
                            popupRequest.longitude, assignData.volunteer_id,
                            (e) => this.updateAssignVolunteerId(e.target.value))}
                        <div className="text-center">
                          <Button className="mt-4" color="primary" type="submit"
                                  disabled={this.isAssignSubmitDisabled()}>
                            Assign
                          </Button>
                        </div>
                      </Form>
                    }
                  </CardBody>
                  <CardFooter>
                    <Row>
                      <Col xs={6}>
                        {getShareButtons(popupRequest.accept_link, helpText)}
                      </Col>
                      {
                        popupRequest.type === 'new' &&
                        <Col xs={{size: 3, offset: 2}} className="text-center">
                          <a href={popupRequest.verify_link}>
                            <Button color="primary">Verify</Button>
                          </a>
                        </Col>
                      }
                      {
                        popupRequest.type === 'pending' && isAuthorisedUserLoggedIn() &&
                        <>
                          <Col xs={{size: 3, offset: 0}} className="text-center">
                            <a href={popupRequest.broadcast_link}>
                              <Button color="primary">
                                <i className="fab fa-whatsapp"/> Broadcast
                              </Button>
                            </a>
                          </Col>
                          <Col xs={{size: 3, offset: 0}} className="text-center">
                            <Button color="primary"
                                    onClick={() => this.enableAssignVolunteerForm(popupRequest)}
                                    hidden={assignVolunteer || popupRequest.v_id}>
                              Assign Vol.
                            </Button>
                            <Button color="info"
                                    hidden={!popupRequest.v_id}>
                              Assigned
                            </Button>
                          </Col>
                        </>
                      }
                      {
                        popupRequest.type === 'in-progress' && popupRequest.v_id &&
                        <>
                          <Col xs={{size: 3, offset: 0}} className="text-center">
                            <a href={popupRequest.volunteer_chat} className="btn btn-primary px-2"
                               target="_blank"
                               rel="noopener noreferrer">
                              <i className="fab fa-whatsapp"/> Volunteer
                            </a>
                          </Col>
                          <Col xs={{size: 3, offset: 0}} className="text-center">
                            <a href={`/task-status-update/${popupRequest.uuid}/${popupRequest.v_id}`}
                               target="_blank"
                               rel="noopener noreferrer">
                              <Button color="primary">Update Status</Button>
                            </a>
                          </Col>
                        </>
                      }
                      {
                        popupRequest.type === 'completed' && popupRequest.v_id &&
                        <Col xs={{size: 3, offset: 2}} className="text-center">
                          <a href={`/task-status-update/${popupRequest.uuid}/${popupRequest.v_id}`}
                             target="_blank"
                             rel="noopener noreferrer">
                            <Button color="primary">Update Status</Button>
                          </a>
                        </Col>
                      }
                    </Row>
                  </CardFooter>
                </div>
            )}
        </Popup>
    );
  }

  openPopup(popupRequest, popupRequestDetails) {
    this.setState({isPopupOpen: true, popupRequest, popupRequestDetails});
  }

  getRequestSlides(requests, isAuthorisedUser, currentUserID) {
    return requests.map((request, i) => {
      return (
          <Col md={4} key={(request.r_id || request.id) + '_' + i} className="mt-3">
            <Card className="full-height-card">
              <RequestsSlide request={request} index={i}
                             key={(request.r_id || request.id) + '_' + i}
                             openPopup={(popupRequest, popupRequestDetails) => this.openPopup(
                                 popupRequest, popupRequestDetails)}
                             isAuthorisedUser={isAuthorisedUser}
                             currentUserID={currentUserID}/>
            </Card>
          </Col>
      )
    })
  }

  getDistanceWiseSlides(requestsToDisplay, isAuthorisedUser, currentUserID) {

    const lessThan1Km = requestsToDisplay.filter(r => r.hd <= 1000);
    const lessThan10Km = requestsToDisplay.filter(r => r.hd > 1000 && r.hd <= 10000);
    const moreThan10Km = requestsToDisplay.filter(r => r.hd > 10000);

    let toReturn = [];
    toReturn.push(
        <Row className="mx-0 pb-4" key="moreThan10Km">
          <Col xs={12} className="text-uppercase pt-4 text-center h5">
            Far requests ({moreThan10Km.length})
          </Col>
          {this.getRequestSlides(moreThan10Km, isAuthorisedUser, currentUserID)}
        </Row>);

    if (lessThan1Km.length === 0 && lessThan10Km.length === 0) {
      toReturn.push(
          <Row className="mx-0 border-bottom pb-4" key="lessThan10Km">
            <Col xs={12} className="text-uppercase pt-4 text-center h5">
              There are no pending requests nearby<span role="img" aria-label="happy">😃😃😃</span>.
              Please search another locality/city where you have good friends share with them on <i
                className="fab fa-whatsapp"/>
            </Col>
          </Row>
      );
      toReturn.reverse();
      return toReturn;
    } else if (lessThan10Km.length !== 0) {
      toReturn.push(<Row className="mx-0 border-bottom pb-4" key="lessThan10Km">
        <Col xs={12} className="text-uppercase pt-4 text-center h5">
          Pending requests slightly further away ({lessThan10Km.length})
        </Col>
        {this.getRequestSlides(lessThan10Km, isAuthorisedUser, currentUserID)}
      </Row>);
    }

    if (lessThan1Km.length === 0) {
      toReturn.push(
          <Row className="mx-0 border-bottom pb-4" key="lessThan1Km">
            <Col xs={12} className="text-uppercase pt-4 text-center h5">
              There are pending requests slightly away from your location <span role="img"
                                                                                aria-label="sad">🙁🙁🙁</span>.
              Please share with someone who can help <i className="fab fa-whatsapp"/>
            </Col>
          </Row>);
    } else {
      toReturn.push(<Row className="mx-0 border-bottom pb-4" key="lessThan1Km">
        <Col xs={12} className="text-uppercase pt-4 text-center h5">
          Pending requests near you ({lessThan1Km.length})
        </Col>
        {this.getRequestSlides(lessThan1Km, isAuthorisedUser, currentUserID)}
      </Row>);
    }
    toReturn.reverse();
    return toReturn;
  }

  render() {
    const {requestsToDisplay, distanceBreakdown, currentUserID} = this.state;
    const {desiredType} = this.props;
    const isAuthorisedUser = isAuthorisedUserLoggedIn();
    return (
        <Container fluid>
          {this.getPopup(isAuthorisedUser, currentUserID)}
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
                      const updatedList = requestsToDisplay.map((r) => {
                        r.hd = haversine(
                            {lat: r.latitude, lng: r.longitude},
                            {lat: latitude, lng: longitude});
                        return r;
                      }).sort((r1, r2) => (r1.hd - r2.hd));
                      this.setState({
                        distanceBreakdown: !isAuthorisedUser,
                        requestsToDisplay: updatedList
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
                openPopup={(popupRequest, popupRequestDetails) => this.openPopup(popupRequest,
                    popupRequestDetails)}
                isAuthorisedUser={isAuthorisedUser}
                currentUserID={currentUserID}
            />}
            {
              (isAuthorisedUser || desiredType) &&
              (
                  !distanceBreakdown ?
                      <Row className="mx-0 pb-4">
                        {this.getRequestSlides(requestsToDisplay, isAuthorisedUser, currentUserID)}
                      </Row>
                      :
                      this.getDistanceWiseSlides(requestsToDisplay, isAuthorisedUser, currentUserID)
              )
            }
          </Card>
        </Container>
    )
  }
}

export default RequestsContainer;