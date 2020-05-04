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
import {withRouter} from "react-router";
import Header from "../components/Headers/Header.js";
import {isAuthorisedUserLoggedIn, makeApiCall} from "utils/utils";
import config from 'config/config';
import {sanitizeMobileNumber, validateMobile} from "../utils/utils";
import AutoCompleteAddressFormGroup from "../components/AutoComplete/AutoCompleteAddressFormGroup";
import FormGroupTemplate from "../components/Forms/FormGroupTemplate";

const defaultData = {
  name: '',
  mob_number: '',
  source: localStorage.getItem(config.sourceKey) ? localStorage.getItem(config.sourceKey)
      : 'covidsos',
  request: '',
  latitude: '0.0',
  longitude: '0.0',
  place_id: '',
  checked: '',
  help_groceries: false,
  help_medicine: false,
  help_cook: false,
  help_virtual: false,
  help_volunteer: false,
  help_operation: false,

};

class NGOFormView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      request: defaultData,
      address: '',
      why: '',
      what: '',
      geoaddress: '',
      latitude: '0.0',
      longitude: '0.0',
      place_id: '',
      verification_status: 'pending',
      financial_assistance: 0,
      urgent: 'no',
      source: '',
      sources: [],
      volunteer_count: 1,
      supportTypeList: [
        {"id": 6, "support_type": "Need Groceries", "isSelected": false},
        {"id": 7, "support_type": "Need Medicines", "isSelected": false},
        {"id": 8, "support_type": "Need Cooked Food", "isSelected": false},
        {"id": 9, "support_type": "Need Other Help", "isSelected": false}
      ],
      members_impacted: 1,
      isSubmitClicked: false
    };
    if (!isAuthorisedUserLoggedIn()) {
      localStorage.setItem(config.redirectToPageKey, this.props.location.pathname);
      this.props.history.push("/admin-login");
    }
    this.getSupportListData();
  }

  componentDidMount() {

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

  updateData = (event, field) => {
    const {request} = this.state;
    request[field] = event.target.value;
    if (['checked', 'help_groceries', 'help_medicine', 'help_cook', 'help_virtual',
      'help_operation', 'help_volunteer'].indexOf(field) !== -1) {
      request[field] = event.target.checked;
    }
    if (field === 'mob_number' || field === 'email_id') {
      request[field] = event.target.value.trim();
    }
    console.log(request);
    this.setState({request: request, isSubmitClicked: false});
  };

  getSupportListData() {
    makeApiCall(config.supportTypeList, 'GET', {"type": "request"}, (response) => {
      let supportTypeList = response;
      supportTypeList.forEach((listItem) => {
        listItem["isSelected"] = false;
      });

      this.setState({supportTypeList: supportTypeList, isSubmitClicked: false});
    }, false);
  }

  onChange = (key, value) => {
    this.setState({
      [key]: value, isSubmitClicked: false
    });
  };

  isSubmitDisabled() {
    const {request, geoaddress, isSubmitClicked} = this.state;
    if (isSubmitClicked) {
      return true;
    }
    return this.state.supportTypeList.filter((item) => item.isSelected).length === 0
        || !request.name || !geoaddress || !request.mob_number;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {supportTypeList} = this.state;
    if (this.isSubmitDisabled()) {
      return;
    }
    let data = this.state.request;

    supportTypeList.forEach((supportTypeItem) => {
      if (supportTypeItem.isSelected) {
        data.request = data.request === '' ? supportTypeItem.support_type : data.request + ' | '
            + supportTypeItem.support_type;
      }
    });

    if (data.mob_number) {
      data.mob_number = sanitizeMobileNumber(data.mob_number);
      if (!validateMobile(data.mob_number)) {
        return;
      }
    }

    const {why, what, financial_assistance, urgent, volunteer_count, members_impacted, geoaddress, place_id, latitude, longitude, source} = this.state;
    const {name, mob_number, request, address} = data;
    const verification_status = 'pending';

    makeApiCall(config.ngoFormView, 'POST', {
      name,
      mob_number,
      geoaddress,
      place_id,
      latitude,
      longitude,
      why,
      address,
      request,
      what,
      financial_assistance,
      verification_status,
      urgent,
      volunteer_count,
      members_impacted,
      source
    }, () => {
      this.props.history.push('/pending-requests')
    });
  }

  onChecked(event, id) {
    let supportTypeList = this.state.supportTypeList;
    supportTypeList.forEach((listItem) => {
      if (listItem.id === id) {
        listItem.isSelected = event.target.checked;
      }
    })
    this.setState({supportTypeList: supportTypeList});
  }

  renderSupportList() {
    return (
        this.state.supportTypeList.map((supportListItem) => {
          return (
              <div key={supportListItem.id}
                   className="custom-control custom-control-alternative custom-checkbox">
                <input
                    className="custom-control-input"
                    id={supportListItem.id}
                    type="checkbox"
                    checked={supportListItem.isSelected}
                    onChange={e => this.onChecked(e, supportListItem.id)}/>
                <label className="custom-control-label" htmlFor={supportListItem.id}>
              <span className="text-muted">
                {supportListItem.support_type}
              </span>
                </label>
              </div>
          );
        }));
  }

  render() {

    if (!isAuthorisedUserLoggedIn()) {
      localStorage.setItem(config.redirectToPageKey, this.props.location.pathname);
      this.props.history.push("/admin-login");
      return null;
    }
    const {request, why, what, financial_assistance, volunteer_count, members_impacted, sources} = this.state;

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
                      Add New Request
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container className="request-card-container" fluid>
            <Row className="mt-5">
              <Card className='request-verification-card center-align'>
                <CardBody>

                  <Form className='verify-request-form' onSubmit={this.handleSubmit}>
                    <FormGroupTemplate iconClass="ni ni-hat-3" placeholder="Full Name"
                                       value={request.name}
                                       onChange={e => this.updateData(e, 'name')}/>
                    <FormGroupTemplate iconClass="fab fa-whatsapp" placeholder="Contact Number"
                                       type="number"
                                       value={request.mob_number}
                                       onChange={e => this.updateData(e, 'mob_number')}/>
                    <AutoCompleteAddressFormGroup
                        iconClass="fas fa-map-marker"
                        placeholder="Area / Landmark / Apartment Name"
                        domID='volunteer-popup-address'
                        onSelect={({geoaddress, latitude, longitude, place_id}) => {
                          this.setState({
                            geoaddress,
                            latitude,
                            longitude,
                            place_id
                          })
                        }}
                    />
                    <FormGroupTemplate iconClass="fas fa-address-card"
                                       placeholder="Enter Flat number/house number" type="text"
                                       value={request.address}
                                       onChange={e => this.updateData(e, 'address')}/>
                    <FormGroup>
                      {this.renderSupportList()}
                    </FormGroup>
                    <FormGroup>
                      <Label>Why do they need help?</Label>
                      <Input autoComplete="off" type="textarea" name="address" value={why}
                             onChange={(event) => this.onChange('why', event.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                      <Label>What do they need?</Label>
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
                    <FormGroup>
                      <Label for="exampleEmail">Number of volunteer required</Label>
                      <Input type="number" name="volunteer_count"
                             id="vounteerCount" placeholder="Enter Volunteer Count"
                             value={volunteer_count}
                             onChange={(event) => this.onChange('volunteer_count',
                                 event.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Number of family members</Label>
                      <Input type="number" name="members_impacted"
                             id="member_impacted"
                             placeholder="Enter number of family members"
                             value={members_impacted}
                             onChange={(event) => this.onChange('members_impacted',
                                 event.target.value)}
                      />
                    </FormGroup>
                    <div>
                      <FormGroup>
                        <Label for="source">Source</Label>
                        <Input type="select" name="select" id="source"
                               onChange={(event) => this.onChange('source', event.target.value,)}>
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
                      <Button color="success" type="submit"
                              disabled={this.isSubmitDisabled()}>Submit</Button>
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

export default withRouter(NGOFormView);