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
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import Header from "../components/Headers/Header.js";
import InstagramEmbed from 'react-instagram-embed';

class Instagram extends React.Component {

  constructor(props) {
    super(props);
    this.state = {aboutHidden: {}}
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

  renderInstagramCard(url) {
    return (
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
          {/*<Card className="shadow full-height-card">*/}
          {/*  <CardBody className="p-0">*/}
              <div className="text-center full-height-card">
                <InstagramEmbed
                    url={url}
                    maxWidth={320}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                />
              </div>
          {/*  </CardBody>*/}
          {/*</Card>*/}
        </Col>
    );
  }

  render() {
    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className="justify-content-center">
              {this.renderHeadingCard('Success Stories')}
            </Row>
            <Row className='justify-content-center mt-6'>
              {this.renderInstagramCard('https://www.instagram.com/p/B-2NftllRmI/')}
              {this.renderInstagramCard('https://www.instagram.com/p/B-xPWWEF77G/')}
              {this.renderInstagramCard('https://www.instagram.com/p/B-uu_mwFXda/')}
            </Row>
          </Container>
        </>
    );
  }
}

export default Instagram;
