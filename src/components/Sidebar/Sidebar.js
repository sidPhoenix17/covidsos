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
import {Link, NavLink as NavLinkRRD} from "react-router-dom";
// nodejs library to set properties for components
import {PropTypes} from "prop-types";
import UserDropDown from "components/DropDown/UserDropDown.js";
// reactstrap components
import {
  Col,
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row
} from "reactstrap";
import {isAuthorisedUserLoggedIn} from "../../utils/utils";

var ps;

class Sidebar extends React.Component {
  state = {
    collapseOpen: false
  };

  constructor(props) {
    super(props);
  }

  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };

  getNavLink(path, icon, name) {
    return (
        <NavItem key={path}>
          <NavLink
              to={path}
              tag={NavLinkRRD}
              onClick={this.closeCollapse}
              activeClassName="active"
          >
            <i className={icon}/>
            {name}
          </NavLink>
        </NavItem>
    )
  };

  render() {
    const {logo} = this.props;
    const loggedIn = isAuthorisedUserLoggedIn();
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
        <Navbar
            className="navbar-vertical fixed-left navbar-light bg-white"
            expand="md"
            id="sidenav-main"
        >
          <Container fluid>
            {/* Toggler */}
            <button
                className="navbar-toggler"
                type="button"
                onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-icon"/>
            </button>
            {/* Brand */}
            {logo ? (
                <NavbarBrand className="pt-0" {...navbarBrandProps}>
                  <img
                      alt={logo.imgAlt}
                      className="navbar-brand-img"
                      src={logo.imgSrc}
                  />
                </NavbarBrand>
            ) : null}
            {/* User */}
            <UserDropDown className="align-items-center d-md-none"/>
            {/* Collapse */}
            <Collapse navbar isOpen={this.state.collapseOpen}>
              {/* Collapse header */}
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  {logo ? (
                      <Col className="collapse-brand" xs="6">
                        {logo.innerLink ? (
                            <Link to={logo.innerLink}>
                              <img alt={logo.imgAlt} src={logo.imgSrc}/>
                            </Link>
                        ) : (
                            <a href={logo.outterLink}>
                              <img alt={logo.imgAlt} src={logo.imgSrc}/>
                            </a>
                        )}
                      </Col>
                  ) : null}
                  <Col className="collapse-close" xs="6">
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={this.toggleCollapse}
                    >
                      <span/>
                      <span/>
                    </button>
                  </Col>
                </Row>
              </div>
              {/* Navigation */}
              <Nav navbar>
                {this.getNavLink('/contact-us', 'fas fa-hands-helping text-green',
                    'Contact Us')}
                {this.getNavLink('/about', 'fas fa-users text-blue', 'About COVID SOS')}
                {this.getNavLink('/useful-links', 'fas fa-link text-red', 'Useful Links')}
                {/*{this.getNavLink('/pending-requests', 'fa fa-medkit', 'Pending Requests')}*/}
                {this.getNavLink('/stories', 'fab fa-instagram', 'Volunteer Stories')}
                {
                  loggedIn ? this.getNavLink('/tables', 'ni ni-bullet-list-67 text-red',
                      'See Tables') : null
                }
              </Nav>
              {/* Divider */}
              <hr className="my-3"/>
              <div className="mb-0 mt-auto">
                <p className="font-italic">Only a life lived for others is a life worthwhile</p>
                <p className="font-italic float-md-right">- Albert Einstein</p>
              </div>
            </Collapse>
          </Container>
        </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
