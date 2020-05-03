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
import Map from "../components/Map/Map.js";
import {Col, Container, Row} from "reactstrap";
import Header from "../components/Headers/Header.js";

// core components

class ViewDataOnMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
		<>
			<Header showCards={false}/>
			{/* Page content */}
			<Container className="mt--6 mt-md--7" fluid>
				<Row>
					<Col className="mb-5 mb-xl-0" xl="12" >
						<Map/>
					</Col>
				</Row>
			</Container>
		</>
    );
  }
}

export default ViewDataOnMap;
