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
import {config} from "config/config";
import {makeApiCall} from "utils/utils";
import {withRouter} from "react-router";

const defaultData = {
  login: {
    username: '', // 9582148040
    password: '' // Qwerty@12345
  },
  isSubmitClicked: false
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultData;
    this.updateData = this.updateData.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  updateData(event, field) {
    const {login} = this.state;
    login[field] = event.target.value;
    if (field === 'checked') {
      login[field] = event.target.checked;
    }
    this.setState({login: login, isSubmitClicked: false});
  }

  isSubmitDisabled() {
    const {login, isSubmitClicked} = this.state;
    return isSubmitClicked || !login.username || !login.password;
  }

  submitData(event) {
    if (this.isSubmitDisabled()) {
      return;
    }
    this.setState({isSubmitClicked: true});
    const {login} = this.state;
    makeApiCall(config.loginEndpoint, 'POST', login, (response) => {
      if (response.access_level) {
        localStorage.setItem(config.accessTypeStorageKey, response.access_level);
        localStorage.setItem(config.userNameStorageKey, response.username);
        localStorage.setItem(config.fullNameStorageKey, response.full_name);
        localStorage.setItem(config.userIdStorageKey, response.user_id);
        this.props.history.push("/");
      }
    });
    event.preventDefault();
  }

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

export default withRouter(LoginForm);