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
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row
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
import config from "../../config/config";

class RequestsSlide extends React.Component {

  constructor(props) {
    super(props);
    this.state = {request: props.request};
  }

  handleAssign = (ownedTask, request, currentUserID) => {
    makeApiCall(config.addRequestManager, 'POST', {request_uuid: request.uuid}, () => {
      this.setState({request: {...request, managed_by_id: currentUserID}});
    }, true);
  }

  getShareButtons(accept_link = 'https://wa.me/918618948661/', helpText) {
    return (
        <>
          <span className='share-icon'>
                <WhatsappShareButton
                    url={accept_link}
                    title={helpText}>
                  <WhatsappIcon size={32} round/>
                </WhatsappShareButton>
              </span>
          <span className='share-icon'>
                <FacebookShareButton
                    url={accept_link}
                    quote={helpText}>
                  <FacebookIcon size={32} round/>
                </FacebookShareButton>
              </span>
          <span className=''>
                <TwitterShareButton
                    url={accept_link}
                    title={helpText}>
                  <TwitterIcon size={32} round/>
                </TwitterShareButton>
              </span>
        </>
    );
  }

  getPopupHeader(request) {
    return (
        <>
          <Row className="justify-content-start mt-2">
            <Col className="h2">
              {request.requestor_name || 'Someone'} nearby needs help!
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
                {request.financial_assistance === 1 ? 'Monetary assistance will be required.'
                    : 'Monetary assistance is not required.'}
              </span>
              </div>
            </Col>
          </Row>
        </>
    );
  }

  display(title, content) {
    return (
        <>
          <CardText className="text-gray text-custom-small mb-0">
            {title}
          </CardText>
          <CardText>{content || 'NA'}</CardText>
        </>
    )
  }

  getPopupContent(request, name, location, what, requestStr, source, helpText, isAuthorisedUser) {
    return (
        <>
          <CardBody>
            {this.display('Address', location)}
            {this.display('Received via', source)}
            {this.display('Reason', what)}
            {this.display('Help Required', requestStr)}
            {isAuthorisedUser && this.display('Requestor Mob', <a href={'tel:' + request.requestor_mob_number}>{request.requestor_mob_number}</a>)}
            {isAuthorisedUser && this.display('Volunteer Name', request.volunteer_name)}
            {isAuthorisedUser && this.display('Volunteer Mob', <a href={'tel:' + request.volunteer_mob_number}>{request.volunteer_mob_number}</a>)}
            {isAuthorisedUser && this.display('Time of request assignment', <Badge color="warning">{request.assignment_time}</Badge>)}
            {
              request.type === 'pending' && !isAuthorisedUserLoggedIn() &&
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
                {this.getShareButtons(request.accept_link, helpText)}
              </Col>
              {
                request.type === 'new' &&
                <Col xs={{size: 3, offset: 2}} className="text-center">
                  <a href={request.verify_link}>
                    <Button color="primary">Verify</Button>
                  </a>
                </Col>
              }
              {
                request.type === 'pending' && isAuthorisedUserLoggedIn() &&
                <>
                <Col xs={{size: 3, offset: 0}} className="text-center">
                  <a href={request.broadcast_link}>
                    <Button color="primary">
                      <i className="fab fa-whatsapp"/> Broadcast
                    </Button>
                  </a>
                </Col>
                <Col xs={{size: 2, offset: 0}} className="text-center">
                  <a href={request.accept_link}>
                    <Button color="primary">Accept</Button>
                  </a>
                </Col>
                </>
              }
              {
                (request.type === 'in-progress' || request.type === 'completed') &&
                request.v_id &&
                <Col xs={{size: 3, offset: 2}} className="text-center">
                  <a href={`/task-status-update/${request.uuid}/${request.v_id}`} target="_blank"
                     rel="noopener noreferrer">
                    <Button color="primary">Update Status</Button>
                  </a>
                </Col>
              }
            </Row>
          </CardFooter>
        </>
    );
  }

  getHelpText(name, location, what, requestStr) {
    return `Hey, ${name} in your area *${location}* requires help!\n\n\n*Why does ${name} need help?*\n${what}\n\n\n*How can you help ${name}?*\n${requestStr}\n\n\nThis is a verified request received via www.covidsos.org and it would be great if you can help.!🙂\n\n\nIf you can help, please click:`
  }

  render() {
    const {request} = this.state;
    const {isAuthorisedUser, currentUserID} = this.props;
    const name = request.requestor_name || 'Someone';
    const location = request.full_address || request.location || request.geoaddress || request.where || 'NA';
    const what = request.what || request.why;
    const requestStr = request.request || 'NA';
    const source = request.source_org || request.source || 'NA';
    const helpText = this.getHelpText(name, location, what, requestStr);
    const ownedTask = request.managed_by_id === currentUserID;
    return (
        <>
          <Card className='full-height-card' key={(request.r_id || request.id)}>
            <CardHeader hidden={!isAuthorisedUser}>
              <div>
                <CardText>Managed By: <Badge color={ownedTask ? "success" : "primary"}>{ownedTask
                    ? 'You' : (request.managed_by || 'Admin')}</Badge></CardText>
                <CardText>
                  <Button outline color={ownedTask ? "success" : "primary"} size="sm"
                          disabled={ownedTask}
                          onClick={() => this.handleAssign(ownedTask, request,
                              parseInt(currentUserID))}>
                    {ownedTask ? "Assigned" : "Assign to me"}
                  </Button>
                </CardText>
              </div>
            </CardHeader>
            <CardBody>
              <CardTitle className="h3 mb-0">{what || requestStr}</CardTitle>
              <CardText className="text-gray text-custom-small">
                Requested by {name} at {request.request_time}
              </CardText>
              {this.display('Address', location)}
              {this.display('Received via', source)}
            </CardBody>
            <CardFooter className="pt-0 pb-2">
              <Badge color="warning">{request.type}</Badge>
            </CardFooter>
            <CardFooter className="pt-2">
              <Row>
                <Col xs={6}>
                  {this.getShareButtons(request.accept_link, helpText)}
                </Col>
                <Col xs={1}/>
                <Col xs={3} className="text-center">
                  <Button className="btn-link border-0 px-2 text-primary" size="md"
                          onClick={() => this.props.openPopup(this.getPopupHeader(request),
                              this.getPopupContent(request, name, location, what, requestStr,
                                  source, helpText, isAuthorisedUser))}>See Details</Button>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </>
    );
  }
}

export default RequestsSlide;
