import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../action/actions";
import "./QuanLyNguoiDung.scss";

class QuanLyNguoiDung extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gioitinhArr: [],
      quyenArr: [],
      tatcanguoidung: [],

      id: "",
      email: "",
      password: "",
      ho: "",
      ten: "",
      sodienthoai: "",
      diachinha: "",
      diachicuahang: "",
      gioitinh: "",
      quyen: "",

      trangthainut: false,
    };
  }

  async componentDidMount() {
    this.props.laygioitinh();
    this.props.layQuyen();
    this.props.laytatcanguoidung();
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
    if (prevProps.quyen !== this.props.quyen) {
      let arrquyen = this.props.quyen;
      this.setState({
        quyenArr: arrquyen,
        quyen: arrquyen && arrquyen.length > 0 ? arrquyen[0].idNoi : "",
      });
    }
    if (prevProps.tatcanguoidung !== this.props.tatcanguoidung) {
      this.setState({
        tatcanguoidung: this.props.tatcanguoidung,
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
    let arrCheck = [
      "email",
      "password",
      "ho",
      "ten",
      "sodienthoai",
      "diachinha",
      "diachicuahang",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        console.log(this.state[arrCheck[i]]);

        kt = false;
        this.props.ngonngu === "vi"
          ? alert("Vui lòng nhập đầy đủ thông tin")
          : alert("Please enter complete information");
        break;
      }
    }
    return kt;
  };
  clickThemMoi = () => {
    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;

    this.props.themnguoidung({
      email: this.state.email,
      password: this.state.password,
      ho: this.state.ho,
      ten: this.state.ten,
      sodienthoai: this.state.sodienthoai,
      diachinha: this.state.diachinha,
      diachicuahang: this.state.diachicuahang,
      gioitinh: this.state.gioitinh,
      quyen: this.state.quyen,
    });
    this.setState({
      email: "",
      password: "",
      ho: "",
      ten: "",
      sodienthoai: "",
      diachinha: "",
      diachicuahang: "",
      gioitinh: "",
      quyen: "",
    });
  };

  clicksuanguoidung = (nguoidung) => {
    this.setState({
      id: nguoidung.id,
      email: nguoidung.email,
      password: "KHONGCOPASSDAU",
      ho: nguoidung.ho,
      ten: nguoidung.ten,
      sodienthoai: nguoidung.sdt,
      diachinha: nguoidung.diachinha,
      diachicuahang: nguoidung.diachicuahang,
      gioitinh: nguoidung.gioitinhId,
      quyen: nguoidung.quyenId,
      trangthainut: true,
    });
  };
  clickbtnsua = () => {
    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;
    this.props.suanguoidung({
      id: this.state.id,
      ho: this.state.ho,
      ten: this.state.ten,
      sodienthoai: this.state.sodienthoai,
      diachinha: this.state.diachinha,
      diachicuahang: this.state.diachicuahang,
      gioitinhId: this.state.gioitinh,
      quyenId: this.state.quyenId,
    });
    this.setState({
      trangthainut: false,
      id: "",
      email: "",
      password: "",
      ho: "",
      ten: "",
      sodienthoai: "",
      diachinha: "",
      diachicuahang: "",
      gioitinh: "",
      quyen: "",
    });
  };

  clickxoanguoidung = (id) => {
    this.props.xoanguoidung(id);
  };
  render() {
    let gioitinh1 = this.state.gioitinhArr;
    let quyen1 = this.state.quyenArr;
    let { ngonngu } = this.props;
    let {
      email,
      password,
      ho,
      ten,
      sodienthoai,
      diachinha,
      diachicuahang,
      gioitinh,
      quyen,
    } = this.state;
    let tatcanguoidung = this.state.tatcanguoidung;
    let trangthainut = this.state.trangthainut;
    console.log(tatcanguoidung);
    return (
      <div className="quanlynguoidung">
        <div className="item1">
          <span>Quản lý người dùng</span>
        </div>
        <div className="row item2">
          <div className="form-group col-6">
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "email");
              }}
              value={email}
              disabled={trangthainut}
            />
          </div>
          <div className="form-group col-6">
            <label>Password</label>
            <input
              className="form-control"
              onChange={(event) => {
                this.onChangeNhap(event, "password");
              }}
              value={password}
              disabled={trangthainut}
            />
          </div>
          <div className="form-group col-4">
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
          <div className="form-group col-4">
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
          <div className="form-group col-4">
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

          <div className="form-group col-6">
            <label>Địa chỉ nhà</label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "diachinha");
              }}
              value={diachinha}
            />
          </div>
          <div className="form-group col-6">
            <label>Địa chỉ cửa hàng</label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "diachicuahang");
              }}
              value={diachicuahang}
            />
          </div>

          <div className="form-group col-6">
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
          <div className="form-group col-6">
            <label>Quyền</label>
            <select
              className="form-control"
              onChange={(event) => {
                this.onChangeNhap(event, "quyen");
              }}
              value={quyen}
            >
              {quyen1 &&
                quyen1.length > 0 &&
                quyen1.map((item, index) => {
                  return (
                    <option key={index} value={item.idNoi}>
                      {ngonngu === "vi" ? item.tiengViet : item.tiengAnh}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        {trangthainut === false ? (
          <button
            className="btn btn-primary"
            onClick={() => this.clickThemMoi()}
          >
            Thêm người dùng
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => this.clickbtnsua()}
          >
            Sửa người dùng
          </button>
        )}
        <div className="item3">
          <table className="table">
            <thead className="thead-dark">
              <tr className="item31">
                <th scope="col">id</th>
                <th scope="col">Email</th>
                <th scope="col">Họ</th>
                <th scope="col">Tên</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Địa chỉ nhà</th>
                <th scope="col">Địa chỉ cửa hàng</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {tatcanguoidung &&
                tatcanguoidung.length > 0 &&
                tatcanguoidung.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item.id}</th>
                      <td>{item.email}</td>
                      <td>{item.ho}</td>
                      <td>{item.ten}</td>
                      <td>{item.sdt}</td>
                      <td>{item.diachinha}</td>
                      <td>{item.diachicuahang}</td>
                      <td>
                        <button onClick={() => this.clicksuanguoidung(item)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button>
                          <i
                            className="fas fa-trash"
                            onClick={() => this.clickxoanguoidung(item.id)}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gioitinh: state.admin.gioitinh,
    quyen: state.admin.quyen,
    ngonngu: state.web.ngonngu,
    tatcanguoidung: state.admin.tatcanguoidung,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    laygioitinh: () => dispatch(actions.layGioiTinh()),
    layQuyen: () => dispatch(actions.layQuyen()),
    themnguoidung: (data) => dispatch(actions.themmoinguoidung(data)),
    laytatcanguoidung: () => dispatch(actions.allnguoidung()),
    xoanguoidung: (id) => dispatch(actions.xoanguoidung(id)),
    suanguoidung: (id) => dispatch(actions.suanguoidung(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyNguoiDung);
