import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuanLyDonHangDaHuy.scss";
import { apitatcadonhang, apixacnhandonhang } from "../../API/GoiApi";
import { toast } from "react-toastify";
import ThongTinDonHang from "./ThongTinDonHang";
class QuanLyDonHangDaHuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thongtindonhang: {},
      tatcadonhang:''
    };
  }

  async componentDidMount() {
    await this.laytatcadonhang();
  }


  laytatcadonhang = async () => {
    let kq = await apitatcadonhang("H6");
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        tatcadonhang: data1,
      });
    }
  };

  render() {
    let { tatcadonhang } = this.state;
    return (
      <div className="donhangdahuy">
        <div className="item1">
          <span>Quản lý đơn hàng đã hủy</span>
        </div>
        <div className="item3">
        <table className="table table-bordered ">
              <thead>
              <tr className="item31">
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Tên người nhận</th>
                <th scope="col">Phản hồi khách hàng</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Ghi chú</th>
                <th scope="col">Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {tatcadonhang && tatcadonhang.length > 0
                ? tatcadonhang.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{item.madonhang}</th>
                        <td>{item.tennguoinhan}</td>
                        <td>{item.email}</td>
                        <td>{item.phanhoicuahang}</td>
                        <td>{item.diachi}</td>
                        <td>{item.ghichu}</td>
                        <td>{`${item.tongtien} ${
                          item.ngonngu === "vi" ? "đ" : "USD"
                        }`}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyDonHangDaHuy);
