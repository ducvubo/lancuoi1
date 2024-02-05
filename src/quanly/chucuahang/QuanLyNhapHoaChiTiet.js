import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuanLyNhapHoaChiTiet.scss";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import {
  apitatcahoa,
  apitatcahoadon,
  apirefreshtoken,
  apicapnhathoacu,
  apithemhoamoi,
  apitatcahoadonchitiet,
  apisuahoadonchitiet,
  apixoahoadonchitiet,
} from "../../API/GoiApi";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
class QuanLyNhapHoaChiTiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nhaphoaArr: [],
      hoaArr: [],

      id: "",
      idnhaphoa: "",
      idhoa: "",
      donvitinh: "",
      soluongnhaptrenphieu: "",
      soluongnhapthucte: "",
      gianhap: "",
      giatong: "",
      tatcahoadonchitiet: "",

      tenhoa: "",

      trangthainut: false,
      trangthai: false,
    };
  }

  async componentDidMount() {
    await this.laytatcahoadon();
    await this.laytatcahoa();
    await this.laytatcahoadonchitiet();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.gianhap !== this.state.gianhap ||
      prevState.soluongnhapthucte !== this.state.soluongnhapthucte
    ) {
      this.setState({
        giatong: this.state.gianhap * this.state.soluongnhapthucte,
      });
    }
  }

  laytatcahoa = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apitatcahoa();
    if (kq.maCode === 6) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
        : toast.error("You are not an admin, please come back!!!");
    }
    if (kq.maCode === 7) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
          )
        : toast.error(
            "You are not an admin or store employee, please leave!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        hoaArr: data1,
        idhoa: data1 && data1.length > 0 ? data1[0].id : "",
      });
    }
  };

  laytatcahoadon = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apitatcahoadon();
    if (kq.maCode === 6) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
        : toast.error("You are not an admin, please come back!!!");
    }
    if (kq.maCode === 7) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
          )
        : toast.error(
            "You are not an admin or store employee, please leave!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        idnhaphoa: data1 && data1.length > 0 ? data1[0].id : "",
        nhaphoaArr: data1,
      });
    }
  };

  laytatcahoadonchitiet = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apitatcahoadonchitiet();
    if (kq.maCode === 6) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
        : toast.error("You are not an admin, please come back!!!");
    }
    if (kq.maCode === 7) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
          )
        : toast.error(
            "You are not an admin or store employee, please leave!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        tatcahoadonchitiet: data1,
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

  doitrangthai = async () => {
    this.setState({
      trangthai: !this.state.trangthai,
      trangthainut: false,
      idnhaphoa: "",
      donvitinh: "",
      soluongnhaptrenphieu: "",
      soluongnhapthucte: "",
      gianhap: "",
      giatong: "",

      tenhoa: "",
    });
    await this.laytatcahoa();
    await this.laytatcahoadon();
  };

  clickthemhoamoi = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apithemhoamoi({
      idnhaphoa: this.state.idnhaphoa,
      donvitinh: this.state.donvitinh,
      soluongnhaptrenphieu: this.state.soluongnhaptrenphieu,
      soluongnhapthucte: this.state.soluongnhapthucte,
      gianhap: this.state.gianhap,
      giatong: this.state.giatong,
      tenhoa: this.state.tenhoa,
    });
    if (kq.maCode === 6) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
        : toast.error("You are not an admin, please come back!!!");
    }
    if (kq.maCode === 7) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
          )
        : toast.error(
            "You are not an admin or store employee, please leave!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Thêm hoa mới thành công!!!")
        : toast.success("Successfully adding new flowers!!!");
      this.setState({
        //idnhaphoa: "",
        //idhoa: "",
        donvitinh: "",
        soluongnhaptrenphieu: "",
        soluongnhapthucte: "",
        gianhap: "",
        giatong: "",
        tatcahoadonchitiet: "",

        tenhoa: "",
      });
      await this.laytatcahoa();
      await this.laytatcahoadonchitiet();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Thêm hoa mới thất bại!!!")
        : toast.success("Failed adding new flowers!!!");
    }
  };

  clickthemsoluonghoacu = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apicapnhathoacu({
      idnhaphoa: this.state.idnhaphoa,
      idhoa: this.state.idhoa,
      donvitinh: this.state.donvitinh,
      soluongnhaptrenphieu: this.state.soluongnhaptrenphieu,
      soluongnhapthucte: this.state.soluongnhapthucte,
      gianhap: this.state.gianhap,
      giatong: this.state.giatong,
    });
    if (kq.maCode === 6) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
        : toast.error("You are not an admin, please come back!!!");
    }
    if (kq.maCode === 7) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
          )
        : toast.error(
            "You are not an admin or store employee, please leave!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Cập nhật hoa thành công!!!")
        : toast.success("Flower update successful!!!");
      this.setState({
        //idnhaphoa: "",
        //idhoa: "",
        donvitinh: "",
        soluongnhaptrenphieu: "",
        soluongnhapthucte: "",
        gianhap: "",
        giatong: "",
        tatcahoadonchitiet: "",

        tenhoa: "",
      });
      await this.laytatcahoa();
      await this.laytatcahoadonchitiet();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Cập nhật hoa thất bại!!!")
        : toast.success("Flower update failed!!!");
    }
  };

  clicksuahoadonchitiet = (hoadonchitiet) => {
    this.setState({
      id: hoadonchitiet.id,
      idnhaphoa: hoadonchitiet.idnhaphoa,
      idhoa: hoadonchitiet.idhoa,
      donvitinh: hoadonchitiet.donvitinh,
      soluongnhaptrenphieu: hoadonchitiet.soluongnhaptrenphieu,
      soluongnhapthucte: hoadonchitiet.soluongnhapthucte,
      gianhap: hoadonchitiet.gianhap,
      giatong: hoadonchitiet.giatong,

      trangthainut: true,
    });
  };
  clickbtnhoadonchitiet = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apisuahoadonchitiet({
      id: this.state.id,
      idnhaphoa: this.state.idnhaphoa,
      idhoa: this.state.idhoa,
      donvitinh: this.state.donvitinh,
      soluongnhaptrenphieu: this.state.soluongnhaptrenphieu,
      soluongnhapthucte: this.state.soluongnhapthucte,
      gianhap: this.state.gianhap,
      giatong: this.state.giatong,
    });
    if (kq.maCode === 6) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
        : toast.error("You are not an admin, please come back!!!");
    }
    if (kq.maCode === 7) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
          )
        : toast.error(
            "You are not an admin or store employee, please leave!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Sửa hóa đơn chi tiết thành công!!!")
        : toast.success("Edit detailed invoice successfully!!!");
      this.setState({
        //idnhaphoa: "",
        //idhoa: "",
        donvitinh: "",
        soluongnhaptrenphieu: "",
        soluongnhapthucte: "",
        gianhap: "",
        giatong: "",
        tatcahoadonchitiet: "",
        trangthai: false,
        trangthainut: false,
        tenhoa: "",
      });
      // await this.laytatcahoa();
      await this.laytatcahoadonchitiet();
    } else {
      this.props.ngonngu === "vi"
        ? toast.error("Sửa hóa đơn chi tiết thất bại!!!")
        : toast.error("Edit detailed invoice failed!!!");
    }
  };

  clickxoahoadonchitiet = async (id) => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apixoahoadonchitiet(id);
    if (kq.maCode === 6) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
        : toast.error("You are not an admin, please come back!!!");
    }
    if (kq.maCode === 7) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
          )
        : toast.error(
            "You are not an admin or store employee, please leave!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Xóa hóa đơn chi tiết thành công!!!")
        : toast.success("Detailed invoice deleted successfully!!!");
      await this.laytatcahoadonchitiet();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Xóa hóa đơn chi tiết thất bại")
        : toast.success("Delete error detailed invoice");
    }
  };

  timkiem = (event) => {
    let timkiem = event.target.value;
    if (timkiem) {
      let clone = _.cloneDeep(this.state.tatcahoadonchitiet);
      clone = clone.filter((item) =>
        (item.maphieunhap ? item.maphieunhap : "")
          .toLowerCase()
          .includes(timkiem.toLowerCase())
      );
      this.setState({
        tatcahoadonchitiet: clone,
      });
    } else {
      this.laytatcahoadonchitiet();
    }
  };

  render() {
    let {
      idnhaphoa,
      nhaphoaArr,
      hoaArr,
      idhoa,
      donvitinh,
      soluongnhapthucte,
      soluongnhaptrenphieu,
      gianhap,
      giatong,
      tenhoa,
      trangthainut,
      trangthai,
      tatcahoadonchitiet,
    } = this.state;
    let { ngonngu } = this.props;
    return (
      <div className="quanlynhaphoachitiet">
        <div className="item1">
          <span><FormattedMessage id="quanlynhaphoachitiet"/></span>
        </div>
        <div className="item11">
          <span className="mr-4 mt-3"><FormattedMessage id="quanlynhaphoachitietbandangmuon"/></span>
          <button
            className={!trangthai ? "btn mb-1" : "btn mb-1 trangthai"}
            disabled={!trangthai}
            onClick={() => this.doitrangthai()}
          >
            <FormattedMessage id="quanlynhaphoachitietthemhoamoi"/>
          </button>
          <button
            className={!trangthai ? "btn mr-3 mb-1 trangthai" : "btn mr-3 mb-1"}
            disabled={trangthai}
            onClick={() => this.doitrangthai()}
          >
            <FormattedMessage id="quanlynhaphoachitietthemhoacu"/>
          </button>
        </div>
        <div className="item2 row">
          <div className="form-group col-4">
            <label><FormattedMessage id="quanlynhaphoachitietmaphieunhap"/></label>
            <select
              className="form-control"
              onChange={(event) => {
                this.onChangeNhap(event, "idnhaphoa");
              }}
              value={idnhaphoa}
            >
              {nhaphoaArr &&
                nhaphoaArr.length > 0 &&
                nhaphoaArr.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.maphieunhap}
                    </option>
                  );
                })}
            </select>
          </div>
          {trangthai === true || trangthainut === true ? (
            <div className="form-group col-4">
              <label><FormattedMessage id="quanlynhaphoachitiettenhoa"/></label>
              <select
                className="form-control"
                onChange={(event) => {
                  this.onChangeNhap(event, "idhoa");
                }}
                value={idhoa}
              >
                {hoaArr &&
                  hoaArr.length > 0 &&
                  hoaArr.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {ngonngu === "vi"
                          ? item.tenhoaVi
                          : item.tenhoaEn
                          ? item.tenhoaEn
                          : "No English name yet!!!"}
                      </option>
                    );
                  })}
              </select>
            </div>
          ) : (
            <div className="form-group col-4">
              <label><FormattedMessage id="quanlynhaphoachitiettenhoa"/></label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => {
                  this.onChangeNhap(event, "tenhoa");
                }}
                value={tenhoa}
              />
            </div>
          )}
          <div className="form-group col-4">
            <label><FormattedMessage id="quanlynhaphoachitietdonvitinh"/></label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "donvitinh");
              }}
              value={donvitinh}
            />
          </div>
          <div className="form-group col-3">
            <label><FormattedMessage id="quanlynhaphoachitietsoluongtrenphieu"/></label>
            <input
              className="form-control"
              type="number"
              onChange={(event) => {
                this.onChangeNhap(event, "soluongnhaptrenphieu");
              }}
              value={soluongnhaptrenphieu}
            />
          </div>
          <div className="form-group col-3">
            <label><FormattedMessage id="quanlynhaphoachitietsoluongthucte"/></label>
            <input
              className="form-control"
              type="number"
              onChange={(event) => {
                this.onChangeNhap(event, "soluongnhapthucte");
              }}
              value={soluongnhapthucte}
            />
          </div>
          <div className="form-group col-3">
            <label><FormattedMessage id="quanlynhaphoachitietgianhap"/></label>
            <input
              className="form-control"
              type="number"
              onChange={(event) => {
                this.onChangeNhap(event, "gianhap");
              }}
              value={gianhap}
            />
          </div>
          <div className="form-group col-3">
            <label><FormattedMessage id="quanlynhaphoachitiettonggia"/></label>
            <input
              className="form-control"
              type="number"
              disabled={true}
              defaultValue={giatong}
            />
          </div>
        </div>

        {trangthainut === false ? (
          trangthai === false ? (
            <button
              className="btn btn-primary"
              onClick={() => this.clickthemhoamoi()}
            >
              <FormattedMessage id="quanlynhaphoachitietthemhoamoi"/>
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => this.clickthemsoluonghoacu()}
            >
              <FormattedMessage id="quanlynhaphoachitietthemhoacu"/>
            </button>
          )
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => this.clickbtnhoadonchitiet()}
          >
            <FormattedMessage id="quanlynhaphoachitietsuahoadonchitet"/>
          </button>
        )}
        <input
          className="form-control timkiemhoadonchitiet"
          placeholder={ngonngu === "vi" ? "Tìm kiếm..." : "Search..."}
          onChange={(event) => this.timkiem(event)}
        />
        <div className="item3">
        <table className="table table-bordered ">
              <thead>
              <tr className="item31">
                <th scope="col"><FormattedMessage id="quanlynhaphoachitietmaphieunhap"/></th>
                <th scope="col"><FormattedMessage id="quanlynhaphoachitiettenhoa"/></th>
                <th scope="col"><FormattedMessage id="quanlynhaphoachitietdonvitinh"/></th>
                <th scope="col"><FormattedMessage id="quanlynhaphoachitietsoluongtrenphieu"/></th>
                <th scope="col"><FormattedMessage id="quanlynhaphoachitietsoluongthucte"/></th>
                <th scope="col"><FormattedMessage id="quanlynhaphoachitietgianhap"/></th>
                <th scope="col"><FormattedMessage id="quanlynhaphoachitiettonggia"/></th>
                <th scope="col"><FormattedMessage id="quanlyhanhdong"/></th>
              </tr>
            </thead>
            <tbody>
              {tatcahoadonchitiet && tatcahoadonchitiet.length > 0
                ? tatcahoadonchitiet.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{item.nhaphoa.maphieunhap}</th>
                        <td>
                          {ngonngu === "vi"
                            ? item.hoa123.tenhoaVi
                            : item.hoa123.tenhoaEn
                            ? item.hoa123.tenhoaEn
                            : "No English name yet!!!"}
                        </td>
                        <td>{item.donvitinh}</td>
                        <td>{item.soluongnhaptrenphieu}</td>
                        <td>{item.soluongnhapthucte}</td>
                        <td>{item.gianhap ? item.gianhap.toLocaleString() : ''} đ</td>
                        <td>{item.giatong ? item.giatong.toLocaleString() : ''} đ</td>
                        <td>
                          <button>
                            <i
                              className="fas fa-edit"
                              onClick={() => this.clicksuahoadonchitiet(item)}
                            ></i>
                          </button>
                          <button>
                            <i
                              className="fas fa-trash"
                              onClick={() =>
                                this.clickxoahoadonchitiet(item.id)
                              }
                            ></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuanLyNhapHoaChiTiet);
