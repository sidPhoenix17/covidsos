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
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Container,
  Nav,
  NavItem,
  Row
} from "reactstrap";
import Header from "../components/Headers/Header.js";

class Team extends React.Component {

  renderCard(imageSrc, name, place, position, college, bio, linkedin, twitter) {
    return (
        // <Col lg={4} md={4} className="mb-5 mb-xl-0">
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
          <Card className="card-profile shadow full-height-card">
            <CardHeader className="text-center mb-7">
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
                  {/*<span className="font-weight-light">, 25</span>*/}
                </h3>
                {/*<div className="h5 font-weight-300">*/}
                {/*  <i className="ni location_pin mr-2"/>*/}
                {/*  {place}*/}
                {/*</div>*/}
                <div className="h5 mt-4">
                  <i className="ni business_briefcase-24 mr-2"/>
                  {position}
                </div>
                <div>
                  <i className="ni education_hat mr-2"/>
                  {college}
                </div>
                <hr className="my-4"/>
                <p className="text-justify">
                  {bio}
                </p>
              </div>
            </CardBody>
            <CardFooter className="border-0">
              <Nav pills horizontal="center">
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
            <Row className="justify-content-center">
              <Col lg="8" md="8">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5 text-justify">
                    <div className="text-uppercase text-center mt-2 mb-2">
                      Meet the team
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className='justify-content-center mt-6'>
              {this.renderCard(
                  require("assets/img/team/siddarth.jpeg"),
                  'Siddarth Jain',
                  'Bangalore, Karnataka',
                  'Project Lead',
                  'Indian Institute of Technology, Delhi (IIT Delhi)',
                  'Siddarth is a product enthusiast who has worked in data science and business strategy roles in his previous stint at Shadowfax. He is a graduate of IIT Delhi where he was heading the Board for Student Welfare and believes in leveraging the power of communities.',
                  'https://in.linkedin.com/in/siddarth-jain-a0a95a79',
                  'http://twitter.com/thebengaluruguy')}
              {this.renderCard(
                  require("assets/img/team/chirag.jpeg"),
                  'Chirag Bansal',
                  'Gurgaon, Haryana',
                  'Lead - Development efforts',
                  'Indian Institute of Technology, Delhi (IIT Delhi)',
                  'Chirag is a software developer. He is keen to learn and implement new technologies.',
                  'https://www.linkedin.com/in/chiragb1994',
                  'https://twitter.com/chiragb1994')}
              {this.renderCard(
                  require("assets/img/team/ashish_sachdeva.jpg"),
                  'Ashish Sachdeva',
                  'Bangalore, Karnataka',
                  'Advisor',
                  'Founder President - Green Dream Foundation',
                  <>
                    Ashish is the founder of Green Dream Foundation, a NGO based in New Delhi,
                    India.<br/><br/>
                    His mission has been to create an educational and socially responsible advocacy
                    platform for people to empower and engage their peers in environmental
                    activities to ensure a healthier, cleaner and more sustainable planet for
                    businesses, customers, employees, homeowners and families.<br/><br/>
                    Ashish has managed project management and Customer Success teams managing
                    revenues as high as ~$10M. He has also led end-to-end customer experience
                    management and improvement solutions. Ashish led a 60+ member global Customer
                    Success team spread across multiple geographies and product portfolios.
                  </>,
                  'https://in.linkedin.com/in/sachdevaashish',
                  'https://twitter.com/ashishism1512')}
            </Row>
            <Row className='justify-content-center mt-6'>
              {this.renderCard(
                  require("assets/img/team/amisha_shahra.jpg"),
                  'Amisha Shahra',
                  'New Delhi',
                  'Lead - Outreach & Collaborations',
                  'The Global Education and Leadership Foundation (tGELF)',
                  'Amisha works with The Global Education and Leadership Foundation (tGELF) based in New Delhi with a focus on partnerships and social movements. She is based out of Mumbai and finished her undergraduate degree from the University of Pennsylvania',
                  'https://www.linkedin.com/in/amishashahra',
                  'https://twitter.com/TikkiTalks')}
              {this.renderCard(
                  require("assets/img/team/anvika_kumar.jpeg"),
                  'Anvika Kumar',
                  'Bangalore, Karnataka',
                  'Lead - Product',
                  '',
                  'Anvika kumar is a Product manager at Y Media labs. She recently moved back to India after completing her Masters in Computer Science at Stony Brook University(NYC).',
                  'https://www.linkedin.com/in/anvikaanvika',
                  '')}
              {this.renderCard(
                  require("assets/img/team/aryan_malesha.jpeg"),
                  'Aryan Malesha',
                  'Bangalore, Karnataka',
                  'Contributor',
                  '',
                  '',
                  'https://www.linkedin.com/in/aryanmalesha',
                  '')}
            </Row>
            <Row className='justify-content-center mt-6'>
              {this.renderCard(
                  require("assets/img/team/shaily.jpeg"),
                  'Shaily Sangwan',
                  'Bangalore, Karnataka',
                  'Contributor',
                  '',
                  '',
                  'https://in.linkedin.com/in/shailysangwan',
                  '')}
            </Row>

          </Container>
        </>
    );
  }
}

export default Team;
