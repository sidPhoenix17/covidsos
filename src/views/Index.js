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
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row
} from "reactstrap";
import Header from "../components/Headers/Header.js";
import Map from "../components/Map/Map.js";
import OrganisationRegistration from "../components/Forms/OrganisationRegistration.js";
import SeniorCitizenRegistration from "../components/Forms/SeniorCitizenRegistration.js";
import VolunteerRegistration from "../components/Forms/VolunteerRegistration.js";
import config from "../config/config";
import Popup from "reactjs-popup";
import {isLoggedIn} from "../utils/utils";
import SeniorCitizenPopupRegistration from "../components/Forms/SeniorCitizenPopupRegistration";
import VolunteerPopupRegistration from "../components/Forms/VolunteerPopupRegistration";

// core components

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {activeForm: 0};
  }

  getCard(header, body) {
    return (
        <Card className="shadow">
          <CardHeader className="bg-transparent full-height-card">
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
        isLoggedIn()) && this.state.activeForm === 0) {
      return null;
    }
    sessionStorage.setItem(config.alreadyAccessedSessionStorageKey, 'true');
    return (
        <Popup defaultOpen closeOnEscape closeOnDocumentClick position="right center"
               contentStyle={{borderRadius: "0.375rem", minWidth: "50%", width: "unset"}}
               overlayStyle={{background: "rgba(0, 0, 0, 0.85)"}}
               className="col-md-6">
          {close => (
              <>
                <CardHeader className="bg-transparent">
                  <Row className="justify-content-end">
                    <Button onClick={close} className="close btn-icon btn-link border-0 text-dark">
                      <i className="fas fa-times" style={{fontSize: '1rem'}}/>
                    </Button>
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
                  {
                    this.state.activeForm === 0 ?
                        <Row className="justify-content-center text-center mb-4">
                          A non-profit initiative to connect senior citizens and specially abled
                          people with volunteers from the neighbourhood.
                        </Row> : null
                  }
                  <Row className="justify-content-center">
                    {this.state.activeForm === 1 ?
                        <VolunteerPopupRegistration/> :
                        this.state.activeForm === 2 ?
                            <SeniorCitizenPopupRegistration/> :
                            <Nav pills horizontal="center">
                              <NavItem className="pl-2 pr-2">
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
                              <NavItem className="pl-2 pr-2">
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
    const loggedIn = isLoggedIn();
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
