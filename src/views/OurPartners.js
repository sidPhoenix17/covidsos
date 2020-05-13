/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: http://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (http://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {Card, CardBody, CardFooter, CardHeader, Col, Container, Row,} from "reactstrap";
import Header from "../components/Headers/Header.js";

class About extends React.Component {

  constructor(props) {
    super(props);
    this.state = {aboutHidden: {}, aboutExpanded: {}}
  }

  renderHeadingCard(heading, body) {
    return (
        <Col lg="10" md="10">
          <Card className="shadow border-0">
            <CardBody className="px-lg-5 py-lg-5 text-justify">
              <div className="text-uppercase text-center mt-2 mb-2 h3">
                {heading}
              </div>
              {
                body ?
                    <div className="text-muted text-center mt-2 mb-2">
                      {body}
                    </div>
                    : null
              }
            </CardBody>
          </Card>
        </Col>
    );
  }

  renderOrganisationCard(imgSrc, description, link) {
    return (
        <Col lg="10" md="10">
          <Card className="shadow border-0">
            <CardHeader className="pb-3">
              <div className="text-uppercase text-muted text-center mt-2 mb-2">
                <img alt='logo' src={imgSrc} style={{height: '10rem', maxWidth: '100%'}}/>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5 text-justify">
              <div className="text-justify mt-2 mb-2">{description}</div>
            </CardBody>
            <CardFooter className="py-4 text-right">
              <a href={link} className="btn btn-primary" target="_blank"
                 rel="noopener noreferrer">Know More</a>
            </CardFooter>
          </Card>
        </Col>
    );
  }

  renderPartnersCard(imgSrc, description, link) {
    return (
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
          <Card className="card-profile mt-md-5">
            <CardHeader className="text-center mb-7">
              <Row className="justify-content-center">
                <Col className="m-auto">
                  <div className="card-profile-image">
                    <img alt={'check'} src={imgSrc} style={{background: 'white'}}/>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="text-center">
                <a href={link} className="text-capitalize">{description}</a>
              </div>
            </CardBody>
          </Card>
        </Col>

    );
  }

  sanitizeString(string) {
    return string.substr(0, Math.min(string.length, string.lastIndexOf(" ")))
  }

  ourPartnersDetails = [
    {
      'imageSrc': require("assets/img/organisations/helpage.jpg"),
      'name': 'Helpage India',
      'link': 'http://www.helpageindia.org/',
    },
    {
      'imageSrc': require("assets/img/organisations/gdf-logo.jpg"),
      'name': 'Green Dream Foundation',
      'link': 'http://www.greendream.foundation/',
    },
    {
      'imageSrc': require("assets/img/organisations/sunbird.png"),
      'name': 'Sunbird Trust',
      'link': 'http://www.sunbirdtrust.com/',
    },
    {
      'imageSrc': require("assets/img/organisations/Openfile_ConnectFor_Logo-Main (1).png"),
      'name': 'ConnectFor',
      'link': 'http://www.connectfor.org/',
    },
    {
      'imageSrc': require("assets/img/organisations/MFF logo.png"),
      'name': 'Martha Farrell Foundation',
      'link': 'http://www.marthafarrellfoundation.org/',
    },
    {
      'imageSrc': require("assets/img/organisations/india_cares_logo.jpg"),
      'name': 'India Cares',
      'link': 'http://twitter.com/indiacares_2020',
    },
    {
      'imageSrc': require("assets/img/organisations/handicare_india.jpg"),
      'name': 'Handicare India',
      'link': 'http://www.handicareindia.org/',
    },
    {
      'imageSrc': require("assets/img/organisations/dakshas-logo.png"),
      'name': 'Dakshas',
      'link': 'http://dakshas.org/',
    },
  ];

  render() {
    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className="justify-content-center">
              {this.renderHeadingCard('Our Partners')}
            </Row>
            <Row className="justify-content-center mt-md-0 mt-5">
              {this.ourPartnersDetails.map(partner => {
                return this.renderPartnersCard(partner.imageSrc, partner.name, partner.link)
              })}
            </Row>
          </Container>
        </>
    );
  }
}

export default About;
