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
import {Button, CardBody, CardFooter, Row} from "reactstrap";
import Form from "reactstrap/lib/Form";
import FormGroupTemplate from "./FormGroupTemplate";
import config from "../../config/config";
import {makeApiCall, sanitizeMobileNumber, validateMobile} from "../../utils/utils";
import AutoCompleteAddressFormGroup from "../AutoComplete/AutoCompleteAddressFormGroup";

const defaultData = {
  name: '',
  mob_number: '',
  address: '',
  geoaddress: '',
  source: localStorage.getItem(config.sourceKey) ? localStorage.getItem(config.sourceKey)
      : 'covidsos',
  request: '',
  latitude: '',
  longitude: '',
  place_id: '',
  checked: ''
};

class SeniorCitizenPopupRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: defaultData,
      isSubmitClicked: false,
      activeTab: 1,
      totalTabs: 3,
      supportTypeList: [
        {"id": 6, "support_type": "Need Groceries", "isSelected": false},
        {"id": 7, "support_type": "Need Medicines", "isSelected": false},
        {"id": 8, "support_type": "Need Cooked Food", "isSelected": false},
        {"id": 9, "support_type": "Need Other Help", "isSelected": false}
        ]
    };
    this.getSupportListData();
  }

  componentDidMount() {
    if (localStorage.getItem(config.sourceKey)) {
      this.setState(
          {request: {...this.state.request, source: localStorage.getItem(config.sourceKey)}});
    }
  }

  getSupportListData() {
    makeApiCall(config.supportTypeList, 'GET', {"type": "request"}, (response) => {
      let supportTypeList = response;
      supportTypeList.forEach((listItem) => {
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
    const {request} = this.state;
    request[field] = event.target.value;
    if (['checked'].indexOf(field)
        !== -1) {
      request[field] = event.target.checked;
    }
    if (field === 'mob_number' || field === 'email_id') {
      request[field] = event.target.value.trim();
    }
    this.setState({request: request, isSubmitClicked: false});
  };

  isSubmitDisabled() {
    const {request, isSubmitClicked, activeTab} = this.state;
    if (isSubmitClicked) {
      return true;
    }
    switch (activeTab) {
      case 1:
        return this.state.supportTypeList.filter((item) => item.isSelected).length === 0;
      case 2:
        return !request.geoaddress || !request.address;
      case 3:
        return !request.name || !request.mob_number || !request.checked;
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
    const {request} = this.state;
    let data = request;
    if (data.mob_number) {
      data.mob_number = sanitizeMobileNumber(data.mob_number);
      if (!validateMobile(data.mob_number)) {
        return;
      }
    }
    let supportTypeList = this.state.supportTypeList;

    supportTypeList.forEach((supportTypeItem) => {
      if (supportTypeItem.isSelected) {
        data.request = data.request === '' ? supportTypeItem.support_type : data.request + ' | '
            + supportTypeItem.support_type;
      }
    });

    makeApiCall(config.requestEndpoint, 'POST', data, () => {
      this.setState({activeTab: 0});
    });
  };

  getCheckBox(supportListItem) {
    return (
        <div key={supportListItem.id} className="custom-control custom-control-alternative custom-checkbox">
          <input
              className="custom-control-input"
              id={'senior_' + supportListItem.id}
              type="checkbox"
              checked={supportListItem.isSelected}
              onChange={e => this.onChecked(e, supportListItem.id)}/>
          <label className="custom-control-label" htmlFor={'senior_' + supportListItem.id}>
              <span className="text-muted">
                {supportListItem.support_type}
              </span>
          </label>
        </div>
    );
  }

  getTab1() {
    const {activeTab} = this.state;
    if (activeTab !== 1) {
      return null;
    }
    return (
        <Form role="form" onSubmit={this.nextTab} className="col-5">
          {this.state.supportTypeList.map((item) => this.getCheckBox(item))}
          <div className="text-center">
            <Button className="mt-4" color="primary" type="submit"
                    disabled={this.isSubmitDisabled()}>
              Next
            </Button>
          </div>
        </Form>
    );
  }

  getTab2() {
    const {request, activeTab} = this.state;
    if (activeTab !== 2) {
      return null;
    }
    return (
        <Form role="form" onSubmit={this.nextTab} className="col-10 senior-form">
          <AutoCompleteAddressFormGroup
              iconClass="fas fa-map-marker"
              placeholder="Area / Landmark / Apartment Name"
              domID='request-popup-address'
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
                             onChange={e => this.updateData(e, 'address')}/>

          <div className="text-center">
            <Button className="mt-4" color="primary" type="button" onClick={this.previousTab}>
              Previous
            </Button>
            <Button className="mt-4" color="primary" type="submit"
                    disabled={this.isSubmitDisabled()}>
              Next
            </Button>
          </div>
        </Form>
    );
  }

  getTab3() {
    const {request, activeTab} = this.state;
    if (activeTab !== 3) {
      return null;
    }
    return (
        <Form role="form" onSubmit={this.submitData} className="col-10 senior-form">
          <FormGroupTemplate iconClass="ni ni-hat-3" placeholder="Name"
                             value={request.name}
                             onChange={e => this.updateData(e, 'name')}/>
          <FormGroupTemplate iconClass="ni ni-mobile-button" placeholder="Mobile Number"
                             type="text"
                             value={request.mob_number}
                             onChange={e => this.updateData(e, 'mob_number')}/>

          <div className="custom-control custom-control-alternative custom-checkbox">
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
            <Button className="mt-4" color="primary" type="button" onClick={this.previousTab}>
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
            Thank you for submitting a request. A volunteer will call you shortly.
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
              {this.getTab3()}
            </Row>
            {this.getTab0()}
          </CardBody>
          <CardFooter hidden={activeTab === 0} className="text-center">
            {activeTab} of {totalTabs}
          </CardFooter>
        </>
    )
        ;
  }
}

export default SeniorCitizenPopupRegistration;