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
import {Button, Card, CardBody, Col, Container, Row} from "reactstrap";
import PropTypes from "prop-types";
import {getRouteForKey} from "../../utils/utils";
import Carousel from "@brainhubeu/react-carousel";
import '@brainhubeu/react-carousel/lib/style.css';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {volunteer_count: 0, request_count: 0, pending_request_count: 0};
  }

  getCardCol(title, image, onClickFunc, bgColor) {
    return (
        <Col lg="6" xl="4">
          <Card className="card-stats mb-3 mb-xl-0"
                style={{backgroundColor: bgColor, borderColor: bgColor}}>
            <Button className="card-body text-justify" onClick={onClickFunc}
                    style={{backgroundColor: bgColor, borderColor: bgColor}}>
              <Row>
                <div className="col">
                  <span className="h3 text-uppercase text-muted mb-0 card-title">{title}</span>
                  <span className="mb-0" style={{float: 'right'}}>
                    {image}
                  </span>
                </div>
              </Row>
            </Button>
          </Card>
        </Col>
    )
  }

  getLinkButton(key, bgColor) {
    const {redirectTo} = this.props;
    const routeForKey = getRouteForKey(key);
    if (!routeForKey) {
      return null;
    }
    return this.getCardCol(
        routeForKey.name,
        <i className={routeForKey.icon + " card-image"}/>,
        () => redirectTo(routeForKey.path),
        bgColor
    );
  }

  getAdminButtons() {
    const {onOptionSelect} = this.props;

    return (
        <>
          <Row>
            {this.getLinkButton('createNgoRequest', 'orange')}
            {this.getCardCol(
                'Add volunteer',
                <object type="image/svg+xml"
                        data={require("assets/img/icons/volunteer-hands.svg")}
                        className="card-image">Volunteer</object>,
                () => onOptionSelect(1),
                'orange'
            )}
            {this.getLinkButton('newRequests')}
          </Row>
          <Row className="mt-4">
            {this.getLinkButton('pendingRequests')}
            {this.getLinkButton('inProgressRequests')}
            {this.getLinkButton('completedRequests')}
          </Row>
        </>
    );
  }

  getNGOForm(title, image, href) {
    return (
        <Col lg="6" xl="4">
          <Card className="card-stats mb-3 mb-xl-0">
            <a className="card-body text-justify" href={href}>
              <Row>
                <div className="col">
                  <span className="h3 text-uppercase text-muted mb-0 card-title">{title}</span>
                  <span className="mb-0" style={{float: 'right'}}>
                    {image}
                  </span>
                </div>
              </Row>
            </a>
          </Card>
        </Col>
    )
  }

  render() {
    const {showCards, onOptionSelect, adminCards} = this.props;
    return (
        <>
          <div className="header bg-custom-header pb-7 pt-4 pt-md-6 pb-md-8">
            <Container fluid>
              <div className="header-body">
                {showCards ?
                    <Row>
                      <Col xs={12}>
                            <Carousel
                                className="carousel pt-3"
                                arrowLeft={<i
                                    className="carousel-arrow fas fa-caret-left text-black"/>}
                                arrowLeftDisabled={<i
                                    className="carousel-arrow fas fa-caret-left text-gray"/>}
                                arrowRight={<i
                                    className="carousel-arrow fas fa-caret-right text-black"/>}
                                arrowRightDisabled={<i
                                    className="carousel-arrow fas fa-caret-right text-gray"/>}
                                addArrowClickHandler
                                dots
                                centered
                                draggable
                                infinite
                                autoPlay={4000}
                            >
                              <img alt="what" className="carousel-image"
                                   src={require("assets/img/brand/what-is-covid-sos.png")}/>
                              <img alt="how" className="carousel-image"
                                   src={require("assets/img/brand/how-covid-sos-works.png")}/>
                            </Carousel>
                      </Col>
                    </Row>
                    : null
                }
                {showCards ?
                    <Row className="justify-content-center mt-4">
                      {this.getCardCol(
                          'I want to volunteer',
                          <object type="image/svg+xml"
                                  data={require("assets/img/icons/volunteer-hands.svg")}
                                  className="card-image">Volunteer</object>,
                          () => onOptionSelect(1)
                      )}
                      {this.getCardCol(
                          'I need help',
                          <object type="image/svg+xml"
                                  data={require("assets/img/icons/old.svg")}
                                  className="card-image">Senior Citizen</object>,
                          () => onOptionSelect(2)
                      )}
                    </Row>
                    : null
                }
                {
                  !showCards && adminCards ? this.getAdminButtons() : null
                }
              </div>
            </Container>
          </div>
        </>
    );
  }
}

Header.defaultProps = {
  showCards: true,
  adminCards: false,
  onOptionSelect: () => {
  },
  redirectTo: () => {
  }
};

Header.propTypes = {
  showCards: PropTypes.bool,
  adminCards: PropTypes.bool,
  onOptionSelect: PropTypes.func,
  redirectTo: PropTypes.func
};

export default Header;
