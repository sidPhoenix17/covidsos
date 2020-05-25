import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import {withRouter} from "react-router";
import {makeApiCall} from "utils/utils";
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

class GetHelpRegistration extends Component {
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
      supportTypeList: [
        {"id": 6, "support_type": "Need Groceries", "isSelected": false},
        {"id": 7, "support_type": "Need Medicines", "isSelected": false},
        {"id": 8, "support_type": "Need Cooked Food", "isSelected": false},
        {"id": 9, "support_type": "Need Other Help", "isSelected": false}
      ],
      members_impacted: 1,
      isSubmitClicked: false,
      ngo: '',
      onBehalfOfSomeone: '',
      filled_by_name: '',
      filled_by_number: ''
    };
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

    const {why, what, financial_assistance, urgent, members_impacted, geoaddress, place_id, latitude, longitude, source, filled_by_name, filled_by_number, ngo, onBehalfOfSomeone} = this.state;
    const {name, mob_number, request, address} = data;
    const verification_status = 'pending';
    let member_impacted_value = members_impacted === '' ? 0 : members_impacted;

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
      source,
      members_impacted: member_impacted_value,
      ngo,
      onBehalfOfSomeone,
      filled_by_name,
      filled_by_number
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
    const {request, why, what, financial_assistance, members_impacted, sources, filled_by_name, filled_by_number} = this.state;

    return (
        <>
          <Container className="get-help-container" fluid>
            <Row className="mt-2">
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
                          <Input type="radio" name="urgent" checked={this.state.urgent === "yes"}
                                 onChange={event => this.onChange('urgent',
                                     event.target.checked && "yes")}/>{' '}
                          Yes
                        </Label>
                      </FormGroup>
                      <FormGroup check style={{display: 'inline-block', marginLeft: '20px'}}>
                        <Label check>
                          <Input type="radio" name="urgent" checked={this.state.urgent === "no"}
                                 onChange={event => this.onChange('urgent',
                                     event.target.checked && "no")}/>{' '}
                          No
                        </Label>
                      </FormGroup>
                    </div>
                    <div className="mb-4">
                      Are you from NGO ?
                      <FormGroup check style={{display: 'inline-block', marginLeft: '20px'}}>
                        <Label check>
                          <Input type="radio" name="ngo" checked={this.state.ngo === true}
                                 onChange={event => this.onChange('ngo',
                                     event.target.checked && true)}/>{' '}
                          Yes
                        </Label>
                      </FormGroup>
                      <FormGroup check style={{display: 'inline-block', marginLeft: '20px'}}>
                        <Label check>
                          <Input type="radio" name="ngo" checked={this.state.ngo === false}
                                 onChange={event => this.onChange('ngo',
                                     event.target.checked && false)}/>{' '}
                          No
                        </Label>
                      </FormGroup>
                    </div>
                    {
                        this.state.ngo
                        ? (
                            <div>
                                <FormGroup>
                                <Label for="source">Source</Label>
                                <Input type="select" name="select" id="source"
                                        onChange={(event) => this.onChange('source', event.target.value === 'others' ? 'covidsos' : event.target.value,)}>
                                    {
                                    sources.map(source => {
                                        return <option key={source.id}
                                                    id={source.id}>{source.org_code}</option>
                                    })
                                    }
                                </Input>
                                </FormGroup>
                          </div>
                        )
                        : (
                            <div className="mb-4">
                                Are you filling form on behalf of someone else?
                                <FormGroup check style={{display: 'inline-block', marginLeft: '20px'}}>
                                <Label check>
                                    <Input type="radio" name="onBehalfOfSomeone" checked={this.state.onBehalfOfSomeone === true}
                                        onChange={event => this.onChange('onBehalfOfSomeone',
                                            event.target.checked && true)}/>{' '}
                                    Yes
                                </Label>
                                </FormGroup>
                                <FormGroup check style={{display: 'inline-block', marginLeft: '20px'}}>
                                <Label check>
                                    <Input type="radio" name="onBehalfOfSomeone" checked={this.state.onBehalfOfSomeone === false}
                                        onChange={event => this.onChange('onBehalfOfSomeone',
                                            event.target.checked && false)}/>{' '}
                                    No
                                </Label>
                                </FormGroup>
                          </div>
                        )
                    }{
                        this.state.onBehalfOfSomeone
                        && (
                           <React.Fragment>
                               <Label>Enter your details:</Label>
                                <FormGroup>
                                    <Input placeholder="Enter your name"  autoComplete="off" type="text" name="name" value={filled_by_name}
                                        onChange={(event) => this.onChange('filled_by_name', event.target.value)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Input minLength ="10" maxLength="10" placeholder="Enter your number" autoComplete="off" type="tel" name="mobile" value={filled_by_number}
                                        onChange={(event) => this.onChange('filled_by_number', event.target.value)}/>
                                </FormGroup>
                           </React.Fragment>
                        )
                    }
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

export default withRouter(GetHelpRegistration);