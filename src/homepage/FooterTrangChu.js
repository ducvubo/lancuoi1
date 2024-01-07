import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import qr from "../image/qr.webp";
import apple from "../image/apple.webp";
import googleplay from "../image/googleplay.webp";
import bocongthuong from "../image/bocongthuong.webp";
import logo from "../image/logo.png";
import "./FooterTrangChu.scss";

class FooterTrangChu extends Component {
  render() {
    return (
      <div className="footertrangchu">
        <div className="item13">
          <div className="item131">
            <img src={logo} width={"200px"} height={"200px"} />
            <span>
              <br />
              Hotline: 0373 853 243 - 0356 417 863
              <br />
              Email: vminhduc8@gmail.com
              <br />
            </span>
            <div className="qr-app">
              <br />
              <div className="qr">
                <img src={qr} width={"92px"} height={"114px"} />
              </div>
              <div className="app">
                <span>Tải ứng dụng ngay!</span>
                <img src={apple} width={"139px"} height={"35px"} />
                <img src={googleplay} width={"139px"} height={"35px"} />
              </div>
              <br />
            </div>
            <img src={bocongthuong} width={"255px"} height={"96px"} />
          </div>
          <div className="item131">
            <a href="#">
              <b>CHĂM SÓC KHÁCH HÀNG</b>{" "}
            </a>
            <a href="#">Giới Thiệu</a>
            <a href="#">Liên Hệ</a>
            <a href="#">Chính Sách Vận Chuyển</a>
            <a href="#">Câu Hỏi Thường Gặp</a>
            <a href="#">Hình Thức Thanh Toán</a>
            <a href="#">Bảo Mật Thông Tin</a>
            <a href="#">Chính Sách Hoàn Tiền</a>
            <a href="#">Xử Lý Khiếu Nại</a>
            <a href="#">Tại Sao Nên Chọn Hhflower.vn</a>
            <a href="#">Blog</a>
          </div>
          <div className="item131">
            <span>
              <b>THEO DÕI</b>
            </span>
            <span>
              <i className="fab fa-facebook"></i>Facebook
            </span>
            <span>
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
            </span>
          </div>
          <div className="item131">
            <span>
              <b>SHOP HOA HHFLOWER</b>
            </span>
            <span>
              <b>Cửa Hàng TP HCM</b>225/3 Nguyễn Đình Chiểu, Phường 5, Quận 3,
              TP.HCM
            </span>
            <span>
              <b>Văn Phòng TP HCM</b>: 412 Lê Hồng Phong, Phường 1, Quận 10,
              TP.HCM
            </span>
            <span>
              <b>Chi nhánh Hà Nội</b>: 65 Trần Phú, Ba Đình, Hà Nội
            </span>
            <span>CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ ZAS</span>
            <span>Mã số thuế: 0313630426</span>
          </div>
        </div>
        <div className="item14">
          <span>
            <i className="fas fa-phone"></i>
            Gọi ngay 0373 853 243
          </span>
          <span className="ke">
            <i className="fab fa-instagram"></i> Instagram
          </span>
          <span>
            <i className="fab fa-facebook-messenger"></i>
            Facebook
          </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterTrangChu);
