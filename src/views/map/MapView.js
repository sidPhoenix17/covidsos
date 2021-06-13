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
// node.js library that concatenates classes (strings)
// reactstrap components
import Map from "../../components/Map/Map.js";

// core components

class MapView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {activeForm: 0};
  }

  render() {
    return (
        <Map {...this.props} mapOnly/>
    );
  }
}

export default MapView;
