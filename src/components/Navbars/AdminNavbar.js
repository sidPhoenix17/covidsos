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
import React from "react";
// reactstrap components
import {Container, Navbar} from "reactstrap";
import UserDropDown from "components/DropDown/UserDropDown.js";
import ReactGA from "react-ga";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: ''};
    this.updateEmail = this.updateEmail.bind(this);
    this.signup = this.signup.bind(this);
  }

  updateEmail(event) {
    this.setState({email: event.target.value});
  }

  signup(event) {
    ReactGA.initialize('UA-143016880-1', {
      gaOptions: {
        name: 'signup',
        userId: this.state.email
      }
    });
    ReactGA.ga('create', 'UA-143016880-1', 'auto');
    ReactGA.ga('set', 'cd1', this.state.email);
    ReactGA.ga('send', 'pageview', 'signup');
    ReactGA.ga('send', 'event', 'Signup', 'Launch Signup', {
      'dimension1':  this.state.email
    });
    this.setState({email: ''});
    event.preventDefault();
  }

  render() {
    return (
        <>
          <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
            {/*<div className="mb-0 d-none ml-5 d-lg-inline-block" style={{width: '45%'}}>*/}
            {/*  Signup for Launch notification:*/}
            {/*</div>*/}
            {/*<Form inline*/}
            {/*      className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex"*/}
            {/*      onSubmit={this.signup}>*/}
            {/*  <FormGroup className="mb-0">*/}
            {/*    <InputGroup className="input-group-alternative">*/}
            {/*      <InputGroupAddon addonType="prepend">*/}
            {/*        <InputGroupText>*/}
            {/*          <i className="ni ni-email-83"/>*/}
            {/*        </InputGroupText>*/}
            {/*      </InputGroupAddon>*/}
            {/*      <Input placeholder="Email" type="text" value={this.state.email}*/}
            {/*             onChange={this.updateEmail}/>*/}
            {/*    </InputGroup>*/}
            {/*    <ButtonGroup className="ml-3">*/}
            {/*      <Button color="primary" type="submit" onClick={e => this.signup(e)}>*/}
            {/*        Signup*/}
            {/*      </Button>*/}
            {/*    </ButtonGroup>*/}
            {/*  </FormGroup>*/}
            {/*</Form>*/}
            <Container fluid>
              <UserDropDown className="mb-0 d-none d-md-flex ml-auto d-lg-inline-block"
                            dropDownToggleClassName="pr-0"/>
            </Container>
          </Navbar>
        </>
    );
  }
}

export default AdminNavbar;
