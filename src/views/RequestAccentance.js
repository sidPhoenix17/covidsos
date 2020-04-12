import React from "react";
import { Col, Container, Row, Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import {withRouter} from "react-router";
// import {makeApiCall} from "utils/utils";

class RequestAcceptance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            what: '',
            why: '',
            address: '',
            error: false
        }
    }

    getData = () =>  {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve({
                    verified: true,
                    geoaddress: '2345, 32nd Street, MG Colony, Barabank, Madhya Pradesh',
                    what: 'need groecry items like daal, atta and rice',
                    why: 'cannot travel due to health issues',
                    status: true
                    
                }) ;
            }, 3000);
        });  

        // makeApiCall('https://www.mocky.io/v2/5e936dac3000009a5a156a9a', 'GET', (response) => {
        //     this.setState({
        //       requests: (response.pending || [])
        //     })
        //   }, false);
    }

    componentDidMount(){
        const {match: {params: {uuid}}} = this.props;

        console.log(uuid);
        this.getData().then(data => {
            if (data.status) {
                this.setState({
                    address: data.geoaddress,
                    what: data.what,
                    why: data.why,
                    isLoading: false
                });
            }
        })
        .catch(err => {
            if(err) {
                this.setState({ error: 'There was some error. Please try again later!'});
            }
        })
      
    }

    renderErrorMessage = () => {
        const { error } = this.props;

        return (<Row>
            <Col>
                { error }
            </Col>
        </Row>);
    };

    loadingMessage = () => (
        <Row className="justify-content-center mt-4">
            <Col className="col-3">
                <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
            </Col>
        </Row>
    );



    render(){
        const { isLoading, why, what, address, error } = this.state;

        return (
            <Container className="request-accept-container">
                {
                    error 
                    ? this.renderErrorMessage()
                    : <React.Fragment>
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
                    </React.Fragment>
                }
            </Container>
        )
    }
}

export default withRouter(RequestAcceptance);