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

class Information extends React.Component {

  render() {
    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className="justify-content-center">
              <Col lg="8" md="8">
                <Card className="shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5 text-justify">
                    <div className="text-uppercase text-center mt-2 mb-2">
                      COVID SOS
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>

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
                    No, there is no delivery fee or any other value added charges/commission for the
                    service by the volunteer. But you will be required to pay for the costs of goods
                    purchased.
                  </>,
                  5)}

              {renderInfoCard('How to get in touch with the team managing the portal?',
                  <>
                    You can drop your query on the <strong><i>contact us</i></strong> form on
                    <a href="https://covidsos.org">https://covidsos.org</a>. We will get back to you
                    within 24 hours.
                  </>,
                  5)}

            </Row>

            <Row className='justify-content-center mt-xl-5'>

              {renderInfoCard('Hygiene and safety of volunteers',
                  <ol>
                    <li>Volunteers must take care of personal hygiene and maintain social distancing
                      at all points.
                    </li>
                    <li>Volunteers are recommended to use masks, hand sanitizers and/or gloves at
                      all times and avoid hand-shakes/physical interactions.
                    </li>
                    <li>In order to minimise external exposure, volunteers are suggested to accept
                      requests if they are within 5-10 minutes of walk able distance from the person
                      requiring assistance.
                    </li>
                  </ol>,
                  10)}

            </Row>

            <Row className='justify-content-center mt-xl-5'>

              {renderInfoCard('Payments',
                  <ol>
                    <li>Payment for the groceries/medicines should be made by the senior citizen to
                      the vendor directly through digital modes or to the volunteer.
                    </li>
                    <li>Volunteers are not expected to make any financial contribution. However, it
                      is your call if you want to help someone in need.
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
          </Container>
        </>
    );
  }
}

export default Information;
