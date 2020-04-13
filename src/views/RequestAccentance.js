import React from "react";
import { Col, Container, Row, Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import { withRouter } from "react-router";

import { makeApiCall } from "utils/utils";
import config from "config/config";

class RequestAcceptance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            what: '',
            why: '',
            address: '',
            verification_status: '',
            isAvailable: false
        }
    }

    getData = () =>  {
        const {match: {params: {uuid}}} = this.props;

      return new Promise((resolve, reject) => {
        makeApiCall(config.requestAcceptance, 'POST', { uuid }, (response) => {
            return resolve(response);
          }, false, () => {
              reject('error');
          });
      })
    }

    redirectToLogin = () => {
        this.setState({ isLoading: false });
        this.props.history.push("/login");
    }

    componentDidMount(){
        this.getData().then(data => {
            if (data && data.length) {
                data = data[0];
                this.setState({
                    address: data.request_address,
                    verification_status: data.verification_status,
                    what: data.what || 'Help with chores',
                    why: data.why || 'Elderly citizen without any supporting family member',
                    isLoading: false
                });
            }
            else {
                this.redirectToLogin();
            }
        })
        .catch(err => {
            if(err) {
                this.redirectToLogin();
            }
        })
      
    }

    loadingMessage = () => (
        <Row className="justify-content-center mt-4">
            <Col className="col-3">
                <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
            </Col>
        </Row>
    );

    acceptRequest = event => {
        event.preventDefault();
        //call accept request API
        this.props.history.replace("/stories");
    }

    handleBusyResponse = event => {
        event.preventDefault();
        // call busy API request
    }

    toggleRadioButton = () => this.setState(prevState => ({ isAvailable : !prevState.isAvailable}));

    render(){
        const { isLoading, why, what, address } = this.state;

        return (
            <Container className="request-accept-container">
                {
                    isLoading
                    ? this.loadingMessage()
                    : (
                        <React.Fragment>
                        <Row>
                            <Col className="image-col">
                                <div className="text-uppercase text-muted mt-2 mb-2">
                                    <img alt='logo' src={require("assets/img/icons/requestAccept.png")} />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="font-weight-bold" style={{fontSize: "1.3rem"}}>
                                Someone nearby needs help!
                            </Col>
                        </Row>

                        <Container>
                            <Row>
                                <Col>
                                    <i className="fas fa-check-circle text-green " style={{fontSize: "1.3rem", paddingRight: "10px"}}/>
                                    <span>This is a verified request</span>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col xs="12">
                                    <label className="mb-0" htmlFor="address">Address </label>
                                </Col>
                                <Col xs="12">
                                    <div> { address } </div>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col xs="12">
                                    <label className="mb-0"  htmlFor="why">Why do they need help? </label>
                                </Col>
                                <Col xs="12">
                                    <div className="data-item" style={{ padding: '10px'}}> { why } </div>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col xs="12">
                                    <label className="mb-0"  htmlFor="why"> { `What does ${this.props.user} need?`}</label>
                                </Col>
                                <Col xs="12">
                                    <div className="data-item" style={{ padding: '10px'}}> { what } </div>
                                </Col>
                            </Row>
                            <Row className="justify-content-center mt-4">   
                                <Form role="form" onSubmit={ this.acceptRequest }>
                                    <FormGroup>
                                        <Label check>
                                        <Input type="radio" name="radio1"  checked={this.state.isAvailable === true} onChange={() => this.toggleRadioButton()}/>{' '}
                                        I will try my best to help this person
                                        </Label>
                                        
                                    </FormGroup>
                                    <Row>
                                        <Col className="col-6">
                                            <Button onClick={ this.handleBusyResponse }>I'm Busy</Button>
                                        </Col>
                                        <Col className="col-6">
                                            <Button color="primary" type="submit" disabled={!this.state.isAvailable}>Accept</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Row>
                            
                        </Container>
                        </React.Fragment>
                    )
                } 
            </Container>
        )
    }
}

export default withRouter(RequestAcceptance);