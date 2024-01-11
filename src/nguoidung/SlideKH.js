import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./SlideKH.scss";
import Slider from "react-slick";
import slide1 from "../image/slide1.webp";
import slide2 from "../image/slide2.webp";
import slide3 from "../image/slide3.webp";
import slide4 from "../image/slide4.webp";
import slide5 from "../image/slide5.webp";
import khachhangtieubieu6 from '../image/khachhangtieubieu6.png'
import khachhangtieubieu7 from '../image/khachhangtieubieu7.png'
import khachhangtieubieu3 from '../image/khachhangtieubieu3.png'
import khachhangtieubieu4 from '../image/khachhangtieubieu4.png'
import khachhangtieubieu5 from '../image/khachhangtieubieu5.png'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class SlideKH extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,

    };
    return (
      <div className="item15">
        <div className="item151">
          <div className="item1511">
            <div className="item15111">
              <Slider>
                <div className="anh">
                  <img
                    src={khachhangtieubieu6}
                    alt="Slide 1"
                    width={"1152px"}
                    height={"130px"}
                  />
                </div>
                <div className="anh">
                <img
                    src={khachhangtieubieu7}
                    alt="Slide 1"
                    width={"1152px"}
                    height={"130px"}
                  />
                </div>
                <div className="anh">
                <img
                    src={khachhangtieubieu3}
                    alt="Slide 1"
                    width={"1152px"}
                    height={"130px"}
                  />
                </div>
                <div className="anh">
                <img
                    src={khachhangtieubieu4}
                    alt="Slide 1"
                    width={"1152px"}
                    height={"130px"}
                  />
                </div>
                <div className="anh">
                <img
                    src={khachhangtieubieu5}
                    alt="Slide 1"
                    width={"1152px"}
                    height={"130px"}
                  />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SlideKH);
