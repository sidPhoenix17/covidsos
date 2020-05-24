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
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import Header from "../../components/Headers/Header.js";

export default class Disclaimer extends React.Component {

  render() {
    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className='justify-content-center'>
              <Col lg="10" md="10">
                <Card className="shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5 text-justify">
                    <div className="text-uppercase text-center mt-2 mb-2 h3">
                      Disclaimer
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className='justify-content-center mt-5'>
              <Col lg="10" md="10">
                <Card className="shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5 text-justify">
                    Our work is on a best effort voluntary basis to try and reach as many people as
                    possible.<br/>
                    <br/>
                    We do not take responsibility for the completion of a help request as it is
                    dependent on the availability of a volunteer in the concerned area.<br/>
                    <br/>
                    In case of an emergency, we recommend getting in touch with the government
                    helpline numbers for any emergency.<br/>
                    <br/>
                    As this is a digital initiative, receiving and completing requests may also be
                    affected by the connectivity and network available in certain areas.<br/>
                    <br/>
                    We are taking the mandated precautions set out by the government and anyone who
                    is showing any positive symptoms is requested not to expose themselves either
                    through the platform or otherwise for any request.<br/>
                    <br/>
                    For any more questions, please <a href="https://tinyurl.com/contactCovidSOS"
                                                      target="_blank" rel="noopener noreferrer">click
                    here</a>.
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
    );
  }
}
