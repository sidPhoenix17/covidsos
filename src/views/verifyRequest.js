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
import {
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share';
import {withRouter} from "react-router";
import Header from "../components/Headers/Header.js";
import {makeApiCall} from "utils/utils";
import config from 'config/config';

class VerifyRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      request: {
      },
      why: '',
      what: '',
      verification_status: ''
    }
  }

  onChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  componentDidMount() {
    const { match: { params: { uuid } } } = this.props;

    const dumResponse = {
      'Response':{
        'r_id':4,
        'name':'Rajendar Gupta',
        'mob_number': 9582148040,
        'geoaddress' : 'Cubbon Road, Bangalore',
        'latitude':12.999,
        'longitude':78.444,
        'request':'deliver groceries',
        'status':'received',
        'timestamp': 'Sun, 05 Apr 20, 11:03AM '
      },
      'status': true,
      'string_response':'Request data extracted'
      }

    this.setState({
      request: dumResponse["Response"] || {}
    })

    makeApiCall(config.getVerifyRequest, 'GET', { uuid }, (response) => {
      // TODO
      // Set Response
      // this.setState({
      //   request: response['Response']
      // })
    },
     false);
  }


  handleSubmit = (status) => {

    const { why, what } = this.state;

    this.setState({
      verification_status: status
    }, () => {
      makeApiCall(config.verifyRequest, 'POST', { why, what, verification_status: status }, (response) => {
        console.log(response)
      },
       false);
    })
  }

  render() {
    const { request, why, what, verification_status } = this.state;
    const {r_id, name, mob_number, geoaddress, latitude, longitude, status, timestamp } = request;
    const { match: { params: { uuid } } } = this.props;

    if(!r_id) return null;
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
                <Card className='request-verification-card center-align' key={r_id}>
                    <CardBody>
                        <div className='request-head'>
                            <div className='text-align-left center-align padding-right-30'>
                                <p className='no-margin'>Name</p>
                                <h3>{name}</h3>
                            </div>
                            <div className='text-align-right center-align'>
                                 <p className='no-margin'>Request Time</p>
                                <h5>{timestamp}</h5>
                            </div>
                        </div>

                        <div className='request-address'>
                            <p className='no-margin'>Address</p>
                            <h5>{geoaddress}</h5>
                        </div>
                        <div className='request-info'>
                            <div className='margin-bottom-20'>
                                <h4 className='no-margin'>{mob_number}</h4>
                            </div>

                            <div className='text-center request-clip margin-bottom-20' onClick={() => {
                                navigator.clipboard.writeText(`${mob_number}`)
                                alert('Number copied!')
                              }
                            }>
                               <i class="far fa-copy" aria-hidden="true"></i>
                               <p className='no-margin'>Copy</p>
                           </div>
                            <div className='text-center'>
                                <a href={`https://wa.me/91${mob_number}`}><WhatsappIcon size={32} /></a>
                                <p className='no-margin'>WhatsApp</p>
                            </div>
                        </div>
                        <Form className='verify-request-form'>
                            <FormGroup>
                                <Label>Why do they need help?</Label>
                                <Input autocomplete="off"  type="textarea" name="address" value={why} onChange={(event) => this.onChange('why', event.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label>What does Om Prakash need?</Label>
                                <Input autocomplete="off" type="textarea" name="address2" value={what} onChange={(event) => this.onChange('what', event.target.value)} />
                            </FormGroup>
                            <div className='text-center'>
                                <Button
                                  outline={!(verification_status == 'rejected')}
                                  disabled={verification_status.length > 0}
                                  color="danger"
                                  onClick={() => this.handleSubmit('rejected')}
                                >Deny Help</Button>
                                <Button
                                  disabled={verification_status.length > 0}
                                  outline={!(verification_status == 'verified')}
                                  color="success"
                                  onClick={() => this.handleSubmit('verified')}
                                >Verify</Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Row>
          </Container>
        </>

    )
  }
}

export default withRouter(VerifyRequest);