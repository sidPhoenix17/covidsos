import React, {Component} from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Header from "../components/Headers/Header.js";

import classnames from 'classnames';

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share';
import {makeApiCall} from "utils/utils";
import config from 'config/config';
import { forEach } from 'lodash';

export default class TaskBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingTasks: [],
      completedTasks: [],
      activeTab: '1'
    }
  }

  componentDidMount() {
    makeApiCall(config.volunteerRequests, 'GET', {}, (data) => {

      const completedTasks = [];
      const pendingTasks = [];


      forEach(data, ({ status }, index) => {
        if(status == "completed"){
          completedTasks.push(data[index]);
        } else {
          pendingTasks.push(data[index]);
        }
      });

      this.setState({
        pendingTasks: pendingTasks,
        completedTasks: completedTasks
      })

      console.log(pendingTasks, completedTasks)
    }, false);
  }

  render() {
    const {pendingTasks, completedTasks, activeTab} = this.state;

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
                      Task List
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container className="request-card-container task-container" fluid>
            <Row>
              <Col sm="12">
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { this.setState({ activeTab: '1' }) }}
                      >
                        Pending
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { this.setState({ activeTab: '2' }) }}
                      >
                        Completed
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col>
                          {
                            pendingTasks.length != 0 && pendingTasks.map(({ name, address, last_updated, uuid }, index) => (
                              <Card className='task-card' key={index}>
                                <CardBody className='tb-task'>
                                  <div className='tb-task-content margin-bottom-10'>
                                    <div>{name || 'Name unavailable'}</div>
                                    <div>{new Intl.DateTimeFormat('en-IN',{dateStyle: 'medium', timeStyle: 'medium'}).format(new Date(last_updated))}</div>
                                  </div>
                                  <div className='tb-task-content'>
                                      <div>{address}</div>
                                      <div>
                                      <a href={`/task-status-update/${uuid}`}><Button color="primary" size="sm">View</Button></a></div>
                                  </div>
                                </CardBody>
                              </Card>
                            ))
                          }
                          {
                            pendingTasks.length == 0 && (
                              <Card className='task-card'>
                                <CardBody className='tb-task'>
                                  No Pending Tasks
                                </CardBody>
                              </Card>
                            )
                          }

                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                          <Col>
                            {
                              completedTasks.length != 0 && completedTasks.map(({ name, address, last_updated, uuid }, index) => (
                                <Card className='task-card' key={index}>
                                  <CardBody className='tb-task'>
                                    <div className='tb-task-content margin-bottom-10'>
                                      <div>{name || 'Unknown User'}</div>
                                      <div>{new Intl.DateTimeFormat('en-IN',{dateStyle: 'medium', timeStyle: 'medium'}).format(new Date(last_updated))}</div>
                                    </div>
                                    <div className='tb-task-content'>
                                        <div>{address}</div>
                                        <a href={`/task-status-update/${uuid}`}><Button color="primary" size="sm">View</Button></a>
                                    </div>
                                  </CardBody>
                                </Card>
                              ))
                            }
                            {
                              completedTasks.length == 0 && (
                                <Card className='task-card'>
                                  <CardBody className='tb-task'>
                                    No Pending Tasks
                                  </CardBody>
                                </Card>
                              )
                            }

                          </Col>
                        </Row>
                    </TabPane>
                  </TabContent>

              </Col>
            </Row>
          </Container>
        </>

    )
  }
}