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
import {Link, Redirect} from "react-router-dom";
// nodejs library to set properties for components
// reactstrap components
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  UncontrolledDropdown
} from "reactstrap";
import PropTypes from "prop-types";
import {config} from "../../config/config";
import {withRouter} from "react-router";

class UserDropDown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {className, dropDownToggleClassName} = this.props;
    const username = localStorage.getItem(config.fullNameStorageKey) || 'User';
    const loggedIn = localStorage.getItem(config.accessTypeStorageKey);
    return (
        <Nav className={className} navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle className={dropDownToggleClassName} nav>
              <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <i className="fas fa-user"/>
                    </span>
                <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {username}
                      </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              {loggedIn ?
                  (<DropdownItem href="#" onClick={e => {
                    localStorage.clear();
                    e.preventDefault();
                    this.props.history.push("/");
                  }}>
                    <i className="ni ni-user-run"/>
                    <span>Logout</span>
                  </DropdownItem>)
                  :
                  (<DropdownItem to="/login" tag={Link}>
                    <i className="ni ni-key-25"/>
                    <span>Login</span>
                  </DropdownItem>)}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
    )
        ;
  }
}

UserDropDown.defaultProps = {
  dropDownToggleClassName: ""
};

UserDropDown.propTypes = {
  className: PropTypes.string,
  dropDownToggleClassName: PropTypes.string
};

export default withRouter(UserDropDown);