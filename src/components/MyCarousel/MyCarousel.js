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
import Carousel, { Dots } from '@brainhubeu/react-carousel';
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
    this.setState({ value });
  }

  getCarousel(data) {
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
        dots
        slidesPerPage={3}
        breakpoints={{
          640: {
            slidesPerPage: 1,
            arrows: true
          },
          800: {
            slidesPerPage: 2,
            arrows: true
          },
          1100: {
            slidesPerPage: 2,
            arrows: true
          }
        }}
        clickToChange
      >
        {
          data.map( (datum, i) => {
            return(
              <div index={i}  key={`CarouselSlide${i}`}>
                { this.props.renderer == "RequestsSlide" ?
                    <RequestsSlide request={datum} index={i} key={`RequestsSlide${i}`}/> :
                    null
                }
              </div>
            )
          })
        }
      </Carousel>
    )
  }


  render() {
    let data = this.props.data || [];
    return (
      <div>
        {this.getCarousel(data)}
      </div>
    );
  }
}

export default MyCarousel;
