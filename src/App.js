import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";
import { Scrollbars } from "react-custom-scrollbars";
import "react-toastify/dist/ReactToastify.css";
import trangChu from "./nguoidung/trangChu";
import QuanLy from "./route/QuanLy";
import ThongTinHoa from "./nguoidung/ThongTinHoa";
import DangNhap from "./nguoidung/DangNhap";
import DangKy from "./nguoidung/DangKy";
import XacNhanTaiKhoan from "./nguoidung/XacNhanTaiKhoan";
import QuenMK from "./nguoidung/QuenMK";
import DoiMK from "./nguoidung/DoiMK";
import GioHang from "./nguoidung/GioHang";
import HoaTheoDanhMucTheoChiTiet from "./nguoidung/HoaTheoDanhMucTheoChiTiet";
import HoaTheoDanhMuc from "./nguoidung/HoaTheoDanhMuc";
import QuanLyDonHang from "./nguoidung/QuanLyDonHang";
import HeaderTrangChu from "./nguoidung/HeaderTrangChu";
import FooterTrangChu from "./nguoidung/FooterTrangChu";
import TimHoa from "./nguoidung/TimHoa";
import DatHang from "./nguoidung/DatHang";
const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoatimduoc: this.props.hoa,
    };
  }

  render() {
    let { thongtinnguoidung, hoatimduoc } = this.props;
    return (
      <React.Fragment>
        <Router history={history}>
          {(thongtinnguoidung && thongtinnguoidung.quyenId === "R1") ||
          thongtinnguoidung.quyenId === "R3" ? null : (
            <HeaderTrangChu />
          )}
          {/* {hoatimduoc  ? <TimHoa/> : null} */}
          <Switch>
            <Route path={"/trangchu"} exact component={trangChu} />
            <Route path={"/quanly/"} component={QuanLy} />
            <Route path={"/thongtinhoa/:id"} component={ThongTinHoa} />
            <Route
              path={"/hoatheodanhmucchitiet/:id"}
              component={HoaTheoDanhMucTheoChiTiet}
            />
            <Route path={"/hoatheodanhmuc/:id"} component={HoaTheoDanhMuc} />
            <Route path={"/giohang/:id"} component={GioHang} />
            <Route path={"/dangnhap"} component={DangNhap} />
            <Route path={"/dangky"} component={DangKy} />
            <Route path={"/xacnhantaikhoan"} component={XacNhanTaiKhoan} />
            <Route path={"/quenmk"} component={QuenMK} />
            <Route path={"/doimk"} component={DoiMK} />
            <Route path={"/donhang/:id"} component={QuanLyDonHang} />
            <Route path={"/dathang"} component={DatHang} />

            {(thongtinnguoidung && thongtinnguoidung.quyenId === "R1") ||
            thongtinnguoidung.quyenId === "R3" ? (
              <Redirect to={"/quanly/"} />
            ) : (
              <Redirect to={"/trangchu"} />
            )}
          </Switch>
          {(thongtinnguoidung && thongtinnguoidung.quyenId === "R1") ||
          thongtinnguoidung.quyenId === "R3" ? null : (
            <FooterTrangChu />
          )}
        </Router>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    thongtinnguoidung: state.thongtinnguoidung.thongtinnguoidung,
    hoa: state.admin.hoa,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
