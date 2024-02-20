import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import qr from "../image/qr.webp";
import apple from "../image/apple.webp";
import googleplay from "../image/googleplay.webp";
import bocongthuong from "../image/bocongthuong.webp";
import logo from "../image/logo.png";
import "./FooterTrangChu.scss";
import ChatKhachHang from "./ChatKhachHang";
import ms from "../image/ms.png";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
class FooterTrangChu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trangthai: false,
      tinnhanmoinguoidung: false,
    };
  }

  componentDidMount() {}

  battatchat = () => {
    if (this.props.thongtinnguoidung) {
      this.setState({
        trangthai: !this.state.trangthai,
      });
    } else {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập để chat!")
        : toast.error("You are not logged in, please log in to chat!");
    }
  };
  tatchat = () => {
    this.setState({
      trangthai: false,
    });
  };
  thongbaotinnhanmoingdung = () => {
    this.setState({
      tinnhanmoinguoidung: true,
    });
  };
  tatthongbaotinnhanmoingdung = () => {
    this.setState({
      tinnhanmoinguoidung: false,
    });
  };
  render() {
    let { thongtinnguoidung, ktdangnhap } = this.props;
    let { trangthai, tinnhanmoinguoidung } = this.state;
    return (
      <div className="footertrangchu">
        <div className="item13">
          <div className="item131">
            <img src={logo} width={"150px"} height={"150px"} />
            {/* <span>
              <br />
              <FormattedMessage id="footerhottline" />
              <br />
              Email: vminhduc8@gmail.com
              <br />
            </span> */}
            {/* <div className="qr-app">
              <br />
              <div className="qr">
                <img src={qr} width={"92px"} height={"114px"} />
              </div>
              <div className="app">
                <span>
                  <FormattedMessage id="footertaiungdung" />
                </span>
                <img src={apple} width={"139px"} height={"35px"} />
                <img src={googleplay} width={"139px"} height={"35px"} />
              </div>
              <br />
            </div>
            <img src={bocongthuong} width={"255px"} height={"96px"} /> */}
          </div>
          <div className="item131">
            <span>
              <b>
                <FormattedMessage id="footerlienhe" />
              </b>
            </span>
            <span>
              <FormattedMessage id="footerhottline" />
              <br />
              Email: hhflower0@gmail.com
              <br />
            </span>
            {/* <a href="#">
              <b>
                <FormattedMessage id="footercskh" />
              </b>{" "}
            </a>
            <a href="#">
              <FormattedMessage id="footergioithieu" />
            </a>
            <a href="#">
              <FormattedMessage id="footerlienhe" />
            </a>
            <a href="#">
              <FormattedMessage id="footerchinhsach" />
            </a>
            <a href="#">
              <FormattedMessage id="footercauhoi" />
            </a>
            <a href="#">
              <FormattedMessage id="footerginhthucthanhtoan" />
            </a> */}
            {/* <a href="#">
              <FormattedMessage id="footerbaomattt" />
            </a>
            <a href="#">
              <FormattedMessage id="footercskhieunai" />
            </a>
            <a href="#">
              <FormattedMessage id="footerxulykhieunai" />
            </a>
            <a href="#">
              <FormattedMessage id="footertaisaonenchon" />
            </a>
            <a href="#">Blog</a> */}
          </div>
          <div className="item131 theodoi">
            <span>
              <b>
                <FormattedMessage id="footertheodoi" />
              </b>
            </span>
            <a
              href={"https://www.facebook.com/people/HHFlower/61554958726343/"}
              target="_blank"
            >
              <span>
                <i className="fab fa-facebook"></i>Facebook
              </span>
            </a>
            {/* <span>
              <i className="fab fa-twitter"></i>Twitter
            </span>
            <span>
              <i className="fab fa-instagram"></i>Instagram
            </span>
            <span>
              <i className="fab fa-linkedin"></i>Linkedin
            </span>
            <span>
              <i className="fab fa-youtube"></i>Youtube
            </span> */}
          </div>
          <div className="item131">
            <span>
              <b>
                <FormattedMessage id="footershophoa" />
              </b>
            </span>
            <span>
              <b>
                <FormattedMessage id="footercuahang" />
              </b>{" "}
              <FormattedMessage id="footerdiachi" />
            </span>
          </div>
        </div>
        <div className="item140">
          {trangthai === true && ktdangnhap === true ? (
            <div className="manhinhchat">
              <ChatKhachHang
                tatchat={this.tatchat}
                thongbaotinnhanmoingdung={this.thongbaotinnhanmoingdung}
                tatthongbaotinnhanmoingdung={this.tatthongbaotinnhanmoingdung}
              />
            </div>
          ) : null}
          <div className="chat">
            {tinnhanmoinguoidung && (
              <span className="sotinnhanmoi">
                <i className="fas fa-circle"></i>
              </span>
            )}
            {thongtinnguoidung && thongtinnguoidung.quyenId === "R4" && (
              <img src={ms} onClick={() => this.battatchat()} />
            )}
          </div>
        </div>
        <div className="item14">
          <span>
            <i className="fas fa-phone"></i>
            <FormattedMessage id="footergoingay" />
          </span>
          {/* <span className="ke">
            <i className="fab fa-instagram"></i> Instagram
          </span> */}
          <a
            href={"https://www.facebook.com/people/HHFlower/61554958726343/"}
            target="_blank"
            className="afooter"
          >
            <span className="ke">
              <i className="fab fa-facebook"></i>
              Facebook
            </span>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    thongtinnguoidung: state.thongtinnguoidung.thongtinnguoidung,
    ktdangnhap: state.thongtinnguoidung.ktdangnhap,
    ngonngu: state.web.ngonngu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterTrangChu);
