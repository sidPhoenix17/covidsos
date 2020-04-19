import React from "react";
import { Col, Container, Row, Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import { withRouter } from "react-router";
import { WhatsappIcon, WhatsappShareButton } from 'react-share';

import { makeApiCall } from "utils/utils";
import { isVolunteerLoggedIn } from "../utils/utils";
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
            requestId: '',
            isAvailable: false
        }
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
                    isLoading: false,
                    requestId: data.r_id,
                    financialAssistance: data.financial_assistance
                });
            }
            else {
                this.redirectToLogin();
            }
        })
        .catch(err => {
            if(err && !err.status) {
                this.redirectToLogin();
            }
        });
    }

    getData = () =>  {
        const {match: {params: {uuid}}} = this.props;

        return new Promise((resolve, reject) => {
            makeApiCall(config.requestAcceptance, 'GET', { uuid }, (response) => {
                return resolve(response);
            }, false, (data) => {
                return reject(data);
            });
        })
    }

    redirectToLogin = () => {
        localStorage.setItem(config.redirectToPageKey, this.props.location.pathname);
        this.props.history.push("/login");
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
        if (!isVolunteerLoggedIn()) {
            this.redirectToLogin();
        }
        else {
            const { requestId } = this.state;
            const volunteer_id = localStorage.getItem(config.volunteerIdStorageKey);

            makeApiCall(config.assignRequest, 'POST', { request_id: requestId, volunteer_id }, (response) => {
                console.log(response);
            }, true, () => {
                this.props.history.push("/pending-requests");
            });
        }
    }

    handleBusyResponse = event => {
        event.preventDefault();
        this.props.history.push("/pending-requests");
    }

    toggleRadioButton = () => this.setState(prevState => ({ isAvailable : !prevState.isAvailable}));

    render(){
        const { isLoading, why, what, address, financialAssistance } = this.state;
        const whatsappText = 'Hey I have a question regarding a request';

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
                                <label className="mb-0"  htmlFor="why">Reason </label>
                            </Col>
                            <Col xs="12">
                                <div className="data-item" style={{ padding: '10px'}}> { why } </div>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs="12">
                                <label className="mb-0"  htmlFor="why"> Help Required </label>
                            </Col>
                            <Col xs="12">
                                <div className="data-item" style={{ padding: '10px'}}> { what } </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-primary mt-4">
                                {financialAssistance ? 'Monetary assistance will be required.' : 'Monetary assistance is not required.'}
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
                        <Row className="justify-content-center mt-4" style={{ textAlign: 'center'}}>
                            <Col>
                                <label style={{ marginRight: '10px'}}>Speak to us </label>
                                <WhatsappShareButton
                                    url={`https://wa.me/918618948661?text=${whatsappText}`}
                                >
                                    <WhatsappIcon size={32} round/>
                                </WhatsappShareButton>
                            </Col>
                        </Row>

                        </React.Fragment>
                    )
                }
            </Container>
        )
    }
}

export default withRouter(RequestAcceptance);