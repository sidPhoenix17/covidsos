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
import {Button, CardBody, CardFooter, Form, Row} from "reactstrap";
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
  source: localStorage.getItem(config.sourceKey) ? localStorage.getItem(config.sourceKey)
      : 'covidsos',
  latitude: '',
  longitude: '',
  place_id: '',
  support_type: '',
  checked: ''
};

class VolunteerPopupRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volunteer: defaultData,
      isSubmitClicked: false,
      activeTab: 1,
      totalTabs: 2,
      supportTypeList: [
        {"id": 1, "support_type": "Deliver groceries", "isSelected": false},
        {"id": 2, "support_type": "Deliver medicines", "isSelected": false},
        {"id": 3, "support_type": "Help with cooked food", "isSelected": false},
        {"id": 4, "support_type": "Volunteer with NGOs", "isSelected": false},
        {"id": 5, "support_type": "Operations", "isSelected": false}
      ]
    };
    this.getSupportListData();
  }

  componentDidMount() {
    if (localStorage.getItem(config.sourceKey)) {
      this.setState(
          {volunteer: {...this.state.volunteer, source: localStorage.getItem(config.sourceKey)}});
    }
  }

  getSupportListData() {
    makeApiCall(config.supportTypeList, 'GET', {"type": "volunteer"}, (response) => {
      let supportTypeList = response;
      supportTypeList.map((listItem) => {
        listItem["isSelected"] = false;
      });

      this.setState({supportTypeList: supportTypeList});
    }, false);
  }

  onChecked(event, id) {
    let supportTypeList = this.state.supportTypeList;
    supportTypeList.map((listItem) => {
      if (listItem.id === id) {
        listItem.isSelected = event.target.checked;
      }
    })
    this.setState({supportTypeList: supportTypeList});
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
    const {volunteer, isSubmitClicked, activeTab} = this.state;
    if (isSubmitClicked) {
      return true;
    }
    switch (activeTab) {
      case 1:
        return !volunteer.geoaddress || !volunteer.name
            || !volunteer.mob_number
            || !volunteer.checked;
      case 2:
        return this.state.supportTypeList.filter((item) => item.isSelected).length === 0
    }
  }

  nextTab = (event) => {
    event.preventDefault();
    if (this.isSubmitDisabled()) {
      return;
    }
    const {activeTab} = this.state;
    this.setState({activeTab: activeTab + 1});
  };

  previousTab = (event) => {
    event.preventDefault();
    const {activeTab} = this.state;
    this.setState({activeTab: activeTab - 1});
  };

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

    let selectedSupportTypes = "";
    let supportTypeList = this.state.supportTypeList;

    supportTypeList.forEach((supportTypeItem) => {
      if (supportTypeItem.isSelected) {
        selectedSupportTypes = selectedSupportTypes.concat(supportTypeItem.id, ",");
      }
    });

    selectedSupportTypes = selectedSupportTypes.substr(0, selectedSupportTypes.length - 1);

    data.support_type = selectedSupportTypes;

    makeApiCall(config.volunteerEndpoint, 'POST', data, () => {
      this.setState({activeTab: 0});
    });
  };

  getCheckBox(supportListItem) {
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
  }

  getTab2() {
    const {activeTab} = this.state;
    if (activeTab !== 2) {
      return null;
    }
    return (
        <Form role="form" onSubmit={this.submitData} className="col-5">
          <div className="text-center mb-3">
            What can you help with?
          </div>
          {this.state.supportTypeList.map((item) => this.getCheckBox(item))}
          <div className="text-center">
            <Button className="mt-4 d-md-inline d-none" color="primary" type="button" onClick={this.previousTab}>
              Previous
            </Button>
            <Button className="mt-4" color="primary" type="submit"
                    disabled={this.isSubmitDisabled()}>
              Submit
            </Button>
          </div>
        </Form>
    );
  }

  getTab1() {
    const {volunteer, activeTab} = this.state;
    if (activeTab !== 1) {
      return null;
    }
    return (
        <Form role="form" onSubmit={this.nextTab}>
          <FormGroupTemplate iconClass="ni ni-hat-3" placeholder="Full Name"
                             value={volunteer.name}
                             onChange={e => this.updateData(e, 'name')}/>
          <FormGroupTemplate iconClass="fab fa-whatsapp" placeholder="WhatsApp Contact Number"
                             type="text"
                             value={volunteer.mob_number}
                             onChange={e => this.updateData(e, 'mob_number')}/>
          {/*<FormGroupTemplate iconClass="ni ni-email-83" placeholder="Email" type="email"*/}
          {/*                   value={volunteer.email_id}*/}
          {/*                   onChange={e => this.updateData(e, 'email_id')}/>*/}
          <AutoCompleteAddressFormGroup
              iconClass="fas fa-map-marker"
              placeholder="Area (Mention nearest Maps Landmark - that you specify on apps like Ola, Uber and Swiggy)"
              domID='volunteer-popup-address'
              onSelect={({geoaddress, latitude, longitude, place_id}) => {
                this.setState({
                  volunteer: {
                    ...volunteer,
                    geoaddress,
                    latitude,
                    longitude,
                    place_id
                  }
                })
              }}
          />
          {/*<FormGroupTemplate iconClass="fas fa-address-card"*/}
          {/*                   placeholder="Enter Flat number/house number" type="text"*/}
          {/*                   value={volunteer.address}*/}
          {/*                   onChange={e => this.updateData(e, 'address')}/>*/}
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
              Next
            </Button>
          </div>
        </Form>
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
    const {activeTab, totalTabs} = this.state;
    return (
        <>
          <CardBody className="pre-scrollable">
            <Row className="justify-content-center">
              {this.getTab1()}
              {this.getTab2()}
            </Row>
            {this.getTab0()}
          </CardBody>
          <CardFooter hidden={activeTab === 0} className="text-center">
            {activeTab} of {totalTabs}
          </CardFooter>
        </>
    );
  }
}

export default VolunteerPopupRegistration;