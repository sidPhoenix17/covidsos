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
import {Col, Container, Nav, NavItem, NavLink, Row} from "reactstrap";
import Header from "../components/Headers/Header.js";
import Map from "../components/Map/Map.js";
import config from "../config/config";
import {getFormPopup, isLoggedIn, renderInfoCard, renderListItem} from "../utils/utils";
import queryString from "query-string";

const defaultState = {activeForm: 0, isPopupOpen: false};

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = defaultState;
    const queryParams = queryString.parse(this.props.location.search);
    if (queryParams.register) {
      switch (queryParams.register.toLowerCase()) {
        case 'volunteer':
          this.state = {...defaultState, activeForm: 1}
          break;
        case 'request':
          this.state = {...defaultState, activeForm: 2}
          break;
        default:
          this.state = defaultState;
      }
    }
  }

  getPopup() {
    if (this.state.activeForm === 3 ||
        ((sessionStorage.getItem(config.alreadyAccessedSessionStorageKey) ||
            isLoggedIn()) && this.state.activeForm === 0)) {
      return null;
    }
    sessionStorage.setItem(config.alreadyAccessedSessionStorageKey, 'true');
    return getFormPopup(
        true,
        this.state.isPopupOpen,
        this.state.activeForm,
        () => this.setState(defaultState),
        (activeForm) => {
          this.setState({activeForm});
        })
  }

  getInformationRows() {
    return (
        <>
          <Row className='justify-content-center mt-xl-5'>
            {renderInfoCard('Who can request aid with COVID SOS?',
                <>
                  <Row className="pb-3 justify-content-center">
                    <Col xl="3">
                      <Row className="justify-content-center">
                        <Col xl="2" lg="1" xs="2" className="text-center">
                          <img className="list-item-image" alt="old_man_skin_type_6"
                               src={require("assets/img/icons/old_man_skin_type_6.png")}/>
                        </Col>
                        <Col xl="7" xs="5" md="4" className="text-center">Elderly Person</Col>
                      </Row>
                    </Col>
                    <Col xl="1"/>
                    <Col xl="3" className="mt-3 mt-xl-0">
                      <Row className="justify-content-center">
                        <Col xl="2" lg="1" xs="2" className="text-center">
                          <img className="list-item-image" alt="pregnant"
                               src={require("assets/img/icons/pregnant.png")}/>
                        </Col>
                        <Col xl="9" xs="5" md="4" className="text-center">Expecting Mothers</Col>
                      </Row>
                    </Col>
                    <Col xl="1"/>
                    <Col xl="3" className="mt-3 mt-xl-0">
                      <Row className="justify-content-center">
                        <Col xl="2" lg="1" xs="2" className="text-center">
                          <img className="list-item-image" alt="baby"
                               src={require("assets/img/icons/baby.png")}/>
                        </Col>
                        <Col xl="9" xs="5" md="4" className="text-center">Mothers w/ Infant</Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="my-xl-4 pb-3 justify-content-center">
                    <Col xl="3">
                      <Row className="justify-content-center">
                        <Col xl="2" lg="1" xs="2" className="text-center">
                          <img className="list-item-image" alt="caduceus"
                               src={require("assets/img/icons/caduceus.png")}/>
                        </Col>
                        <Col xl="8" xs="5" md="4" className="text-center">Medical Conditions</Col>
                      </Row>
                    </Col>
                    <Col xl="1"/>
                    <Col xl="3" className="mt-3 mt-xl-0">
                      <Row className="justify-content-center">
                        <Col xl="2" lg="1" xs="2" className="text-center">
                          <img className="list-item-image" alt="wheelchair"
                               src={require("assets/img/icons/wheelchair.png")}/>
                        </Col>
                        <Col xl="9" xs="5" md="4" className="text-center">Specially Abled
                          Individuals</Col>
                      </Row>
                    </Col>
                  </Row>
                  <br/>
                  <div className="h4 font-weight-bold text-center">
                    Note: Strict action will be taken against anyone trying to misuse the service
                    and they will be barred from interacting with this support group in the
                    future.
                  </div>
                  <Nav pills horizontal="center" className="mt-4">
                    <NavItem className="pl-2 pr-2">
                      <NavLink
                          className="py-2 px-3 text-white bg-primary popup-button"
                          href="#"
                          onClick={e => {
                            this.setState({activeForm: 2, isPopupOpen: true});
                            e.preventDefault();
                          }}
                      >
                        Request Aid
                      </NavLink>
                    </NavItem>
                  </Nav>
                </>,
                10)}

          </Row>

          <Row className='justify-content-center mt-xl-5'>

            {renderInfoCard('Payment and Delivery',
                <>
                  <div className="col-10 justify-content-center m-auto font-italic text-center">
                    Please note there is <strong>no delivery fee</strong> that must be paid to
                    volunteers. The only payment that should be made is the <strong>requesting
                    party paying for any products</strong>.
                    <br/><br/>
                    If you wish to appreciate a volunteer for their services, you can do the
                    following:
                  </div>
                  <br/><br/>
                  <Row className="pb-3 justify-content-center">
                    <Col xl="3">
                      <Row className="justify-content-center">
                        <Col xl="3" lg="1" xs="2" className="text-center">
                          <img className="list-item-image" alt="clone"
                               src={require("assets/img/icons/clone.png")}/>
                        </Col>
                        <Col xl="9" xs="5" md="4" className="text-center">Appreciate them in
                          Person</Col>
                      </Row>
                    </Col>
                    <Col xl="1"/>
                    <Col xl="3" className="mt-3 mt-xl-0">
                      <Row className="justify-content-center">
                        <Col xl="2" lg="1" xs="2" className="text-center">
                          <img className="list-item-image" alt="facebook"
                               src={require("assets/img/icons/facebook.png")}/>
                        </Col>
                        <Col xl="10" xs="5" md="4" className="text-center">Appreciate on Social
                          Media</Col>
                      </Row>
                    </Col>
                    <Col xl="1"/>
                    <Col xl="3" className="mt-3 mt-xl-0">
                      <Row className="justify-content-center">
                        <Col xl="2" lg="1" xs="2" className="text-center">
                          <img className="list-item-image" alt="cash_in_hand"
                               src={require("assets/img/icons/cash_in_hand.png")}/>
                        </Col>
                        <Col xl="10" xs="5" md="4" className="text-center">Offer an Extra
                          Payment</Col>
                      </Row>
                    </Col>
                  </Row>
                </>,
                10)}

          </Row>

          <Row className='justify-content-center mt-xl-5'>
            {renderInfoCard('What will the volunteers be expected to do?',
                <>
                  <Row className="pb-3">
                    <Col xl="1"/>
                    <Col xl="2">
                      <Row className="justify-content-center">
                        <Col xl="12" lg="1" xs="2" className="text-center">
                          <img className="list-item-image" alt="shopping_cart_loaded"
                               src={require("assets/img/icons/shopping_cart_loaded.png")}/>
                        </Col>
                        <Col xl="12" xs="5" md="4" className="text-center">Deliver Groceries</Col>
                      </Row>
                    </Col>
                    <Col xl="2"/>
                    <Col xl="2" className="mt-3 mt-xl-0">
                      <Row className="justify-content-center">
                        <Col xl="12" lg="1" xs="2" className="text-center">
                          <img className="list-item-image" alt="doctors_bag"
                               src={require("assets/img/icons/doctors_bag.png")}/>
                        </Col>
                        <Col xl="12" xs="5" md="4" className="text-center">Deliver Medicine</Col>
                      </Row>
                    </Col>
                    <Col xl="2"/>
                    <Col xl="2" className="mt-3 mt-xl-0">
                      <Row className="justify-content-center">
                        <Col xl="12" lg="1" xs="2" className="text-center">
                          <img className="list-item-image" alt="toothbrush"
                               src={require("assets/img/icons/toothbrush.png")}/>
                        </Col>
                        <Col xl="12" xs="5" md="4" className="text-center">Deliver Amenities</Col>
                      </Row>
                    </Col>
                  </Row>
                  <h3 className="text-center my-3">
                    Please keep the following in mind when volunteering:
                  </h3>
                  {renderListItem(
                      require("assets/img/icons/double_tick.png"),
                      'double_tick',
                      <>Our team will verify all incoming requests. If a volunteer is within walking
                        distance of a requesting person, they will be asked to help.</>)}
                  {renderListItem(
                      require("assets/img/icons/money_bag.png"),
                      'money_bag',
                      <>Payment for products should be made by the requesting person. COVID SOS is a
                        non profit and cannot take any liability for these expenses.</>)}
                  {renderListItem(
                      require("assets/img/icons/cancel_2.png"),
                      'cancel_2',
                      <>If a volunteer is uncomfortable completing any request, they should reach
                        out to COVID SOS and we will find an alternative solution.</>)}
                  <Nav pills horizontal="center" className="mt-4">
                    <NavItem className="pl-2 pr-2">
                      <NavLink
                          className="py-2 px-3 text-white bg-primary popup-button"
                          href="#"
                          onClick={e => {
                            this.setState({activeForm: 1, isPopupOpen: true});
                            e.preventDefault();
                          }}
                      >
                        Volunteer
                      </NavLink>
                    </NavItem>
                  </Nav>
                </>,
                10)}

          </Row>

          <Row className='justify-content-center mt-xl-5'>

            {renderInfoCard('Hygiene and Safety Guidelines',
                <>
                  {renderListItem(
                      require("assets/img/icons/biohazard.png"),
                      'biohazard',
                      <>Do not volunteer if you have recently come in contact with a patient who has
                        tested positive for COVID-19.</>)}
                  {renderListItem(
                      require("assets/img/icons/gas_mask_filled.png"),
                      'gas_mask_filled',
                      <>Anytime you leave the house we encourage you to wear a mask as well as a pit
                        of gloves to protect yourself.</>)}
                  {renderListItem(
                      require("assets/img/icons/ruler.png"),
                      'ruler',
                      <>Maintain social distance when delivering products. Leave products at the
                        doorstep or at an agreed upon location.</>)}
                  {renderListItem(
                      require("assets/img/icons/cash_in_hand.png"),
                      'cash_in_hand',
                      <>Be sure to thoroughly sanitize any money that is transacted for the products
                        before you enter your home.</>)}
                  {renderListItem(
                      require("assets/img/icons/wash_your_hands.png"),
                      'wash_your_hands',
                      <>After completing a delivery, be sure to wash your hands for at least 20
                        seconds to keep yourself and your family safe.</>)}
                </>
                ,
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
