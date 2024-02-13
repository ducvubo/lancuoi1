import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuenMK.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apiquenmk } from "../API/ApiTrangChu";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import { FormattedMessage } from "react-intl";
class QuenMK extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loading: false,
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
    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;
    this.setState({
      loading: true,
    });
    let kq = await apiquenmk({
      email: this.state.email,
      ngonngu: this.props.ngonngu,
    });

    if (kq) {
      this.setState({
        loading: false,
      });
    }
    if (kq.maCode === 1) {
      this.props.ngonngu === "vi" ? alert(kq.thongDiep) : alert(kq.thongDiepen);
    }
    if (kq.maCode === 2) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Tài khoản chưa được kích hoạt vui lòng kích hoạt trước!!!"
          )
        : toast.error("Account not yet activated, please activate first!!!");
    }
    if (kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Vui lòng kiểm tra hộp thư email của ban!!!")
        : toast.success("Please check your email inbox!!!");
    }
  };

  render() {
    let { email, loading } = this.state;
    let {ngonngu} = this.props
    return (
      <>
        <LoadingOverlay active={loading} spinner text={ngonngu === "vi" ? "Vui lòng chờ..." : "Please wait..."}>
          <HeaderTrangChu />
          <div className="quenmk">
            <div className="form-group">
              <label>
                <FormattedMessage id="quenmkemaildangky" />
              </label>
              <input
                className="form-control"
                type="email"
                onChange={(event) => {
                  this.onChangeNhap(event, "email");
                }}
                value={email}
              />
            </div>
            <button
              className="btn btnquenmk"
              onClick={() => this.clickquenmk()}
            >
              <FormattedMessage id="quenmk" />
            </button>
          </div>
          <FooterTrangChu />
        </LoadingOverlay>
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
