import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../action/actions";
import {
  tatcadanhmuc,
  themdanhmucchitiet,
  tatcadanhmucchitiet,
  apisuadanhmucchitiet,
  apixoadanhmucchitiet,
} from "../../API/GoiApi";
import "./DanhMucHoaChiTiet.scss";
import { toast } from "react-toastify";

class DanhMucHoaChiTiet extends Component {
  constructor(props) {
    super(props);
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
    let kq = await tatcadanhmuc();
    let data1 = kq.data;
    if (kq && kq.maCode === 0) {
      this.setState({
        danhmuchoaArr: data1,
        iddanhmuchoa: data1 && data1.length > 0 ? data1[0].id : "",
      });
    }
  };

  laytatcadanhmucchitiet = async () => {
    let kq = await tatcadanhmucchitiet();
    if (kq && kq.maCode === 0) {
    let data1 = kq.data;
      this.setState({
        tatcadanhmuchoachitiet: data1,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    // if(prevState.danhmuchoaArr !== this.state.danhmuchoaArr){
    //   this.setState({
    //     danhmuchoaArr: this.state.danhmuchoaArr,
    //     iddanhmuchoa: this.state.iddanhmuchoa
    //   })
    // }
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
    let arrCheck = ["tendanhmucchitietVi", "tendanhmucchitietEn"];
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

  clickthemdanhmucchitiet = async (data) => {
    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;

    let kq = await themdanhmucchitiet({
      iddanhmuchoa: this.state.iddanhmuchoa,
      tendanhmucchitietVi: this.state.tendanhmucchitietVi,
      tendanhmucchitietEn: this.state.tendanhmucchitietEn,
    });
    if (kq.maCode === 0 && kq) {
      this.props.ngonngu === "vi"
        ? toast.success("Thêm danh mục chi tiết thành công")
        : toast.success("Add detailed list successfully");
      let iddanhmuc =
        this.state.danhmuchoaArr && this.state.danhmuchoaArr.length > 0
          ? this.state.danhmuchoaArr[0].id
          : "";
      this.setState({
        id: "",
        iddanhmuchoa: iddanhmuc,
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
    this.setState({
      id: danhmucchitiet.id,
      iddanhmuchoa: danhmucchitiet.iddanhmuchoa,
      tendanhmucchitietVi: danhmucchitiet.tendanhmucchitietVi,
      tendanhmucchitietEn: danhmucchitiet.tendanhmucchitietEn,
      trangthainut: true,
    });
  };

  clickbtnsuadanhmucchitiet = async () => {
    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;

    let kq = await apisuadanhmucchitiet({
      id: this.state.id,
      iddanhmuchoa: this.state.iddanhmuchoa,
      tendanhmucchitietVi: this.state.tendanhmucchitietVi,
      tendanhmucchitietEn: this.state.tendanhmucchitietEn,
    });
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
        iddanhmuchoa: iddanhmuc,
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
    let kq = await apixoadanhmucchitiet(id);
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
        <div className="item1">
          <span>Quản lý danh mục hoa chi tiết</span>
        </div>
        <div className="row item2">
          <div className="form-group col-4">
            <label>Danh mục hoa</label>
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
            <label>Tên danh mục chi tiết tiếng Việt</label>
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
            <label>Tên danh mục chi tiết tiếng Anh</label>
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
            Thêm danh mục
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => this.clickbtnsuadanhmucchitiet()}
          >
            Sửa danh mục
          </button>
        )}
        <div className="item3">
          <table className="table">
            <thead className="thead-dark">
              <tr className="item31">
                <th scope="col">id</th>
                <th scope="col">Tên danh mục</th>
                <th scope="col">Tên danh mục chi tiết tiếng Việt</th>
                <th scope="col">Tên danh mục chi tiết tiếng Anh</th>
                <th scope="col">Tên danh mục tiếng Việt</th>
                <th scope="col">Tên danh mục tiếng Anh</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {tatcadanhmuchoachitiet && tatcadanhmuchoachitiet.length > 0
                ? tatcadanhmuchoachitiet.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{item.id}</th>
                        <td>{item.iddanhmuchoa}</td>
                        <td>{item.tendanhmucchitietVi}</td>
                        <td>{item.tendanhmucchitietEn}</td>
                        <td>{item.danhmuc && item.danhmuc.tendanhmucVi}</td>
                        <td>{item.danhmuc && item.danhmuc.tendanhmucEn}</td>
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
