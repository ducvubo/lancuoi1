import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DangNhap.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apidangnhap } from "../API/ApiTrangChu";
import { toast } from "react-toastify";
import { thongtinnguoidung } from "../action/actions";


class DangNhap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      xemmk: false,
      datanguoidung:''
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
    });
    if (data.maCode === 1) {
      this.props.ngonngu === "vi"
        ? toast.error("Vui lòng nhập đầy đủ email và mật khẩu!")
        : toast.error("Please enter full email and password!");
    }
    if (data.maCode === 3) {
      this.props.ngonngu === "vi"
        ? toast.error("Vui lòng nhập đúng mật khẩu!")
        : toast.error("Please enter the correct password!");
    }

    if (data.maCode === 4) {
      this.props.ngonngu === "vi"
        ? toast.error("Email này chưa được đăng ký!!!")
        : toast.error("This email has not been registered!!!");
    }
    if(data.maCode === 0) {
      this.props.thongtinnguoidung(data.nguoidung)
    }
  };

  render() {
    let { email, password, xemmk } = this.state;
    return (
      <>
        <HeaderTrangChu />
        <div className="dangnhap">
          <div className="form">
            <div className="spandangnhap">
              <span>Đăng nhập</span>
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
                <label>Password</label>
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
                    className="far fa-eye-slash xemmk"
                    onClick={() => this.xemmk()}
                  ></i>
                ) : (
                  <i
                    className="far fa-eye xemmk"
                    onClick={() => this.xemmk()}
                  ></i>
                )}
              </div>
            </div>
            <button className="btn butdangnhap" onClick={() => this.dangnhap()}>
              Đăng nhập
            </button>
            <div className="qmk-dk">
              <span className="qmk">Bạn đã quên mật khẩu</span>
              <span className="dk">Bạn chưa có tài khoản? Đăng ký</span>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    thongtinnguoidung: (ngongu) => dispatch(thongtinnguoidung(ngongu)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DangNhap);
