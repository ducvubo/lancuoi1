import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuanLyNhapHoa.scss";
import {
  apitatcanhanvien,
  apithemhoadon,
  apitatcahoadon,
  apisuahoadon,
  apixoahoadon,
  apirefreshtoken,
} from "../../API/GoiApi";
import { toast } from "react-toastify";
import moment from "moment";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
class QuanLyNhapHoa extends Component {
  constructor(props) {
    super(props);
    const ngay = new Date();
    this.ngayhomnay = ngay.toISOString().split("T")[0];
    this.state = {
      nhanvienArr: [],

      id: "",
      idnhanvien: "",
      maphieunhap: "",
      tennhacungcap: "",
      diachinhacungcap: "",
      sodienthoainhacungcap: "",
      nguoicungcap: "",
      sodienthoainguoicungcap: "",
      ngaynhap: this.ngayhomnay,
      tonghoadon: "",
      tatcahoadon: "",

      trangthainut: false,
    };
  }

  async componentDidMount() {
    await this.laytatcanhanvien();
    await this.laytatcahoadon();
  }

  laytatcanhanvien = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apitatcanhanvien();
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
    if (kq && kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 9) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login session is invalid, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        nhanvienArr: data1,
        idnhanvien: data1 && data1.length > 0 ? data1[0].id : "",
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
    if (kq && kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 9) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login session is invalid, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        tatcahoadon: data1,
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
      "idnhanvien",
      "maphieunhap",
      "tennhacungcap",
      "diachinhacungcap",
      "sodienthoainhacungcap",
      "nguoicungcap",
      "sodienthoainguoicungcap",
      "ngaynhap",
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

  themhoadon = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;

    let kq = await apithemhoadon({
      idnhanvien: this.state.idnhanvien,
      maphieunhap: this.state.maphieunhap,
      tennhacungcap: this.state.tennhacungcap,
      diachinhacungcap: this.state.diachinhacungcap,
      sodienthoainhacungcap: this.state.sodienthoainhacungcap,
      nguoicungcap: this.state.nguoicungcap,
      sodienthoainguoicungcap: this.state.sodienthoainguoicungcap,
      ngaynhap: this.state.ngaynhap,
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
    if (kq && kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 9) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login session is invalid, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Thêm hoa đơn nhập hoa thành công!!!")
        : toast.success("Added flower import order successfully!!!");

      this.setState({
        idnhanvien:
          this.state.nhanvienArr && this.state.nhanvienArr.length > 0
            ? this.state.nhanvienArr[0].id
            : "",
        maphieunhap: "",
        tennhacungcap: "",
        diachinhacungcap: "",
        sodienthoainhacungcap: "",
        nguoicungcap: "",
        sodienthoainguoicungcap: "",
        ngaynhap: this.ngayhomnay,
      });
      await this.laytatcanhanvien();
      await this.laytatcahoadon();
    } else {
      this.props.ngonngu === "vi"
        ? toast.error("Thêm hoa đơn nhập hoa không thành công!!!")
        : toast.error("Added flower import order failed!!!");
    }
  };

  clicksuahoadon = (hoadon) => {
    this.setState({
      id: hoadon.id,
      idnhanvien: hoadon.idnhanvien,
      maphieunhap: hoadon.maphieunhap,
      tennhacungcap: hoadon.tennhacungcap,
      diachinhacungcap: hoadon.diachinhacungcap,
      sodienthoainhacungcap: hoadon.sodienthoainhacungcap,
      nguoicungcap: hoadon.nguoicungcap,
      sodienthoainguoicungcap: hoadon.sodienthoainguoicungcap,
      ngaynhap: moment(hoadon.ngaynhap).format("YYYY-MM-DD"),
      tonghoadon: hoadon.tonghoadon,
      trangthainut: true,
    });
  };

  clickbtnsuahoadon = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apisuahoadon({
      id: this.state.id,
      idnhanvien: this.state.idnhanvien,
      maphieunhap: this.state.maphieunhap,
      tennhacungcap: this.state.tennhacungcap,
      diachinhacungcap: this.state.diachinhacungcap,
      sodienthoainhacungcap: this.state.sodienthoainhacungcap,
      nguoicungcap: this.state.nguoicungcap,
      sodienthoainguoicungcap: this.state.sodienthoainguoicungcap,
      ngaynhap: this.state.ngaynhap,
      tonghoadon: this.state.tonghoadon,
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
    if (kq && kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 9) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login session is invalid, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Sửa hóa đơn thành công!!!")
        : toast.success("Invoice correction successful!!!");
      this.setState({
        id: "",
        idnhanvien:
          this.state.nhanvienArr && this.state.nhanvienArr.length > 0
            ? this.state.nhanvienArr[0].id
            : "",
        maphieunhap: "",
        tennhacungcap: "",
        diachinhacungcap: "",
        sodienthoainhacungcap: "",
        nguoicungcap: "",
        sodienthoainguoicungcap: "",
        ngaynhap: this.ngayhomnay,
        trangthainut: false,
      });
      await this.laytatcahoadon();
    } else {
      this.props.ngonngu === "vi"
        ? toast.error("Sửa hóa đơn thất bại")
        : toast.error("Invoice correction failed!!!");
    }
  };

  clickxoahondon = async (id) => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apixoahoadon(id);
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
    if (kq && kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 9) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login session is invalid, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Xóa hóa đơn thành công!!!")
        : toast.success("Invoice deleted successfully!!!");
      await this.laytatcahoadon();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Xóa hóa đơn thất bại")
        : toast.success("Delete error invoice");
    }
  };

  timkiem = (event) => {
    let timkiem = event.target.value;
    if (timkiem) {
      let clone = _.cloneDeep(this.state.tatcahoadon);
      clone = clone.filter((item) =>
        (item.maphieunhap ? item.maphieunhap : "")
          .toLowerCase()
          .includes(timkiem.toLowerCase())
      );
      this.setState({
        tatcahoadon: clone,
      });
    } else {
      this.laytatcahoadon();
    }
  };

  render() {
    let {
      ngaynhap,
      nhanvienArr,
      idnhanvien,
      maphieunhap,
      tennhacungcap,
      diachinhacungcap,
      sodienthoainhacungcap,
      nguoicungcap,
      sodienthoainguoicungcap,
      tonghoadon,
      tatcahoadon,
      trangthainut,
    } = this.state;
    let { ngonngu } = this.props;
    return (
      <div className="quanlyhoadonnhaphoa">
        <div className="item1">
          <span>
            <FormattedMessage id="quanlynhaphoa" />
          </span>
        </div>
        <div className="item2 row">
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlynhaphoanhanvien" />
            </label>
            <select
              className="form-control"
              onChange={(event) => {
                this.onChangeNhap(event, "idnhanvien");
              }}
              value={idnhanvien}
            >
              {nhanvienArr &&
                nhanvienArr.length > 0 &&
                nhanvienArr.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {ngonngu === "vi"
                        ? `${item.ho} ${item.ten}`
                        : `${item.ten} ${item.ho}`}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlynhaphoamaphieunhap" />
            </label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "maphieunhap");
              }}
              value={maphieunhap}
            />
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlynhaphoangaynhap" />
            </label>
            <input
              className="form-control"
              type="date"
              onChange={(event) => {
                this.onChangeNhap(event, "ngaynhap");
              }}
              value={ngaynhap}
              max={this.ngayhomnay}
            />
          </div>
          <div className="form-group col-2">
            <label>
              <FormattedMessage id="quanlynhaphoatennhacc" />
            </label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "tennhacungcap");
              }}
              value={tennhacungcap}
            />
          </div>
          <div className="form-group col-2">
            <label>
              <FormattedMessage id="quanlynhaphoadiachincc" />
            </label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "diachinhacungcap");
              }}
              value={diachinhacungcap}
            />
          </div>
          <div className="form-group col-2">
            <label>
              <FormattedMessage id="quanlynhaphoasdtncc" />
            </label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "sodienthoainhacungcap");
              }}
              value={sodienthoainhacungcap}
            />
          </div>
          <div className="form-group col-2">
            <label>
              <FormattedMessage id="quanlynhaphoanguoicc" />
            </label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "nguoicungcap");
              }}
              value={nguoicungcap}
            />
          </div>
          <div className="form-group col-2">
            <label>
              <FormattedMessage id="quanlynhaphoasdtnguoicc" />
            </label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "sodienthoainguoicungcap");
              }}
              value={sodienthoainguoicungcap}
            />
          </div>
          <div className="form-group col-2">
            <label>
              <FormattedMessage id="quanlynhaphoatonghoadon" />
            </label>
            <input
              className="form-control"
              type="text"
              disabled={true}
              defaultValue={tonghoadon}
            />
          </div>
        </div>

        {trangthainut === false ? (
          <button className="btn btn-primary" onClick={() => this.themhoadon()}>
            <FormattedMessage id="quanlynhaphoathemhoadon" />
          </button>
        ) : (
          <button
            className="btn btn-warning"
            onClick={() => this.clickbtnsuahoadon()}
          >
            <FormattedMessage id="quanlynhaphoasuahoadon" />
          </button>
        )}
        <input
          className="form-control timkiemhoadon"
          placeholder={ngonngu === "vi" ? "Tìm kiếm..." : "Search..."}
          onChange={(event) => this.timkiem(event)}
        />
        <div className="item3">
          <table className="table table-bordered">
            <thead>
              <tr className="item31">
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="quanlynhaphoanhanvien" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="quanlynhaphoamaphieunhap" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="quanlynhaphoangaynhap" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="quanlynhaphoatennhacc" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="quanlynhaphoatonghoadon" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="quanlyhanhdong" />
                </th>
                <th scope="col" colSpan="4">
                  <FormattedMessage id="quanlynhaphoathongtin" />
                </th>
              </tr>
              <tr className="item31">
                <th scope="col">
                  <FormattedMessage id="quanlynhaphoatenhoa" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlynhaphoasoluong" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlynhaphoagianhap" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlynhaphoagiatong" />
                </th>
              </tr>
            </thead>
            <tbody>
              {tatcahoadon && tatcahoadon.length > 0
                ? tatcahoadon.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td rowSpan={item.hoa123.length + 1}>
                            {item.nhanvien.ten}
                          </td>
                          <td rowSpan={item.hoa123.length + 1}>
                            {item.maphieunhap}
                          </td>
                          <td rowSpan={item.hoa123.length + 1}>
                            {moment(item.ngaynhap).format("DD-MM-YYYY")}
                          </td>
                          <td rowSpan={item.hoa123.length + 1}>
                            {item.tennhacungcap}
                          </td>
                          <td rowSpan={item.hoa123.length + 1}>
                            {item.tonghoadon} đ
                          </td>
                          <td rowSpan={item.hoa123.length + 1}>
                            <button>
                              <i
                                className="fas fa-edit"
                                onClick={() => this.clicksuahoadon(item)}
                              ></i>
                            </button>
                            <button>
                              <i
                                className="fas fa-trash"
                                onClick={() => this.clickxoahondon(item.id)}
                              ></i>
                            </button>
                          </td>
                        </tr>
                        {item.hoa123 && item.hoa123.length > 0
                          ? item.hoa123.map((hoa, hoaIndex) => {
                              return (
                                <tr key={index + "-" + hoaIndex}>
                                  <td>{hoa.hoa123.tenhoavi}</td>
                                  <td>{hoa.soluongnhapthucte}</td>
                                  <td>
                                    {hoa.gianhap
                                      ? hoa.gianhap.toLocaleString()
                                      : ""}{" "}
                                    đ
                                  </td>
                                  <td>
                                    {hoa.giatong
                                      ? hoa.giatong.toLocaleString()
                                      : ""}{" "}
                                    đ
                                  </td>
                                </tr>
                              );
                            })
                          : null}
                      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyNhapHoa);
