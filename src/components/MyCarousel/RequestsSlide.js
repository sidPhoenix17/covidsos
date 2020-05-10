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
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  Row,
  Col,
  CardHeader, Nav, NavItem, NavLink
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
import VolunteerPopupRegistration from "../Forms/VolunteerPopupRegistration";
import SeniorCitizenPopupRegistration from "../Forms/SeniorCitizenPopupRegistration";
import Popup from "reactjs-popup";

class RequestsSlide extends React.Component {

  constructor(props) {
    super(props);
  }

  getPopupHeader(request) {
    return (
        <>
          <Row className="justify-content-start mt-2">
            <Col className="h2">
              {request.name || request.requestor_name || 'Someone'} nearby needs help!
            </Col>
          </Row>
          <Row className="justify-content-start">
            <Col>
              <div className="col-1 d-inline-block" style={{height: "100%", verticalAlign: "top"}}>
                <span className="h2 text-red">&#9432;&nbsp;</span>
              </div>
              <div className="col-10 d-inline-block">
                <span>
                  {request.urgent === "yes" ? 'This is an urgent request.'
                      : 'This request needs to be completed in 1-2 days.'}
                </span>
                <br/>
                <span>
                {request.financialAssistance ? 'Monetary assistance will be required.'
                    : 'Monetary assistance is not required.'}
              </span>
              </div>
            </Col>
          </Row>
        </>
    );
  }

  getPopupContent(request, helpText) {
    return (
        <>
          <CardBody className="pre-scrollable">
            <CardText className="text-gray text-custom-small mb-0">
              Address
            </CardText>
            <CardText>{request.geoaddress || request.where || request.location || 'NA'}</CardText>
            <CardText className="text-gray text-custom-small mb-0">
              Received via
            </CardText>
            <CardText>{request.source_org || request.source || 'NA'}</CardText>
            <CardText className="text-gray text-custom-small mb-0">
              Reason
            </CardText>
            <CardText>{request.reason || 'NA'}</CardText>
            <CardText className="text-gray text-custom-small mb-0">
              Help Required
            </CardText>
            <CardText>{request.help || 'NA'}</CardText>
            {
              request.type === 'pending' &&
              <>
                <Col className="text-center">
                  <a href={request.accept_link}>
                    <Button color="primary">Accept</Button>
                  </a>
                </Col>
              </>
            }
          </CardBody>
          <CardFooter>
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
              <Col xs={2}/>
              {
                request.type === 'unverified' &&
                <Col xs={3} className="text-center">
                  <a href={request.verify_link}>
                    <Button color="primary">Verify</Button>
                  </a>
                </Col>
              }
              {
                request.type === 'pending' && isAuthorisedUserLoggedIn() &&
                <Col xs={3} className="text-center">
                  <a href={request.broadcast_link}>
                    <Button color="primary">
                      <i className="fab fa-whatsapp"/> Vol.
                    </Button>
                  </a>
                </Col>
              }
              {
                (request.type === 'assigned' || request.type === 'completed') &&
                request.v_id &&
                <Col xs={3} className="text-center">
                  <a href={`/task-status-update/${request.request_uuid
                  || request.uuid}/${request.v_id}`} target="_blank" rel="noopener noreferrer">
                    <Button color="primary">Update Status</Button>
                  </a>
                </Col>
              }
            </Row>
          </CardFooter>
        </>
    );
  }

  render() {
    let {request} = this.props;
    let {requirement, location, reason, name = 'Someone'} = request;
    const helpText = `Hey, ${name} in your area *${location}* requires help!\n\n\n*Why does ${name} need help?*\n${reason}\n\n\n*How can you help ${name}?*\n${requirement}\n\n\nThis is a verified request received via www.covidsos.org and it would be great if you can help.!🙂\n\n\nIf you can help, please click:`
    return (
        <>
          <Card className='full-height-card' key={request.r_id}>
            <CardBody>
              <CardText style={{width: "100%", overflowY: "auto"}}>{request.reason}</CardText>
              <CardTitle className="h3 mb-0">{request.requirement || request.what
              || request.request || 'NA'}</CardTitle>
              <CardText className="text-gray text-custom-small">
                Requested by {request.name || request.requestor_name || 'Someone'} at {request.timestamp
              || request.request_time}
              </CardText>
              <CardText className="text-gray text-custom-small mb-0">
                Address
              </CardText>
              <CardText>{request.geoaddress || request.where || request.location || 'NA'}</CardText>
              <CardText className="text-gray text-custom-small mb-0">
                Received via
              </CardText>
              <CardText>{request.source_org || request.source || 'NA'}</CardText>
            </CardBody>
            <CardFooter className="pt-0 pb-2">
              <Badge color="warning">{request.type}</Badge>
            </CardFooter>
            <CardFooter className="pt-2">
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
                <Col xs={2}/>
                <Col xs={3} className="text-center">
                  <Button className="btn-link border-0 px-2 text-primary" size="md"
                          onClick={() => this.props.openPopup(this.getPopupHeader(request),
                              this.getPopupContent(request, helpText))}>Details</Button>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </>
    );
  }
}

export default RequestsSlide;
