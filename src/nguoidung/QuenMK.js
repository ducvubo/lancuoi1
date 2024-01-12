import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuenMK.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apiquenmk } from "../API/ApiTrangChu";
import { toast } from "react-toastify";
class QuenMK extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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
    let nhapdaydu = ["email"];
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

  clickquenmk = async () => {
    let kq = await apiquenmk({
      email: this.state.email,
    });

    if (kq && kq.maCode === 1) {
      this.props.ngonngu === "vi" ? alert(kq.thongDiep) : alert(kq.thongDiepen);
    }
    if (kq && kq.maCode === 2) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Tài khoản chưa được kích hoạt vui lòng kích hoạt trước!!!"
          )
        : toast.error("Account not yet activated, please activate first!!!");
    }
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Vui lòng kiểm tra hộp thư email của ban!!!")
        : toast.success("Please check your email inbox!!!");
    }
  };

  render() {
    let { email } = this.state;
    return (
      <>
        <HeaderTrangChu />
        <div className="quenmk">
          <div className="form-group">
            <label>Nhập email đã đăng ký</label>
            <input
              className="form-control"
              type="email"
              onChange={(event) => {
                this.onChangeNhap(event, "email");
              }}
              value={email}
            />
          </div>
          <button className="btn btnquenmk" onClick={() => this.clickquenmk()}>
            Quên mật khẩu
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

export default connect(mapStateToProps, mapDispatchToProps)(QuenMK);
