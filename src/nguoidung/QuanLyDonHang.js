import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuanLyDonHang.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apidonhangnguoidung, apidonhangchuaDN } from "../API/ApiTrangChu";
import { toast } from "react-toastify";
import { apirefreshtoken } from "../API/GoiApi";
import ThongTinDonHangNguoiDung from "./ThongTinDonHangNguoiDung";
import { FormattedMessage } from "react-intl";
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
     await this.laytatcadonhang()
    }
  }
  laytatcadonhang = async () => {
    if (this.props.thongtinnguoidung) {
      let token = await apirefreshtoken();
      if (token.maCode === 10) {
        this.props.ngonngu === "vi"
          ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
          : toast.error("You are not logged in, please log in!!!");
      }
      let kq = await apidonhangnguoidung(this.props.thongtinnguoidung.id);
      if (kq && kq.maCode === 10) {
        this.props.ngonngu === "vi"
          ? toast.error(
              "Bạn chưa đăng nhập, vui lòng đăng nhập để xem đơn hàng!!!"
            )
          : toast.error(
              "You are not logged in, please log in to view your oder!!!"
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
          tatcadonhang: data1,
        });
      }
    } else {
      if(this.props.thongtindonhangchuadangnhap) {
        let kq = await apidonhangchuaDN(this.props.thongtindonhangchuadangnhap);
        if (kq && kq.maCode === 0) {
          let data1 = kq.data;
          this.setState({
            tatcadonhang: data1,
          });
        }
      }else{
       this.props.ngonngu === "vi" ? toast.error("Bạn chưa có đơn hàng nào!!!") : toast.error("You don't have any orders yet!!!")
        this.setState({
          tatcadonhang:[]
        })
      }
     
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
    console.log(tatcadonhang);
    return (
      <>
        <HeaderTrangChu />
        {this.props.thongtinnguoidung ? (
          <div className="donhangnguoidung">
            <div className="item1">
              <span>
                <FormattedMessage id="qldhnd" />
              </span>
            </div>
            <div className="item3">
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th scope="col">
                      <FormattedMessage id="qldhndmadonhang" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="qldhndtennguoinhan" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="qldhndsdt" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="qldhnddiachi" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="qldhndghichu" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="qldhndtrangthai" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="qldhndtongtien" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="quanlyhanhdong" />
                    </th>
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
                              <FormattedMessage id="qldhndchitiet" />
                            </button>
                            <ThongTinDonHangNguoiDung
                              thongtindonhang={thongtindonhang}
                              trangthaithongtindonhang={
                                trangthaithongtindonhang
                              }
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
        ) : (
          <div className="donhangnguoidung">
            <div className="item1">
              <span>
                <FormattedMessage id="qldhnd" />
              </span>
            </div>
            <div className="item3">
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th scope="col">
                      <FormattedMessage id="qldhndmadonhang" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="qldhndtennguoinhan" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="qldhndsdt" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="qldhnddiachi" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="qldhndghichu" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="qldhndtrangthai" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="qldhndtongtien" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="quanlyhanhdong" />
                    </th>
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
                              ? item.trangthaidonhang && item.trangthaidonhang.tiengViet
                              : item.trangthaidonhang && item.trangthaidonhang.tiengAnh}
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
                              <FormattedMessage id="qldhndchitiet" />
                            </button>
                            <ThongTinDonHangNguoiDung
                              thongtindonhang={thongtindonhang}
                              trangthaithongtindonhang={
                                trangthaithongtindonhang
                              }
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
        )}

        <FooterTrangChu />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ngonngu: state.web.ngonngu,
    thongtinnguoidung: state.thongtinnguoidung.thongtinnguoidung,
    thongtindonhangchuadangnhap: state.madonhang.madonhangArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyDonHang);
