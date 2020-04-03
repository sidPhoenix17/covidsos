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
import {Button, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import {geolocated} from "react-geolocated";
import Form from "reactstrap/lib/Form";
import FormGroupTemplate from "./FormGroupTemplate";
import NumberFormat from 'react-number-format';
import {config, organisationOptions} from "../../config/config";
import {makeApiCall} from "../../utils/utils";
import PropTypes from "prop-types";

const defaultData = {
  name: '',
  mob_number: '',
  age: '',
  address: '',
  source: '',
  request: '',
  latitude: '',
  longitude: '',
  checked: ''
};

const statusOptions = [
  {value: 'pending', label: 'Pending'},
  {value: 'matched', label: 'Matched'},
  {value: 'cancelled', label: 'Cancelled'}
];

class SeniorCitizenRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {request: defaultData, isSubmitClicked: false, changedKeys: []};
    if (props.existingData) {
      const {existingData} = props;
      existingData.checked = true;
      existingData.status = existingData.status.toLowerCase();
      this.state = {request: existingData, isSubmitClicked: false, changedKeys: []};
    }
    this.updateData = this.updateData.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  updateData(event, field) {
    const {request, changedKeys} = this.state;
    request[field] = event.target.value;
    if (field === 'checked') {
      request[field] = event.target.checked;
    }
    changedKeys.push(field);
    this.setState({request: request, isSubmitClicked: false, changedKeys: changedKeys});
  }

  isSubmitDisabled() {
    const {request, isSubmitClicked} = this.state;
    return isSubmitClicked || !request.name || !request.mob_number || !request.age
        || !request.address || !request.source || !request.checked;
  }

  submitData(event) {
    if (this.isSubmitDisabled()) {
      return;
    }
    this.setState({isSubmitClicked: true});
    const {request, changedKeys} = this.state;
    const {isGeolocationAvailable, isGeolocationEnabled, coords, existingData} = this.props;
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      request.latitude = coords.latitude;
      request.longitude = coords.longitude;
    }
    else {
      request.latitude = 0.0;
      request.longitude = 0.0;
    }
    let data = {};
    let url;
    if (existingData && request.r_id) {
      data.request_id = request.r_id;
      Object.keys(request)
      .filter(key => changedKeys.indexOf(key) !== -1)
      .forEach(key => {
        data[key] = request[key]
      });
      url = config.updateRequestEndpoint;
    } else {
      data = request;
      url = config.requestEndpoint;
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
    const {request} = this.state;
    return (
        <Form role="form" onSubmit={this.submitData}>
          <FormGroupTemplate iconClass="ni ni-hat-3" placeholder="Name"
                             value={request.name}
                             onChange={e => this.updateData(e, 'name')}/>
          <FormGroupTemplate iconClass="ni ni-mobile-button" placeholder="Mobile Number"
                             type="text"
                             value={request.mob_number}
                             onChange={e => this.updateData(e, 'mob_number')}/>
          <FormGroupTemplate iconClass="fas fa-user-clock" placeholder="Age" type="text"
                             value={request.age}
                             onChange={e => this.updateData(e, 'age')}/>
          <FormGroupTemplate iconClass="fas fa-address-card"
                             placeholder="Location (be as precise as possible)"
                             value={request.address}
                             onChange={e => this.updateData(e, 'address')}/>
          <FormGroupTemplate iconClass="fas fa-users"
                             placeholder="Where would you like to place your request?"
                             type="select"
                             optionsArray={organisationOptions}
                             value={request.source}
                             onChange={e => this.updateData(e, 'source')}/>
          <FormGroupTemplate iconClass="fas fa-comments" placeholder="Any Special Instructions"
                             type="textarea"
                             value={request.request}
                             onChange={e => this.updateData(e, 'request')}/>
          {
            request.r_id ?
                <FormGroupTemplate iconClass="fas fa-users"
                                   placeholder="Status"
                                   type="select"
                                   optionsArray={statusOptions}
                                   value={request.status}
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
                id="seniorCitizenCheck"
                type="checkbox"
                checked={request.checked}
                onChange={e => this.updateData(e, 'checked')}/>
            <label className="custom-control-label" htmlFor="seniorCitizenCheck">
              <span className="text-muted">I understand my details can be used to connect me with available volunteers.</span>
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

SeniorCitizenRegistration.defaultProps = {
  existingData: null
};

SeniorCitizenRegistration.propTypes = {
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
})(SeniorCitizenRegistration);