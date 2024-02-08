import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuanLyDonHang.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apidonhangnguoidung } from "../API/ApiTrangChu";
import { toast } from "react-toastify";
import { apirefreshtoken } from "../API/GoiApi";
import ThongTinDonHangNguoiDung from "./ThongTinDonHangNguoiDung";
class QuanLyDonHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thongtindonhang: {},
      tatcadonhang: [],
      trangthaithongtindonhang: false,
    };
  }

  async componentDidMount() {
    await this.laytatcadonhang();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.thongtinnguoidung !== this.props.thongtinnguoidung) {
      this.setState({
        tatcadonhang: [],
      });
    }
  }
  laytatcadonhang = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apidonhangnguoidung(this.props.thongtinnguoidung.id);
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        tatcadonhang: data1,
      });
    }
    if (kq && kq.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn chưa đăng nhập, vui lòng đăng nhập để xem giỏ hàng!!!"
          )
        : toast.error(
            "You are not logged in, please log in to view your shopping cart!!!"
          );
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
    let { ngonngu } = this.props;
    return (
      <>
        <HeaderTrangChu />
        <div className="donhangnguoidung">
          <div className="item1">
            <span>Quản lý đơn hàng</span>
          </div>
          <div className="item3">
            <table className="table table-bordered ">
              <thead>
                <tr>
                  <th scope="col">Mã đơn hàng</th>
                  <th scope="col">Tên người nhận</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Ghi chú</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {tatcadonhang &&
                  tatcadonhang.length > 0 &&
                  tatcadonhang.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.madonhang}</td>
                        <td>{item.tennguoinhan}</td>
                        <td>{item.sodienthoai}</td>
                        <td>{item.diachi}</td>
                        <td>{item.ghichu}</td>
                        <td>
                          {ngonngu === "vi"
                            ? item.trangthaidonhang.tiengViet
                            : item.trangthaidonhang.tiengAnh}
                        </td>
                        <td>
                          {item.ngonngu === "vi"
                            ? `${item.tongtien.toLocaleString()} đ`
                            : `${item.tongtien} USD`}
                        </td>
                        <td>
                          <button
                            className="btn button"
                            onClick={() => this.xemchitietdonhang(item)}
                          >
                            Chi tiết
                          </button>
                          <ThongTinDonHangNguoiDung
                            thongtindonhang={thongtindonhang}
                            trangthaithongtindonhang={trangthaithongtindonhang}
                            huyxemchitietdonhang={this.huyxemchitietdonhang}
                            laytatcadonhang={this.laytatcadonhang}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <FooterTrangChu />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ngonngu: state.web.ngonngu,
    thongtinnguoidung: state.thongtinnguoidung.thongtinnguoidung,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyDonHang);
