/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
// reactstrap components
import {Button, CardBody, Form, Row} from "reactstrap";
import FormGroupTemplate from "./FormGroupTemplate";
import AutoCompleteAddressFormGroup from '../AutoComplete/AutoCompleteAddressFormGroup';
import config from "../../config/config";
import {makeApiCall, sanitizeMobileNumber, validateEmail, validateMobile} from "../../utils/utils";

const defaultData = {
  name: '',
  mob_number: '',
  email_id: '',
  geoaddress: '',
  address: '',
  source: localStorage.getItem(config.sourceKey) ? localStorage.getItem(config.sourceKey) : 'covidsos',
  latitude: '',
  longitude: '',
  support_type: '',
  checked: ''
};

class VolunteerPopupRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {volunteer: defaultData, isSubmitClicked: false, activeTab: 1};
  }

  componentDidMount() {
    if (localStorage.getItem(config.sourceKey)) {
      this.setState(
          {volunteer: {...this.state.volunteer, source: localStorage.getItem(config.sourceKey)}});
    }
  }

  updateData = (event, field) => {
    const {volunteer} = this.state;
    volunteer[field] = event.target.value;
    if (field === 'checked') {
      volunteer[field] = event.target.checked;
    }
    if (field === 'mob_number' || field === 'email_id') {
      volunteer[field] = event.target.value.trim();
    }
    this.setState({volunteer: volunteer, isSubmitClicked: false});
  };

  isSubmitDisabled() {
    const {volunteer, isSubmitClicked} = this.state;
    return isSubmitClicked || !volunteer.name || !volunteer.mob_number || !volunteer.email_id
        || !volunteer.geoaddress || !volunteer.address || !volunteer.source || !volunteer.checked;
  }

  submitData = (event) => {
    event.preventDefault();
    if (this.isSubmitDisabled()) {
      return;
    }
    this.setState({isSubmitClicked: true});
    const {volunteer} = this.state;
    let data = volunteer;
    if (data.email_id && !validateEmail(data.email_id)) {
      return;
    }
    if (data.mob_number) {
      data.mob_number = sanitizeMobileNumber(data.mob_number);
      if (!validateMobile(data.mob_number)) {
        return;
      }
    }
    makeApiCall(config.volunteerEndpoint, 'POST', data, () => {
      this.setState({activeTab: 0});
    });
  };

  getFormRow() {
    const {volunteer, activeTab} = this.state;
    if (activeTab !== 1) {
      return null;
    }
    return (
        <Row className="justify-content-center">
          <Form role="form" onSubmit={this.submitData}>
            <FormGroupTemplate iconClass="ni ni-hat-3" placeholder="Full Name"
                               value={volunteer.name}
                               onChange={e => this.updateData(e, 'name')}/>
            <FormGroupTemplate iconClass="fab fa-whatsapp" placeholder="WhatsApp Contact Number"
                               type="text"
                               value={volunteer.mob_number}
                               onChange={e => this.updateData(e, 'mob_number')}/>
            <FormGroupTemplate iconClass="ni ni-email-83" placeholder="Email" type="email"
                               value={volunteer.email_id}
                               onChange={e => this.updateData(e, 'email_id')}/>

            <AutoCompleteAddressFormGroup
                iconClass="fas fa-map-marker"
                placeholder="Area (Mention nearest Maps Landmark - that you specify on apps like Ola, Uber and Swiggy)"
                domID='volunteer-popup-address'
                onSelect={({geoaddress, latitude, longitude}) => {
                  this.setState({
                    volunteer: {
                      ...volunteer,
                      geoaddress,
                      latitude,
                      longitude
                    }
                  })
                }}
            />

            <FormGroupTemplate iconClass="fas fa-address-card"
                               placeholder="Enter Flat number/house number" type="text"
                               value={volunteer.address}
                               onChange={e => this.updateData(e, 'address')}/>

            <div className="custom-control custom-control-alternative custom-checkbox">
              <input
                  className="custom-control-input"
                  id="volunteerCheck"
                  type="checkbox"
                  checked={volunteer.checked}
                  onChange={e => this.updateData(e, 'checked')}/>
              <label className="custom-control-label" htmlFor="volunteerCheck">
                <span className="text-muted">I understand my details can be used to connect me with distressed people who need help.</span>
              </label>
            </div>
            <div className="text-center">
              <Button className="mt-4" color="primary" type="submit"
                      disabled={this.isSubmitDisabled()}>
                Submit
              </Button>
            </div>
          </Form>
        </Row>
    );
  }

  getTab0() {
    const {activeTab} = this.state;
    if (activeTab !== 0) {
      return null;
    }
    return (
        <>
          <Row className="justify-content-center mb-4">
            <i className="fas fa-check-circle text-green" style={{fontSize: "3rem"}}/>
          </Row>
          <Row className="justify-content-center text-center">
            We thank you for your support. We will reach out to you for requests in your
            neighborhood.
          </Row>
        </>
    );
  }

  render() {
    return (
        <CardBody className="pre-scrollable">
          {this.getFormRow()}
          {this.getTab0()}
        </CardBody>
    )
        ;
  }
}

export default VolunteerPopupRegistration;