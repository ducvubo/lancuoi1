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
  apihoanhanghoantien,
} from "../API/ApiTrangChu";
import { FormattedMessage } from "react-intl";
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
    if (kq && kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 9) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login session is invalid, please log in again to continue!!!"
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
    if (kq && kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 9) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login session is invalid, please log in again to continue!!!"
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
    if (kq && kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 9) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login session is invalid, please log in again to continue!!!"
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
              <span className="chu ml-3">
                <FormattedMessage id="thongtindonhangngdung" />
              </span>
              <span onClick={huyxemchitietdonhang} className="tat mt-1 mr-1">
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="item2 ml-4 mt-3 mb-3">
              <span>
                <b>
                  <FormattedMessage id="thongtindonhangngdungmadonhang" />
                </b>{" "}
                {thongtindonhang.madonhang}
              </span>
              <span>
                <b>
                  <FormattedMessage id="thongtindonhangngdungtennguoinhan" />
                </b>{" "}
                {thongtindonhang.tennguoinhan}
              </span>
              <span>
                <b>Email:</b> {thongtindonhang.email}
              </span>
              <span>
                <b>
                  <FormattedMessage id="thongtindonhangngdungsdt" />
                </b>{" "}
                {thongtindonhang.sodienthoai}
              </span>
              <span>
                <b>
                  <FormattedMessage id="thongtindonhangngdungdiachi" />
                </b>{" "}
                {thongtindonhang.diachi}
              </span>
              <span>
                <b>
                  <FormattedMessage id="qldhndghichu" />
                </b>{" "}
                {thongtindonhang.ghichu}
              </span>
              {thongtindonhang.ngonngu === "vi" ? (
                <span>
                  <b>Giá vận chuyển: </b> {thongtindonhang && thongtindonhang.vanchuyen && thongtindonhang.vanchuyen.giaVND ? thongtindonhang.vanchuyen.giaVND : null} đ
                </span>
              ) : (
                <span>
                  <b>Ship price: </b> {thongtindonhang && thongtindonhang.vanchuyen && thongtindonhang.vanchuyen.giaUSD ? thongtindonhang.vanchuyen.giaUSD : null} USD
                </span>
              )}

              <span>
                <b>
                  <FormattedMessage id="thongtindonhangngdungtongtiendon" />
                </b>{" "}
                {`${thongtindonhang.tongtien} ${
                  thongtindonhang.ngonngu === "vi" ? " đ" : " USD"
                }`}
              </span>
              <span>
                <b>
                  <FormattedMessage id="thongtindonhangngdungluuycuahang" />
                </b>
                {thongtindonhang.phanhoicuahang
                  ? thongtindonhang.phanhoicuahang
                  : null}
              </span>
            </div>
            <div className="item3 ml-4 mr-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">
                      <FormattedMessage id="thongtindonhangngdungtenhoa" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="thongtindonhangngdunggia" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="thongtindonhangngdungsoluongmua" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="thongtindonhangngdungtongtien" />
                    </th>
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

                          <td>
                            {thongtindonhang.ngonngu === "vi"
                              ? `${item.giasaukhigiamVND} đ`
                              : `${item.giasaukhigiamUSD} USD`}
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
                  <label>
                    <FormattedMessage id="thongtindonhangngdunglydo" />
                  </label>
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
                  <FormattedMessage id="thongtindonhangngdunghuydon" />
                </button>
              ) : null}
              {thongtindonhang.trangthaidonhangid === "H4" ? (
                <button
                  className="btn nutbam"
                  onClick={() => this.xacnhandanhanduochang()}
                >
                  <FormattedMessage id="thongtindonhangngdungdanhanhang" />
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
                  <FormattedMessage id="thongtindonhangngdunghoantienhang" />
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
                <FormattedMessage id="thongtindonhangngdungdong" />
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
