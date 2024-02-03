import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ThongKeBanHoa.scss";
import {
  apithongkebanhoa,
  apitatcadonhang,
  apirefreshtoken,
} from "../../API/GoiApi";
import moment from "moment";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
class ThongKeBanHoa extends Component {
  constructor(props) {
    super(props);
    const ngay = new Date();
    ngay.setDate(ngay.getDate() + 1);
    this.ngayhomnay = ngay.toISOString().split("T")[0];
    this.state = {
      tungay: this.ngayhomnay,
      denngay: this.ngayhomnay,
      thongkebanhoa: "",
      dataexcel: "",
    };
  }

  async componentDidMount() {
    await this.laytatcadonhang();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.tungay !== this.state.tungay ||
      prevState.denngay !== this.state.denngay
    ) {
      this.thongkenhaphoa();
    }
  }
  laytatcadonhang = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apitatcadonhang();
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
        thongkebanhoa: data1,
      });
    }
    let builddataexcel = [];
    if (this.state.thongkebanhoa && this.state.thongkebanhoa.length > 0) {
      let builddataexcel = [
        [
          "Mã đơn hàng",
          "Tên người nhận",
          "Số điện thoại",
          "Địa chỉ",
          "Tổng đơn hàng",
          "Ngày đặt hàng",
          "Trạng thái đơn hàng",
          "Tên hoa",
          "Số lượng mua",
          "Giá tổng",
        ],
      ];

      this.state.thongkebanhoa.map((item) => {
        item.hoas.map((hoa) => {
          let arr = [
            item.madonhang,
            item.tennguoinhan,
            item.sodienthoai,
            item.diachi,
            item.ngonngu === "vi"
              ? `${item.tongtien.toLocaleString()} đ`
              : `${item.tongtien.toLocaleString()} USD`,
            moment(item.createdAt).format("DD-MM-YYYY"),
            this.props.ngonngu === "vi"
              ? item.trangthaidonhang.tiengViet
              : item.trangthaidonhang.tiengAnh,

            this.props.ngonngu === "vi" ? hoa.tenhoaVi : hoa.tenhoaEn,
            hoa.Donhangchitiet.soluongmua,
            item.ngonngu === "vi"
              ? `${hoa.Donhangchitiet.tongtien.toLocaleString()} đ`
              : `${hoa.Donhangchitiet.tongtien.toLocaleString()} USD`,
          ];
          builddataexcel.push(arr);
        });
      });
      this.setState({
        dataexcel: builddataexcel,
      });
    }
  };
  thongkenhaphoa = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apithongkebanhoa({
      tungay: this.state.tungay,
      denngay: this.state.denngay,
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
      let data1 = kq.data;
      this.setState({
        thongkebanhoa: data1,
      });
    }

    let builddataexcel = [];
    if (this.state.thongkebanhoa && this.state.thongkebanhoa.length > 0) {
      let builddataexcel = [
        [
          "Mã đơn hàng",
          "Tên người nhận",
          "Số điện thoại",
          "Địa chỉ",
          "Tổng đơn hàng",
          "Ngày đặt hàng",
          "Trạng thái đơn hàng",
          "Tên hoa",
          "Số lượng mua",
          "Giá tổng",
        ],
      ];

      this.state.thongkebanhoa.map((item) => {
        item.hoas.map((hoa) => {
          let arr = [
            item.madonhang,
            item.tennguoinhan,
            item.sodienthoai,
            item.diachi,
            item.ngonngu === "vi"
              ? `${item.tongtien.toLocaleString()} đ`
              : `${item.tongtien.toLocaleString()} USD`,
            moment(item.createdAt).format("DD-MM-YYYY"),
            this.props.ngonngu === "vi"
              ? item.trangthaidonhang.tiengViet
              : item.trangthaidonhang.tiengAnh,

            this.props.ngonngu === "vi" ? hoa.tenhoaVi : hoa.tenhoaEn,
            hoa.Donhangchitiet.soluongmua,
            item.ngonngu === "vi"
              ? `${hoa.Donhangchitiet.tongtien.toLocaleString()} đ`
              : `${hoa.Donhangchitiet.tongtien.toLocaleString()} USD`,
          ];
          builddataexcel.push(arr);
        });
      });
      this.setState({
        dataexcel: builddataexcel,
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

  xuatexcel = () => {
    const ws = XLSX.utils.aoa_to_sheet(this.state.dataexcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(
      wb,
      `${moment(this.state.tungay).format("DD-MM-YYYY")} đến ${moment(
        this.state.denngay
      ).format("DD-MM-YYYY")}.xlsx`
    );
  };

  render() {
    let { tungay, denngay, dataexcel, thongkebanhoa } = this.state;
    let { ngonngu } = this.props;
    return (
      <div className="thongkenhaphoa">
        <div className="item1">
          <span>Thống kê bán hoa</span>
        </div>
        <div className="row item2">
          <div className="col-2 chonngay">
            <span>Vui lòng chọn ngày thống kê: </span>
          </div>
          <div className="form-group col-4 ml-2">
            <label>Từ ngày</label>
            <input
              className="form-control"
              type="date"
              onChange={(event) => {
                this.onChangeNhap(event, "tungay");
              }}
              value={tungay}
              max={this.ngayhomnay}
            />
          </div>
          <div className="form-group col-4">
            <label>Đến ngày</label>
            <input
              className="form-control"
              type="Date"
              onChange={(event) => {
                this.onChangeNhap(event, "denngay");
              }}
              value={denngay}
              max={this.ngayhomnay}
            />
          </div>
          <button
            disabled={dataexcel ? false : true}
            className="btn btn-primary xuatfileexcel"
            onClick={this.xuatexcel}
          >
            <i className="fas fa-download"></i> Excel
          </button>
        </div>

        <div className="item3">
          <table className="table table-bordered">
            <thead>
              <tr className="item31">
                <th scope="col" rowSpan="2">
                  Mã đơn hàng{" "}
                </th>
                <th scope="col" rowSpan="2">
                  Tên người nhận{" "}
                </th>
                <th scope="col" rowSpan="2">
                  Số điện thoại{" "}
                </th>
                <th scope="col" rowSpan="2">
                  Địa chỉ{" "}
                </th>
                <th scope="col" rowSpan="2">
                  Tổng đơn hàng{" "}
                </th>
                <th scope="col" rowSpan="2">
                  Ngày đặt hàng{" "}
                </th>
                <th scope="col" rowSpan="2">
                  Trạng thái đơn hàng{" "}
                </th>
                <th scope="col" colSpan="3">
                  Thông tin
                </th>
              </tr>
              <tr className="item31">
                <th scope="col">Tên hoa</th>
                <th scope="col">Số lượng mua</th>
                <th scope="col">Giá tổng</th>
              </tr>
            </thead>
            <tbody>
              {thongkebanhoa && thongkebanhoa.length > 0
                ? thongkebanhoa.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td rowSpan={item.hoas.length + 1}>
                            {item.madonhang}
                          </td>
                          <td rowSpan={item.hoas.length + 1}>
                            {item.tennguoinhan}
                          </td>
                          <td rowSpan={item.hoas.length + 1}>
                            {item.sodienthoai}
                          </td>
                          <td rowSpan={item.hoas.length + 1}>{item.diachi}</td>
                          <td rowSpan={item.hoas.length + 1}>
                            {item.ngonngu === "vi"
                              ? `${item.tongtien.toLocaleString()} đ`
                              : `${item.tongtien.toLocaleString()} USD`}
                          </td>
                          <td rowSpan={item.hoas.length + 1}>
                            {moment(item.createdAt).format("DD-MM-YYYY")}
                          </td>
                          <td rowSpan={item.hoas.length + 1}>
                            {ngonngu === "vi"
                              ? item.trangthaidonhang.tiengViet
                              : item.trangthaidonhang.tiengAnh}
                          </td>
                        </tr>

                        {item.hoas && item.hoas.length > 0
                          ? item.hoas.map((hoa, hoaIndex) => {
                              return (
                                <tr key={index + "-" + hoaIndex}>
                                  <td>
                                    {ngonngu === "vi"
                                      ? hoa.tenhoaVi
                                      : hoa.tenhoaEn}
                                  </td>
                                  <td>{hoa.Donhangchitiet.soluongmua}</td>
                                  <td>
                                    {item.ngonngu === "vi"
                                      ? `${hoa.Donhangchitiet.tongtien.toLocaleString()} đ`
                                      : `${hoa.Donhangchitiet.tongtien.toLocaleString()} USD`}
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

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeBanHoa);
