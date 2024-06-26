import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../action/actions";
import "./QuanLyNguoiDung.scss";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
class QuanLyNguoiDung extends Component {
  constructor(props) {
    super(props);
    this.cuontrendau = React.createRef();
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
      gioitinh: "",
      quyen: "",

      trangthainut: false,
    };
  }

  async componentDidMount() {
    await this.props.laygioitinh();
    await this.props.layQuyen();
    await this.props.laytatcanguoidung();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gioitinh !== this.props.gioitinh) {
      let arrgioitinh = this.props.gioitinh;
      this.setState({
        gioitinhArr: arrgioitinh,
        gioitinh:
          arrgioitinh && arrgioitinh.length > 0 ? arrgioitinh[0].id : "",
      });
    }
    if (prevProps.quyen !== this.props.quyen) {
      let arrquyen = this.props.quyen;
      this.setState({
        quyenArr: arrquyen,
        quyen: arrquyen && arrquyen.length > 0 ? arrquyen[0].id : "",
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
    let nhapdaydu = [
      "email",
      "password",
      "ho",
      "ten",
      "sodienthoai",
      "diachinha",
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
      gioitinh: "",
      quyen: "",
    });
  };

  clicksuanguoidung = (nguoidung) => {
    this.cuonlendautrang();
    this.setState({
      id: nguoidung.id,
      email: nguoidung.email,
      password: "KHONGCOPASSWORDDAU",
      ho: nguoidung.ho,
      ten: nguoidung.ten,
      sodienthoai: nguoidung.sdt,
      diachinha: nguoidung.diachinha,
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
      gioitinhId: this.state.gioitinh,
      quyenId: this.state.quyen,
      ngonngu: this.props.ngonngu,
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
      gioitinh: "",
      quyen: "",
    });
  };

  clickxoanguoidung = (id) => {
    if (id === this.props.thongtinnguoidung.id) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn không thể xóa chính mình!!!")
        : toast.error("You can't delete yourself!!!");
    } else {
      this.props.xoanguoidung(id);
    }
  };

  cuonlendautrang = () => {
    this.cuontrendau.current?.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    let gioitinh1 = this.state.gioitinhArr;
    let quyen1 = this.state.quyenArr;
    let { ngonngu } = this.props;
    let { email, password, ho, ten, sodienthoai, diachinha, gioitinh, quyen } =
      this.state;
    let tatcanguoidung = this.state.tatcanguoidung;
    let trangthainut = this.state.trangthainut;
    return (
      <div className="quanlynguoidung">
        <div ref={this.cuontrendau} />
        <div className="item1">
          <span>
            <FormattedMessage id="quanlynguoidung" />
          </span>
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
            <label>
              <FormattedMessage id="quanlynguoidungmatkhau" />
            </label>
            <input
            type={trangthainut ? 'password' : 'text'}
              className="form-control"
              onChange={(event) => {
                this.onChangeNhap(event, "password");
              }}
              value={password}
              disabled={trangthainut}
            />
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlynguoidungho" />
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
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlynguoidungten" />
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
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlynguoidungsdt" />
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
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlynguoidungdiachi" />
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

          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlynguoidunggioitinh" />
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
                    <option key={index} value={item.id}>
                      {ngonngu === "vi" ? item.tiengViet : item.tiengAnh}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlynguoidungquyen" />
            </label>
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
                    <option key={index} value={item.id}>
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
            <FormattedMessage id="quanlynguoidungthemnguoidung" />
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => this.clickbtnsua()}
          >
            <FormattedMessage id="quanlynguoidungsuanguoidung" />
          </button>
        )}
        <div className="item3">
          <table className="table table-bordered ">
            <thead>
              <tr className="item31">
                <th scope="col">Email</th>
                <th scope="col">
                  <FormattedMessage id="quanlynguoidungho" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlynguoidungten" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlynguoidunggioitinh" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlynguoidungsdt" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlynguoidungdiachi" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlynguoidungquyen" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlyhanhdong" />
                </th>
              </tr>
            </thead>
            <tbody>
              {tatcanguoidung &&
                tatcanguoidung.length > 0 &&
                tatcanguoidung.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.ho}</td>
                      <td>{item.ten}</td>
                      <td>
                        {item.gioitinh
                          ? ngonngu === "vi"
                            ? item.gioitinh.tiengViet
                            : item.gioitinh.tiengAnh
                          : null}
                      </td>
                      <td>{item.sdt}</td>
                      <td>{item.diachinha}</td>
                      <td>
                        {item.quyen
                          ? ngonngu === "vi"
                            ? item.quyen.tiengViet
                            : item.quyen.tiengAnh
                          : null}
                      </td>
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
    thongtinnguoidung: state.thongtinnguoidung.thongtinnguoidung,
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
