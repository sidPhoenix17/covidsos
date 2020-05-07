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
import {Button, Form} from "reactstrap";
import FormGroupTemplate from "./FormGroupTemplate";
import config from "config/config";
import {makeApiCall} from "utils/utils";
import {withRouter} from "react-router";
import {clearLoginData} from "../../utils/utils";

const defaultData = {
  login: {
    username: '',
    password: ''
  },
  isSubmitClicked: false
};

class AdminLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultData;
  }

  updateData = (event, field) => {
    const {login} = this.state;
    login[field] = event.target.value;
    if (field === 'checked') {
      login[field] = event.target.checked;
    }
    this.setState({login: login, isSubmitClicked: false});
  };

  isSubmitDisabled() {
    const {login, isSubmitClicked} = this.state;
    return isSubmitClicked || !login.username || !login.password;
  }

  submitData = (event) => {
    event.preventDefault();
    if (this.isSubmitDisabled()) {
      return;
    }
    this.setState({isSubmitClicked: true});
    const {login} = this.state;
    makeApiCall(config.adminLoginEndpoint, 'POST', login, (response) => {
      clearLoginData();
      if (response.access_level) {
        localStorage.setItem(config.accessTypeStorageKey, response.access_level);
        localStorage.setItem(config.userNameStorageKey, response.username);
        localStorage.setItem(config.fullNameStorageKey, response.full_name);
        localStorage.setItem(config.userIdStorageKey, response.user_id);
        localStorage.setItem(config.tokenStorageKey, response.auth_token);
        localStorage.setItem(config.sourceKey, response.source);
        const redirectToPage = localStorage.getItem(config.redirectToPageKey);
        if (redirectToPage) {
          localStorage.removeItem(config.redirectToPageKey);
          this.props.history.push(redirectToPage);
        }
        else {
          this.props.history.push("/");
        }
      }
    });
  };

  render() {
    const {login} = this.state;
    return (
        <Form role="form" onSubmit={this.submitData}>
          <FormGroupTemplate iconClass="fas fa-user" placeholder="Username"
                             value={login.username}
                             onChange={e => this.updateData(e, 'username')}/>
          <FormGroupTemplate iconClass="fas fa-key"
                             placeholder="Password" type="password"
                             value={login.password}
                             onChange={e => this.updateData(e, 'password')}/>
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

export default withRouter(AdminLoginForm);