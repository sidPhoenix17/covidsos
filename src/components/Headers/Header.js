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
import NumberFormat from 'react-number-format';
// reactstrap components
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import PropTypes from "prop-types";
import config from "config/config";
import {makeApiCall} from "../../utils/utils";

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {volunteer_count: 0, request_count: 0, pending_request_count: 0};
    this.getData();
  }

  getData() {
    if (!this.props.showCards) {
      return;
    }
    makeApiCall(config.summaryEndpoint, 'POST', {}, (response) => {
      this.setState({
        volunteer_count: response.volunteer_count,
        request_count: response.request_count,
        pending_request_count: response.pending_request_count
      });
    }, false);
  }

  getCardCol(title, count, iconBg, iconClass) {
    return (
        <Col lg="6" xl="4">
          <Card className="card-stats mb-3 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col">
                  <span className="h4 text-uppercase text-muted mb-0 card-title">{title}</span>
                  <span className="h4 font-weight-bold mb-0" style={{float: 'right'}}>
                    <NumberFormat value={count} displayType='text' thousandSeparator={true}
                                  thousandsGroupStyle='lakh'/>
                  </span>
                </div>
                {/*<Col className="col-auto">*/}
                {/*  <div className={'icon icon-shape ' + iconBg + ' text-white rounded-circle shadow'}>*/}
                {/*    <i className={'fas ' + iconClass}/>*/}
                {/*  </div>*/}
                {/*</Col>*/}
              </Row>
            </CardBody>
          </Card>
        </Col>
    )
  }

  render() {
    const {showCards} = this.props;
    return (
        <>
          <div className="header bg-gradient-info pb-7 pt-4 pt-md-6 pb-md-8">
            <Container fluid>
              <div className="header-body">
                {/* Card stats */}
                {showCards ?
                    <Row>
                      {this.getCardCol('Total volunteers', this.state.volunteer_count,
                          'bg-danger', 'fa-chart-bar')}
                      {this.getCardCol('Total requests', this.state.request_count, 'bg-warning',
                          'fa-chart-pie')}
                      {this.getCardCol('Pending requests', this.state.pending_request_count,
                          'bg-yellow', 'fa-users')}
                    </Row>
                    : null}
              </div>
            </Container>
          </div>
        </>
    );
  }
}

Header.defaultProps = {
  showCards: true
};

Header.propTypes = {
  showCards: PropTypes.bool
};

export default Header;
