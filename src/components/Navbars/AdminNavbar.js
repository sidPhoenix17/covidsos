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

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: ''};
  }

  render() {
    return (
        <>
          <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
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
