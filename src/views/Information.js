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
import {Card, CardBody, CardHeader, Col, Container, Row} from "reactstrap";
import Header from "../components/Headers/Header.js";

class Information extends React.Component {

  renderCard(title, content, rowClass = 'mt-5'){
    return (
        <Row className={'justify-content-center ' + rowClass}>
          <Col lg="8" md="8">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-3">
                <div className="text-uppercase text-muted text-center mt-2 mb-2">
                  {title}
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5 text-justify">
                <div className="text-justify mt-2 mb-2">
                  {content}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
    );
  }

  render() {
    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            {/*<Row className="justify-content-center">*/}
            {/*  <Col lg="8" md="8">*/}
            {/*    <Card className="bg-secondary shadow border-0">*/}
            {/*      <CardBody className="px-lg-5 py-lg-5 text-justify">*/}
            {/*        <div className="text-uppercase text-center mt-2 mb-2">*/}
            {/*          COVID SOS*/}
            {/*        </div>*/}
            {/*      </CardBody>*/}
            {/*    </Card>*/}
            {/*  </Col>*/}
            {/*</Row>*/}
            {this.renderCard('What is COVID SOS?', 'In the wake of the widespread infection of the novel coronavirus (COVID19), COVID SOS is a non-profit initiative to connect senior citizens and specially abled people with volunteers from the neighbourhood who can help them with delivery of essentials (e.g. groceries, medicines). SOS stands for a distressed signal asking for help.', '')}

            {this.renderCard('Why did we launch this initiative?', <>With a lockdown in-effect, there is a disruption in the delivery and availability of essential products and services. As per <a href="http://who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters" target="_blank" rel="noopener noreferrer"><strong>WHO</strong></a>, older people and people with pre-existing medical conditions are more vulnerable to becoming severely ill if they are infected with Coronavirus-19. Hence, it is in everyone’s interest to support such distressed citizens.</>)}

            {this.renderCard('Who can avail this service?', <>Any of the following individuals living alone without any supporting family member / staff:<br/><ol>
                <li>Elderly people in the vicinity</li>
                <li>Expecting mothers / mothers living with infants (less than 1 year old) </li>
                <li>People with pre-existing medical conditions (such as heart disease)</li>
                <li>Specially abled individuals</li>
                </ol><br/>
              <strong>Strict action will be taken against anyone trying to misuse the service and they will be barred from interacting with this support group in the future.</strong></>)}

            {this.renderCard('Is there a delivery fee?', 'No, there is no delivery fee or any other value added charges/commission for the service by the volunteer. But you will be required to pay for the costs of goods purchased.')}
            {this.renderCard('How to get in touch with the team managing the portal?', <>You can drop your query on the <strong><i>contact us</i></strong> form on <a href="https://covidsos.org">https://covidsos.org</a>. We will get back to you within 24 hours.</>)}
            {this.renderCard('Additional Important Information', <ol>
              <li>Volunteers must take care of personal hygiene and maintain social distancing at all points. They are mandated to use masks, hand sanitizers and/or gloves.</li>
              <li>Volunteers should ONLY accept requests within 5-10 minutes of walkable distance from their household.</li>
              <li>Payment for the groceries/medicines should be made by the senior citizen to the vendor directly through digital modes or to you - it is upto the volunteer. Volunteers are not expected to make any financial contribution. However, it is your call if you want to help someone in need.</li>
            </ol>)}
            {this.renderCard('Privacy', 'Data collected from volunteers might be exchanged with requestors (and vice versa) for the purpose of helping each other and the moderators helping in the connection might call or email you in this regard. This data will not be shared or used further.')}
          </Container>
        </>
    );
  }
}

export default Information;
