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
import {Button, Form, FormGroup} from "reactstrap";
import FormGroupTemplate from "./FormGroupTemplate";
import config from "../../config/config";
import {makeApiCall, sanitizeMobileNumber, validateEmail, validateMobile} from "../../utils/utils";

const defaultData = {
  user: {
    name: '',
    mob_number: '',
    email_id: '',
    password: '',
    organisation: '',
    creator_access_type: '',
    user_access_type: '',
    user_id: ''
  },
  isSubmitClicked: false
};

class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultData;
  }

  updateData = (event, field) => {
    const {user} = this.state;
    user[field] = event.target.value;
    if (field === 'checked') {
      user[field] = event.target.checked;
    }
    if (field === 'mob_number' || field === 'email_id') {
      user[field] = event.target.value.trim();
    }
    this.setState({user: user, isSubmitClicked: false});
  };

  isSubmitDisabled() {
    const {user, isSubmitClicked} = this.state;
    return isSubmitClicked || !user.name || !user.mob_number || !user.email_id || !user.password
        || !user.organisation || !user.user_access_type;
  }

  submitData = (event) => {
    event.preventDefault();
    if (this.isSubmitDisabled()) {
      return;
    }
    this.setState({isSubmitClicked: true});
    const {user} = this.state;
    if (!validateEmail(user.email_id)) {
      return;
    }
    user.mob_number = sanitizeMobileNumber(user.mob_number);
    if (!validateMobile(user.mob_number)) {
      return;
    }
    user.creator_access_type = localStorage.getItem(config.accessTypeStorageKey);
    user.creator_user_id = localStorage.getItem(config.userIdStorageKey);
    makeApiCall(config.newUserEndpoint, 'POST', user);
  };

  render() {
    const {user} = this.state;
    return (
        <Form role="form" onSubmit={this.submitData}>
          <FormGroupTemplate iconClass="fas fa-user" placeholder="Name"
                             value={user.name}
                             onChange={e => this.updateData(e, 'name')}/>
          <FormGroupTemplate iconClass="ni ni-mobile-button" placeholder="Mobile Number"
                             type="text"
                             value={user.mob_number}
                             onChange={e => this.updateData(e, 'mob_number')}/>
          <FormGroupTemplate iconClass="ni ni-email-83" placeholder="Email" type="email"
                             value={user.email_id}
                             onChange={e => this.updateData(e, 'email_id')}/>
          <FormGroupTemplate iconClass="fas fa-key"
                             placeholder="Password" type="password"
                             value={user.password}
                             onChange={e => this.updateData(e, 'password')}/>
          <FormGroupTemplate iconClass="fas fa-users" placeholder="Organisation Name"
                             value={user.organisation}
                             onChange={e => this.updateData(e, 'organisation')}/>

          <div className="custom-control custom-control-alternative custom-radio d-flex">
            <div className="col-6">
              <input
                  className="custom-control-input"
                  id="viewerAccessType"
                  type="radio"
                  value="viewer"
                  name="user_access_type"
                  onClick={e => this.updateData(e, 'user_access_type')}/>
              <label className="custom-control-label" htmlFor="viewerAccessType">
                <span className="text-muted">Viewer</span>
              </label>
            </div>
            <div className="col-6">
              <input
                  className="custom-control-input"
                  id="moderatorAccessType"
                  type="radio"
                  value="moderator"
                  name="user_access_type"
                  onClick={e => this.updateData(e, 'user_access_type')}/>
              <label className="custom-control-label" htmlFor="moderatorAccessType">
                <span className="text-muted">Moderator</span>
              </label>
            </div>
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

export default NewUserForm;