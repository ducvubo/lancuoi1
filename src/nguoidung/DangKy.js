import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./DangKy.scss";
import { apidangky } from "../API/ApiTrangChu";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { toast } from "react-toastify";
import * as actions from "../action/actions";
import { thongtinnguoidung } from "../action/actions";

class DangKy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gioitinhArr: [],

      email: "",
      password: "",
      ho: "",
      ten: "",
      gioitinh: "",
      diachinha: "",
      sodienthoai: "",
      xemmk: false,
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

  dangky = async () => {
    let data = await apidangky({
      email: this.state.email,
      password: this.state.password,
      ho: this.state.ho,
      ten: this.state.ten,
      gioitinh: this.state.gioitinh,
      diachinha: this.state.diachinha,
      sodienthoai: this.state.sodienthoai,
    });
    if (data.maCode === 1) {
      this.props.ngonngu === "vi"
        ? alert(data.thongDiep)
        : alert(data.thongDiepen);
    }
    if (data.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Vui lòng xác nhận tài khoản trong email")
        : toast.success("Please confirm your account in email");
      this.props.history.push("/home");
    }
  };

  render() {
    let gioitinh1 = this.state.gioitinhArr;
    let { ngonngu } = this.props;
    let { email, password, xemmk, gioitinh, ho, ten, diachinha, sodienthoai } =
      this.state;
    return (
      <>
        <HeaderTrangChu />
        <div className="dangky">
          <div className="form">
            <div className="spandangky">
              <span>Đăng ký</span>
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
                <label>Mật khẩu</label>
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
              <div className="hoten">
                <div className="form-group">
                  <label>Họ</label>
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
                  <label>Tên</label>
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
                  <label>Giới tính</label>
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
                            {ngonngu === "vi" ? item.tiengViet : item.tiengAnh}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
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
              <label>Địa chỉ</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => {
                  this.onChangeNhap(event, "diachinha");
                }}
                value={diachinha}
              />
            </div>
            <button className="btn butdangky" onClick={() => this.dangky()}>
              Đăng ký
            </button>
            <div className="qmk-dk">
              <span className="qmk">Bạn đã quên mật khẩu</span>
              <Link className="dangnhap" to={"/dangnhap"}>
                <span className="dk">Bạn đã có tài khoản? Đăng nhập</span>
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
    gioitinh: state.admin.gioitinh,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    laygioitinh: () => dispatch(actions.layGioiTinh()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DangKy);
