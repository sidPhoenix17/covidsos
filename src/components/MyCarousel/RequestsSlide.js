/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import {Badge, Button, Card, CardBody, CardFooter, CardText, CardTitle, Row, Col} from "reactstrap";
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

class RequestsSlide extends React.Component {
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    let {request} = this.props;
    let {requirement, location, reason, name = 'Someone'} = request;
    const helpText = `Hey, ${name} in your area *${location}* requires help!\n\n\n*Why does ${name} need help?*\n${reason}\n\n\n*How can you help ${name}?*\n${requirement}\n\n\nThis is a verified request received via www.covidsos.org and it would be great if you can help.!🙂\n\n\nIf you can help, please click:`
    return (
        <Card className='full-height-card' key={request.r_id}>
          <CardBody>
            <CardText style={{width: "100%", overflowY: "auto"}}>{request.reason}</CardText>
            <CardTitle className="h3 mb-0">{request.requirement || request.what
            || request.request}</CardTitle>
            <CardText className="text-gray text-custom-small">
              Requested by {request.name || request.requestor_name} at {request.timestamp
            || request.request_time}
            </CardText>
            <CardText className="text-gray text-custom-small mb-0">
              Address
            </CardText>
            <CardText>{request.geoaddress || request.where}</CardText>
          </CardBody>
          <CardFooter className="pt-0 pb-2">
            <Badge color="warning">{request.type}</Badge>
          </CardFooter>
          <CardFooter className="pt-2">
            <Row>
              <Col xs={6}>
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
                <span className=''>
                <TwitterShareButton
                    url={'https://wa.me/918618948661/'}
                    title={helpText}>
                  <TwitterIcon size={32} round/>
                </TwitterShareButton>
              </span>
              </Col>
              {
                request.type === 'unverified' &&
                <Col xs={3} className="text-center">
                  <a href={request.verify_link}>
                    <Button color="primary" size="sm">Verify</Button>
                  </a>
                </Col>
              }
              {
                request.type === 'pending' && (isAuthorisedUserLoggedIn() ?
                    <Col xs={3} className="text-center">
                      <a href={request.broadcast_link}>
                        <Button color="primary" size="sm">
                          <i className="fab fa-whatsapp"/> Vol.
                        </Button>
                      </a>
                    </Col> :
                    <Col xs={3} className="text-center">
                      <a href={request.accept_link}>
                        <Button color="primary" size="sm">Accept</Button>
                      </a>
                    </Col>)
              }
              {
                (request.type === 'assigned' || request.type === 'completed') &&
                request.v_id &&
                <Col xs={3} className="text-center">
                  <a href={`/task-status-update/${request.request_uuid
                  || request.uuid}/${request.v_id}`} target="_blank" rel="noopener noreferrer">
                    <Button color="primary" size="sm">Update Status</Button>
                  </a>
                </Col>
              }
            </Row>
          </CardFooter>
        </Card>
    );
  }
}

export default RequestsSlide;
