import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./SlideShow.scss";
import Slider from "react-slick";
import slide1 from "../image/slide1.webp";
import slide2 from "../image/slide2.webp";
import slide3 from "../image/slide3.webp";
import slide4 from "../image/slide4.webp";
import slide5 from "../image/slide5.webp";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class SlideShow extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,

    };
    return (
      <div className="item5">
        <div className="item51">
          <div className="item511">
            <div className="item5111">
              <Slider>
                <div className="anh">
                  <img
                    src={slide1}
                    alt="Slide 1"
                    width={"1180px"}
                    height={"350px"}
                  />
                </div>
                <div className="anh">
                <img
                    src={slide2}
                    alt="Slide 1"
                    width={"1180px"}
                    height={"350px"}
                  />
                </div>
                <div className="anh">
                <img
                    src={slide3}
                    alt="Slide 1"
                    width={"1180px"}
                    height={"350px"}
                  />
                </div>
                <div className="anh">
                <img
                    src={slide4}
                    alt="Slide 1"
                    width={"1180px"}
                    height={"350px"}
                  />
                </div>
                <div className="anh">
                <img
                    src={slide5}
                    alt="Slide 1"
                    width={"1180px"}
                    height={"350px"}
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

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow);
