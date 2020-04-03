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
// core components

import routes from "routes.js";
import ReactGA from 'react-ga';

class MapViewLayout extends React.Component {
  componentDidMount() {
    ReactGA.initialize('UA-143016880-1');
    ReactGA.pageview(window.location.pathname + window.location.search, ["covid-sos-map"], "covid-sos-map");
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
          <div className="main-content" ref="mainContent">
            <Switch>
              {this.getRoutes(routes)}
            </Switch>
          </div>
        </>
    );
  }
}

export default MapViewLayout;
