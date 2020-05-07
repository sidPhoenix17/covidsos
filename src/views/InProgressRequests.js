import React, {Component} from 'react';
import {Badge, Card, CardHeader, Button, CardBody, CardFooter, CardText, CardTitle} from "reactstrap";
import {isAuthorisedUserLoggedIn, makeApiCall} from "utils/utils";
import config from 'config/config';
import {renderRequests} from "../utils/request_utils";

export default class InProgressRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: []
    }
  }

  componentDidMount() {
    makeApiCall(config.inProgressRequests, 'GET', {}, (response) => {
      this.setState({
        requests: (response || []),
        assignedRequests: []
      })
    }, false);

  }

  handleAssign = (uuid) => {
    makeApiCall(config.addRequestManager, 'POST', {request_uuid: uuid }, (response) => {
      this.setState({
        assignedRequests: [...this.state.assignedRequests, uuid]
      })
    }, true);
  }

  render() {
    const {requests, assignedRequests} = this.state;
    const admin = isAuthorisedUserLoggedIn();
    const currentUserID = localStorage.getItem(config.userIdStorageKey);

    return renderRequests(
        'In-progress Requests',
        requests,
        null,
        (request) => {
          const ownedTask = request.managed_by_id == currentUserID || assignedRequests.includes(request.request_uuid);

          return (
              <Card className='request-card' key={request.r_id}>
                <CardHeader>
                  <div>
                    <CardText hidden={!admin}>Managed By: <Badge color={ownedTask ? "success" : "primary"}>{ ownedTask ? 'You' : (request.managed_by || 'Admin') }</Badge></CardText>
                    {
                      !ownedTask && (
                        <CardText hidden={!admin}>
                          <Button outline color="primary" size="sm" onClick={() => this.handleAssign(request.request_uuid)}>Assign to me</Button>
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
                  {request.requestor_name ?
                      <><b>Requestor Name -</b> {request.requestor_name}<br/></>
                      : null}
                  {request.requestor_mob_number ?
                      <><b>Requestor Mob -</b> <a href={'tel:'
                      + request.requestor_mob_number}>{request.requestor_mob_number}</a><br/></>
                      : null}
                  {request.where ?
                      <><b>Where -</b> {request.where}<br/></>
                      : null}
                  {request.why ?
                      <><b>Why -</b> {request.why}<br/></>
                      : null}
                  {request.what ?
                      <><b>What -</b> {request.what}<br/></>
                      : null}
                  <b>Urgent -</b> {request.urgent}<br/>
                  <b>Financial Assistance -</b>
                  {request.financial_assistance === 1 ? 'Yes' : 'No'}<br/>
                  {request.volunteer_name ?
                      <><b>Volunteer Name -</b> {request.volunteer_name}<br/></>
                      : null}
                  {request.volunteer_mob_number ?
                      <><b>Volunteer Mob -</b> <a href={'tel:'
                      + request.volunteer_mob_number}>{request.volunteer_mob_number}</a><br/></>
                      : null}
                  <b>Time of request assignment -</b>
                  <Badge color="warning">{request.assignment_time}</Badge><br/>
                  <b>Time of request creation -</b>
                  <Badge color="warning">{request.request_time}</Badge><br/>
                </CardBody>
                <CardFooter>
                  <a href={request.volunteer_chat} className="btn btn-primary px-2"
                     target="_blank"
                     rel="noopener noreferrer">
                    <i className="fab fa-whatsapp"/> Volunteer
                  </a>
                  <a href={`/task-status-update/${request.request_uuid}/${request.v_id}`} className="btn btn-primary px-2"
                     target="_blank"
                     rel="noopener noreferrer">
                      Update Status
                  </a>
                </CardFooter>
              </Card>
          )
        });
  }
}