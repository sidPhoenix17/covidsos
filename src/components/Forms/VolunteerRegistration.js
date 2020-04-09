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
import PropTypes from "prop-types";
// nodejs library to set properties for components
// reactstrap components
import {Button, Form} from "reactstrap";
import FormGroupTemplate from "./FormGroupTemplate";
import config from "../../config/config";
import {makeApiCall, sanitizeMobileNumber, validateEmail, validateMobile} from "../../utils/utils";
import AutoCompleteAddressFormGroup from "../AutoComplete/AutoCompleteAddressFormGroup";

const defaultData = {
  name: '',
  mob_number: '',
  email_id: '',
  geoaddress: '',
  address: '',
  source: localStorage.getItem(config.sourceKey) ? localStorage.getItem(config.sourceKey) : 'covidsos',
  latitude: '',
  longitude: '',
  checked: ''
};

const statusOptions = [
  {value: '1', label: 'Active'},
  {value: '0', label: 'Inactive'}
];

class VolunteerRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      volunteer: props.existingData ? { ...props.existingData, checked: true } : defaultData,
      isSubmitClicked: false,
      changedKeys: []
    };
  }

  updateData = (event, field) => {
    const { volunteer, changedKeys } = this.state;
    volunteer[field] = event.target.value;
    if (field === 'checked') {
      volunteer[field] = event.target.checked;
    }
    if (field === 'mob_number' || field === 'email_id') {
      volunteer[field] = event.target.value.trim();
    }
    changedKeys.push(field);
    this.setState({volunteer: volunteer, isSubmitClicked: false, changedKeys: changedKeys});
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
    const {volunteer, changedKeys} = this.state;
    const {existingData} = this.props;
    let data = {};
    let url;
    if (existingData && volunteer.v_id) {
      data.volunteer_id = volunteer.v_id;
      Object.keys(volunteer)
      .filter(key => changedKeys.indexOf(key) !== -1)
      .forEach(key => {
        data[key] = volunteer[key]
      });
      url = config.updateVolunteerEndpoint;
    } else {
      data = volunteer;
      url = config.volunteerEndpoint;
    }
    if (data.email_id && !validateEmail(data.email_id)) {
      return;
    }
    if (data.mob_number) {
      data.mob_number = sanitizeMobileNumber(data.mob_number);
      if (!validateMobile(data.mob_number)) {
        return;
      }
    }
    makeApiCall(url, 'POST', data);
  };

  render() {
    const {volunteer} = this.state;
    return (
        <Form role="form" onSubmit={this.submitData}>
          <FormGroupTemplate iconClass="ni ni-hat-3" placeholder="Full Name"
                             value={volunteer.name}
                             onChange={e => this.updateData(e, 'name')}
                             disabled={volunteer.v_id}/>
          <FormGroupTemplate iconClass="fab fa-whatsapp" placeholder="WhatsApp Contact Number"
                             type="text"
                             value={volunteer.mob_number}
                             onChange={e => this.updateData(e, 'mob_number')}
                             disabled={volunteer.v_id}/>
          <FormGroupTemplate iconClass="ni ni-email-83" placeholder="Email" type="email"
                             value={volunteer.email_id}
                             onChange={e => this.updateData(e, 'email_id')}
                             disabled={volunteer.v_id}/>

          <AutoCompleteAddressFormGroup
            iconClass="fas fa-map-marker"
            placeholder="Area (Mention nearest Maps Landmark - that you specify on apps like Ola, Uber and Swiggy)"
            disabled={volunteer.v_id}
            domID='volunteer-address'
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

          <FormGroupTemplate iconClass="fas fa-address-card" placeholder="Enter Flat number/house number" type="text"
            value={volunteer.address}
            onChange={e => this.updateData(e, 'address')}
            disabled={volunteer.v_id}/>

          {
            volunteer.v_id ?
                <FormGroupTemplate iconClass="fas fa-spinner"
                                   placeholder="Status"
                                   type="select"
                                   optionsArray={statusOptions}
                                   value={volunteer.status}
                                   onChange={e => this.updateData(e, 'status')}/>
                : null
          }

          <div className="custom-control custom-control-alternative custom-checkbox"
               hidden={volunteer.v_id}>
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
    )
        ;
  }
}

VolunteerRegistration.defaultProps = {
  existingData: null
};

VolunteerRegistration.propTypes = {
  existingData: PropTypes.object
};

export default VolunteerRegistration;