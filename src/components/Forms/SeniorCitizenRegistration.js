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
import {Button} from "reactstrap";
import Form from "reactstrap/lib/Form";
import FormGroupTemplate from "./FormGroupTemplate";
import config from "../../config/config";
import {makeApiCall, sanitizeMobileNumber, validateMobile} from "../../utils/utils";
import PropTypes from "prop-types";
import AutoCompleteAddressFormGroup from "../AutoComplete/AutoCompleteAddressFormGroup";

const defaultData = {
  name: '',
  mob_number: '',
  age: '',
  address: '',
  geoaddress: '',
  source: localStorage.getItem(config.sourceKey) ? localStorage.getItem(config.sourceKey) : 'covidsos',
  request: '',
  latitude: '',
  longitude: '',
  place_id: '',
  checked: ''
};

class SeniorCitizenRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {request: defaultData, isSubmitClicked: false, changedKeys: [], statusOptions: []};
    if (props.existingData) {
      const {existingData} = props;
      existingData.checked = true;
      existingData.status = existingData.status.toLowerCase();
      this.state = {
        request: existingData,
        isSubmitClicked: false,
        changedKeys: [],
        statusOptions: []
      };
    }
    this.getStatusList();
  }

  getStatusList() {
    makeApiCall(config.requestStatusList, 'GET',
        {},
        (response) => {
          const statusOptions = response.map(r => {
            return {value: r.status, label: r.status}
          });
          this.setState({statusOptions: statusOptions});
        },
        false);
  }

  updateData = (event, field) => {
    const {request, changedKeys} = this.state;
    request[field] = event.target.value;
    if (field === 'checked') {
      request[field] = event.target.checked;
    }
    if (field === 'mob_number' || field === 'email_id') {
      request[field] = event.target.value.trim();
    }
    changedKeys.push(field);
    this.setState({request: request, isSubmitClicked: false, changedKeys: changedKeys});
  };

  isSubmitDisabled() {
    const {request, isSubmitClicked} = this.state;
    return isSubmitClicked || !request.name || !request.mob_number
        || !request.geoaddress || !request.address || !request.source || !request.checked;
  }

  submitData = (event) => {
    event.preventDefault();
    if (this.isSubmitDisabled()) {
      return;
    }
    this.setState({isSubmitClicked: true});
    const {request, changedKeys} = this.state;
    const {existingData} = this.props;
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
    if (data.mob_number) {
      data.mob_number = sanitizeMobileNumber(data.mob_number);
      if (!validateMobile(data.mob_number)) {
        return;
      }
    }
    makeApiCall(url, 'POST', data);
  };

  render() {
    const {request, statusOptions} = this.state;
    return (
        <Form role="form" onSubmit={this.submitData}>
          <FormGroupTemplate iconClass="ni ni-hat-3" placeholder="Name"
                             value={request.name}
                             onChange={e => this.updateData(e, 'name')}
                             disabled={request.r_id}/>
          <FormGroupTemplate iconClass="ni ni-mobile-button" placeholder="Mobile Number"
                             type="text"
                             value={request.mob_number}
                             onChange={e => this.updateData(e, 'mob_number')}
                             disabled={request.r_id}/>
          <FormGroupTemplate iconClass="fas fa-user-clock" placeholder="Age" type="text"
                             value={request.age}
                             onChange={e => this.updateData(e, 'age')}
                             disabled={request.r_id}/>

          <AutoCompleteAddressFormGroup
              iconClass="fas fa-map-marker"
              placeholder="Area (Mention nearest Maps Landmark - be as precise as possible)"
              disabled={request.r_id}
              domID='requestee-address'
              onSelect={({geoaddress, latitude, longitude, place_id}) => {
                this.setState({
                  request: {
                    ...request,
                    geoaddress,
                    latitude,
                    longitude,
                    place_id
                  }
                })
              }}
          />

          <FormGroupTemplate iconClass="fas fa-address-card"
                             placeholder="Enter Flat number/house number" type="text"
                             value={request.address}
                             onChange={e => this.updateData(e, 'address')}
                             disabled={request.r_id}/>

          <FormGroupTemplate iconClass="fas fa-comments" placeholder="Any Special Instructions"
                             type="textarea"
                             value={request.request}
                             onChange={e => this.updateData(e, 'request')}/>
          {
            request.r_id ?
                <FormGroupTemplate iconClass="fas fa-spinner"
                                   placeholder="Status"
                                   type="select"
                                   optionsArray={statusOptions}
                                   value={request.status}
                                   onChange={e => this.updateData(e, 'status')}/>
                : null
          }
          <div className="custom-control custom-control-alternative custom-checkbox"
               hidden={request.r_id}>
            <input
                className="custom-control-input"
                id="seniorCitizenCheck"
                type="checkbox"
                checked={request.checked}
                onChange={e => this.updateData(e, 'checked')}/>
            <label className="custom-control-label" htmlFor="seniorCitizenCheck">
              <span className="text-muted">Receive notifications on WhatsApp or SMS from COVIDSOS to connect me with available volunteers.</span>
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

export default SeniorCitizenRegistration;