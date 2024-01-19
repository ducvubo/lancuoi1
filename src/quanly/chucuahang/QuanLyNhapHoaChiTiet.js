import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuanLyNhapHoaChiTiet.scss";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { apitatcahoa, apitatcahoadon,apirefreshtoken } from "../../API/GoiApi";
import { toast } from "react-toastify";
class QuanLyNhapHoaChiTiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nhaphoaArr: [],
      hoaArr: [],

      idnhaphoa: "",
      listChilds: {
        child1: {
          idhoa: "",
          donvitinh: "",
          soluongnhaptrenphieu: "",
          soluongnhapthucte: "",
          gianhap: "",
          giatong: "",
        },
      },
    };
  }

  async componentDidMount() {
    await this.laytatcahoadon();
    await this.laytatcahoa();
  }

  laytatcahoa = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      toast.error("Phiên làm việc đã hết hạn vui lòng đăng nhập lại");
    }

    let kq = await apitatcahoa();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState((prevState) => ({
        hoaArr: data1,
        listChilds: {
          ...prevState.listChilds,
          child1: {
            ...prevState.listChilds.child1,
            idhoa: data1 && data1.length > 0 ? data1[0].id : "",
          },
        },
      }));
    }
  };

  laytatcahoadon = async () => {
    let kq = await apitatcahoadon();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        idnhaphoa: data1 && data1.length > 0 ? data1[0].id : "",
        nhaphoaArr: data1,
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

  handleOnchangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(this.state.listChilds);
    //let _listChilds = {...this.state.listChilds}
    _listChilds[key][name] = value;
    this.setState({
      listChilds: _listChilds,
    });
  };

  handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(this.state.listChilds);
    _listChilds[`child_${uuidv4()}`] = {
      idhoa: "",
      donvitinh: "",
      soluongnhaptrenphieu: "",
      soluongnhapthucte: "",
      gianhap: "",
      giatong: "",
    };
    this.setState({
      listChilds: _listChilds,
    });
  };

  handleDeleInput = (key) => {
    let _listChilds = _.cloneDeep(this.state.listChilds);
    delete _listChilds[key];
    this.setState({
      listChilds: _listChilds,
    });
  };

  render() {
    let { listChilds, idnhaphoa, nhaphoaArr, hoaArr } = this.state;
    console.log(listChilds);
    return (
      <div className="quanlynhaphoachitiet">
        <div className="item1">
          <span>Quản lý nhập hoa chi tiết</span>
        </div>
        <div className="form-group col-12">
          <label>Mã phiếu nhập</label>
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
        <div className="cha">
          {Object.entries(this.state.listChilds).map(([key, child], index) => {
            return (
              <div className="item2 row ml-2" key={`child-${key}`}>
                <div className={`form-group col-3 ${key}`}>
                  <label>Tên hoa</label>
                  <select
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnchangeInput(
                        "idhoa",
                        event.target.value,
                        key
                      );
                    }}
                    value={child.idhoa}
                  >
                    {hoaArr &&
                      hoaArr.length > 0 &&
                      hoaArr.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.tenhoaVi}
                          </option>
                        );
                      })}
                  </select>

                  {/* <input
                    className="form-control"
                    type="text"
                    onChange={(event) => {
                      this.handleOnchangeInput(
                        "idhoa",
                        event.target.value,
                        key
                      );
                    }}
                    value={child.idhoa}
                  /> */}
                </div>
                <div className="form-group col-2">
                  <label>Đơn vị tính</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => {
                      this.handleOnchangeInput(
                        "donvitinh",
                        event.target.value,
                        key
                      );
                    }}
                    value={child.donvitinh}
                  />
                </div>
                <div className="form-group col-2">
                  <label>Số lượng nhập trên phiếu</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => {
                      this.handleOnchangeInput(
                        "soluongnhaptrenphieu",
                        event.target.value,
                        key
                      );
                    }}
                    value={child.soluongnhaptrenphieu}
                  />
                </div>
                <div className="form-group col-2">
                  <label>Số lượng thực tế</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => {
                      this.handleOnchangeInput(
                        "soluongnhapthucte",
                        event.target.value,
                        key
                      );
                    }}
                    value={child.soluongnhapthucte}
                  />
                </div>
                <div className="form-group col-1">
                  <label>Giá nhập</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => {
                      this.handleOnchangeInput(
                        "gianhap",
                        event.target.value,
                        key
                      );
                    }}
                    value={child.gianhap}
                  />
                </div>
                <div className="form-group col-1">
                  <label>Tổng giá</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => {
                      this.handleOnchangeInput(
                        "giatong",
                        event.target.value,
                        key
                      );
                    }}
                    value={child.giatong}
                  />
                </div>
                <div className="mt-5 icon col-1">
                  <label></label>
                  <i
                    className="fas fa-plus-circle ml-2"
                    onClick={() => this.handleAddNewInput()}
                  ></i>
                  <i className="fas fa-arrow-up ml-2"></i>
                  {index >= 1 && (
                    <i
                      className="fas fa-trash ml-2"
                      onClick={() => this.handleDeleInput(key)}
                    ></i>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuanLyNhapHoaChiTiet);
