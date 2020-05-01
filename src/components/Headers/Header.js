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

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {volunteer_count: 0, request_count: 0, pending_request_count: 0};
  }

  getCardCol(title, image, onClickFunc) {
    return (
        <Col lg="6" xl="4">
          <Card className="card-stats mb-3 mb-xl-0">
            <Button className="card-body text-justify" onClick={onClickFunc}>
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

  render() {
    const {showCards, onOptionSelect} = this.props;
    return (
      <>
        <div className="header bg-gradient-info pb-7 pt-4 pt-md-6 pb-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              {showCards === "notLoggedIn" ? (
                <Row>
                  {this.getCardCol(
                    "I want to volunteer",
                    <object
                      type="image/svg+xml"
                      data={require("assets/img/icons/volunteer-hands.svg")}
                      className="card-image"
                    >
                      Volunteer
                    </object>,
                    () => onOptionSelect(1)
                  )}
                  {this.getCardCol(
                    "I need help",
                    <object
                      type="image/svg+xml"
                      data={require("assets/img/icons/old.svg")}
                      className="card-image"
                    >
                      Senior Citizen
                    </object>,
                    () => onOptionSelect(2)
                  )}
                  {this.getCardCol(
                    "Map",
                    <i className="fas fa-map card-image" />,
                    () => onOptionSelect(3)
                  )}
                </Row>
              ) : showCards === "loggedInUser" ? (
                <Row>
                  {this.getCardCol(
                    "Fill NGO form",
                    <i className="fas fa-map card-image" />,
                    () => onOptionSelect(4)
                  )}
                </Row>
              ) : null}
            </div>
          </Container>
        </div>
      </>
    );
  }
}

Header.defaultProps = {
  showCards: true,
  onOptionSelect: () => {
  }
};

Header.propTypes = {
  showCards: PropTypes.bool,
  onOptionSelect: PropTypes.func
};

export default Header;
