import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import {WhatsappIcon} from 'react-share';
import {withRouter} from "react-router";
import Header from "../components/Headers/Header.js";
import {isAuthorisedUserLoggedIn, makeApiCall} from "utils/utils";
import config from 'config/config';

class VerifyRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      request: {},
      why: '',
      what: '',
      verification_status: '',
      financial_assistance: 0,
      urgent: "",
      sources: [],
      volunteer_count: 1
    }
    if (!isAuthorisedUserLoggedIn()) {
      localStorage.setItem(config.redirectToPageKey, this.props.location.pathname);
      this.props.history.push("/admin-login");
    }
  }

  onChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  componentDidMount() {
    const {match: {params: {uuid}}} = this.props;

    makeApiCall(config.getVerifyRequest, 'POST', {uuid}, (response) => {
          if (response) {
            this.setState({
              request: response[0] || {}
            });
          }
        },
        false,
        (data) => {
          if (data.string_response === "Invalid token. Please log in again.") {
            localStorage.setItem(config.redirectToPageKey, this.props.location.pathname);
            this.props.history.push('/admin-login');
          }
        });

    makeApiCall(config.sourceList, 'GET', {}, (response) => {
      if (response && response.length) {
        this.setState({
          sources: response || []
        });
      }
    }, false, () => {
      this.setState({sources: [{"id": 1, "org_code": "covidsos"}]});
    });
  }

  handleSubmit = (status) => {

    const {why, what, request, financial_assistance, urgent, volunteer_count, source} = this.state;
    const {r_id, mob_number, geoaddress} = request;
    const {match: {params: {uuid}}} = this.props;

    this.setState({
      verification_status: status
    }, () => {
      makeApiCall(config.verifyRequest, 'POST', {
        why,
        what,
        uuid,
        r_id,
        mob_number,
        geoaddress,
        financial_assistance,
        verification_status: status,
        urgent,
        volunteer_count,
        source
      }, (response) => {
        this.props.history.push('/pending-requests')
      });
    })
  }

  toggleRadioButton = event => {
    // console.log(event);
    // this.setState(prevState => ({ isAvailable : !prevState.isAvailable}));
  }

  render() {
    if (!isAuthorisedUserLoggedIn()) {
      localStorage.setItem(config.redirectToPageKey, this.props.location.pathname);
      this.props.history.push("/admin-login");
      return null;
    }
    const {request, why, what, verification_status, financial_assistance, sources, volunteer_count} = this.state;
    const {r_id, name, mob_number, geoaddress, timestamp} = request;

    if (!r_id) {
      return null;
    }
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
                    <div className='margin-bottom-20 v-center-align'>
                      <h4>{mob_number}</h4>
                    </div>

                    <div className='text-center request-clip margin-bottom-20 v-center-align'
                         onClick={() => {
                           navigator.clipboard.writeText(`${mob_number}`)
                           alert('Number copied!')
                         }
                         }>
                      <div className='v-center-align'>
                        <i className="far fa-copy" aria-hidden="true"></i>
                        <p>Copy</p>
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='v-center-align'>
                        <a href={`https://wa.me/91${mob_number}`}><WhatsappIcon size={32}/></a>
                        <p>WhatsApp</p>
                      </div>
                    </div>
                  </div>
                  <Form className='verify-request-form'>
                    <FormGroup>
                      <Label>Why do they need help?</Label>
                      <Input autoComplete="off" type="textarea" name="address" value={why}
                             onChange={(event) => this.onChange('why', event.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                      <Label>What does {name} need?</Label>
                      <Input autoComplete="off" type="textarea" name="address2" value={what}
                             onChange={(event) => this.onChange('what', event.target.value)}/>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox mb-4">
                      <input
                          className="custom-control-input"
                          id="financialAssistanceCheck"
                          type="checkbox"
                          checked={financial_assistance}
                          onChange={event => this.onChange('financial_assistance',
                              event.target.checked ? 1 : 0)}/>
                      <label className="custom-control-label" htmlFor="financialAssistanceCheck">
                        <span className="text-muted">This person needs financial assistance</span>
                      </label>
                    </div>
                    <div className="mb-4">
                      Urgent ?
                      <FormGroup check style={{display: 'inline-block', marginLeft: '20px'}}>
                        <Label check>
                          <Input type="radio" name="radio1" checked={this.state.urgent === "yes"}
                                 onChange={event => this.onChange('urgent',
                                     event.target.checked && "yes")}/>{' '}
                          Yes
                        </Label>
                      </FormGroup>
                      <FormGroup check style={{display: 'inline-block', marginLeft: '20px'}}>
                        <Label check>
                          <Input type="radio" name="radio1" checked={this.state.urgent === "no"}
                                 onChange={event => this.onChange('urgent',
                                     event.target.checked && "no")}/>{' '}
                          No
                        </Label>
                      </FormGroup>
                    </div>
                    <div>
                      <FormGroup>
                        <Label for="exampleEmail">Vounteer Count</Label>
                        <Input type="text" name="volunteer_count"
                               id="vounteerCount" placeholder="enter volunteer count"
                               value={volunteer_count}
                               onChange={(event) => this.onChange('volunteer_count',
                                   event.target.value)}
                        />
                      </FormGroup>
                    </div>
                    <div>
                      <FormGroup>
                        <Label for="source">Select</Label>
                        <Input type="select" name="select" id="source"
                               onChange={(event) => this.onChange('source', event.target.value)}>
                          {
                            sources.map(source => {
                              return <option key={source.id}
                                             id={source.id}>{source.org_code}</option>
                            })
                          }
                        </Input>
                      </FormGroup>
                    </div>
                    <div className='text-center'>
                      <Button
                          outline={!(verification_status === 'rejected')}
                          disabled={verification_status.length > 0}
                          color="danger"
                          onClick={() => this.handleSubmit('rejected')}
                      >Deny Help</Button>
                      <Button
                          disabled={verification_status.length > 0}
                          outline={!(verification_status === 'verified')}
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