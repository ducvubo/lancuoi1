import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../action/actions";
import "./DanhMucHoa.scss";
import { FormattedMessage } from "react-intl";
import {
  tatcadanhmuc,
  themdanhmuc,
  apisuadanhmuc,
  apixoadanhmuc,
  apirefreshtoken,
} from "../../API/GoiApi";
import { toast } from "react-toastify";
import _, { debounce } from "lodash";
class DanhMucHoa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iddanhmuc: "",
      tendanhmucVi: "",
      tendanhmucEn: "",
      donoibat: "",
      tatcadanhmuchoa: "",

      trangthainut: false,
    };
  }

  async componentDidMount() {
    await this.laytatcadanhmuc();
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
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        tatcadanhmuchoa: data1,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  onChangeNhap = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  ktdanhapthongtinchua = () => {
    let kt = true;
    let nhapdaydu = ["tendanhmucVi", "tendanhmucEn", "donoibat"];
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

  clickthemdanhmuc = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;
    let kq = await themdanhmuc({
      tendanhmucVi: this.state.tendanhmucVi,
      tendanhmucEn: this.state.tendanhmucEn,
      donoibat: this.state.donoibat,
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
        ? toast.success("Thêm danh mục thành công")
        : toast.success("Added category successfully");
      this.setState({
        tendanhmucVi: "",
        tendanhmucEn: "",
        donoibat: "",
      });
      await this.laytatcadanhmuc();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Thêm danh mục thất bại")
        : toast.success("Add error category");
    }
  };

  clicksuadanhmuc = (danhmuc) => {
    this.setState({
      iddanhmuc: danhmuc.id,
      tendanhmucVi: danhmuc.tendanhmucVi,
      tendanhmucEn: danhmuc.tendanhmucEn,
      donoibat: danhmuc.donoibat,
      trangthainut: true,
    });
  };

  clickbtnsuadanhmuc = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;

    let kq = await apisuadanhmuc({
      id: this.state.iddanhmuc,
      tendanhmucVi: this.state.tendanhmucVi,
      tendanhmucEn: this.state.tendanhmucEn,
      donoibat: this.state.donoibat,
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
        ? toast.success("Sửa danh mục thành công")
        : toast.success("Edit category successfully");
      this.setState({
        iddanhmuc: "",
        tendanhmucVi: "",
        tendanhmucEn: "",
        donoibat: "",
        trangthainut: false,
      });
      await this.laytatcadanhmuc();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Sửa danh mục thất bại")
        : toast.success("Edit error category");
    }
  };

  clickxoadanhmuc = async (id) => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apixoadanhmuc(id);
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
        ? toast.success("Xóa danh mục thành công")
        : toast.success("Delete category successfully");
      await this.laytatcadanhmuc();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Xóa danh mục thất bại")
        : toast.success("Delete error category");
    }
  };

  timkiem = (event) => {
    let timkiem = event.target.value;
    if (timkiem) {
      let clonedanhmuchoa = _.cloneDeep(this.state.tatcadanhmuchoa);
      clonedanhmuchoa = clonedanhmuchoa.filter((item) =>
        (this.props.ngonngu === 'vi' ? (item.tendanhmucVi ? item.tendanhmucVi : '') : (item.tendanhmucEn ? item.tendanhmucEn : '')).toLowerCase().includes(timkiem.toLowerCase())
      );
      this.setState({
        tatcadanhmuchoa: clonedanhmuchoa,
      });
    } else {
      this.laytatcadanhmuc();
    }
  };

  render() {
    let {
      tendanhmucVi,
      tendanhmucEn,
      donoibat,
      tatcadanhmuchoa,
      trangthainut,
    } = this.state;
    let { ngonngu } = this.props;
    return (
      <div className="quanlydanhmuc">
        <div className="item1">
          <span>
            <FormattedMessage id="quanlydanhmuchoa" />
          </span>
        </div>
        <div className="row item2">
          <div className="form-group col-4">
            <label><FormattedMessage id="quanlydmtendmVi"/></label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "tendanhmucVi");
              }}
              value={tendanhmucVi}
            />
          </div>
          <div className="form-group col-4">
            <label><FormattedMessage id="quanlydmtendmEn"/></label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "tendanhmucEn");
              }}
              value={tendanhmucEn}
            />
          </div>
          <div className="form-group col-4">
            <label><FormattedMessage id="quanlydmdonoibat"/></label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.onChangeNhap(event, "donoibat");
              }}
              value={donoibat}
            />
          </div>
        </div>

        {trangthainut === false ? (
          <>
            <button
              className="btn btn-primary"
              onClick={() => this.clickthemdanhmuc()}
            >
              <FormattedMessage id="quanlydmthem"/>
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-primary"
              onClick={() => this.clickbtnsuadanhmuc()}
            >
              <FormattedMessage id="quanlydmsua"/>
            </button>
          </>
        )}
        <input
          className="form-control timkiemdanhmuchoa"
          placeholder={ngonngu === 'vi' ? "Tìm kiếm..." : "Search..."}
          onChange={(event) => this.timkiem(event)}
        />
        <div className="item3">
          <table className="table table-bordered ">
            <thead>
              <tr className="item31">
                <th scope="col"><FormattedMessage id="quanlydmtendm"/></th>
                <th scope="col"><FormattedMessage id="quanlydmdonoibat"/></th>
                <th scope="col"><FormattedMessage id="quanlyhanhdong"/></th>
              </tr>
            </thead>
            <tbody>
              {tatcadanhmuchoa && tatcadanhmuchoa.length > 0
                ? tatcadanhmuchoa.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {ngonngu === "vi"
                            ? item.tendanhmucVi
                            : item.tendanhmucEn}
                        </td>
                        <td>{item.donoibat}</td>
                        <td>
                          <button>
                            <i
                              className="fas fa-edit"
                              onClick={() => this.clicksuadanhmuc(item)}
                            ></i>
                          </button>
                          <button>
                            <i
                              className="fas fa-trash"
                              onClick={() => this.clickxoadanhmuc(item.id)}
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

export default connect(mapStateToProps, mapDispatchToProps)(DanhMucHoa);
