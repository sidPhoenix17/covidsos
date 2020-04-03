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
import {Card, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, Row} from "reactstrap";
import Header from "../components/Headers/Header.js";
import Map from "../components/Map/Map.js";
import OrganisationRegistration from "../components/Forms/OrganisationRegistration.js";
import SeniorCitizenRegistration from "../components/Forms/SeniorCitizenRegistration.js";
import VolunteerRegistration from "../components/Forms/VolunteerRegistration.js";
import {config} from "../config/config";
import Popup from "reactjs-popup";
// core components

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {activeForm: 0};
  }

  getCard(header, body) {
    return (
        <Card className="shadow">
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                <h2 className="mb-0">{header}</h2>
              </div>
            </Row>
          </CardHeader>
          <CardBody className="pre-scrollable">
            {body}
          </CardBody>
        </Card>
    )
  }

  getPopup() {
    if ((sessionStorage.getItem(config.alreadyAccessedSessionStorageKey) ||
        localStorage.getItem(config.userIdStorageKey)) && this.state.activeForm === 0) {
      return null;
    }
    sessionStorage.setItem(config.alreadyAccessedSessionStorageKey, 'true');
    return (
        <Popup defaultOpen closeOnEscape closeOnDocumentClick position="right center"
               contentStyle={{borderRadius: "0.375rem", minWidth: "50%", width: "unset"}}
               className="col-md-6">
          {close => (
              <>
                <CardHeader className="bg-transparent">
                  <Row className="justify-content-end">
                    <a className="close" href="#index" onClick={close}>
                      &times;
                    </a>
                  </Row>
                  <Row className="align-items-center">
                    <div className="col text-center">
                      <h2 className="mb-0">
                        {this.state.activeForm === 1 ?
                            'Volunteer Form' :
                            this.state.activeForm === 2 ?
                                'Request Form' :
                                'Welcome to COVID SOS'}
                      </h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="pre-scrollable">
                  <Row className="justify-content-center">
                    {this.state.activeForm === 1 ?
                        <VolunteerRegistration/> :
                        this.state.activeForm === 2 ?
                            <SeniorCitizenRegistration/> :
                            <Nav pills horizontal>
                              <NavItem>
                                <NavLink
                                    className="py-2 px-3 text-white bg-primary"
                                    href="#"
                                    onClick={e => {
                                      this.setState({activeForm: 1});
                                      e.preventDefault();
                                    }}
                                >
                                  <span className="d-md-block">I want to help</span>
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                    className="py-2 px-3 text-white bg-primary"
                                    href="#"
                                    onClick={e => {
                                      this.setState({activeForm: 2});
                                      e.preventDefault();
                                    }}
                                >
                                  <span className="d-md-block">I need help</span>
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                    className="py-2 px-3 text-white bg-primary"
                                    href="#"
                                    onClick={close}>
                                  <span className="d-md-block">Just exploring</span>
                                </NavLink>
                              </NavItem>
                            </Nav>
                    }
                  </Row>
                </CardBody>
              </>
          )}
        </Popup>
    );
  }

  render() {
    const loggedIn = localStorage.getItem(config.userIdStorageKey);
    return (
        <>
          {this.getPopup()}
          <Header/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row>
              <Col className="mb-5 mb-xl-0"
                   xl={loggedIn ? 12 : 8}>
                <Map/>
              </Col>
              {
                loggedIn ? null :
                    <Col xl="4">
                      {this.getCard('Request Help', <SeniorCitizenRegistration/>)}
                    </Col>
              }
            </Row>
            {
              loggedIn ? null :
                  <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="8">
                      {this.getCard('Become a Volunteer', <VolunteerRegistration/>)}
                    </Col>
                    <Col xl="4">
                      {this.getCard('Contact the admin', <><p>If you are an organisation and would
                        like to be a part of the efforts in here, please drop your details here. We
                        will
                        get back to you.</p> <OrganisationRegistration/></>)}
                    </Col>
                  </Row>
            }
          </Container>
        </>
    );
  }
}

export default Index;
