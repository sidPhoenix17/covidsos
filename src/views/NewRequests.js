import React, {Component} from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle
} from "reactstrap";
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
import {filter, map, uniq} from 'lodash';

export default class NewRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
      assignedRequests: [],
      filters: {
        source: '',
        city: ''
      }
    }
  }

  componentDidMount() {
    makeApiCall(config.newRequests, 'GET', {}, (response) => {
      this.setState({
        requests: (response || [])
      })
    }, false);

  }

  handleAssign = (uuid) => {
    makeApiCall(config.addRequestManager, 'POST', {request_uuid: uuid }, () => {
      this.setState({
        assignedRequests: [...this.state.assignedRequests, uuid]
      })
    }, true);
  }

  handleFilter = (key, value) => {
    const { filters } = this.state;
    this.setState({ filters: { ...filters, [key]: value } })
  }

  render() {
    const {requests, assignedRequests, filters} = this.state;
    const admin = isAuthorisedUserLoggedIn();
    const currentUserID = localStorage.getItem(config.userIdStorageKey);
    const { source, city} = filters;

    let filtersObj = {};
    if(!!source && source !== '' && source !== 'any'){
      filtersObj = { ...filtersObj, source }
    }
    if( !!city && city !== '' && city !== 'any'){
      filtersObj = { ...filtersObj, city: city }
    }

    let filteredRequests = filter(requests, filtersObj);

    return renderRequests(
        'New Requests',
        filteredRequests,
        (sortedRequests) => this.setState({requests: sortedRequests}),
        (request) => {
          const helpText = `Hey, someone in your area needs help. Requirement: [${request.request}] Address: [${request.address} ${request.geoaddress}] If you can help, please message us on.`
          const ownedTask = request.managed_by_id === currentUserID || assignedRequests.includes(request.uuid);

          return (
              <Card className='request-card' key={request.id}>
                <CardHeader>
                  <div>
                    <CardText hidden={!admin}>Managed By: <Badge color={ownedTask ? "success" : "primary"}>{ ownedTask ? 'You' : (request.managed_by || 'Admin')}</Badge></CardText>
                    {
                      !ownedTask && (
                        <CardText hidden={!admin}>
                          <Button outline color="primary" size="sm" onClick={() => this.handleAssign(request.uuid)}>Assign to me</Button>
                        </CardText>
                      )
                    }
                    {
                      assignedRequests.includes(request.uuid) && (
                        <CardText hidden={!admin}>
                          <Button color="success" size="sm">Assigned</Button>
                        </CardText>
                      )
                    }
                  </div>
                </CardHeader>

                <CardBody>
                  <CardTitle>{request.request}</CardTitle>
                  <CardText>
                    <b>Name -</b> {request.name}GET
                  </CardText>
                  <CardText>
                    <b>Location -</b> <Badge color="warning"
                                             className="force-wrap text-align-left">{request.address} {request.geoaddress}</Badge><br/>
                    <b>Requested On -</b> <Badge color="warning">{
                    request.timestamp
                  }</Badge><br/>
                  </CardText>
                </CardBody>
                <CardFooter>
                <span className='share-icon'>
                  <WhatsappShareButton
                      url={'https://wa.me/918618948661/'}
                      title={helpText}>
                    <WhatsappIcon size={32} round/>
                  </WhatsappShareButton>
                </span>
                  <span className='share-icon'>
                  <FacebookShareButton
                      url={'https://wa.me/918618948661/'}
                      quote={helpText}>
                    <FacebookIcon size={32} round/>
                  </FacebookShareButton>
                </span>
                  <span className='share-icon'>
                  <TwitterShareButton
                      url={'https://wa.me/918618948661/'}
                      title={helpText}>
                    <TwitterIcon size={32} round/>
                  </TwitterShareButton>
                </span>
                  <span style={{float: 'right'}}>
                  <a href={request.verify_link}><Button color="primary"
                                                        size="sm">Verify</Button></a>
                </span>
                </CardFooter>
              </Card>
          )
        },
        {
          filters: filters,
          source: uniq(map(requests, 'source')),
          city: uniq(map(requests, 'city')),
          filterBy: (key, value) => this.handleFilter(key, value)
        }
    );
  }
}