import React, {Component} from 'react';
import {Badge, Button, Card, CardBody, CardFooter, CardText, CardTitle} from "reactstrap";
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

export default class NewRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: []
    }
  }

  componentDidMount() {
    makeApiCall(config.newRequests, 'GET', {}, (response) => {
      this.setState({
        requests: (response || [])
      })
    }, false);

  }

  render() {
    const {requests} = this.state;
    const admin = isAuthorisedUserLoggedIn();
    return renderRequests(
        'New Requests',
        requests,
        (sortedRequests) => this.setState({requests: sortedRequests}),
        (request) => {
          const helpText = `Hey, someone in your area needs help. Requirement: [${request.request}] Address: [${request.address} ${request.geoaddress}] If you can help, please message us on.`
          return (
              <Card className='request-card' key={request.id}>
                <CardBody>
                  <CardText className="text-right" hidden={!admin}>{request.managed_by || 'Admin'}</CardText>
                  <CardTitle>{request.request}</CardTitle>
                  <CardText>
                    <b>Name -</b> {request.name}
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
        });
  }
}