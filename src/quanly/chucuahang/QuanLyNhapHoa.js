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
          <span>Quản lý nhập hoa</span>
        </div>
        <div className="item2 row">
          <div className="form-group col-4">
            <label>Nhân viên nhập</label>
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
            <label>Mã phiếu nhập</label>
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
            <label>Ngày nhập</label>
            <input
              className="form-control"
              // type="text"
              type="date"
              onChange={(event) => {
                this.onChangeNhap(event, "ngaynhap");
              }}
              value={ngaynhap}
              min={this.ngayhomnay}
            />
          </div>
          <div className="form-group col-2">
            <label>Tên nhà cung cấp</label>
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
            <label>Địa chỉ nhà cung cấp</label>
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
            <label>Số điện thoại nhà cung cấp</label>
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
            <label>Người cung cấp</label>
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
            <label>Số điện người cung cấp</label>
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
            <label>Tổng hóa đơn</label>
            <input
              className="form-control"
              type="text"
              disabled={true}
              // onChange={(event) => {
              //   this.onChangeNhap(event, "tendanhmucVi");
              // }}
              defaultValue={tonghoadon}
            />
          </div>
        </div>

        {trangthainut === false ? (
          <button className="btn btn-primary" onClick={() => this.themhoadon()}>
            Thêm hóa đơn
          </button>
        ) : (
          <button
            className="btn btn-warning"
            onClick={() => this.clickbtnsuahoadon()}
          >
            Sửa hóa đơn
          </button>
        )}
        <div className="item3">
        <table className="table table-bordered ">
              <thead>
              <tr className="item31">
                <th scope="col">Mã hóa đơn</th>
                <th scope="col">Tên nhân viên</th>
                <th scope="col">Tên nhà cung cấp</th>
                <th scope="col">Địa chỉ nhà cung cấp</th>
                <th scope="col">Số điện thoại nhà cung cấp</th>
                <th scope="col">Người cung cấp</th>
                <th scope="col">Số điện thoại người cung cấp</th>
                <th scope="col">Ngày nhập</th>
                <th scope="col">Tổng hóa đơn</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {tatcahoadon && tatcahoadon.length > 0
                ? tatcahoadon.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{item.maphieunhap}</th>
                        <td>{`${item.nhanvien.ho} ${item.nhanvien.ten}`}</td>
                        <td>{item.tennhacungcap}</td>
                        <td>{item.diachinhacungcap}</td>
                        <td>{item.sodienthoainhacungcap}</td>
                        <td>{item.nguoicungcap}</td>
                        <td>{item.sodienthoainguoicungcap}</td>
                        <td>{moment(item.ngaynhap).format("YYYY-MM-DD")}</td>
                        <td>{item.tonghoadon ? item.tatcahoadon : 0}</td>
                        <td>
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
