import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./DangNhap.scss";
import * as actions from "../action/actions";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apidangnhap } from "../API/ApiTrangChu";
import { toast } from "react-toastify";
import { thongtinnguoidung } from "../action/actions";
import { FormattedMessage } from "react-intl";
class DangNhap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      xemmk: false,
      datanguoidung: "",
    };
  }

  onChangeNhap = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  ktdanhapthongtinchua = () => {
    let kt = true;
    let nhapdaydu = ["email", "password"];
    for (let i = 0; i < nhapdaydu.length; i++) {
      if (!this.state[nhapdaydu[i]]) {
        kt = false;
        this.props.ngonngu === "vi"
          ? alert("Vui lòng nhập đầy đủ thông tin")
          : alert("Please enter complete information");
        break;
      }
    }
    return kt;
  };

  xemmk = () => {
    this.setState({
      xemmk: !this.state.xemmk,
    });
  };

  dangnhap = async () => {
    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;

    let data = await apidangnhap({
      email: this.state.email,
      password: this.state.password,
      thongtingiohangchuadangnhap: this.props.thongtingiohangchuadangnhap,
      thongtindonhangchuadangnhap: this.props.thongtindonhangchuadangnhap,
    });
    if (data && data.maCode === 1) {
      this.props.ngonngu === "vi"
        ? toast.error("Vui lòng nhập đầy đủ email và mật khẩu!")
        : toast.error("Please enter full email and password!");
    }
    if (data && data.maCode === 3) {
      this.props.ngonngu === "vi"
        ? toast.error("Vui lòng nhập đúng mật khẩu!")
        : toast.error("Please enter the correct password!");
    }

    if (data && data.maCode === 4) {
      this.props.ngonngu === "vi"
        ? toast.error("Email này chưa được đăng ký!!!")
        : toast.error("This email has not been registered!!!");
    }
    if (data && data.maCode === 5) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Tài khoản của bạn chưa được xác nhận vui lòng kiểm tra hộp thư của email để xác nhận!!!"
          )
        : toast.error(
            "Your account has not been confirmed, please check your email inbox to confirm!!!"
          );
    }
    if (data && data.maCode === 0) {
      this.props.thongtinnguoidung(data.nguoidung);
      (data && data.nguoidung && data.nguoidung.quyenId === 9) ||
      data.nguoidung.quyenId === 11
        ? this.props.history.push("/quanly/")
        : this.props.history.push("/trangchu");
      this.props.xoadonhangchuaDN();
      this.props.xoagiohangchuaDN();
    }
  };

  render() {
    let { email, password, xemmk } = this.state;
    let { thongtinnguoidung123, ngonngu } = this.props;
    return (
      <>
        {/* {thongtinnguoidung123 ? thongtinnguoidung123.quyenId === 9 || thongtinnguoidung123.quyenId === 11 ? (<Redirect to={"/quanly/"}/>) : (<Redirect to={"/trangchu"}/>)} */}
        {(thongtinnguoidung123 && thongtinnguoidung123.quyenId === 9) ||
        thongtinnguoidung123 === 11 ? (
          <Redirect to={"/quanly/"} />
        ) : null}
        <HeaderTrangChu />
        <div className="dangnhap">
          <div className="form">
            <div className="spandangnhap">
              <span>
                <FormattedMessage id="headerdangnhap" />
              </span>
            </div>
            <div className="nhapthongtin">
              <div className="form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  onChange={(event) => {
                    this.onChangeNhap(event, "email");
                  }}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label>
                  <FormattedMessage id="dangkymk" />
                </label>
                <input
                  className="form-control inputmk"
                  type={xemmk === false ? "password" : "text"}
                  onChange={(event) => {
                    this.onChangeNhap(event, "password");
                  }}
                  value={password}
                />
                {xemmk === true ? (
                  <i
                    className={
                      ngonngu === "vi"
                        ? "far fa-eye-slash xemmk"
                        : "far fa-eye-slash xemmk xemmkdangnhap"
                    }
                    onClick={() => this.xemmk()}
                  ></i>
                ) : (
                  <i
                    className={
                      ngonngu === "vi"
                        ? "far fa-eye xemmk"
                        : "far fa-eye xemmk xemmkdangnhap"
                    }
                    onClick={() => this.xemmk()}
                  ></i>
                )}
              </div>
            </div>
            <button className="btn butdangnhap" onClick={() => this.dangnhap()}>
              <FormattedMessage id="headerdangnhap" />
            </button>
            <div className="qmk-dk">
              <Link className="dangky" to={"/quenmk"}>
                <span className="qmk">
                  <FormattedMessage id="bandaquenmk" />
                </span>
              </Link>

              <Link className="dangky" to={"/dangky"}>
                <span className="dk">
                  <FormattedMessage id="banchuacotaikhoan" />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <FooterTrangChu />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ngonngu: state.web.ngonngu,
    thongtinnguoidung123: state.thongtinnguoidung.thongtinnguoidung,
    thongtingiohangchuadangnhap: state.giohanghoa.thongtingiohang,
    thongtindonhangchuadangnhap: state.madonhang.madonhangArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    thongtinnguoidung: (data) => dispatch(thongtinnguoidung(data)),
    xoagiohangchuaDN: () => dispatch(actions.themgiohangchuadangnhap()),
    xoadonhangchuaDN: () => dispatch(actions.xoadonhangchuaDN()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DangNhap);
