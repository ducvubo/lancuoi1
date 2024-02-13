import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./DangKy.scss";
import { apidangky } from "../API/ApiTrangChu";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { toast } from "react-toastify";
import * as actions from "../action/actions";
import LoadingOverlay from "react-loading-overlay";
import { FormattedMessage } from "react-intl";
class DangKy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gioitinhArr: [],

      email: "",
      password: "",
      nhaplaipassword: "",
      ho: "",
      ten: "",
      gioitinh: "",
      diachinha: "",
      sodienthoai: "",
      xemmk: false,
      xemnhaplaimk: false,
      loading: false,
    };
  }

  async componentDidMount() {
    this.props.laygioitinh();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gioitinh !== this.props.gioitinh) {
      let arrgioitinh = this.props.gioitinh;
      this.setState({
        gioitinhArr: arrgioitinh,
        gioitinh:
          arrgioitinh && arrgioitinh.length > 0 ? arrgioitinh[0].idNoi : "",
      });
    }
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
    let nhapdaydu = [
      "email",
      "password",
      "ho",
      "ten",
      "gioitinh",
      "diachinha",
      "sodienthoai",
      "nhaplaipassword",
    ];
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
  xemnhaplai = () => {
    this.setState({
      xemnhaplaimk: !this.state.xemnhaplaimk,
    });
  };

  dangky = async () => {
    if (this.state.password !== this.state.nhaplaipassword) {
      this.props.ngonngu === "vi"
        ? alert("Nhập lại mật khẩu không khớp với mật khẩu!!!")
        : alert("Re-enter the password does not match the password!!!");
      return;
    }

    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;

    this.setState({
      loading: true,
    });

    let data;

    data = await apidangky({
      email: this.state.email,
      password: this.state.password,
      ho: this.state.ho,
      ten: this.state.ten,
      gioitinh: this.state.gioitinh,
      diachinha: this.state.diachinha,
      sodienthoai: this.state.sodienthoai,
      ngonngu: this.props.ngonngu,
    });
    if (data) {
      this.setState({
        loading: false,
      });
    }

    if (data.maCode === 1) {
      this.props.ngonngu === "vi"
        ? alert(data.thongDiep)
        : alert(data.thongDiepen);
    }

    if (data.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Vui lòng xác nhận tài khoản trong email")
        : toast.success("Please confirm your account in email");
      this.props.history.push("/dangnhap");
    }
  };

  render() {
    let gioitinh1 = this.state.gioitinhArr;
    let { ngonngu } = this.props;
    let {
      email,
      password,
      nhaplaipassword,
      xemmk,
      gioitinh,
      ho,
      ten,
      diachinha,
      sodienthoai,
      loading,
      xemnhaplaimk,
    } = this.state;

    return (
      <>
        <LoadingOverlay
          active={loading}
          spinner
          text={ngonngu === "vi" ? "Vui lòng chờ..." : "Please wait..."}
        >
          <HeaderTrangChu />
          <div className="dangky">
            <div className="form">
              <div className="spandangky">
                <span>
                  <FormattedMessage id="dangky" />
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
                <div className="form-group mk">
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
                      className={ngonngu === "vi" ? "far fa-eye-slash xemmk" : "far fa-eye-slash xemmk xemmken"}
                      onClick={() => this.xemmk()}
                    ></i>
                  ) : (
                    <i
                      // className="far fa-eye xemmk"
                      className={ngonngu === "vi" ? "far fa-eye xemmk" : "far fa-eye xemmk xemmken"}
                      onClick={() => this.xemmk()}
                    ></i>
                  )}
                </div>
                <div className="form-group nhaplaimk">
                  <label>
                    <FormattedMessage id="dangkynhaplaimk" />
                  </label>
                  <input
                    className="form-control inputmk"
                    type={xemnhaplaimk === false ? "password" : "text"}
                    onChange={(event) => {
                      this.onChangeNhap(event, "nhaplaipassword");
                    }}
                    value={nhaplaipassword}
                  />
                  {xemnhaplaimk === true ? (
                    <i
                    className={ngonngu === "vi" ? "far fa-eye-slash xemmk" : "far fa-eye-slash xemmk xemmken"}
                      onClick={() => this.xemnhaplai()}
                    ></i>
                  ) : (
                    <i
                    className={ngonngu === "vi" ? "far fa-eye xemmk" : "far fa-eye xemmk xemmken"}
                      onClick={() => this.xemnhaplai()}
                    ></i>
                  )}
                </div>
                <div className={ngonngu === "vi" ? "hoten" : "hotenen"}>
                  <div className="form-group">
                    <label>
                      <FormattedMessage id="dangkyho" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => {
                        this.onChangeNhap(event, "ho");
                      }}
                      value={ho}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <FormattedMessage id="dangkyten" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => {
                        this.onChangeNhap(event, "ten");
                      }}
                      value={ten}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FormattedMessage id="dangkygioitinh" />
                    </label>
                    <select
                      className="form-control"
                      onChange={(event) => {
                        this.onChangeNhap(event, "gioitinh");
                      }}
                      value={gioitinh}
                    >
                      {gioitinh1 &&
                        gioitinh1.length > 0 &&
                        gioitinh1.map((item, index) => {
                          return (
                            <option key={index} value={item.idNoi}>
                              {ngonngu === "vi"
                                ? item.tiengViet
                                : item.tiengAnh}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    <FormattedMessage id="dangkysdt" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => {
                      this.onChangeNhap(event, "sodienthoai");
                    }}
                    value={sodienthoai}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <FormattedMessage id="dangkydiachi" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => {
                      this.onChangeNhap(event, "diachinha");
                    }}
                    value={diachinha}
                  />
                </div>
              </div>

              <button className="btn butdangky" onClick={() => this.dangky()}>
                <FormattedMessage id="dangky" />
              </button>
              <div className="qmk-dk">
                <Link className="dangky" to={"/quenmk"}>
                  <span className="qmk">
                    <FormattedMessage id="bandaquenmk" />
                  </span>
                </Link>

                <Link className="dangnhap" to={"/dangnhap"}>
                  <span className="dk">
                    <FormattedMessage id="bandacotaikhoan" />
                  </span>
                </Link>
              </div>
            </div>
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
    thongtinnguoidung123: state.thongtinnguoidung.thongtinnguoidung,
    gioitinh: state.admin.gioitinh,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    laygioitinh: () => dispatch(actions.layGioiTinh()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DangKy);
