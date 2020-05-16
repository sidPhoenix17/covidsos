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
import {makeApiCall} from "utils/utils";
import config from "../../config/config";
import {displayRequestCardDetails, getShareButtons} from "../../utils/request_utils";

class RequestsSlide extends React.Component {

  constructor(props) {
    super(props);
    this.state = {request: props.request};
  }

  handleAssignToMeAsManager = (ownedTask, request, currentUserID) => {
    makeApiCall(config.addRequestManager, 'POST', {request_uuid: request.uuid}, () => {
      this.setState({request: {...request, managed_by_id: currentUserID}});
    }, true);
  }

  getHelpText(name, location, why, requestStr) {
    return `Hey, ${name} in your area *${location}* requires help!\n\n\n*Why does ${name} need help?*\n${why}\n\n\n*How can you help ${name}?*\n${requestStr}\n\n\nThis is a verified request received via www.covidsos.org and it would be great if you can help.!🙂\n\n\nIf you can help, please click:`
  }

  render() {
    const {request} = this.state;
    const {isAuthorisedUser, currentUserID} = this.props;
    const name = request.requestor_name || 'Someone';
    const location = request.full_address || request.location || request.geoaddress || request.where
        || 'NA';
    const why = request.why || request.what;
    const requestStr = request.request || 'NA';
    const source = request.source_org || request.source || 'NA';
    const helpText = this.getHelpText(name, location, why, requestStr);
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
                          onClick={() => this.handleAssignToMeAsManager(ownedTask, request,
                              parseInt(currentUserID))}>
                    {ownedTask ? "Assigned" : "Assign to me"}
                  </Button>
                </CardText>
              </div>
            </CardHeader>
            <CardBody>
              <CardTitle className="h3 mb-0">{why || requestStr}</CardTitle>
              <CardText className="text-gray text-custom-small">
                Requested by {name} at {request.request_time}
              </CardText>
              {displayRequestCardDetails('Address', location)}
              {displayRequestCardDetails('Received via', source)}
            </CardBody>
            <CardFooter className="pt-0 pb-2">
              <Badge color="warning">{request.type}</Badge>
            </CardFooter>
            <CardFooter className="pt-2">
              <Row>
                <Col xs={6}>
                  {getShareButtons(request.accept_link, helpText)}
                </Col>
                <Col xs={{size: 3, offset: 1}} className="text-center">
                  <Button className="btn-link border-0 px-2 text-primary" size="md"
                          onClick={() => this.props.openPopup(request,
                              {name, location, why, requestStr, source, helpText})}>
                    See Details
                  </Button>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </>
    );
  }
}

export default RequestsSlide;
