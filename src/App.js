import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect,redirect } from "react-router-dom";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import trangChu from "./nguoidung/trangChu";
import QuanLy from "./route/QuanLy";
import NguoiDung from "./route/NguoiDung";
import ThongTinHoa from "./nguoidung/ThongTinHoa";
import DangNhap from "./nguoidung/DangNhap";
import DangKy from "./nguoidung/DangKy";
import XacNhanTaiKhoan from "./nguoidung/XacNhanTaiKhoan";
const history = createBrowserHistory();

class App extends Component {



  render() {
    let { thongtinnguoidung } = this.props;

    return (
      <React.Fragment>
        <Router history={history}>
          <Switch>
            <Route path={"/home"} exact component={trangChu} />
            <Route path={"/quanly/"} component={QuanLy} />
            <Route path={"/thongtinhoa/:id"} component={ThongTinHoa} />
            <Route path={"/dangnhap"} component={DangNhap}/>
            <Route path={"/dangky"} component={DangKy}/>
            <Route path={"/xacnhantaikhoan"} component={XacNhanTaiKhoan}/>

            {thongtinnguoidung && thongtinnguoidung.quyenId === "R1" ? (
              <Redirect to={"/quanly/"} />
            ) : (
              <Redirect to={"/home"} />
            )}
          </Switch>
        </Router>

        <ToastContainer
          position="bottom-right"
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
