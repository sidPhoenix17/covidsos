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
import {Route, Switch} from "react-router-dom";
// reactstrap components
import {Container, Nav, NavItem} from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import ReactGA from 'react-ga';
import {NotificationContainer} from "react-notifications";
import queryString from 'query-string';
import config from "../config/config";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {queryParams: queryString.parse(this.props.location.search)};
    if (this.state.queryParams.source) {
      localStorage.setItem(config.sourceKey, this.state.queryParams.source.toString());
    } else {
      localStorage.removeItem(config.sourceKey);
    }
  }

  componentDidMount() {
    ReactGA.initialize('UA-163898139-1');
    ReactGA.pageview(window.location.pathname + window.location.search,
        ["covid-sos-v1", localStorage.getItem(config.sourceKey)], "covid-sos-v1");
  }

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {

      return (
          <Route
              path={prop.path}
              component={prop.component}
              key={key}
          />
      );
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
          this.props.location.pathname.indexOf(routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  render() {
    return (
        <>
          <Sidebar
              {...this.props}
              routes={routes}
              logo={{
                innerLink: "/",
                imgSrc: require("assets/img/brand/logo-new.jpeg"),
                imgAlt: "..."
              }}
          />
          <div className="main-content" ref="mainContent">
            <AdminNavbar
                {...this.props}
                brandText={this.getBrandText(this.props.location.pathname)}
            />
            <Switch>
              {this.getRoutes(routes)}
            </Switch>
            <Container fluid>
              <AdminFooter/>
            </Container>
            <NotificationContainer/>
          </div>

          <Nav pills className="bottomright">
            <NavItem className="pl-2 pr-2">
              <a
                  className="media-icon-link"
                  href={"https://www.facebook.com/covidsos.org/"}
                  target="_blank" rel="noopener noreferrer">
                <img alt={'Facebook'} src={require("assets/img/icons/facebook.svg")}/>
              </a>
            </NavItem>

            <NavItem className="pl-2 pr-2">
              <a
                  className="media-icon-link"
                  href={"https://twitter.com/covid_sos_org"}
                  target="_blank" rel="noopener noreferrer">
                <img alt={'Twitter'} src={require("assets/img/icons/twitter.svg")}/>
              </a>
            </NavItem>

            <NavItem className="pl-2 pr-2">
              <a
                  className="media-icon-link"
                  href={"https://twitter.com/covid_sos_org"}
                  target="_blank" rel="noopener noreferrer">
                <img alt={'Instagram'} src={require("assets/img/icons/instagram.png")}/>
              </a>
            </NavItem>

          </Nav>

        </>
    );
  }
}

export default Admin;
