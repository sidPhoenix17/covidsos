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
  Media,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row
} from "reactstrap";
import {getRouteForKey, isAuthorisedUserLoggedIn} from "../../utils/utils";

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

  getCustomNavLink(key, name, path, iconClass) {
    return (
        <NavItem key={key}>
          <NavLink
              to={path}
              tag={NavLinkRRD}
              onClick={this.closeCollapse}
              activeClassName="active"
          >
            <i className={iconClass}/>
            {name}
          </NavLink>
        </NavItem>
    )
  };

  getNavLink(key, iconColor) {
    const routeForKey = getRouteForKey(key);
    if (!routeForKey) {
      return null;
    }
    return this.getCustomNavLink(key, routeForKey.name, routeForKey.path,
        routeForKey.icon + ' ' + iconColor);
  };

  render() {
    const {logo} = this.props;
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
    const isAuthorisedUser = isAuthorisedUserLoggedIn();
    return (
        <Navbar
            className="navbar-vertical fixed-left navbar-light bg-custom-navbar"
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
              <span className="fas fa-bars text-white"/>
            </button>
            {/* Brand */}
            {logo ? (
                <NavbarBrand className="pt-0 ml-3" {...navbarBrandProps}>
                  <img
                      alt={logo.imgAlt}
                      className="navbar-brand-img"
                      src={logo.imgSrc}
                  />
                </NavbarBrand>
            ) : null}

            <Row> {/*  className="d-inline-flex" */}
              <Col className="mr-3">
                <Nav className="align-items-center d-md-none" navbar>
                  <Media className="align-items-center">
                    {/*<NavItem className="no-list-style mr--5">*/}
                    <NavLink href="/how-it-works" title="How it works?" className="px-0">
                  <span className="avatar avatar-sm bg-red">
                  <i className="fas fa-info text-white text-lg rounded-circle"/>
                  </span>
                    </NavLink>
                  </Media>{/* User */}
                </Nav>
              </Col>
              <Col>
                <UserDropDown className="align-items-center d-md-none"/>
              </Col>
            </Row>

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
                {this.getNavLink('tables', 'text-indigo')}
                {isAuthorisedUser && this.getCustomNavLink('newRequests', 'New Requests',
                    '/requests/new', 'fas fa-clipboard text-orange')}
                {this.getNavLink('pendingRequests', 'text-yellow')}
                {isAuthorisedUser && this.getCustomNavLink('inProgressRequests', 'In Progress Requests',
                    '/requests/in-progress', 'fas fa-clipboard-list')}
                {this.getCustomNavLink('completedRequests', 'Completed Requests',
                    '/requests/completed', 'fas fa-clipboard-check text-green')}
                {this.getNavLink('viewOnMap', 'text-red')}
                {this.getNavLink('about', 'text-blue')}
                {this.getNavLink('ourPartners', 'text-green')}
                {this.getNavLink('usefulLinks', 'text-teal')}
                {this.getNavLink('contactUs', 'text-green')}
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
