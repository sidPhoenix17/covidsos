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
