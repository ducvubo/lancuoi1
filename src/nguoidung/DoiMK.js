import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoiMK.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apidoimk } from "../API/ApiTrangChu";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
class DoiMK extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      linkxacnhan: "",
      password: "",
      nhaplaipassword: "",
      xemmkdoimk: false,
      xemnhaplaimkdoimk: false,
    };
  }

  async componentDidMount() {
    let urlParams = new URLSearchParams(document.location.search);
    let linkxacnhan = urlParams.get("linkxacnhan");
    let email = urlParams.get("email");
    this.setState({
      email: email,
      linkxacnhan: linkxacnhan,
    });
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
    let nhapdaydu = ["password", "nhaplaipassword"];
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

  clickdoimk = async () => {
    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;
    if (this.state.password !== this.state.nhaplaipassword) {
      this.props.ngonngu === "vi"
        ? alert("Nhập lại mật khẩu không khớp với mật khẩu!!!")
        : alert("Re-enter the password does not match the password!!!");
      return;
    } else {
      let kq = await apidoimk({
        email: this.state.email,
        linkxacnhan: this.state.linkxacnhan,
        password: this.state.password,
      });

      if (kq && kq.maCode === 0) {
        this.props.history.push("/dangnhap");
        this.props.ngonngu === "vi"
          ? toast.success("Đổi mật khẩu thành công!!!")
          : toast.success("Password changed successfully!!!");
      }
      if ((kq && kq.maCode === 2) || kq.maCode === 1) {
        this.props.ngonngu === "vi"
          ? toast.error("Đổi mật khẩu không thành công!!!")
          : toast.error("Password change failed!!!");
      }
    }
  };

  xemmkdoimk = () => {
    this.setState({
      xemmkdoimk: !this.state.xemmkdoimk,
    });
  };
  xemnhaplaidoimk = () => {
    this.setState({
      xemnhaplaimkdoimk: !this.state.xemnhaplaimkdoimk,
    });
  };

  render() {
    let { password, nhaplaipassword, xemmkdoimk, xemnhaplaimkdoimk } = this.state;
    return (
      <>
        <HeaderTrangChu />
        <div className="doimk">
          <span><FormattedMessage id="doimatkhau"/></span>
          <div className="form-group mk">
            <label><FormattedMessage id="dangkymk"/></label>
            <input
              className="form-control inputmk"
              type={xemmkdoimk === false ? "password" : "text"}
              onChange={(event) => {
                this.onChangeNhap(event, "password");
              }}
              value={password}
            />
            {xemmkdoimk === true ? (
              <i
                className="far fa-eye-slash xemmkdoimk"
                onClick={() => this.xemmkdoimk()}
              ></i>
            ) : (
              <i className="far fa-eye xemmkdoimk" onClick={() => this.xemmkdoimk()}></i>
            )}
          </div>
          <div className="form-group nhaplaimk">
            <label><FormattedMessage id="dangkynhaplaimk"/></label>
            <input
              className="form-control inputmk"
              type={xemnhaplaimkdoimk === false ? "password" : "text"}
              onChange={(event) => {
                this.onChangeNhap(event, "nhaplaipassword");
              }}
              value={nhaplaipassword}
            />
            {xemnhaplaimkdoimk === true ? (
              <i
                className="far fa-eye-slash xemmkdoimk"
                onClick={() => this.xemnhaplaidoimk()}
              ></i>
            ) : (
              <i
                className="far fa-eye xemmkdoimk"
                onClick={() => this.xemnhaplaidoimk()}
              ></i>
            )}
          </div>
          <button className="btn btndoimk" onClick={() => this.clickdoimk()}>
            <FormattedMessage id="doimatkhau"/>
          </button>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoiMK);
