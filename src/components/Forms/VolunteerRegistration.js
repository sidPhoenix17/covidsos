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
import {Button, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import {geolocated} from "react-geolocated";
import FormGroupTemplate from "./FormGroupTemplate";
import NumberFormat from 'react-number-format';
import {config, organisationOptions} from "../../config/config";
import {makeApiCall} from "../../utils/utils";
import PropTypes from "prop-types";

const defaultData = {
  name: '',
  mob_number: '',
  email_id: '',
  address: '',
  source: '',
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
    this.state = {volunteer: defaultData, isSubmitClicked: false, changedKeys: []};
    if (props.existingData) {
      const {existingData} = props;
      existingData.checked = true;
      this.state = {volunteer: existingData, isSubmitClicked: false, changedKeys: []};
    }
    this.updateData = this.updateData.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  updateData(event, field) {
    const {volunteer, changedKeys} = this.state;
    volunteer[field] = event.target.value;
    if (field === 'checked') {
      volunteer[field] = event.target.checked;
    }
    changedKeys.push(field);
    this.setState({volunteer: volunteer, isSubmitClicked: false, changedKeys: changedKeys});
  }

  isSubmitDisabled() {
    const {volunteer, isSubmitClicked} = this.state;
    return isSubmitClicked || !volunteer.name || !volunteer.mob_number || !volunteer.email_id
        || !volunteer.address || !volunteer.source || !volunteer.checked;
  }

  submitData(event) {
    if (this.isSubmitDisabled()) {
      return;
    }
    this.setState({isSubmitClicked: true});
    const {volunteer, changedKeys} = this.state;
    const {isGeolocationAvailable, isGeolocationEnabled, coords, existingData} = this.props;
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      volunteer.latitude = coords.latitude;
      volunteer.longitude = coords.longitude;
    }
    else {
      volunteer.latitude = 0.0;
      volunteer.longitude = 0.0;
    }
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
    makeApiCall(url, 'POST', data);
    event.preventDefault();
  }

  getLatLong() {
    const {isGeolocationAvailable, isGeolocationEnabled, coords, positionError} = this.props;
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      return (
          <>
            <NumberFormat value={coords.latitude} displayType='text' decimalScale='6'/>{', '}
            <NumberFormat value={coords.longitude} displayType='text' decimalScale='6'/>
          </>
      )
    } else if (positionError) {
      return positionError.message
    } else {
      return 'Unable to get location'
    }
  }

  render() {
    const {volunteer} = this.state;
    return (
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
          <FormGroupTemplate iconClass="fas fa-address-card"
                             placeholder="Location (Mention nearest Maps Landmark - that you specify on apps like Ola, Uber and Swiggy)"
                             value={volunteer.address}
                             onChange={e => this.updateData(e, 'address')}/>
          <FormGroupTemplate iconClass="fas fa-users"
                             placeholder="Which organisation would you like to volunteer for?"
                             type="select"
                             optionsArray={organisationOptions}
                             value={volunteer.source}
                             onChange={e => this.updateData(e, 'source')}/>
          {
            volunteer.v_id ?
                <FormGroupTemplate iconClass="fas fa-users"
                                   placeholder="Status"
                                   type="select"
                                   optionsArray={statusOptions}
                                   value={volunteer.status}
                                   onChange={e => this.updateData(e, 'status')}/>
                :
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-location-arrow"/>
                      </InputGroupText>
                    </InputGroupAddon>
                    {this.getLatLong()}
                  </InputGroup>
                </FormGroup>
          }

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

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  },
  watchPosition: false,
  userDecisionTimeout: 5000,
  suppressLocationOnMount: false,
  geolocationProvider: navigator.geolocation,
  isOptimisticGeolocationEnabled: true
})(VolunteerRegistration);