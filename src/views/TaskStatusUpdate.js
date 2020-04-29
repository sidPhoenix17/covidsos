import React, {Component} from 'react';
import {withRouter} from "react-router";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import Header from "../components/Headers/Header.js";
import {makeApiCall} from "utils/utils";
import config from 'config/config';
import {isEmpty} from 'lodash';

class TaskStatusUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      task: {},
      status: '',
      feedback: '',
      loading: false,
      isRejected: false,
      submitClicked: false,
    }
  }

  componentDidMount() {
    const {match: {params: {uuid}}} = this.props;

    this.setState({loading: true}, () => {
      makeApiCall(config.requestInfo, 'GET', {uuid}, (response) => {
        this.setState({
          task: response[0],
          loading: false
        })
      }, false, (data) => {
        this.setState({
          loading: false
        })
      });
    })

  }

  closeTask = () => {
    const {match: {params: {uuid}}} = this.props;
    const {status, feedback} = this.state;

    this.setState({submitClicked: true}, () => {
      makeApiCall(config.volUpdateRequest, 'POST', {
        request_uuid: uuid,
        status: status,
        status_message: feedback
      }, (response) => {
        this.props.history.push("/taskboard");
      }, false, (data) => {
        this.setState({submitClicked: false});
      });
    });
  }

  render() {
    const {task, step, status, feedback, loading, isRejected, submitClicked} = this.state;
    const {what, why, request_address, urgent, name, mob_number, financial_assistance, status: existingStatus} = task;

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
                      Task Details
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          {
            step === 0 && (
                <Container className="request-card-container" fluid>
                  <Row>
                    <Col sm="12">
                      <Card
                          className='task-card task-card-status-update task-container content--center'>
                        {
                          !loading && (
                              <CardBody>
                                <h2>{name} - needs your help!</h2>
                                {
                                  urgent === 'yes' && (
                                      <Badge color="warning" className="margin-bottom-10">
                                        This is urgent request
                                      </Badge>
                                  )
                                }

                                <div className='margin-bottom-10'>
                                  <p className='no-margin label'>Address</p>
                                  <p className='no-margin'>{request_address}</p>
                                </div>

                                <div className='margin-bottom-10'>
                                  <p className='no-margin label'>Mobile Number</p>
                                  <p className='no-margin'>{mob_number}</p>
                                </div>

                                <div className='margin-bottom-10'>
                                  <p className='no-margin label'>Reason</p>
                                  <p className='no-margin'>{why}</p>
                                </div>

                                <div className='margin-bottom-10'>
                                  <p className='no-margin label'>Help required on</p>
                                  <p>{what}</p>
                                </div>

                                {
                                  financial_assistance && (
                                      <Badge color="warning" className="margin-bottom-20">
                                        Monetary help might be required.
                                      </Badge>
                                  )
                                }

                                {
                                  existingStatus !== 'completed' && (
                                      <div>
                                        <Button color="primary" block
                                                onClick={() => this.setState({step: 1})}>Update
                                          Status</Button>
                                      </div>
                                  )
                                }

                              </CardBody>
                          )
                        }
                        {
                          loading && (
                              <CardBody>
                                <CardTitle>Loading</CardTitle>
                              </CardBody>
                          )
                        }
                      </Card>
                    </Col>
                  </Row>
                </Container>
            )
          }

          {
            step === 1 && !loading && (
                <Container className="request-card-container" fluid>
                  <Row>
                    <Col sm="12">
                      <Card
                          className='task-card task-card-status-update task-container content--center'>
                        <CardBody>
                          <h2>{name} - needs your help!</h2>
                          {
                            urgent === 'yes' && (
                                <Badge color="warning" className="margin-bottom-10">
                                  This is urgent request
                                </Badge>
                            )
                          }

                          <Form>
                            <FormGroup>
                              <Label>Update Status</Label>
                              {
                                <>
                                  {
                                    (!isRejected || status === 'completed') && (
                                        <Button
                                            outline={status !== 'completed'}
                                            color={status === 'completed' ? "success" : 'secondary'}
                                            block
                                            onClick={() => this.setState({status: 'completed'})}
                                        >Yes, Task completed</Button>
                                    )
                                  }
                                  {
                                    isEmpty(status) && !isRejected && (
                                        <Button
                                            outline={!isRejected}
                                            color={isRejected ? "danger" : 'secondary'}
                                            block
                                            onClick={() => this.setState({isRejected: true})}
                                        >Can not complete</Button>
                                    )
                                  }
                                </>
                              }
                              {
                                isRejected && (
                                    <>
                                      <Button
                                          outline={status !== 'completed externally'}
                                          color={status === 'completed externally' ? "danger"
                                              : 'secondary'}
                                          block
                                          onClick={() => this.setState(
                                              {status: 'completed externally'})}
                                      >Somebody else did it</Button>
                                      <Button
                                          outline={status !== 'cancelled'}
                                          color={status === 'cancelled' ? "danger" : 'secondary'}
                                          block
                                          onClick={() => this.setState({status: 'cancelled'})}
                                      >Please assign new volunter</Button>
                                      <Button
                                          outline={status !== 'reported'}
                                          color={status === 'reported' ? "danger" : 'secondary'}
                                          block
                                          onClick={() => this.setState({status: 'reported'})}
                                      >Report issue</Button>
                                    </>
                                )
                              }
                            </FormGroup>

                            {
                              !isEmpty(status) && status !== 'not_completed' && (
                                  <FormGroup>
                                    <Label>What is your feedback for user?</Label>
                                    <Input
                                        autoComplete="off"
                                        type="textarea"
                                        name="feedback"
                                        placeholder="Add your feedback"
                                        value={feedback}
                                        onChange={(event) => this.setState(
                                            {feedback: event.target.value})}
                                    />
                                  </FormGroup>
                              )
                            }

                          </Form>

                          <div>
                            <Button color="primary"
                                    disabled={submitClicked || isEmpty(status) || isEmpty(feedback)}
                                    onClick={() => this.closeTask()}>Close Task</Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
            )
          }
        </>
    )
  }
}

export default withRouter(TaskStatusUpdate);