import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ThongTinNguoiDung.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import {
  apithongtinnguoidung,
  apicapnhatthongtinnguoidung,
} from "../API/ApiTrangChu";
import { apidangxuat } from "../API/GoiApi";
import anhdaidien from "../image/anhdaidien.png";
import { thongtinnguoidung } from "../action/actions";
import * as actions from "../action/actions";
import Xulyanh from "../XuLyAnh/Xulyanh";
import Lightbox from "react-image-lightbox";
import { toast } from "react-toastify";
class ThongTinNguoiDung extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gioitinhArr: [],

      email: "",
      ho: "",
      ten: "",
      sodienthoai: "",
      diachi: "",
      gioitinhselect: "",
      gioitinhinput: "",
      anhdaidienthongtin: "",
      anhdaidienthongtinurl: "",

      xemanhdaidien: false,
      trangthai: false,
    };
  }

  async componentDidMount() {
    this.props.laygioitinh();
    await this.laythongtinnguoidung();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gioitinh !== this.props.gioitinh) {
      let arrgioitinh = this.props.gioitinh;
      this.setState({
        gioitinhArr: arrgioitinh,
        gioitinhselect:
          arrgioitinh && arrgioitinh.length > 0 ? arrgioitinh[0].idNoi : "",
      });
    }
  }
  laythongtinnguoidung = async () => {
    let kq = await apithongtinnguoidung(
      this.props.thongtinnguoidung.id,
      this.props.thongtinnguoidung.email
    );
    if (kq && kq.maCode === 0) {
      let data1 = kq.thongtinnguoidung;
      let anhdaidienthongtintrave = "";
      if (data1.anhdaidien) {
        anhdaidienthongtintrave = new Buffer(
          data1.anhdaidien,
          "base64"
        ).toString("binary");
      }
      this.setState({
        email: data1.email,
        ho: data1.ho,
        ten: data1.ten,
        sodienthoai: data1.sdt,
        diachi: data1.diachinha,
        gioitinhinput: data1.gioitinh
          ? this.props.ngonngu === "vi"
            ? data1.gioitinh.tiengViet
            : data1.gioitinh.tiengAnh
          : null,
        anhdaidienthongtin: anhdaidienthongtintrave,
      });
    }
  };
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
      "ho",
      "ten",
      "sodienthoai",
      "diachi",
      "gioitinhselect",
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
  taianhdaidien = async (event) => {
    let data = event.target.files;
    let fileanh = data[0];
    if (fileanh) {
      let anhdaidienthongtinbase64 = await Xulyanh.getBase64(fileanh);
      let anhdaidienthongtinUrl = URL.createObjectURL(fileanh);
      this.setState({
        anhdaidienthongtinurl: anhdaidienthongtinUrl,
        anhdaidienthongtin: anhdaidienthongtinbase64,
      });
    }
  };
  doitrangthaithongtin = () => {
    this.setState({
      trangthai: true,
    });
  };
  huycapnhatthongtin = async () => {
    await this.laythongtinnguoidung();
    this.setState({
      trangthai: false,
    });
  };
  nhanxemanhdaidien = () => {
    this.setState({
      xemanhdaidien: true,
    });
  };

  capnhatthongtinnguoidung = async () => {
    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;
    let kq = await apicapnhatthongtinnguoidung({
      id: this.props.thongtinnguoidung.id,
      email: this.state.email,
      ho: this.state.ho,
      ten: this.state.ten,
      sodienthoai: this.state.sodienthoai,
      diachinha: this.state.diachi,
      gioitinhId: this.state.gioitinhselect,
      anhdaidien: this.state.anhdaidienthongtin,
    });
    if (kq && kq.maCode === 0) {
      toast.success(
        "Cập nhật thông tin thành công, vui lòng đăng nhập lại để cập nhật thông tin!!!"
      );
      this.props.history.push(`/dangnhap`);
      this.props.dangxuat();
      await apidangxuat();
    } else {
      toast.error("Update detail error!!!");
    }
  };

  render() {
    let {
      email,
      sodienthoai,
      diachi,
      ho,
      ten,
      gioitinhinput,
      trangthai,
      gioitinhselect,
      gioitinhArr,
      anhdaidienthongtin,
      xemanhdaidien,
    } = this.state;
    let { ngonngu } = this.props;
    return (
      <>
        <HeaderTrangChu />
        <div className="thongtinkhachhang">
          <div className="item1">
            <div className="anhdaidien">
              <img
                className="anh mt-3"
                src={anhdaidienthongtin ? anhdaidienthongtin : anhdaidien}
                width={"200px"}
                height={"200px"}
                onClick={() => this.nhanxemanhdaidien()}
              />{" "}
              {xemanhdaidien === true && (
                <Lightbox
                  mainSrc={anhdaidienthongtin}
                  onCloseRequest={() => this.setState({ xemanhdaidien: false })}
                />
              )}
              {trangthai === true && (
                <>
                  <label className="capnhatanh" htmlFor="anhthongtinnguoidung">
                    <i className="fas fa-upload"></i> Tải ảnh
                  </label>
                  <input
                    id="anhthongtinnguoidung"
                    type="file"
                    hidden
                    accept="image/jpeg, image/png, image/gif"
                    onChange={(event) => this.taianhdaidien(event)}
                  />
                </>
              )}
            </div>
            <div className="thongtin row ml-3 mt-3">
              <div className="form-group col-6">
                <label>Email</label>
                <input
                  className="form-control"
                  type="text"
                  disabled={true}
                  defaultValue={email}
                />
              </div>
              <div className="form-group col-3">
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
              <div className="form-group col-3">
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
              <div className="form-group col-3">
                <label>Giới tính</label>
                {trangthai === false ? (
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={gioitinhinput}
                  />
                ) : (
                  <select
                    className="form-control"
                    onChange={(event) => {
                      this.onChangeNhap(event, "gioitinhselect");
                    }}
                    value={gioitinhselect}
                  >
                    {gioitinhArr &&
                      gioitinhArr.length > 0 &&
                      gioitinhArr.map((item, index) => {
                        return (
                          <option key={index} value={item.idNoi}>
                            {ngonngu === "vi" ? item.tiengViet : item.tiengAnh}
                          </option>
                        );
                      })}
                  </select>
                )}
              </div>
              <div className="form-group col-3">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  type="number"
                  onChange={(event) => {
                    this.onChangeNhap(event, "sodienthoai");
                  }}
                  value={sodienthoai}
                />
              </div>
              <div className="form-group col-6">
                <label>Địa chỉ</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(event) => {
                    this.onChangeNhap(event, "diachi");
                  }}
                  value={diachi}
                />
              </div>
            </div>
          </div>
          <div className="item2">
            {trangthai === false ? (
              <button
                className="btn buttonthongtin"
                onClick={() => this.doitrangthaithongtin()}
              >
                Sửa thông tin
              </button>
            ) : (
              <>
                <button
                  className="btn buttonthongtin"
                  onClick={() => this.capnhatthongtinnguoidung()}
                >
                  Cập nhật
                </button>
                <button
                  className="btn buttonthongtin ml-3"
                  onClick={() => this.huycapnhatthongtin()}
                >
                  Hủy
                </button>
              </>
            )}
          </div>
        </div>
        <FooterTrangChu />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    thongtinnguoidung: state.thongtinnguoidung.thongtinnguoidung,
    ngonngu: state.web.ngonngu,
    gioitinh: state.admin.gioitinh,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    laygioitinh: () => dispatch(actions.layGioiTinh()),
    dangxuat: () => dispatch(actions.dangxuat()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThongTinNguoiDung);
