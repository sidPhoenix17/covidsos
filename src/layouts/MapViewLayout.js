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
import {Switch} from "react-router-dom";
import routes from "routes.js";
import ReactGA from 'react-ga';
import queryString from 'query-string';
import config from "../config/config";
import {getRoutes} from "../utils/utils";
// reactstrap components
// core components

class MapViewLayout extends React.Component {

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
        ["covid-sos-map", localStorage.getItem(config.sourceKey)], "covid-sos-map");
  }

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  render() {
    return (
        <>
          <div className="main-content" ref="mainContent">
            <Switch>
              {getRoutes(routes)}
            </Switch>
          </div>
        </>
    );
  }
}

export default MapViewLayout;
