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
    this.state = {aboutHidden: {}, aboutExpanded: {}}
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
                <img alt='logo' src={imgSrc} style={{height: '10rem', maxWidth: '100%'}}/>
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

  renderProfileCard(id, profile) {
    const {aboutHidden, aboutExpanded} = this.state;
    let thisAboutHidden = aboutHidden[id] === undefined ? true : aboutHidden[id];
    let thisAboutExpanded = aboutExpanded[id] === undefined ? false : aboutExpanded[id];
    return (
        // <Col lg={4} md={4} className="mb-5 mb-xl-0">
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
          <Card className="card-profile shadow full-height-card">
            <CardHeader className="text-center mb-7">
              <Row className="justify-content-end">
                <Button hidden={!profile.bio}
                        onClick={e => {
                          e.preventDefault();
                          aboutHidden[id] = !thisAboutHidden;
                          aboutExpanded[id] = false;
                          this.setState({aboutHidden, aboutExpanded});
                        }}
                        className="btn-link border-0 card-profile-info"
                >
                  <>&#9432;</>
                </Button>
              </Row>
              <Row className="justify-content-center">
                <Col className="m-auto">
                  <div className="card-profile-image">
                    <img alt={profile.name} className="rounded-circle" src={profile.imageSrc || require("assets/img/team/default.jpg")}/>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="text-center">
                <h3 className="text-capitalize">{profile.name}</h3>
                <div className="h5 mt-4 text-purple">{profile.position}</div>
                <div className="h5 mt-4" style={{height: '1rem', maxHeight: '1rem'}}>{profile.about}</div>
              </div>
            </CardBody>
            <CardFooter className="border-0">
              <Nav pills className="justify-content-center">
                {
                  profile.linkedin ?
                      <NavItem className="pl-2 pr-2">
                        <a
                            className="team-profile-link"
                            href={profile.linkedin}
                            target="_blank" rel="noopener noreferrer">
                          <img alt={profile.name} src={require("assets/img/icons/linkedin.svg")}/>
                        </a>
                      </NavItem>
                      : null
                }
                {
                  profile.twitter ?
                      <NavItem className="pl-2 pr-2">
                        <a
                            className="team-profile-link"
                            href={profile.twitter}
                            target="_blank" rel="noopener noreferrer">
                          <img alt={profile.name} src={require("assets/img/icons/twitter.svg")}/>
                        </a>
                      </NavItem>
                      : null
                }
              </Nav>
            </CardFooter>
            <CardBody style={{height: 'inherit'}} className="p-0">
              <p hidden={thisAboutHidden} className="text-justify m-4">
                {thisAboutExpanded || (profile.bio.length && profile.bio.length < 120) ? profile.bio :
                    (<>
                      {profile.bio.props ? this.sanitizeString(profile.bio.props.children[0].toString().substring(0, 120))
                          : this.sanitizeString(profile.bio.substring(0, 120))}
                      <Button onClick={e => {
                        e.preventDefault();
                        aboutExpanded[id] = true;
                        this.setState({aboutExpanded});
                      }} className="btn-link border-0 px-2">...</Button>
                    </>)}
              </p>
            </CardBody>
          </Card>
        </Col>
    );
  }

  sanitizeString(string) {
    return string.substr(0, Math.min(string.length, string.lastIndexOf(" ")))
  }

  profileDetails = [
    {
      'imageSrc': require("assets/img/team/siddarth.jpeg"),
      'name'    : 'Siddarth Jain',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Project Lead',
      'about'   : 'IIT Delhi, Data Scientist',
      'bio'     : 'Siddarth is a product enthusiast who has worked in data science and business strategy roles in his previous stint at Shadowfax. He is a graduate of IIT Delhi where he was heading the Board for Student Welfare and believes in leveraging the power of communities.',
      'linkedin': 'https://in.linkedin.com/in/siddarth-jain-a0a95a79',
      'twitter' : 'http://twitter.com/thebengaluruguy'
    },
    {
      'imageSrc': require("assets/img/team/chirag.jpeg"),
      'name'    : 'Chirag Bansal',
      'place'   : 'Gurgaon, Haryana',
      'position': 'Lead - Development efforts',
      'about'   : 'IIT Delhi, Software Developer',
      'bio'     : 'Chirag is a lead software engineer at Rivigo, working to improve the lives of truck pilots. He is a tech enthusiast and is keen to learn and implement new technologies. He is a graduate of IIT Delhi and a firm believer of social welfare.',
      'linkedin': 'https://www.linkedin.com/in/chiragb1994',
      'twitter' : 'https://twitter.com/chiragb1994'
    },
    {
      'imageSrc': require("assets/img/team/ashish_sachdeva.jpg"),
      'name'    : 'Ashish Sachdeva',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Advisor',
      'about'   : 'Founder, GreenDream Foundation',
      'bio'     : <>
        Ashish is the Founder President of Green Dream Foundation, a new-age NGO based
        in New Delhi, India.
        Before committing himself completely to the service of the planet and people,
        he also worked in senior
        leadership positions across different multi-national corporations for over a
        decade.<br/><br/>
        His mission has been to create an educational and socially responsible
        advocacy
        platform for people to
        empower and engage their peers in environmental activities to ensure a
        healthier, cleaner and more
        sustainable planet for businesses, customers, employees, homeowners and
        families. As a young person,
        he realized that “not-knowing-how-to-get-things-done” was restricting young
        people from ‘taking the
        plunge’ and standing up for issues they felt deeply about. He felt a strong
        urge
        to develop a platform for
        young people across the world to synchronize their approach towards addressing
        these issues. His will
        to fight for the odds against the environment sowed the seeds of the
        Foundation.<br/><br/>
        Green Dream Foundation (GDF) was founded in 2008. GDF is focused on generating
        awareness about
        environmental issues through effective channels. It engages with communities
        through social media
        primarily Facebook, Instagram, Twitter and also conducts innovative IEC
        activities, workshops and
        seminars to educate people, drive action on ground and then measure results.
        It
        facilitates steps that
        help drive environmental action so not just education but also ‘end to end
        consultation’ as the core
        team believes that learning should be followed by real action. GDF also
        supports
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
        Ashish has delivered thought-provoking talks at global leadership forums
        around
        environment, CSR and
        sustainability. Global CSR Summit, Aligarh Muslim University, Smart Cities
        India
        expo, TEDx and Indian
        Institute of Technology are the recent ones.
      </>,
      'linkedin': 'https://in.linkedin.com/in/sachdevaashish',
      'twitter' : 'https://twitter.com/ashishism1512'
    },
    {
      'imageSrc': require("assets/img/team/amisha_shahra.jpg"),
      'name'    : 'Amisha Shahra',
      'place'   : 'New Delhi',
      'position': 'Lead - Outreach & Collaborations',
      'about'   : 'UPenn, Special Projects @ tGELF',
      'bio'     : 'Amisha works with The Global Education and Leadership Foundation (tGELF) based in New Delhi with a focus on partnerships and social movements. She is based out of Mumbai and finished her undergraduate degree from the University of Pennsylvania',
      'linkedin': 'https://www.linkedin.com/in/amishashahra',
      'twitter' : 'https://twitter.com/TikkiTalks'
    },
    {
      'imageSrc': require("assets/img/team/parijat.jpg"),
      'name'    : 'Parijat Shekher',
      'place'   : 'Gandhinagar',
      'position': 'Lead - Product Design',
      'about'   : 'NID, Product Designer@MPL',
      'bio'     : 'I am studying New Media Design at NID, Gandhinagar.',
      'linkedin': 'https://www.linkedin.com/in/parijats/',
      'twitter' : ''
    },
    {
      'imageSrc': require("assets/img/team/chandan_yadav.jpg"),
      'name'    : 'Chandan Yadav',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Execution Specialist',
      'about'   : 'IIT Delhi, Analyst @ Goldman Sachs',
      'bio'     : 'Chandan graduated from IITD in 2017 with a bachelors in computer science. He currently works at Goldman Sachs.',
      'linkedin': 'https://www.linkedin.com/in/chandan-yadav-423b7484/',
      'twitter' : ''
    },
    {
      'imageSrc': require("assets/img/team/shaily.jpeg"),
      'name'    : 'Shaily Sangwan',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Contributor',
      'about'   : 'Software Developer @ Finception',
      'bio'     : '',
      'linkedin': 'https://in.linkedin.com/in/shailysangwan',
      'twitter' : ''
    },
    {
      'imageSrc': require("assets/img/team/narasimha.jpeg"),
      'name'    : 'Narasimha Reddy Yeddula',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Contributor',
      'about'   : 'Software Developer @ Finception',
      'bio'     : <>
        Narasimha is a Full stack developer, primarily works for startups. Currently
        working with <b>Finception</b>, Banglore Team.
        Know more <a target='_blank' href='https://geeker.netlify.com/'
                     rel="noopener noreferrer">here</a>.
      </>,
      'linkedin': 'https://www.linkedin.com/in/narasimha-geek',
      'twitter' : 'https://twitter.com/ReddyN_Yeddula'
    },
    {
      'imageSrc': require("assets/img/team/saloni_kathuria.jpg"),
      'name'    : 'Saloni Kathuria',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Contributor',
      'about'   : 'Software Engineer @ Olx',
      'bio'     : 'I am studying New Media Design at NID, Gandhinagar.',
      'linkedin': 'https://www.linkedin.com/in/saloni-kathuria-b536a310a/',
      'twitter' : 'https://twitter.com/saloni_kathuria'
    },
    {
      'imageSrc': require("assets/img/team/ria_wadhwa.jpg"),
      'name'    : 'Ria Wadhwa',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Marketing - Social Media',
      'about'   : 'Student@MCC',
      'bio'     : 'Ria Wadhwa is an enigmatic 19 year, currently studying in Mount Carmel College, Bangalore. With a sharp and keen eye in creativity, she has been a part of multiple marketing and PR projects. She is also a self - taught social media manager, and has started dabbling in the field recently.',
      'linkedin': 'https://in.linkedin.com/in/ria-wadhwa-625395176',
      'twitter' : ''
    },
    {
      'imageSrc': require("assets/img/team/munira_electricwala.jpg"),
      'name'    : 'Munira',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Marketing - Social Media',
      'about'   : 'Student@MCC',
      'bio'     : 'Munira Electricwala, a 19 year old from Pune, is pursuing her Undergraduate Education in Mount Carmel College, Bangalore. She helps covidsos.org with content. She works as the campus ambassador at Under 25, and is the content head at Under 25 MCC, a campus club in her college. She works as the Child Rights Leader at CRY (Child Rights & You) India, Bangalore cohort. She resorts to writing as her getaway, and is owner to a few original pieces.',
      'linkedin': '',
      'twitter' : ''
    },
    {
      'imageSrc': require("assets/img/team/manas.jpg"),
      'name'    : 'Manas Poddar',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Contributor',
      'about'   : 'IIT Delhi, Strategy @ Startup',
      'bio'     : 'Manas is a business analyst at Auctus Advisors and is currently based out of Delhi. He is a graduate of IIT Delhi where he was actively involved with student welfare initiatives. ',
      'linkedin': 'https://www.linkedin.com/in/manas-poddar-729936104/',
      'twitter' : 'https://twitter.com/man_pod22'
    },
    {
      'imageSrc': require("assets/img/team/aryan_malesha.jpeg"),
      'name'    : 'Aryan Malesha',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Contributor',
      'about'   : 'Freshman @ Ross School of Business, Michigan',
      'bio'     : '',
      'linkedin': 'https://www.linkedin.com/in/aryanmalesha',
      'twitter' : ''
    },
    {
      'imageSrc': require("assets/img/team/anvika_kumar.jpeg"),
      'name'    : 'Anvika Kumar',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Contributor',
      'about'   : 'SBU New York, Product Manager at Y Media Labs',
      'bio'     : 'Anvika kumar is a Product manager at Y Media labs. She recently moved back to India after completing her Masters in Computer Science at Stony Brook University(NYC).',
      'linkedin': 'https://www.linkedin.com/in/anvikaanvika',
      'twitter' : ''
    },
    {
      'imageSrc': require("assets/img/team/abhishek_sinha.jpg"),
      'name'    : 'Abhishek Sinha',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Contributor',
      'about'   : 'IIT Delhi, Product Manager@Comviva',
      'bio'     : '',
      'linkedin': 'https://in.linkedin.com/in/abhishek-sinha-48b16883',
      'twitter' : ''
    },
    {
      'imageSrc': require("assets/img/team/vaibhav_garg.jpg"),
      'name'    : 'Vaibhav Garg',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Contributor',
      'about'   : 'IIT Delhi, Data Scientist @ Goldman Sachs',
      'bio'     : 'Vaibhav is a Data Scientist at Goldman Sachs who believes strongly in data and analytics to drive businesses. He is a graduate of IIT Delhi where he also served as General Secretary for NSS IIT D and has been part of multiple initiatives focusing on community development.',
      'linkedin': 'https://www.linkedin.com/in/vaibhav-garg-a447b410b/',
      'twitter' : ''
    },
    {
      'imageSrc': require("assets/img/team/satwant_rana.jpg"),
      'name'    : 'Satwant Rana',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Contributor',
      'about'   : 'IIT Delhi, Software Developer @ Rubrik',
      'bio'     : 'Software Engineer in Tech, Graduated from IIT Delhi',
      'linkedin': 'https://www.linkedin.com/in/satwant-rana/',
      'twitter' : 'https://twitter.com/satwantrana'
    },
    {
      'imageSrc': require("assets/img/team/Monark_Picture.jpg"),
      'name'    : 'Monark Moolchandani',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Product & Marketing',
      'about'   : 'BITS Pilani, Business Intern at Swiggy',
      'bio'     : 'Monark is a passionate problem-solver pursuing his engineering from BITS Pilani, currently interning with Swiggy. He has lead multiple organizations during his undergrad and loves building products & communities.',
      'linkedin': 'https://www.linkedin.com/in/monarchmoolchandani25/',
      'twitter' : 'https://twitter.com/xtracheeseplij '
    },
    {
      'imageSrc': require("assets/img/team/vishesh.jpeg"),
      'name'    : 'Vishesh Jain',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Design',
      'about'   : 'BITS Pilani',
      'bio'     : 'Pre final year student @ BITS Pilani Hyderabad Campus',
      'linkedin': 'https://www.linkedin.com/in/jainvishesh',
      'twitter' : ''
    },
    {
      'imageSrc': require("assets/img/team/Mohit.png"),
      'name'    : 'Mohit Goyal',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Development',
      'about'   : 'Software Developer at Swiggy',
      'bio'     : 'Software Developer at Swiggy',
      'linkedin': 'https://www.linkedin.com/in/mohitgoyal18/',
      'twitter' : ''
    },

    {
      'imageSrc': require("assets/img/team/satish.jfif"),
      'name'    : 'Satish',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Development',
      'about'   : 'Software Developer @ Olx',
      'bio'     : 'Senior Software Engineer at Olx',
      'linkedin': 'https://www.linkedin.com/in/satish-chandra-a51929159',
      'twitter' : ''
    },
    {
      'imageSrc': require("assets/img/team/Saurabh_Khandelwal.jpeg"),
      'name'    : 'Saurabh Khandelwal',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Development',
      'about'   : 'Software Engineer at Atlassian',
      'bio'     : '',
      'linkedin': 'https://www.linkedin.com/in/stgstg27/',
      'twitter' : 'https://twitter.com/Saurabh49958274'
    },
    {
      'imageSrc': require("assets/img/team/Akshay.JPG"),
      'name'    : 'Akshay Kumar',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Execution',
      'about'   : 'Learner and Principal, Vishva Vedanta School',
      'bio'     : 'Learner and Principal, Vishva Vedanta School, Engineering: Don Bosco Institute, mumbai University.',
      'linkedin': 'https://www.linkedin.com/in/akshay-kumar-a93b6471/',
      'twitter' : ''
    },
    {
      'imageSrc': require("assets/img/team/Aakriti.jpg"),
      'name'    : 'Aakriti Srivastava',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Marketing & Execution',
      'about'   : '',
      'bio'     : '',
      'linkedin': 'https://www.linkedin.com/in/aakriti-s-b28999127/',
      'twitter' : 'https://twitter.com/15_aakriti'
    },
    {
      'imageSrc': require("assets/img/team/Himanshu.png"),
      'name'    : 'Himanshu thakur',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Contributor',
      'about'   : 'VIT Vellore, Data Scientist at Locale.ai',
      'bio'     : 'VIT Vellore, Data Scientist at Locale.ai',
      'linkedin': 'https://www.linkedin.com/in/himansh005/',
      'twitter' : 'https://twitter.com/himansh_005'
    },
    {
      'imageSrc': require("assets/img/team/priyanshi.jpg"),
      'name'    : 'Priyanshi Agarwal',
      'place'   : 'Bangalore, Karnataka',
      'position': 'Execution',
      'about'   : 'Pursuing PGDM from IMS Ghaziabad.',
      'bio'     : 'VIT Vellore, Data Scientist at Locale.ai',
      'linkedin': 'https://www.linkedin.com/in/priyanshi-agarwal-1967021a1',
      'twitter' : 'https://twitter.com/GargPriyanshi96?s=03'
    },
  ];

  getProfileCards() {
    const dataToReturn = [];
    const countOfProfiles = this.profileDetails.length;
    for (let i = 0; i < countOfProfiles; i++) {
      dataToReturn.push(
          <Row className='justify-content-center mt-md-6' key={'profile-row-' + i}>
            {this.renderProfileCard(i+1, this.profileDetails[i])}
            {i + 1 < countOfProfiles ? this.renderProfileCard(
                i + 2, this.profileDetails[(i + 1)]) : null}
            {i + 2 < countOfProfiles ? this.renderProfileCard(
                i + 3, this.profileDetails[(i + 2)]) : null}
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
            <Row className="justify-content-center mt-md-6">
              {this.renderHeadingCard(
                  'Contributors',
                  <>
                    If you are interested to be a part of the team and support them, please fill <a
                      href='https://forms.gle/4pyJWnQBQVKZ7Y969' target='_blank'
                      rel="noopener noreferrer">this form</a> and we will get back to you. Due
                    credit and recognition for the efforts to contributors.
                  </>
              )}
            </Row>
            {this.getProfileCards()}
          </Container>
        </>
    );
  }
}

export default About;
