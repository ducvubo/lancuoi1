import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ThongTinDonHangNguoiDung.scss";
import { Modal } from "reactstrap";
import { toast } from "react-toastify";
import _ from "lodash";
import { apirefreshtoken } from "../API/GoiApi";
import {
  apixacnhandanhanduochang,
  apihuydonhangnguoidung,
  apihoanhanghoantien
} from "../API/ApiTrangChu";
class ThongTinDonHangNguoiDung extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phanhoikhachhang: "",
    };
  }
  componentDidMount() {}

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
    let nhapdaydu = ["phanhoikhachhang"];
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
  huydonhang = async () => {
    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apihuydonhangnguoidung({
      madonhang: this.props.thongtindonhang.madonhang,
      phanhoikhachhang: this.state.phanhoikhachhang,
    });
    if (kq && kq.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn chưa đăng nhập, vui lòng đăng nhập để xem giỏ hàng!!!"
          )
        : toast.error(
            "You are not logged in, please log in to view your shopping cart!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Hủy đơn hàng thành công!!!")
        : toast.success("Order cancel successful!!!");
      this.props.huyxemchitietdonhang();
      this.props.laytatcadonhang();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Hủy đơn hàng thất bại")
        : toast.success("Order cancel failed!!!");
    }
  };

  xacnhandanhanduochang = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apixacnhandanhanduochang({
      madonhang: this.props.thongtindonhang.madonhang,
    });
    if (kq && kq.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn chưa đăng nhập, vui lòng đăng nhập để xem giỏ hàng!!!"
          )
        : toast.error(
            "You are not logged in, please log in to view your shopping cart!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Xác nhận đơn hàng thành công!!!")
        : toast.success("Order confirmation successful!!!");
      this.props.huyxemchitietdonhang();
      this.props.laytatcadonhang();
    } else {
      this.props.ngonngu === "vi"
        ? toast.error("Xác nhận đơn hàng thất bại")
        : toast.error("Order confirmation successful!!!");
    }
  };

  yeucauhoanhanghoantien = async () => {
    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apihoanhanghoantien({
      madonhang: this.props.thongtindonhang.madonhang,
    });
    if (kq && kq.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn chưa đăng nhập, vui lòng đăng nhập để xem giỏ hàng!!!"
          )
        : toast.error(
            "You are not logged in, please log in to view your shopping cart!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Yêu cầu hoàn hàng, hoàn tiền thành công!!!")
        : toast.success("Request to return goods and refund successfully!!!");
      this.props.huyxemchitietdonhang();
      this.props.laytatcadonhang();
    } else {
      this.props.ngonngu === "vi"
        ? toast.error("Yêu cầu hoàn hàng, hoàn tiền thất bại")
        : toast.error("Request to return goods and refund failed!!!");
    }
  };

  render() {
    let {
      thongtindonhang,
      trangthaithongtindonhang,
      huyxemchitietdonhang,
      ngonngu,
    } = this.props;
    let { phanhoikhachhang } = this.state;
    return (
      <div className="thongtindonhang">
        <Modal
          isOpen={trangthaithongtindonhang}
          className={"thongtindonhang"}
          size="xl"
        >
          <div className="thongtindonhangnguoidung">
            <div className="item1">
              <span className="chu ml-3">Thông tin đơn hàng</span>
              <span onClick={huyxemchitietdonhang} className="tat mt-1 mr-1">
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="item2 ml-4 mt-3 mb-3">
              <span>
                <b>Mã đơn hàng:</b> {thongtindonhang.madonhang}
              </span>
              <span>
                <b>Tên người nhận:</b> {thongtindonhang.tennguoinhan}
              </span>
              <span>
                <b>Email:</b> {thongtindonhang.email}
              </span>
              <span>
                <b>Số điện thoại:</b> {thongtindonhang.sodienthoai}
              </span>
              <span>
                <b>Địa chỉ:</b> {thongtindonhang.diachi}
              </span>
              <span>
                <b>Ghi chú:</b> {thongtindonhang.ghichu}
              </span>
              <span>
                <b>Tổng tiền:</b>{" "}
                {`${thongtindonhang.tongtien} ${
                  thongtindonhang.ngonngu === "vi" ? " đ" : " USD"
                }`}
              </span>
              <span>
                <b>Lưu ý của của hàng:</b>
                {thongtindonhang.phanhoicuahang
                  ? thongtindonhang.phanhoicuahang
                  : null}
              </span>
            </div>
            <div className="item3 ml-4 mr-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Tên hoa</th>
                    <th scope="col">Số lượng còn</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng mua</th>
                    <th scope="col">Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {thongtindonhang &&
                  thongtindonhang.hoas &&
                  thongtindonhang.hoas.length > 0
                    ? thongtindonhang.hoas.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {thongtindonhang.ngonngu === "vi"
                              ? item.tenhoaVi
                              : item.tenhoaVi}
                          </td>
                          <td>{item.soluongcon}</td>
                          <td>
                            {thongtindonhang.ngonngu === "vi"
                              ? `${item.giathucVND} đ`
                              : `${item.giathucUSD} USD`}
                          </td>
                          <td>{item.Donhangchitiet.soluongmua}</td>
                          <td>{`${item.Donhangchitiet.tongtien} ${
                            thongtindonhang.ngonngu === "vi" ? " đ" : " USD"
                          }`}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
            {thongtindonhang.trangthaidonhangid === "H1" ||
            thongtindonhang.trangthaidonhangid === "H2" ? (
              <div className="row">
                <div className="form-group col-12 pl-5 pr-5">
                  <label>Lý do</label>
                  <textarea
                    className="form-control"
                    type="text"
                    onChange={(event) => {
                      this.onChangeNhap(event, "phanhoikhachhang");
                    }}
                    value={phanhoikhachhang}
                  ></textarea>
                </div>
              </div>
            ) : null}
            <div className="item4 mb-3">
              {thongtindonhang.trangthaidonhangid === "H1" ||
              thongtindonhang.trangthaidonhangid === "H2" ? (
                <button
                  className="btn nutbam"
                  onClick={() => this.huydonhang()}
                >
                  Hủy đơn hàng
                </button>
              ) : null}
              {thongtindonhang.trangthaidonhangid === "H4" ? (
                <button
                  className="btn nutbam"
                  onClick={() => this.xacnhandanhanduochang()}
                >
                  Đã nhận hàng
                </button>
              ) : null}
              {thongtindonhang.trangthaidonhangid === "H5" ? (
                <button
                  className={
                    "btn nutbam" +
                    (thongtindonhang.trangthaidonhangid === "H5"
                      ? " hoanhang"
                      : "")
                  }
                  onClick={() => this.yeucauhoanhanghoantien()}
                >
                  Hoàn hàng, tiền
                </button>
              ) : null}
              <button
                className={
                  "btn nutbam ml-4" +
                  (thongtindonhang.trangthaidonhangid !== "H1" &&
                  thongtindonhang.trangthaidonhangid !== "H2" &&
                  thongtindonhang.trangthaidonhangid !== "H4" &&
                  thongtindonhang.trangthaidonhangid !== "H5"
                    ? " dong"
                    : "")
                }
                onClick={huyxemchitietdonhang}
              >
                Đóng
              </button>
            </div>
          </div>
        </Modal>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThongTinDonHangNguoiDung);
