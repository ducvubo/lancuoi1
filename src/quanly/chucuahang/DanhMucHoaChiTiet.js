import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../action/actions";
import {
  tatcadanhmuc,
  themdanhmucchitiet,
  tatcadanhmucchitiet,
  apisuadanhmucchitiet,
  apixoadanhmucchitiet,
  apirefreshtoken,
} from "../../API/GoiApi";
import "./DanhMucHoaChiTiet.scss";
import { toast } from "react-toastify";
import _ from "lodash";
import { FormattedMessage } from "react-intl";

class DanhMucHoaChiTiet extends Component {
  constructor(props) {
    super(props);
    this.cuontrendau = React.createRef();
    this.state = {
      danhmuchoaArr: [],

      id: "",
      iddanhmuchoa: "",
      tendanhmucchitietVi: "",
      tendanhmucchitietEn: "",
      tatcadanhmuchoachitiet: "",

      trangthainut: false,
    };
  }

  async componentDidMount() {
    await this.laytatcadanhmuc();
    await this.laytatcadanhmucchitiet();
  }

  laytatcadanhmuc = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await tatcadanhmuc();
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
    let data1 = kq.data;
    if (kq && kq.maCode === 0) {
      this.setState({
        danhmuchoaArr: data1,
        iddanhmuchoa: data1 && data1.length > 0 ? data1[0].id : "",
      });
    }
  };

  laytatcadanhmucchitiet = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await tatcadanhmucchitiet();
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
        tatcadanhmuchoachitiet: data1,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  onChangeNhap = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  ktdanhapthongtinchua = () => {
    let kt = true;
    let nhapdaydu = ["tendanhmucchitietVi", "tendanhmucchitietEn"];
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

  clickthemdanhmucchitiet = async (data) => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;

    let kq = await themdanhmucchitiet({
      iddanhmuchoa: this.state.iddanhmuchoa,
      tendanhmucchitietVi: this.state.tendanhmucchitietVi,
      tendanhmucchitietEn: this.state.tendanhmucchitietEn,
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
    if (kq.maCode === 0 && kq) {
      this.props.ngonngu === "vi"
        ? toast.success("Thêm danh mục chi tiết thành công")
        : toast.success("Add detailed list successfully");
      let iddanhmuc =
        this.state.danhmuchoaArr && this.state.danhmuchoaArr.length > 0
          ? this.state.danhmuchoaArr[0].id
          : "";
      this.setState({
        // id: "",
        // iddanhmuchoa: iddanhmuc,
        tendanhmucchitietVi: "",
        tendanhmucchitietEn: "",
      });
      await this.laytatcadanhmucchitiet();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Thêm danh mục chi tiết thất bại")
        : toast.success("Add failure detail category");
    }
  };

  clicksuadanhmucchitiet = (danhmucchitiet) => {
    this.cuonlendautrang()
    this.setState({
      id: danhmucchitiet.id,
      iddanhmuchoa: danhmucchitiet.iddanhmuchoa,
      tendanhmucchitietVi: danhmucchitiet.tendanhmucchitietVi,
      tendanhmucchitietEn: danhmucchitiet.tendanhmucchitietEn,
      trangthainut: true,
    });
  };

  clickbtnsuadanhmucchitiet = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;
    let kq = await apisuadanhmucchitiet({
      id: this.state.id,
      iddanhmuchoa: this.state.iddanhmuchoa,
      tendanhmucchitietVi: this.state.tendanhmucchitietVi,
      tendanhmucchitietEn: this.state.tendanhmucchitietEn,
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
        ? toast.success("Sửa danh mục chi tiết thành công")
        : toast.success("Edit detailed list successfully");

      let iddanhmuc =
        this.state.danhmuchoaArr && this.state.danhmuchoaArr.length > 0
          ? this.state.danhmuchoaArr[0].id
          : "";
      this.setState({
        id: "",
        // iddanhmuchoa: iddanhmuc,
        tendanhmucchitietVi: "",
        tendanhmucchitietEn: "",
        trangthainut: false,
      });
      await this.laytatcadanhmucchitiet();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Sửa danh mục chi tiết thất bại")
        : toast.success("Edit failure detail category");
    }
  };

  clickxoadanhmucchitiet = async (id) => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apixoadanhmucchitiet(id);
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
        ? toast.success("Xóa danh mục chi tiết thành công")
        : toast.success("Delete detailed list successfully");
      await this.laytatcadanhmucchitiet();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Xóa danh mục chi tiết thất bại")
        : toast.success("Delete error detail category");
    }
  };

  timkiem = (event) => {
    let timkiem = event.target.value;
    if (timkiem) {
      let clone = _.cloneDeep(this.state.tatcadanhmuchoachitiet);
      clone = clone.filter((item) =>
        (this.props.ngonngu === "vi"
          ? (item.tendanhmucchitietVi ? item.tendanhmucchitietVi : '')
          : (item.tendanhmucchitietEn ? item.tendanhmucchitietEn : '')
        )
          .toLowerCase()
          .includes(timkiem.toLowerCase())
      );
      this.setState({
        tatcadanhmuchoachitiet: clone,
      });
    } else {
      this.laytatcadanhmucchitiet();
    }
  };

  cuonlendautrang = () => {
    this.cuontrendau.current?.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    let {
      danhmuchoaArr,
      iddanhmuchoa,
      tendanhmucchitietVi,
      tendanhmucchitietEn,
      tatcadanhmuchoachitiet,
      trangthainut,
    } = this.state;
    let ngonngu = this.props.ngonngu;
    return (
      <div className="danhmuahoachitiet">
        <div ref={this.cuontrendau}/>

        <div className="item1">
          <span>
            <FormattedMessage id="quanlydmct" />
          </span>
        </div>
        <div className="row item2">
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlydmctdmh" />
            </label>
            <select
              className="form-control"
              onChange={(event) => {
                this.onChangeNhap(event, "iddanhmuchoa");
              }}
              value={iddanhmuchoa}
            >
              {danhmuchoaArr &&
                danhmuchoaArr.length > 0 &&
                danhmuchoaArr.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {ngonngu === "vi" ? item.tendanhmucVi : item.tendanhmucEn}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlydmcttendmctVi" />
            </label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "tendanhmucchitietVi");
              }}
              value={tendanhmucchitietVi}
            />
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlydmcttendmctEn" />
            </label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "tendanhmucchitietEn");
              }}
              value={tendanhmucchitietEn}
            />
          </div>
        </div>
        {trangthainut === false ? (
          <button
            className="btn btn-primary"
            onClick={() => this.clickthemdanhmucchitiet()}
          >
            <FormattedMessage id="quanlydmctthemdmct" />
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => this.clickbtnsuadanhmucchitiet()}
          >
            <FormattedMessage id="quanlydmctsuadmct" />
          </button>
        )}
        <input
          className="form-control timkiemdmchitiet"
          placeholder={ngonngu === "vi" ? "Tìm kiếm..." : "Search..."}
          onChange={(event) => this.timkiem(event)}
        />
        <div className="item3">
          <table className="table table-bordered ">
            <thead>
              <tr className="item31">
                <th scope="col">
                  <FormattedMessage id="quanlydmcttendm" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlydmcttendmct" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlyhanhdong" />
                </th>
              </tr>
            </thead>
            <tbody>
              {tatcadanhmuchoachitiet && tatcadanhmuchoachitiet.length > 0
                ? tatcadanhmuchoachitiet.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {ngonngu === "vi"
                            ? item.danhmuc.tendanhmucVi
                            : item.danhmuc.tendanhmucEn}
                        </td>
                        <td>
                          {ngonngu === "vi"
                            ? item.tendanhmucchitietVi
                            : item.tendanhmucchitietEn}
                        </td>
                        <td>
                          <button>
                            <i
                              className="fas fa-edit"
                              onClick={() => this.clicksuadanhmucchitiet(item)}
                            ></i>
                          </button>
                          <button>
                            <i
                              className="fas fa-trash"
                              onClick={() =>
                                this.clickxoadanhmucchitiet(item.id)
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

export default connect(mapStateToProps, mapDispatchToProps)(DanhMucHoaChiTiet);
