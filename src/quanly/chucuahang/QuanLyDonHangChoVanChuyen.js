import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuanLyDonHangChoVanChuyen.scss";
import { apitatcadonhang, apixacnhandondagiaochodonvivanchuyen } from "../../API/GoiApi";
import { toast } from "react-toastify";
import ThongTinDonHang from "./ThongTinDonHang";
class QuanLyDonHangChoVanChuyen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tatcadonhang: "",
    };
  }

  async componentDidMount() {
    await this.laytatcadonhang();
  }

  laytatcadonhang = async () => {
    let kq = await apitatcadonhang("H2");
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        tatcadonhang: data1,
      });
    }
  };

  xacnhandagiaochodonvivanchuyen = async (madonhang) => {
    let kq = await apixacnhandondagiaochodonvivanchuyen({
      madonhang: madonhang,
    });
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Xác nhận đơn hàng thành công!!!")
        : toast.success("Order comfirm successful!!!");
      this.laytatcadonhang()
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Hủy đơn hàng thất bại")
        : toast.success("Order comfirm failed!!!");
        
    }
  }

  render() {
    let { tatcadonhang } = this.state;
    return (
      <div className="donhangchovanchuyen">
        <div className="item1">
          <span>Quản lý đơn hàng chờ vận chuyển</span>
        </div>
        <div className="item3">
          <table className="table">
            <thead className="thead-dark">
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
              {tatcadonhang && tatcadonhang.length > 0
                ? tatcadonhang.map((item, index) => {
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
                            onClick={() => this.xacnhandagiaochodonvivanchuyen(item.madonhang)}
                          >
                            Xác nhận
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuanLyDonHangChoVanChuyen);
