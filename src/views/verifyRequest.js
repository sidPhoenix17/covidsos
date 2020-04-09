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
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import Header from "../components/Headers/Header.js";
import {makeApiCall} from "utils/utils";
import config from 'config/config';

export default class VerifyRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      request: {

      }
    }
  }

  componentDidMount() {
    makeApiCall(config.pendingRequests, 'GET', {}, (response) => {
      this.setState({
        request: (response.pending[0] || {})
      })
    }, false);

  }

  render() {
    const {request} = this.state;
    const {id, heading, description, location, timestamp } = request;
    if(!id) return null;
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
                      Verify Request
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container className="request-card-container" fluid>
            <Row className="mt-5">
                <Card className='request-verification-card center-align' key={id}>
                    <CardBody>
                        <div className='request-head'>
                            <div className='text-align-left'>
                                <p className='no-margin'>Name</p>
                                <h3>Om Prakash</h3>
                            </div>
                            <div className='text-align-right'>
                                 <p className='no-margin'>Request Time</p>
                                <h5>12:06 - 01/02/2020</h5>
                            </div>
                        </div>

                        <div className='request-address'>
                            <p className='no-margin'>Address</p>
                            <h5>2345, 32nd Street, MG Colony, BaraBank, Madya Pradesh</h5>
                        </div>
                        <div className='request-info'>
                            <div>
                                <h4 className='no-margin'>923 689 7294</h4>
                            </div>
                            <div>
                                <p className='no-margin'>Copy</p>
                            </div>
                            <div>
                                <p className='no-margin'>WhatsApp</p>
                            </div>
                        </div>
                        <Form className='verify-request-form'>
                            <FormGroup>
                                <Label for="exampleAddress">Why do they need help?</Label>
                                <Input autocomplete="off"  type="text" name="address" id="exampleAddress" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleAddress2">What does Om Prakash need?</Label>
                                <Input autocomplete="off" type="text" name="address2" id="exampleAddress2" />
                            </FormGroup>
                            <div className='text-center'>
                                <Button outline color="primary">Deny Help</Button>
                                <Button color="primary">Verify</Button>
                            </div>
                        </Form>
                    </CardBody>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </Row>
          </Container>
        </>

    )
  }
}