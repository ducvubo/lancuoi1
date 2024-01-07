import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import logo from "../image/logo.png";
import "./HeaderTrangChu.scss";
import { FormattedMessage } from "react-intl";
import StickyHeader from "./StickyHeader";

class HeaderTrangChu extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     danhmucnoibat: "",
  //   };
  // }

  // async componentDidMount() {
  //   await this.laydanhmuchoanoibat();
  // }

  // laydanhmuchoanoibat = async () => {
  //   let kq = await danhmuchoanoibat();
  //   if (kq && kq.maCode === 0) {
  //     let data1 = kq.data;
  //     this.setState({
  //       danhmucnoibat: data1,
  //     });
  //   }
  // };
  render() {
    // let { ngonngu } = this.props;
    // let { danhmucnoibat } = this.state;
    return (
      <div className="headertrangchu">
        <div className="item1">
          <div className="sdt">
            <FormattedMessage id="sdt" />: 1900 633 045 | 0865 160 360
          </div>
          <div className="tk-gh-tt">
            <div className="icon">
              <span>
                <i className="fas fa-user"></i>
              </span>
              <span>Tài khoản</span>
            </div>
            <div className="icon">
              <span>
                <i className="fas fa-shopping-cart"></i>
              </span>
              <span>Giỏ hàng</span>
            </div>
            <div className="icon">
              <span>
                <i className="fas fa-share"></i>
              </span>
              <span>Thanh toán</span>
            </div>
          </div>
        </div>
        <div className="item2">
          <div className="fb-tw-it">
            <span className="fb">
              <i className="fab fa-facebook-f"></i>
            </span>
            <span className="tw">
              <i className="fab fa-twitter"></i>
            </span>
            <span className="it">
              <i className="fab fa-instagram "></i>
            </span>
          </div>
          <div className="logo">
            <img src={logo} width={"350px"} height={"350px"} />
          </div>
          <div className="tk-gh">
            <input className="form-control tk" />
            <i className="fas fa-search search"></i>
            <span>
              <i className="fas fa-shopping-cart"></i>
            </span>
          </div>
        </div>
        {/* <div className="item3">
          <ul className="hovermenu">
            {danhmucnoibat &&
              danhmucnoibat.length > 0 &&
              danhmucnoibat.map((item, index) => {
                return (
                  <li key={index}>
                    {ngonngu === "vi" ? item.tendanhmucVi : item.tendanhmucEn}
                    <ul>
                      {item.danhmuc && item.danhmuc.length > 0
                        ? item.danhmuc.map((item1, index1) => {
                            return (
                              <li key={index1}>
                                {ngonngu === "vi"
                                  ? item1.tendanhmucchitietVi
                                  : item1.tendanhmucchitietEn}
                              </li>
                            );
                          })
                        : null}
                    </ul>
                  </li>
                );
              })}
          </ul>
        </div> */}
        <StickyHeader/>
        <div className="item4">
          <span>
            ĐẶT HOA ONLINE - GIAO MIỄN PHÍ TP HCM & HÀ NỘI - GỌI NGAY 1900 633
            045 HOẶC 0865 160 360
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ngonngu: state.web.ngonngu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTrangChu);
