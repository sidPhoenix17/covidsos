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

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Nav pills className="bottomright">
          <NavItem className="pl-2 pr-2 mb-0">
            <a
                className="media-icon-link"
                href={"https://www.facebook.com/covidsos.org/"}
                target="_blank" rel="noopener noreferrer">
              <img alt={'Facebook'} src={require("assets/img/icons/facebook.svg")}/>
            </a>
          </NavItem>

          <NavItem className="pl-2 pr-2 mb-0">
            <a
                className="media-icon-link"
                href={"https://twitter.com/covid_sos_org"}
                target="_blank" rel="noopener noreferrer">
              <img alt={'Twitter'} src={require("assets/img/icons/twitter.svg")}/>
            </a>
          </NavItem>

          <NavItem className="pl-2 pr-2 mb-0">
            <a
                className="media-icon-link"
                href={"https://www.instagram.com/covid_sos_org/"}
                target="_blank" rel="noopener noreferrer">
              <img alt={'Instagram'} src={require("assets/img/icons/instagram.svg")}/>
            </a>
          </NavItem>

        </Nav>
      </footer>
    );
  }
}

export default Footer;
