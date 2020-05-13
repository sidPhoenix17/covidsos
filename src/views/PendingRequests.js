import React, {Component} from 'react';
import {Badge, Button, Card, CardHeader, CardBody, CardFooter, CardText, CardTitle} from "reactstrap";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share';
import {isAuthorisedUserLoggedIn, makeApiCall} from "utils/utils";
import config from 'config/config';
import {renderRequests} from "../utils/request_utils";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import { uniq, map, uniqBy, filter } from 'lodash';

export default class PendingRequests extends Component {
  constructor(props) {
    super(props);
    let isCompleted = false;
    if (isAuthorisedUserLoggedIn() && this.props.location.pathname.indexOf('complete') !== -1) {
      isCompleted = true
    }
    this.state = {
      requests: [],
      isCompleted,
      assignedRequests: [],
      filters: {
        source: '',
        managed_by_id: '',
        city: ''
      }
    }
  }

  handleAssign = (uuid) => {
    makeApiCall(config.addRequestManager, 'POST', {request_uuid: uuid }, () => {
      this.setState({
        assignedRequests: [...this.state.assignedRequests, uuid]
      })
    }, true);
  }

  componentDidMount() {
    const {isCompleted} = this.state;
    let url = config.pendingRequests;
    if (isAuthorisedUserLoggedIn()) {
      url = isCompleted ? config.adminCompletedRequests : config.adminPendingRequests;
    }
    makeApiCall(url, 'GET', {}, (response) => {
      this.setState({
        requests: (response || [])
      })
    }, false);

  }

  handleFilter = (key, value) => {
    const { filters } = this.state;
    this.setState({ filters: { ...filters, [key]: value } })
  }

  render() {
    const {requests, isCompleted, assignedRequests, filters} = this.state;
    const admin = isAuthorisedUserLoggedIn();
    const currentUserID = localStorage.getItem(config.userIdStorageKey);
    const { source, managed_by_id, city} = filters;

    let filtersObj = {};
    if(!!source && source !== '' && source !== 'any'){
      filtersObj = { ...filtersObj, source }
    }
    if( !!managed_by_id && managed_by_id !== '' && managed_by_id !== 'any'){
      filtersObj = { ...filtersObj, managed_by_id: parseInt(managed_by_id) }
    }

    if( !!city && city !== '' && city !== 'any'){
      filtersObj = { ...filtersObj, city: city }
    }

    let filteredRequests = filter(requests, filtersObj);

    return renderRequests(
        isCompleted ? 'Completed Requests' : 'Pending Requests',
        filteredRequests,
        (sortedRequests) => this.setState({requests: sortedRequests}),
        (request) => {
          const ownedTask = request.managed_by_id === currentUserID || assignedRequests.includes(request.uuid);
          let name = request.name || request.requestor_name || 'Someone';
          const helpText = `Hey, ${name} in your area *${request.location}* requires help!\n\n\n*Why does ${name} need help?*\n${request.what}\n\n\n*How can you help ${name}?*\n${request.request}\n\n\nThis is a verified request received via www.covidsos.org and it would be great if you can help.!🙂\n\n\nIf you can help, please click:`

          return (
              <Card className='request-card' key={request.r_id}>
                <CardHeader  hidden={!admin}>
                  <div>
                    <CardText>Managed By: <Badge color={ownedTask ? "success" : "primary"}>{ ownedTask ? 'You' : (request.managed_by || 'Admin')}</Badge></CardText>
                    {
                      !ownedTask && (
                        <CardText>
                          <Button outline color="primary" size="sm" onClick={() => this.handleAssign(request.uuid)}>Assign to me</Button>
                        </CardText>
                      )
                    }
                    {
                      assignedRequests.includes(request.uuid) && (
                        <CardText>
                          <Button color="success" size="sm">Assigned</Button>
                        </CardText>
                      )
                    }
                  </div>
                </CardHeader>

                <CardBody>
                  <CardTitle>{request.request}</CardTitle>
                  <CardText>{request.what}</CardText>
                  <CardText>
                    <b>Location -</b> <Badge color="warning"
                                             className="force-wrap text-align-left">{request.location}</Badge><br/>
                    <b>Requested On -</b> <Badge color="warning">{request.request_time || request.timestamp}</Badge><br/>
                  </CardText>
                </CardBody>
                <CardFooter hidden={isCompleted}>
                  <Row>
                    <Col xs={6}>
                      <span className='share-icon'>
                        <WhatsappShareButton
                            url={request.accept_link || 'https://wa.me/918618948661/'}
                            title={helpText}>
                          <WhatsappIcon size={32} round/>
                        </WhatsappShareButton>
                      </span>
                      <span className='share-icon'>
                        <FacebookShareButton
                            url={request.accept_link || 'https://wa.me/918618948661/'}
                            quote={helpText}>
                          <FacebookIcon size={32} round/>
                        </FacebookShareButton>
                      </span>
                      <span className=''>
                        <TwitterShareButton
                            url={request.accept_link || 'https://wa.me/918618948661/'}
                            title={helpText}>
                          <TwitterIcon size={32} round/>
                        </TwitterShareButton>
                      </span>
                    </Col>
                    {
                      isAuthorisedUserLoggedIn() && request.broadcast_link ?
                          <Col xs={3} className="text-center px-0">
                            <a href={request.broadcast_link} target="_blank"
                               rel="noopener noreferrer">
                              <Button color="primary" size="sm">
                                <i className="fab fa-whatsapp"/> Vol.
                              </Button>
                            </a>
                          </Col>
                          :
                          <Col xs={2}>
                          </Col>
                    }
                    <Col xs={3} className="text-center">
                      <a href={request.accept_link}>
                        <Button color="primary" size="sm">Accept</Button>
                      </a>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
          )
        },
        {
          filters: filters,
          source: uniq(map(requests, 'source')),
          city: uniq(map(requests, 'city')),
          managed_by: uniqBy(map(requests, ({ managed_by, managed_by_id }) => ({ managed_by, managed_by_id })), 'managed_by_id'),
          filterBy: (key, value) => this.handleFilter(key, value)
        });
  }
}