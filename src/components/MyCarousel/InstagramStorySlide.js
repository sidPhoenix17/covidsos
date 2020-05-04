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
// reactstrap components
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import Header from "../Headers/Header";
import InstagramEmbed from 'react-instagram-embed';

class InstagramStorySlide extends React.Component {
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    const {story, index} = this.props;
    return(
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
    );
  }
}

export default InstagramStorySlide;
