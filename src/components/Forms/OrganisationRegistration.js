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
import Form from "reactstrap/lib/Form";
import FormGroupTemplate from "./FormGroupTemplate";
import {config} from "config/config";
import {makeApiCall} from "utils/utils";

const defaultData = {
  organisation: {
    name: '',
    organisation: '',
    mob_number: '',
    email_id: '',
    comments: ''
  },
  isSubmitClicked: false
};
class OrganisationRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultData;
    this.updateData = this.updateData.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  updateData(event, field) {
    const {organisation} = this.state;
    organisation[field] = event.target.value;
    if (field === 'checked') {
      organisation[field] = event.target.checked;
    }
    this.setState({organisation: organisation, isSubmitClicked: false});
  }

  isSubmitDisabled() {
    const {organisation, isSubmitClicked} = this.state;
    return isSubmitClicked || !organisation.name || !organisation.organisation || !organisation.mob_number || !organisation.email_id;
  }

  submitData(event) {
    if (this.isSubmitDisabled()) {
      return;
    }
    this.setState({isSubmitClicked: true});
    const {organisation} = this.state;
    makeApiCall(config.orgEndpoint, 'POST', organisation);
    event.preventDefault();
  }

  render() {
    const {organisation} = this.state;
    return (
        <Form role="form" onSubmit={this.submitData}>
          <FormGroupTemplate iconClass="ni ni-hat-3" placeholder="Name"
                             value={organisation.name}
                             onChange={e => this.updateData(e, 'name')}/>
          <FormGroupTemplate iconClass="fas fa-users" placeholder="Organisation Name"
                             value={organisation.organisation}
                             onChange={e => this.updateData(e, 'organisation')}/>
          <FormGroupTemplate iconClass="ni ni-mobile-button" placeholder="Mobile Number"
                             value={organisation.mob_number}
                             onChange={e => this.updateData(e, 'mob_number')}/>
          <FormGroupTemplate iconClass="ni ni-email-83" placeholder="Email" type="email"
                             value={organisation.email_id}
                             onChange={e => this.updateData(e, 'email_id')}/>
          <FormGroupTemplate iconClass="fas fa-comments" placeholder="Comments" type="textarea"
                             value={organisation.comments}
                             onChange={e => this.updateData(e, 'comments')}/>

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

export default OrganisationRegistration;