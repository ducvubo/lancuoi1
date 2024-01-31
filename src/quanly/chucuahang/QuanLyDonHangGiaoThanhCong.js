import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuanLyDonHangGiaoThanhCong.scss";
import { apitatcadonhang, apixacnhandonhang } from "../../API/GoiApi";
import { toast } from "react-toastify";
import ThongTinDonHang from "./ThongTinDonHang";
class QuanLyDonHangGiaoThanhCong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tatcadonhangchovanchuyen: "",
      trangthaithongtindonhang: false,
      thongtindonhang: {},
    };
  }

  async componentDidMount() {
    await this.laytatcadonhang();
  }

  // async componentDidUpdate(prevState) {
  //   if (
  //     prevState.tatcadonhangchovanchuyen !== this.state.tatcadonhangchovanchuyen
  //   ) {
  //     await this.laytatcadonhang();
  //   }
  // }

  laytatcadonhang = async () => {
    let kq = await apitatcadonhang("H5");
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        tatcadonhangchovanchuyen: data1,
      });
    }
  };

  //   xemchitietdonhang = (thongtindonhang) => {
  //     this.setState({
  //       trangthaithongtindonhang: true,
  //       thongtindonhang: thongtindonhang,
  //     });
  //   };

  //   huyxemchitietdonhang = () => {
  //     this.setState({
  //       trangthaithongtindonhang: false,
  //     });
  //   };
  render() {
    let { tatcadonhangchovanchuyen } = this.state;
    return (
      <div className="donhanggiaothanhcong">
        <div className="item1">
          <span>Quản lý đơn hàng đã giao thành công</span>
        </div>
        <div className="item3">
        <table className="table table-bordered ">
              <thead>
              <tr className="item31">
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Tên người nhận</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Ghi chú</th>
                <th scope="col">Tổng tiền</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {tatcadonhangchovanchuyen && tatcadonhangchovanchuyen.length > 0
                ? tatcadonhangchovanchuyen.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{item.madonhang}</th>
                        <td>{item.tennguoinhan}</td>
                        <td>{item.email}</td>
                        <td>{item.sodienthoai}</td>
                        <td>{item.diachi}</td>
                        <td>{item.ghichu}</td>
                        <td>{`${item.tongtien} ${
                          item.ngonngu === "vi" ? "đ" : "USD"
                        }`}</td>
                        <td>
                          <button
                            className="btn btn-primary mr-2"
                            onClick={() => this.xemchitietdonhang(item)}
                          >
                            Xem chi tiết
                          </button>
                          {/* <ThongTinDonHang
                            thongtindonhang={thongtindonhang}
                            trangthaithongtindonhang={trangthaithongtindonhang}
                            huyxemchitietdonhang={this.huyxemchitietdonhang}
                          /> */}
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuanLyDonHangGiaoThanhCong);
