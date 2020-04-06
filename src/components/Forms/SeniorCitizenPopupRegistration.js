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
import AutoCompleteAddress from '../AutoComplete/Adress';
import config from "../../config/config";
import {makeApiCall, sanitizeMobileNumber, validateMobile} from "../../utils/utils";

const defaultData = {
  name: '',
  mob_number: '',
  address: '',
  geoaddress: '',
  source: 'covidsos',
  request: '',
  latitude: '',
  longitude: '',
  checked: '',
  help_groceries: '',
  help_medicine: '',
  help_virtual: '',
};

class SeniorCitizenPopupRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {request: defaultData, isSubmitClicked: false, activeTab: 1, totalTabs: 3};
  }

  updateData = (event, field) => {
    const {request} = this.state;
    request[field] = event.target.value;
    if (['checked', 'help_groceries', 'help_medicine', 'help_virtual'].indexOf(field) !== -1) {
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
        return !(request.help_groceries || request.help_medicine || request.help_virtual);
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
    if (data.help_groceries) {
      data.request = 'Deliver Groceries';
    }
    if (data.help_medicine) {
      data.request = (data.request ? data.request + ' | ' : '') + 'Deliver Medicines';
    }
    if (data.help_virtual) {
      data.request = (data.request ? data.request + ' | ' : '') + 'Virtual Help';
    }
    makeApiCall(config.requestEndpoint, 'POST', data, () => {
      this.setState({activeTab: 0});
    });
  };

  getTab1() {
    const {request, activeTab} = this.state;
    if (activeTab !== 1) {
      return null;
    }
    return (
        <Form role="form" onSubmit={this.nextTab} className="col-4 senior-form">
          <div className="custom-control custom-control-alternative custom-checkbox">
            <input
                className="custom-control-input"
                id="seniorCitizenDeliverGroceries"
                type="checkbox"
                checked={request.help_groceries}
                onChange={e => this.updateData(e, 'help_groceries')}/>
            <label className="custom-control-label" htmlFor="seniorCitizenDeliverGroceries">
              <span className="text-muted">
                Deliver Groceries
                <i className="fas fa-shopping-basket"/>
              </span>
            </label>
          </div>
          <div className="custom-control custom-control-alternative custom-checkbox">
            <input
                className="custom-control-input"
                id="seniorCitizenDeliverMedicines"
                type="checkbox"
                checked={request.help_medicine}
                onChange={e => this.updateData(e, 'help_medicine')}/>
            <label className="custom-control-label" htmlFor="seniorCitizenDeliverMedicines">
              <span className="text-muted">
                Deliver Medicines
                <i className="fas fa-briefcase-medical"/>
              </span>
            </label>
          </div>
          <div className="custom-control custom-control-alternative custom-checkbox">
            <input
                className="custom-control-input"
                id="seniorCitizenVirtualHelp"
                type="checkbox"
                checked={request.help_virtual}
                onChange={e => this.updateData(e, 'help_virtual')}/>
            <label className="custom-control-label" htmlFor="seniorCitizenVirtualHelp">
              <span className="text-muted">
                Virtual Help
                <i className="far fa-question-circle"/>
              </span>
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

  getTab2() {
    const {request, activeTab} = this.state;
    if (activeTab !== 2) {
      return null;
    }
    return (
        <Form role="form" onSubmit={this.nextTab} className="col-10 senior-form">
          <AutoCompleteAddress
              iconClass="fas fa-map-marker"
              placeholder="Area / Landmark / Apartment Name"
              domID='request-popup-address'
              onSelect={({geoaddress, latitude, longitude}) => {
                this.setState({
                  request: {
                    ...request,
                    geoaddress,
                    latitude,
                    longitude
                  }
                })
              }}
          />

          <FormGroupTemplate iconClass="fas fa-address-card"
                             placeholder="Enter Flat number/house number" type="text"
                             value={request.address}
                             onChange={e => this.updateData(e, 'address')}/>

          <div className="text-center">
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
          <Row className="justify-content-center">
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