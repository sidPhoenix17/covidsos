import React, {Component} from 'react';
import {Badge, Card, CardBody, CardFooter, CardTitle, Col, Container, Row} from "reactstrap";
import Header from "../components/Headers/Header.js";
import {makeApiCall} from "utils/utils";
import config from 'config/config';

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
        requests: (response || [])
      })
    }, false);

  }

  render() {
    const {requests} = this.state;

    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className="justify-content-center">
              <Col lg="8" md="8">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-3 py-lg-3 text-justify">
                    <div className="text-uppercase text-center mt-2 mb-2">
                      In-progress Requests
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container className="request-card-container" fluid>
            <Row className="mt-5">
              {
                requests && requests.length > 0 ?
                    requests.map((request) => {
                      return (
                          <Card className='request-card' key={request.r_id}>
                            <CardBody>
                              <CardTitle>{request.request}</CardTitle>
                              {request.requestor_name ?
                                  <><b>Requestor Name -</b> {request.requestor_name}<br/></>
                                  : null}
                              {request.requestor_mob_number ?
                                  <><b>Requestor Mob -</b> {request.requestor_mob_number}<br/></>
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
                                  <><b>Volunteer Mob -</b> {request.volunteer_mob_number}<br/></>
                                  : null}
                              <b>Time of request assignment -</b>
                              <Badge color="warning">{request.assignment_time}</Badge><br/>
                              <b>Time of request creation -</b>
                              <Badge color="warning">{request.request_time}</Badge><br/>
                            </CardBody>
                            <CardFooter>
                              <a href={request.volunteer_chat} className="btn btn-primary px-3"
                                 target="_blank"
                                 rel="noopener noreferrer">
                                <i className="fab fa-whatsapp"/> Volunteer
                              </a>
                              <a href={request.requestor_chat} className="btn btn-primary px-3"
                                 target="_blank"
                                 rel="noopener noreferrer">
                                <i className="fab fa-whatsapp"/> Requestor
                              </a>
                            </CardFooter>
                          </Card>
                      )
                    })
                    : null
              }
            </Row>
          </Container>
        </>

    )
  }
}