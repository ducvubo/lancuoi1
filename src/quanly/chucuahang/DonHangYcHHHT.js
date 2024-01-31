import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DonHangYcHHHT.scss";
import {
  apitatcadonhang,
  apixacnhandaxulyyeucauhoanhanghoantien,
} from "../../API/GoiApi";
import { toast } from "react-toastify";
import ThongTinDonHang from "./ThongTinDonHang";
class DonHangYcHHHT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tatcadonhang: "",
      trangthaithongtindonhang: false,
      thongtindonhang: {},
    };
  }

  async componentDidMount() {
    await this.laytatcadonhang();
  }

  laytatcadonhang = async () => {
    let kq = await apitatcadonhang("H7");
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        tatcadonhang: data1,
      });
    }
  };

  xemchitietdonhang = (thongtindonhang) => {
    this.setState({
      trangthaithongtindonhang: true,
      thongtindonhang: thongtindonhang,
    });
  };

  huyxemchitietdonhang = () => {
    this.setState({
      trangthaithongtindonhang: false,
    });
  };

  render() {
    let { tatcadonhang, trangthaithongtindonhang, thongtindonhang } =
      this.state;
    return (
      <div className="donhangYChoanhanghoantien">
        <div className="item1">
          <span>Quản lý đơn hàng yêu cầu hoàn hàng, hoàn tiền</span>
        </div>
        <div className="item3">
          <table className="table table-bordered ">
            <thead>
              <tr className="item31">
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Tên người nhận</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Ghi chú</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Lý do</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {tatcadonhang && tatcadonhang.length > 0
                ? tatcadonhang.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{item.madonhang}</th>
                        <td>{item.tennguoinhan}</td>
                        <td>{item.sodienthoai}</td>
                        <td>{item.diachi}</td>
                        <td>{item.ghichu}</td>
                        <td>{`${item.tongtien} ${
                          item.ngonngu === "vi" ? "đ" : "USD"
                        }`}</td>
                        <td>{item.phanhoikhachhang}</td>
                        <td>
                          <button
                            className="btn btn-primary mr-2"
                            onClick={() => this.xemchitietdonhang(item)}
                          >
                            Xem chi tiết
                          </button>
                          <ThongTinDonHang
                            thongtindonhang={thongtindonhang}
                            trangthaithongtindonhang={trangthaithongtindonhang}
                            huyxemchitietdonhang={this.huyxemchitietdonhang}
                            laytatcadonhang={this.laytatcadonhang}
                          />
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

export default connect(mapStateToProps, mapDispatchToProps)(DonHangYcHHHT);
