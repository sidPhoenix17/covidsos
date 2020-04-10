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
                  No, the volunteers are doing it out of goodwill. But you can do the following if
                  you want to appreciate them:
                  <ol>
                    <li>Do <strong>NOT</strong> misuse the help</li>
                    <li>You appreciate them in person</li>
                    <li>You appreciate them on facebook/instagram/social media</li>
                    <li>Make sure to pay for the products you purchase. If your volunteer had to
                      spend significant amount to help you, offer to pay a little extra.
                    </li>
                  </ol>
                </>,
                10)}

          </Row>

          <Row className='justify-content-center mt-xl-5'>
            {renderInfoCard('What will the volunteers be expected to do?',
                <ol>
                  <li>Every time we receive a request, our team will VERIFY if it is valid
                    requirement. If you are within walking distance from the requesting person, we
                    will ask you for help.
                  </li>
                  <li>You have to do very simple tasks like helping them with purchasing groceries,
                    medicines or food. If any other special requirement is there, it will be
                    mentioned.
                  </li>
                  <li>Please discuss about payment clearly with senior citizen. The payment should
                    be made directly by the person who has requested it or someone else on their
                    behalf. COVIDSOS is a non-profit initiative and cannot take any liability for
                    the expenses.
                  </li>
                  <li>If, for any reason you are not comfortable completing the request, please feel
                    free to tell us that you cannot do it and we WILL find an alternate solution
                  </li>
                </ol>,
                10)}

          </Row>

          <Row className='justify-content-center mt-xl-5'>

            {renderInfoCard('Hygiene and safety of all volunteers',
                <ol>
                  <li>DO NOT volunteer if you believe you have been in contact with a positive
                    patient
                  </li>
                  <li>Ensure that if you are stepping out, wear gloves and a mask if possible</li>
                  <li>When you are delivering the essentials to the requester, please ensure that
                    the transfer is contactless (leaving it at the doorstep or another place that is
                    commonly decided). The idea is to enhance social distancing by not allowing any
                    interaction between the parties.
                  </li>
                  <li>If you are receiving cash from the requester, please ensure that it has been
                    sanitized before taking the money into your residence
                  </li>
                  <li>Once you have returned back to your residence, ensure that you wash your hands
                    with soap
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
