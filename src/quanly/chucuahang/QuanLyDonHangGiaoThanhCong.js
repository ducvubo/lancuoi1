import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuanLyDonHangGiaoThanhCong.scss";
import {
  apitatcadonhangtheotrangthai,
  apixacnhandonhang,
  apirefreshtoken,
} from "../../API/GoiApi";
import { toast } from "react-toastify";
import ThongTinDonHang from "./ThongTinDonHang";
import { FormattedMessage } from "react-intl";
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

  laytatcadonhang = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apitatcadonhangtheotrangthai("H5");
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
      let data1 = kq.data;
      this.setState({
        tatcadonhangchovanchuyen: data1,
      });
    }
  };
  render() {
    let { tatcadonhangchovanchuyen } = this.state;
    return (
      <div className="donhanggiaothanhcong">
        <div className="item1">
          <span>
            <FormattedMessage id="quanlydonkhachdanhan" />
          </span>
        </div>
        <div className="item3">
          <table className="table table-bordered ">
            <thead>
              <tr className="item31">
                <th scope="col">
                  <FormattedMessage id="quanlydonhangmadonhang" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlydonhangten" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlydonhangemail" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlydonhangsdt" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlydonhangdiachi" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlydonhangghichu" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlydonhangtongtien" />
                </th>
                {/* <th>
                  <FormattedMessage id="quanlyhanhdong" />
                </th> */}
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
                        {/* <td> */}
                          {/* <button
                            className="btn btn-primary mr-2"
                            onClick={() => this.xemchitietdonhang(item)}
                          >
                            <FormattedMessage id="quanlydonhangxemchitiet" />
                          </button> */}
                          {/* <ThongTinDonHang
                            thongtindonhang={thongtindonhang}
                            trangthaithongtindonhang={trangthaithongtindonhang}
                            huyxemchitietdonhang={this.huyxemchitietdonhang}
                          /> */}
                        {/* </td> */}
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
  return {
    ngonngu:state.web.ngonngu
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuanLyDonHangGiaoThanhCong);
