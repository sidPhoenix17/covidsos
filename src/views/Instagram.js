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
import {makeApiCall} from "../utils/utils";
import config from "../config/config";

class Instagram extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stories: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    makeApiCall(config.successStories, 'GET', {}, (response) => {
      this.setState({
        stories: (response.instagram || [])
      })
    }, false);
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
            />
            <div className="text-xs">
              Help someone today - <a href="/index?register=volunteer"><i>Register as a volunteer
              now</i></a>
            </div>
          </div>
          {/*  </CardBody>*/}
          {/*</Card>*/}
        </Col>
    );
  }

  renderStories() {
    const {stories} = this.state;
    const dataToReturn = [];
    const countOfStories = stories.length;
    for (let i = 1; i <= countOfStories; i++) {
      dataToReturn.push(
          <Row className='justify-content-center mt-md-6' key={'insta-row-' + i}>
            {this.renderInstagramCard(stories[countOfStories - i].link)}
            {i + 1 <= countOfStories ? this.renderInstagramCard(
                stories[countOfStories - (i + 1)].link) : null}
            {i + 2 <= countOfStories ? this.renderInstagramCard(
                stories[countOfStories - (i + 2)].link) : null}
          </Row>
      );
      i = i + 2;
    }
    return dataToReturn;
  }

  render() {
    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className="justify-content-center">
              {this.renderHeadingCard('Volunteer Stories')}
            </Row>
            {this.renderStories()}
          </Container>
        </>
    );
  }
}

export default Instagram;
