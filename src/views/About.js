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
  Row,
  Button
} from "reactstrap";
import Header from "../components/Headers/Header.js";
import {renderInfoCard} from "../utils/utils";

class About extends React.Component {

  constructor(props) {
    super(props);
    this.state = {aboutHidden: {}}
  }

  renderHeadingCard(heading) {
    return(
        <Col lg="10" md="10">
          <Card className="shadow border-0">
            <CardBody className="px-lg-5 py-lg-5 text-justify">
              <div className="text-uppercase text-center mt-2 mb-2">
                {heading}
              </div>
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
                <div className="h5 mt-4">
                  <i className="ni business_briefcase-24 mr-2"/>
                  {position}
                </div>
                {
                  college ?
                      <div>
                        <i className="ni education_hat mr-2"/>
                        {college}
                      </div>
                      : null
                }
              </div>
            </CardBody>
            <CardFooter className="border-0">
              <Row>
                <Col>
                  <Nav pills className="justify-content-start">
                    <Button hidden={!bio}
                            onClick={e => {
                              e.preventDefault();
                              aboutHidden[id] = !thisAboutHidden;
                              this.setState({aboutHidden: aboutHidden});
                            }}
                            className="btn-link border-0"
                    >
                      {thisAboutHidden ? 'About' : 'Hide'}
                    </Button>
                  </Nav>
                </Col>
                <Col>
                  <Nav pills className="justify-content-end">
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
                </Col>
              </Row>
            </CardFooter>
            <CardBody hidden={thisAboutHidden}>
              <p className="text-justify">{bio}</p>
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
              {renderInfoCard('What is COVID SOS?',
                  <>
                    In the wake of the widespread infection of the novel coronavirus (COVID19),
                    COVID SOS is a non-profit initiative to connect senior citizens and specially
                    abled people with volunteers from the neighbourhood who can help them with
                    delivery of essentials (e.g. groceries, medicines). SOS stands for a distressed
                    signal asking for help.
                  </>)}

              {renderInfoCard('Why did we launch this initiative?',
                  <>
                    With a lockdown in-effect,
                    there is a disruption in the delivery and availability of essential products and
                    services. As per <a
                      href="http://who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
                      target="_blank" rel="noopener noreferrer"><strong>WHO</strong></a>, older
                    people
                    and people with pre-existing medical conditions are more vulnerable to becoming
                    severely ill if they are infected with Coronavirus-19. Hence, it is in
                    everyone’s
                    interest to support such distressed citizens.
                  </>)}
            </Row>
            <Row className="justify-content-center mt-6">
              {this.renderHeadingCard('Supporting Organisations')}
            </Row>
            <Row className="justify-content-center mt-5">
              {this.renderOrganisationCard(
                  require('assets/img/organisations/gdf-logo.jpg'),
                  <>
                    During #COVID19 crisis, GDF is helping underprivileged people in Noida get
                    access
                    to basic amenities. GDF\'s vision is to raise awareness about the environment,
                    promote knowledge and education on prime environmental concerns especially waste
                    management, air pollution, water conservation and climate change.
                  </>,
                  'https://www.facebook.com/greendreamfoundation')}
            </Row>
            <Row className="justify-content-center mt-6">
              {this.renderHeadingCard('Contributors')}
            </Row>
            <Row className='justify-content-center mt-6'>
              {this.renderProfileCard(
                  1,
                  require("assets/img/team/siddarth.jpeg"),
                  'Siddarth Jain',
                  'Bangalore, Karnataka',
                  'Project Lead',
                  '',
                  'Siddarth is a product enthusiast who has worked in data science and business strategy roles in his previous stint at Shadowfax. He is a graduate of IIT Delhi where he was heading the Board for Student Welfare and believes in leveraging the power of communities.',
                  'https://in.linkedin.com/in/siddarth-jain-a0a95a79',
                  'http://twitter.com/thebengaluruguy')}
              {this.renderProfileCard(
                  2,
                  require("assets/img/team/chirag.jpeg"),
                  'Chirag Bansal',
                  'Gurgaon, Haryana',
                  'Lead - Development efforts',
                  '',
                  'Chirag is a lead software engineer at Rivigo, working to improve the lives of truck pilots. He is a tech enthusiast and is keen to learn and implement new technologies. He is a graduate of IIT Delhi and a firm believer of social welfare.',
                  'https://www.linkedin.com/in/chiragb1994',
                  'https://twitter.com/chiragb1994')}
              {this.renderProfileCard(
                  3,
                  require("assets/img/team/ashish_sachdeva.jpg"),
                  'Ashish Sachdeva',
                  'Bangalore, Karnataka',
                  'Advisor',
                  'Founder President - Green Dream Foundation',
                  <>
                    Ashish is the Founder President of Green Dream Foundation, a new-age NGO based
                    in New Delhi, India.
                    Before committing himself completely to the service of the planet and people, he
                    also worked in senior
                    leadership positions across different multi-national corporations for over a
                    decade.<br/><br/>
                    His mission has been to create an educational and socially responsible advocacy
                    platform for people to
                    empower and engage their peers in environmental activities to ensure a
                    healthier, cleaner and more
                    sustainable planet for businesses, customers, employees, homeowners and
                    families. As a young person,
                    he realized that “not-knowing-how-to-get-things-done” was restricting young
                    people from ‘taking the
                    plunge’ and standing up for issues they felt deeply about. He felt a strong urge
                    to develop a platform for
                    young people across the world to synchronize their approach towards addressing
                    these issues. His will
                    to fight for the odds against the environment sowed the seeds of the Foundation.<br/><br/>
                    Green Dream Foundation (GDF) was founded in 2008. GDF is focused on generating
                    awareness about
                    environmental issues through effective channels. It engages with communities
                    through social media
                    primarily Facebook, Instagram, Twitter and also conducts innovative IEC
                    activities, workshops and
                    seminars to educate people, drive action on ground and then measure results. It
                    facilitates steps that
                    help drive environmental action so not just education but also ‘end to end
                    consultation’ as the core
                    team believes that learning should be followed by real action. GDF also supports
                    companies with their
                    CSR (Corporate Social Responsibility) &amp; EPR (Extended Producer
                    Responsibility) initiatives that really
                    make a long-lasting impact both in terms of education / awareness and actual
                    impact on the
                    environment and society. Agility and innovation form the pillars of all
                    organizational initiatives.
                    Under Ashish’s leadership, the organization has launched various unique
                    awareness campaigns that
                    drive action at the ground level. Plasticophilic, Paint My City, Man Sagar
                    Cleanup &amp; COVID SOS are the
                    most recent ongoing initiatives.<br/><br/>
                    Ashish has delivered thought-provoking talks at global leadership forums around
                    environment, CSR and
                    sustainability. Global CSR Summit, Aligarh Muslim University, Smart Cities India
                    expo, TEDx and Indian
                    Institute of Technology are the recent ones.
                  </>,
                  'https://in.linkedin.com/in/sachdevaashish',
                  'https://twitter.com/ashishism1512')}
            </Row>
            <Row className='justify-content-center mt-6'>
              {this.renderProfileCard(
                  4,
                  require("assets/img/team/amisha_shahra.jpg"),
                  'Amisha Shahra',
                  'New Delhi',
                  'Lead - Outreach & Collaborations',
                  'The Global Education and Leadership Foundation (tGELF)',
                  'Amisha works with The Global Education and Leadership Foundation (tGELF) based in New Delhi with a focus on partnerships and social movements. She is based out of Mumbai and finished her undergraduate degree from the University of Pennsylvania',
                  'https://www.linkedin.com/in/amishashahra',
                  'https://twitter.com/TikkiTalks')}
              {this.renderProfileCard(
                  5,
                  require("assets/img/team/anvika_kumar.jpeg"),
                  'Anvika Kumar',
                  'Bangalore, Karnataka',
                  'Lead - Product',
                  '',
                  'Anvika kumar is a Product manager at Y Media labs. She recently moved back to India after completing her Masters in Computer Science at Stony Brook University(NYC).',
                  'https://www.linkedin.com/in/anvikaanvika',
                  '')}
              {this.renderProfileCard(
                  6,
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
              {this.renderProfileCard(
                  7,
                  require("assets/img/team/shaily.jpeg"),
                  'Shaily Sangwan',
                  'Bangalore, Karnataka',
                  'Contributor',
                  '',
                  '',
                  'https://in.linkedin.com/in/shailysangwan',
                  '')}
              {this.renderProfileCard(
                  7,
                  require("assets/img/team/narasimha.jpeg"),
                  'Narasimha Reddy Yeddula',
                  'Bangalore, Karnataka',
                  'Contributor',
                  '',
                  <>
                    Narasimha is a Full stack developer, primarily works for startups. Currently working with <b>Finception</b>, Banglore Team.
                    Know more about me<a target='_blank' href='https://geeker.netlify.com/' rel="noopener noreferrer"><Button color="link"> Here</Button></a>
                  </>,
                  'https://www.linkedin.com/in/narasimha-geek',
                  'https://twitter.com/ReddyN_Yeddula')}
            </Row>

          </Container>
        </>
    );
  }
}

export default About;
