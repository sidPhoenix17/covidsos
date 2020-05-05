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
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Nav,
  NavItem,
  Row
} from "reactstrap";
import Header from "../components/Headers/Header.js";
import {renderInfoCard} from "../utils/utils";

class UsefulLinks extends React.Component {

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

  renderOrganisationCard(imgSrc, description, link) {
    return (
        <Col lg="10" md="10">
          <Card className="shadow border-0">
            <CardHeader className="pb-3">
              <div className="text-uppercase text-muted text-center mt-2 mb-2">
                <img alt='logo' src={imgSrc} style={{height: '15rem'}}/>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5 text-justify">
              <div className="text-justify mt-2 mb-2">{description}</div>
            </CardBody>
            <CardFooter className="py-4 text-right">
              <a href={link} className="btn btn-primary" target="_blank"
                 rel="noopener noreferrer">Know More</a>
            </CardFooter>
          </Card>
        </Col>
    );
  }

  renderProfileCard(id, imageSrc, name, place, position, college, bio, linkedin, twitter) {
    const {aboutHidden} = this.state;
    let thisAboutHidden = aboutHidden[id] === undefined ? true : aboutHidden[id];
    return (
        // <Col lg={4} md={4} className="mb-5 mb-xl-0">
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
          <Card className="card-profile shadow full-height-card">
            <CardHeader className="text-center mb-7">
              <Row className="justify-content-end">
                <Button hidden={!bio}
                        onClick={e => {
                          e.preventDefault();
                          aboutHidden[id] = !thisAboutHidden;
                          this.setState({aboutHidden: aboutHidden});
                        }}
                        className="btn-link border-0 card-profile-info"
                >
                  <>&#9432;</>
                </Button>
              </Row>
              <Row className="justify-content-center">
                <Col className="m-auto">
                  <div className="card-profile-image">
                    <img alt={name} className="rounded-circle" src={imageSrc}/>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="text-center">
                <h3 className="text-capitalize">
                  {name}
                </h3>
                <div className="h5 mt-4 text-purple">
                  {position}
                </div>
              </div>
            </CardBody>
            <CardFooter className="border-0">
              <Nav pills className="justify-content-center">
                {
                  linkedin ?
                      <NavItem className="pl-2 pr-2">
                        <a
                            className="team-profile-link"
                            href={linkedin}
                            target="_blank" rel="noopener noreferrer">
                          <img alt={name} src={require("assets/img/icons/linkedin.svg")}/>
                        </a>
                      </NavItem>
                      : null
                }
                {
                  twitter ?
                      <NavItem className="pl-2 pr-2">
                        <a
                            className="team-profile-link"
                            href={twitter}
                            target="_blank" rel="noopener noreferrer">
                          <img alt={name} src={require("assets/img/icons/twitter.svg")}/>
                        </a>
                      </NavItem>
                      : null
                }
              </Nav>
            </CardFooter>
            <CardBody style={{height: 'inherit'}} className="p-0">
              <p hidden={thisAboutHidden} className="text-justify m-4">{bio}</p>
            </CardBody>
          </Card>
        </Col>
    );
  }

  render() {
    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className='justify-content-center'>
              {this.renderHeadingCard('Useful Links')}
            </Row>
            <Row className="justify-content-center mt-md-6">
              {renderInfoCard(<>
                    <a href="https://www.connectfor.org/virtualvolunteering/" target="_blank"
                       rel="noopener noreferrer">
                      ConnectFor - Virtual Volunteering
                    </a>
                  </>,
                  <>
                    Looking at the current scenario of COVID-19, ConnectFor has curated a number of
                    virtual volunteering opportunities for you that can be done from the comfort and
                    safety of your own home! Let’s turn our social distancing and isolation into
                    productive social service for our NGOs, and do what we can to brighten up these
                    dark times.
                    <br/><br/>
                    Link: <a href="https://www.connectfor.org/virtualvolunteering/" target="_blank"
                             rel="noopener noreferrer">https://www.connectfor.org/virtualvolunteering/</a>
                  </>)}
              {renderInfoCard(<>
                    <a href="https://covidmaps.in/" target="_blank" rel="noopener noreferrer">
                      COVID MAPS
                    </a>
                  </>,
                  <>
                    Covid Maps is a crowd-sourced app that helps you track the latest information on
                    essential services operating around you during the Covid-19 shutdowns.
                    <br/><br/>
                    Link: <a href="https://covidmaps.in/" target="_blank"
                             rel="noopener noreferrer">https://covidmaps.in/</a>
                  </>)}
            </Row>
            <Row className="justify-content-center mt-md-6">
              {renderInfoCard(<>
                    <a href="https://www.mygov.in/aarogya-setu-app" target="_blank"
                       rel="noopener noreferrer">
                      Aarogya Setu Mobile App
                    </a>
                  </>,
                  <>
                    Aarogya Setu is a mobile application developed by the Government of India to
                    connect essential health services with the people of India in our combined fight
                    against COVID-19.
                    <br/><br/>
                    Link: <a href="https://www.mygov.in/aarogya-setu-app" target="_blank"
                             rel="noopener noreferrer">https://www.mygov.in/aarogya-setu-app</a>
                  </>)}
              {renderInfoCard(<>
                    <a href="https://covidfyi.in" target="_blank" rel="noopener noreferrer">
                      Covid FYI
                    </a>
                  </>,
                  <>
                    A single website having consolidated information about Hospitals, Doctors,
                    Government services, Helpline number and other vital information.
                    <br/><br/>
                    Link: <a href="https://covidfyi.in" target="_blank"
                             rel="noopener noreferrer">https://covidfyi.in</a>
                  </>)}
            </Row>

          </Container>
        </>
    );
  }
}

export default UsefulLinks;
