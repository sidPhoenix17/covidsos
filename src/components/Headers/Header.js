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
import {Button, Card, Col, Container, Row} from "reactstrap";
import PropTypes from "prop-types";
import {getRouteForKey, isLoggedIn} from "../../utils/utils";
import Carousel from "@brainhubeu/react-carousel";
import '@brainhubeu/react-carousel/lib/style.css';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {volunteer_count: 0, request_count: 0, pending_request_count: 0};
  }

  getCardCol(title, image, onClickFunc) {
    return (
        <Col lg="6" xl="4">
          <Card className="card-stats mb-3 mb-xl-0">
            <Button className="card-body text-justify card-button" onClick={onClickFunc}>
              <Row>
                <Col xs={3}>
                  <span>
                    {image}
                  </span>
                </Col>
                <Col xs={7}>
                  <span className="h2 card-title">{title}</span>
                </Col>
              </Row>
            </Button>
          </Card>
        </Col>
    )
  }

  getLinkButton(key, title, image) {
    const {redirectTo} = this.props;
    const routeForKey = getRouteForKey(key);
    if (!routeForKey) {
      return null;
    }
    return this.getCardCol(
        title,
        image,
        () => redirectTo(routeForKey.path)
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
                <div className="h1 text-danger text-center bg-custom-yellow">Help Someone!</div>
                {showCards ?
                    <Row>
                      <Col xs={12} className="d-md-none">
                        <Carousel
                            className="carousel pt-3"
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
                      <Col xs={12} className="d-none d-md-block">
                        <Carousel
                            className="carousel pt-3"
                            dots
                            centered
                            draggable
                            infinite
                            autoPlay={4000}
                        >
                          <img alt="what" className="carousel-image"
                               src={require("assets/img/brand/what-is-covid-sos-desktop.png")}/>
                          <img alt="how" className="carousel-image"
                               src={require("assets/img/brand/how-covid-sos-works-desktop.png")}/>
                        </Carousel>
                      </Col>
                    </Row>
                    : null
                }
                {showCards && !isLoggedIn() ?
                    <Row className="justify-content-center mt-4">
                      {this.getCardCol(
                          'Get Help',
                          <object type="image/svg+xml"
                                  data={require("assets/img/icons/old-icon.svg")}
                                  className="card-image">Get Help</object>,
                          () => onOptionSelect(2)
                      )}
                      {this.getCardCol(
                          'Volunteer',
                          <object type="image/svg+xml"
                                  data={require("assets/img/icons/volunteer-icon.svg")}
                                  className="card-image">Volunteer</object>,
                          () => onOptionSelect(1)
                      )}
                    </Row>
                    : null
                }
                {
                  !showCards && adminCards ?
                      <Row className="justify-content-center mt-4">
                        {this.getLinkButton(
                            'createNgoRequest',
                            'Add Request',
                            <object type="image/svg+xml"
                                    data={require("assets/img/icons/old-icon.svg")}
                                    className="card-image">Get Help</object>
                        )}
                        {this.getCardCol(
                            'Add Volunteer',
                            <object type="image/svg+xml"
                                    data={require("assets/img/icons/volunteer-icon.svg")}
                                    className="card-image">Add Volunteer</object>,
                            () => onOptionSelect(1)
                        )}
                      </Row>
                      : null
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
