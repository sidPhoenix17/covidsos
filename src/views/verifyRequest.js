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
      request: {
        why: '',
        what: '',
        financial_assistance: 0,
        urgent: "",
        volunteer_count: 1,
        members_impacted: 1
      },
      verification_status: '',
      sources: []
    }
    if (!isAuthorisedUserLoggedIn()) {
      localStorage.setItem(config.redirectToPageKey, this.props.location.pathname);
      this.props.history.push("/admin-login");
    }
  }

  onChange = (key, value) => {
    const {request} = this.state;
    request[key] = value;
    this.setState({request});
  }

  componentDidMount() {
    const {match: {params: {uuid}}} = this.props;

    makeApiCall(config.getVerifyRequest, 'POST', {uuid}, (response) => {
          if (response) {
            this.setState({
              request: response || {}
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

    const {request} = this.state;
    const {why, what, financial_assistance, urgent, r_id, volunteers_reqd, members_impacted, source, mob_number, geoaddress} = request;
    const {match: {params: {uuid}}} = this.props;
    let member_impacted_value = members_impacted == '' ? 0 : members_impacted;

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
        volunteer_count: volunteers_reqd,
        source,
        members_impacted: member_impacted_value
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
    const {request, verification_status, sources} = this.state;
    const {why, what, financial_assistance, urgent, r_id, volunteers_reqd, members_impacted, source, mob_number, geoaddress, name, timestamp} = request;

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
                    <div className='v-center-align'>
                      <h2><a href={'tel:' + mob_number}>{mob_number}</a></h2>
                    </div>
                    <div className='text-center'>
                      <div className='v-center-align'>
                        <a href={`https://wa.me/91${mob_number}`}>
                          <WhatsappIcon size={32}/>
                        </a>
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
                          <Input type="radio" name="radio1" checked={urgent === "yes"}
                                 onChange={event => this.onChange('urgent',
                                     event.target.checked && "yes")}/>{' '}
                          Yes
                        </Label>
                      </FormGroup>
                      <FormGroup check style={{display: 'inline-block', marginLeft: '20px'}}>
                        <Label check>
                          <Input type="radio" name="radio1" checked={urgent === "no"}
                                 onChange={event => this.onChange('urgent',
                                     event.target.checked && "no")}/>{' '}
                          No
                        </Label>
                      </FormGroup>
                    </div>
                    <FormGroup>
                      <Label for="exampleEmail">Vounteer Count</Label>
                      <Input type="text" name="volunteer_count"
                             id="vounteerCount" placeholder="enter volunteer count"
                             value={volunteers_reqd}
                             onChange={(event) => this.onChange('volunteers_reqd',
                                 event.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Number of People who need help</Label>
                      <Input type="number" name="members_impacted"
                             id="member_impacted"
                             placeholder="Enter number of people who need help count"
                             value={members_impacted}
                             onChange={(event) => this.onChange('members_impacted',
                                 event.target.value)}
                      />
                    </FormGroup>
                    <div>
                      <FormGroup>
                        <Label for="source">Select</Label>
                        <Input type="select" name="select" id="source"
                               onChange={(event) => this.onChange('source', event.target.value)}>
                          {
                            sources.map(sourceOpt => {
                              return <option key={sourceOpt.org_code}
                                             id={sourceOpt.id} selected={sourceOpt.org_code === source}>{sourceOpt.org_code}</option>
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