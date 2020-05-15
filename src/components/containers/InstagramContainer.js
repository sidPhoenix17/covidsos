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
/*eslint-disable*/
import React from "react";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import InstagramEmbed from "react-instagram-embed";
import {Card, Col, Container} from "reactstrap";
import {makeApiCall} from "../../utils/utils";
import config from "../../config/config";

class InstagramContainer extends React.Component {
  state = {
    value: 0,
    stories: []
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.fetchInstagramStories();
  }

  fetchInstagramStories() {
    makeApiCall(config.successStories, 'GET', {}, (response) => {
      this.setState({
        stories: (response.instagram || [])
      })
    }, false);
  }

  onChange(value) {
    this.setState({value});
  }

  getCarousel() {
    const {stories} = this.state;
    return (
        <Carousel
            className="carousel pt-3"
            value={this.state.value}
            onChange={this.onChange}
            arrowLeft={<i className="carousel-arrow fas fa-caret-left text-black"/>}
            arrowLeftDisabled={<i className="carousel-arrow fas fa-caret-left text-gray"/>}
            arrowRight={<i className="carousel-arrow fas fa-caret-right text-black"/>}
            arrowRightDisabled={<i className="carousel-arrow fas fa-caret-right text-gray"/>}
            addArrowClickHandler
            dots={stories.length < 13}
            slidesPerPage={3}
            slidesPerScroll={3}
            breakpoints={{
              680: {
                slidesPerPage: 1,
                slidesPerScroll: 1
              },
              800: {
                slidesPerPage: 1,
                slidesPerScroll: 1
              },
              1100: {
                slidesPerPage: 2,
                slidesPerScroll: 2,
                arrows: true
              }
            }}
            clickToChange
        >
          {
            stories.map((story, i) => {
              return (
                  <div key={`CarouselSlide${i}`} className="full-width full-height-card">
                    <div className="full-width">
                      <InstagramEmbed
                          url={story.link}
                          maxWidth={320}
                          hideCaption={false}
                          containerTagName='div'
                          protocol=''
                          injectScript
                      />
                      <div className="text-xs text-center">
                        Help someone today -
                        <a href="/index?register=volunteer">
                          <i>Register as a volunteer now</i>
                        </a>
                      </div>
                    </div>
                  </div>
              )
            })
          }
        </Carousel>
    )
  }

  render() {
    return (
        <Container fluid>
          <Card className="stories-container pt-2 pb-2 mt-6">
            <Col xs={12} className="text-uppercase pt-2 text-center h3">
              Volunteer Stories
            </Col>
            {this.getCarousel()}
          </Card>
        </Container>
    );
  }
}

export default InstagramContainer;
