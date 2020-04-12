import React from "react";
import { Col, Container, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";
import {withRouter} from "react-router";
// import {makeApiCall} from "utils/utils";

class RequestAcceptance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            what: 'need groecry items like daal, atta and rice',
            why: 'cannot travel due to health issues',
            address: '2345, 32nd Street, MG Colony, Barabank, Madhya Pradesh',
            error: ''
        }
    }

    componentDidMount(){
        const {match: {params: {uuid}}} = this.props;

        console.log(uuid);
        // makeApiCall('', 'POST', { uuid }, (response) => {
        //     this.setState({
        //       requests: (response.pending || [])
        //     })
        //   }, false);
    }



    render(){
        const { isLoading, why, what, address } = this.state;

        return (
            <Container className="request-accept-container">
                {
                    isLoading
                    ?  (
                        <Row>
                             <Col>
                                <img alt="V" src={require("assets/img/icons/volunteer-hands.svg")}
                                style={{height: '1.8rem'}}/>
                             </Col>
                        </Row>
                    )
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
                                    <label className="mb-0" for="address">Address </label>
                                </Col>
                                <Col xs="12">
                                    <div> { address } </div>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col xs="12">
                                    <label className="mb-0"  for="why">Why do they need help? </label>
                                </Col>
                                <Col xs="12">
                                    <div className="data-item" style={{ padding: '10px'}}> { why } </div>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col xs="12">
                                    <label className="mb-0"  for="why"> { `What does ${this.props.user} need?`}</label>
                                </Col>
                                <Col xs="12">
                                    <div className="data-item" style={{ padding: '10px'}}> { what } </div>
                                </Col>
                            </Row>
                            <Row className="justify-content-center mt-4">   
                                <Form role="form">
                                    <FormGroup>
                                        <Label check>
                                        <Input type="radio" name="radio1" />{' '}
                                        I will try my best to help this person
                                        </Label>
                                        
                                    </FormGroup>
                                    <Row>
                                        <Col className="col-6">
                                            <Button>I'm Busy</Button>
                                        </Col>
                                        <Col className="col-6">
                                            <Button color="primary">Accept</Button>
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