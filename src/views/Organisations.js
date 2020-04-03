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
// reactstrap components
import {Card, CardBody, CardFooter, CardHeader, Col, Container, Row} from "reactstrap";
import Header from "../components/Headers/Header.js";
import OrganisationRegistration from "../components/Forms/OrganisationRegistration";

class Organisations extends React.Component {

  renderOrganisation(imgSrc, description, link) {
    return (
        <Row className="justify-content-center mt-5">
          <Col lg="8" md="8">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-3">
                <div className="text-uppercase text-muted text-center mt-2 mb-2">
                  <img alt='logo' src={imgSrc} style={{height: '15rem'}}/>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5 text-justify">
                <div className="text-justify mt-2 mb-2">{description}</div>
              </CardBody>
              <CardFooter className="py-4 text-right">
                <a href={link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Know More</a>
              </CardFooter>
            </Card>
          </Col>
        </Row>
    );
  }

  renderNewOrganisationForm() {
    return (
        <Row className="justify-content-center mt-5">
          <Col lg="8" md="8">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-3">
                <div className="text-uppercase text-muted text-center mt-2 mb-2">
                  Reach out to us
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5 text-justify">
                <OrganisationRegistration/>
              </CardBody>
            </Card>
          </Col>
        </Row>
    );
  }

  render() {
    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className="justify-content-center">
              <Col lg="8" md="8">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-3 py-lg-3 text-justify">
                    <div className="text-uppercase text-center mt-2 mb-2">
                      SUPPORTING ORGANISATIONS
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {this.renderOrganisation(require('assets/img/organisations/gdf-logo.jpg'),
                'During #COVID19 crisis, GDF is helping underprivileged people in Noida get access to basic amenities. GDF\'s vision is to raise awareness about the environment, promote knowledge and education on prime environmental concerns especially waste management, air pollution, water conservation and climate change.',
                'https://www.facebook.com/greendreamfoundation')}
            {this.renderNewOrganisationForm()}
          </Container>
        </>
    );
  }
}

export default Organisations;
