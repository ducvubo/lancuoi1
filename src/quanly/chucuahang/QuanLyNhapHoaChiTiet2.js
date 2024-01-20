import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuanLyNhapHoaChiTiet.scss";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { apitatcahoa, apitatcahoadon, apirefreshtoken } from "../../API/GoiApi";
import { toast } from "react-toastify";
import Select from "react-select";

class QuanLyNhapHoaChiTiet2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nhaphoaArr: [],
      hoaArr: [],

      idnhaphoa: "",
      inputValue: '',
      danhsachhoadon: [
        {
          idhoa: "",
          donvitinh: "",
          soluongnhaptrenphieu: "",
          soluongnhapthucte: "",
          gianhap: "",
          giatong: "",
        },
      ],
      selectedOption: null,
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
      this.setState({
        hoaArr:data1

      });
      
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

  themHoaNhap = () => {
    const copyState = [
      ...this.state.danhsachhoadon,
      {
        idhoa: "",
        donvitinh: "",
        soluongnhaptrenphieu: "",
        soluongnhapthucte: "",
        gianhap: "",
        giatong: "",
      },
    ];

    this.setState({
      danhsachhoadon: copyState,
    });
  };

  xoaHoaNhap = (index) => {
    const copyState = [...this.state.danhsachhoadon];
    copyState.splice(index, 1);

    this.setState({
      danhsachhoadon: copyState,
    });
  };

  nhapInput = (event, index, id) => {
    const copyState = [...this.state.danhsachhoadon];
    copyState[index][id] = event.target.value;

    this.setState({
      danhsachhoadon: copyState,
    });
  };


  render() {
    let { danhsachhoadon, idnhaphoa, nhaphoaArr, hoaArr } =
      this.state;

    return (
      <div className="quanlynhaphoachitiet">
        <div className="item1">
          <span>Quản lý nhập hoa chi tiết</span>
        </div>
        <div className="form-group col-4 ml-2">
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

        {danhsachhoadon &&
          danhsachhoadon.length > 0 &&
          danhsachhoadon.map((item, index) => {
            return (
              <div className="item2 row ml-2" key={index}>
                <div className="form-group col-2">
                  <label>Tên hoa</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => this.nhapInput(event, index, "idhoa")}
                    //onInputChange={(event) => this.handleInputChange(event,index,'idhoa')}
                    value={item.idhoa}
                  />
                </div>
                <div className="form-group col-1">
                  <label>Đơn vị tính</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) =>
                      this.nhapInput(event, index, "donvitinh")
                    }
                    value={item.donvitinh}
                  />
                </div>
                <div className="form-group col-2">
                  <label>Số lượng nhập trên phiếu</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) =>
                      this.nhapInput(event, index, "soluongnhaptrenphieu")
                    }
                    value={item.soluongnhaptrenphieu}
                  />
                </div>
                <div className="form-group col-2">
                  <label>Thực tế nhập</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) =>
                      this.nhapInput(event, index, "soluongnhapthucte")
                    }
                    value={item.soluongnhapthucte}
                  />
                </div>
                <div className="form-group col-2">
                  <label>Đơn giá</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) =>
                      this.nhapInput(event, index, "gianhap")
                    }
                    value={item.gianhap}
                  />
                </div>
                <div className="form-group col-2">
                  <label>Tổng giá</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) =>
                      this.nhapInput(event, index, "giatong")
                    }
                    value={item.giatong}
                  />
                </div>
                <div className="form-group icon col-1 mt-5">
                  <label></label>
                  <i
                    className="fas fa-plus-circle"
                    onClick={() => this.themHoaNhap()}
                  ></i>
                  {index >= 1 && (
                    <i
                      className="fas fa-trash"
                      onClick={() => this.xoaHoaNhap(index)}
                    ></i>
                  )}
                </div>
              </div>
            );
          })}
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
)(QuanLyNhapHoaChiTiet2);
