import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { ToastContainer, toast } from "react-toastify";
import { Scrollbars } from "react-custom-scrollbars";
import { dangxuat, doiNgonNgu } from "./action/actions";
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
import TimHoa from "./nguoidung/TimHoa";
import DatHang from "./nguoidung/DatHang";
import ThongTinNguoiDung from "./nguoidung/ThongTinNguoiDung";
import TestMap from "./nguoidung/TestMap"
const history = createBrowserHistory();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleStorageChange = (event) => {
    let myVariable = localStorage.getItem("persist:web");
    let parsedData = JSON.parse(myVariable);
    let ngonnguValue = parsedData.ngonngu;
    this.props.doiNgonNgu(ngonnguValue.replace(/^"(.*)"$/, "$1"));
  };

  componentDidMount() {
    if (this.props.thongtinnguoidung) {
      this.props.ngonngu === "vi"
        ? toast.success("Vui lòng mở tin nhắn để không bỏ lỡ thông báo!!!")
        : toast.success(
            "Please open the message so you don't miss the notification!!!"
          );
    }

    window.addEventListener("storage", this.handleStorageChange);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.thongtinnguoidung !== this.props.thongtinnguoidung) {
      this.props.ngonngu === "vi"
        ? toast.success("Vui lòng mở tin nhắn để không bỏ lỡ thông báo!!!")
        : toast.success(
            "Please open the message so you don't miss the notification!!!"
          );
    }
  }

  componentWillUnmount() {
    window.removeEventListener("storage", this.handleStorageChange);
  }

  render() {
    let { thongtinnguoidung } = this.props;
    console.log(this.props.ngonngu);
    return (
      <React.Fragment>
        <Router history={history}>
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
            <Route path={"/thongtinnguoidung"} component={ThongTinNguoiDung} />
            <Route path={"/xacnhantaikhoan"} component={XacNhanTaiKhoan} />
            <Route path={"/quenmk"} component={QuenMK} />
            <Route path={"/doimk"} component={DoiMK} />
            <Route path={"/donhang/:id"} component={QuanLyDonHang} />
            <Route path={"/dathang"} component={DatHang} />
            <Route path={"/timhoa"} component={TimHoa} />
            <Route path={"/map"} component={TestMap} />
            {thongtinnguoidung && thongtinnguoidung.quyenId === "R4" ? (
              <Redirect to={"/trangchu"} />
            ) : (
              <Redirect to={"/quanly/"} />
            )}
          </Switch>
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
    ngonngu: state.web.ngonngu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doiNgonNgu: (ngongu) => dispatch(doiNgonNgu(ngongu)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
