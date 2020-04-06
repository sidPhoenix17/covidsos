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
import {Button, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, Row} from "reactstrap";
import Header from "../components/Headers/Header.js";
import Map from "../components/Map/Map.js";
import config from "../config/config";
import Popup from "reactjs-popup";
import {isLoggedIn, renderInfoCard} from "../utils/utils";
import SeniorCitizenPopupRegistration from "../components/Forms/SeniorCitizenPopupRegistration";
import VolunteerPopupRegistration from "../components/Forms/VolunteerPopupRegistration";

const defaultState = {activeForm: 0, isPopupOpen: false};

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  getPopup() {
    if (this.state.activeForm === 3 ||
        ((sessionStorage.getItem(config.alreadyAccessedSessionStorageKey) ||
            isLoggedIn()) && this.state.activeForm === 0)) {
      return null;
    }
    sessionStorage.setItem(config.alreadyAccessedSessionStorageKey, 'true');
    return (
        <Popup defaultOpen open={this.state.isPopupOpen} closeOnEscape closeOnDocumentClick
               position="right center"
               contentStyle={{borderRadius: "0.375rem", minWidth: "50%", width: "unset"}}
               overlayStyle={{background: "rgba(0, 0, 0, 0.85)"}}
               className="col-md-6"
               onClose={() => this.setState(defaultState)}>
          {
            close => (
                <>
                  <CardHeader className="bg-transparent">
                    <Row className="justify-content-end">
                      <Button onClick={close}
                              className="close btn-icon btn-link border-0 text-dark">
                        <i className="fas fa-times" style={{fontSize: '1rem'}}/>
                      </Button>
                    </Row>
                    <Row className="align-items-center">
                      <div className="col text-center">
                        {
                          this.state.activeForm === 1 ?
                              <>
                                Thank you for stepping up in times of need. We need you to answer
                                a few questions for you to start helping people in need.
                              </>
                              :
                              this.state.activeForm === 2 ?
                                  <>
                                    Answer these for us to help you better
                                  </> :
                                  <h2 className="mb-0">
                                    Welcome to COVID SOS
                                  </h2>
                        }
                      </div>
                    </Row>
                  </CardHeader>

                  {
                    this.state.activeForm === 1 ?
                        <VolunteerPopupRegistration/> :
                        this.state.activeForm === 2 ?
                            <SeniorCitizenPopupRegistration/> :
                            <CardBody className="pre-scrollable">
                              {
                                this.state.activeForm === 0 ?
                                    <Row className="justify-content-center text-center mb-4">
                                      Who are you?
                                    </Row> : null
                              }
                              <Row className="justify-content-center">
                                <Nav pills horizontal="center">
                                  <NavItem className="pl-2 pr-2">
                                    <NavLink
                                        className="py-2 px-3 text-white bg-primary popup-button"
                                        href="#"
                                        onClick={e => {
                                          this.setState({activeForm: 1});
                                          e.preventDefault();
                                        }}
                                    >
                                      <object type="image/svg+xml"
                                              data={require(
                                                  "assets/img/icons/volunteer-hands.svg")}>
                                        Volunteer
                                      </object>
                                      Volunteer
                                    </NavLink>
                                  </NavItem>
                                  <NavItem className="pl-2 pr-2">
                                    <NavLink
                                        className="py-2 px-3 text-white bg-primary popup-button"
                                        href="#"
                                        onClick={e => {
                                          this.setState({activeForm: 2});
                                          e.preventDefault();
                                        }}
                                    >
                                      <object type="image/svg+xml"
                                              data={require("assets/img/icons/old.svg")}>
                                        Senior Citizen
                                      </object>
                                      Senior Citizen
                                    </NavLink>
                                  </NavItem>
                                </Nav>
                              </Row>
                            </CardBody>
                  }
                </>
            )}
        </Popup>
    );
  }

  getInformationRows() {
    return (
        <>
          <Row className='justify-content-center mt-xl-5'>
            {renderInfoCard('Who can request on COVID SOS?',
                <>
                  We aim to work with the following individuals:<br/>
                  <ul>
                    <li>Elderly people</li>
                    <li>Expecting mothers / mothers living with infants</li>
                    <li>People with pre-existing medical conditions</li>
                    <li>Specially abled individuals</li>
                  </ul>
                  <br/>
                  <strong>
                    Note: Strict action will be taken against anyone trying to misuse the service
                    and they will be barred from interacting with this support group in the
                    future.
                  </strong>
                </>,
                10)}

          </Row>

          <Row className='justify-content-center mt-xl-5'>

            {renderInfoCard('Is there a delivery fee?',
                <>
                  No, there is no delivery fee or any other value added charges/commission for the
                  service by the volunteer. But you will be required to pay for the costs of goods
                  purchased.
                </>,
                5)}

            {renderInfoCard('Payments',
                <ol>
                  <li>Payment for the groceries/medicines should be made by the senior citizen to
                    the vendor directly through digital modes or to the volunteer.
                  </li>
                  <li>Volunteers are not expected to make any financial contribution. However, it
                    is your call if you want to help someone in need.
                  </li>
                </ol>,
                5)}

          </Row>

          <Row className='justify-content-center mt-xl-5'>

            {renderInfoCard('Hygiene and safety of volunteers',
                <ol>
                  <li>Volunteers must take care of personal hygiene and maintain social distancing
                    at all points.
                  </li>
                  <li>Volunteers are recommended to use masks, hand sanitizers and/or gloves at
                    all times and avoid hand-shakes/physical interactions.
                  </li>
                  <li>In order to minimise external exposure, volunteers are suggested to accept
                    requests if they are within 5-10 minutes of walk able distance from the person
                    requiring assistance.
                  </li>
                </ol>,
                10)}

          </Row>

          <Row className='justify-content-center mt-xl-5'>
            {renderInfoCard('Privacy',
                <>
                  Data collected from volunteers might be exchanged with requestors (and vice
                  versa) for the purpose of helping each other and the moderators helping in the
                  connection might call or email you in this regard. This data will not be shared
                  or used further.
                </>,
                10)}
          </Row>
        </>
    );
  }

  render() {
    const loggedIn = isLoggedIn();
    return (
        <>
          {this.getPopup()}
          <Header showCards={!loggedIn} onOptionSelect={(activeForm) => {
            const newState = {activeForm: activeForm};
            if (this.state.activeForm === activeForm) {
              newState.activeForm = 0;
            }
            if (activeForm === 1 || activeForm === 2) {
              newState.isPopupOpen = true;
            }
            this.setState(newState);
          }}/>
          {/* Page content */}
          <Container className="mt--6 mt-md--7" fluid>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="12"
                   hidden={!loggedIn && this.state.activeForm !== 3}>
                {loggedIn || this.state.activeForm === 3 ? <Map/> : null}
              </Col>
            </Row>
            {
              loggedIn ? null : this.getInformationRows()
            }
          </Container>
        </>
    );
  }
}

export default Index;
