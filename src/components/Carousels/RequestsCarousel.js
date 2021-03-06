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
import RequestsSlide from "./RequestsSlide";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

class MyCarousel extends React.Component {
  state = {
    value: 0,
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({value});
  }

  render() {
    const {data, ...slideProps} = this.props;
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
            dots={data.length < 13}
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
            data.map((request, i) => {
              return (
                  <div index={i} key={(request.r_id || request.id) + '_' + i} className="full-width full-height-card">
                    <RequestsSlide request={request} index={i}
                                   key={(request.r_id || request.id) + '_' + i} {...slideProps}/>
                  </div>
              )
            })
          }
        </Carousel>
    );
  }
}

export default MyCarousel;
