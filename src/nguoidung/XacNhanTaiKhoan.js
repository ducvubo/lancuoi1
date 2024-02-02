import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./XacNhanTaiKhoan.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apixacnhantaikhoan } from "../API/ApiTrangChu";
import { withRouter } from "react-router-dom";

class XacNhanTaiKhoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trangthaixacnhan: false,
      maCode: 0,
      email: "",
      linkxacnhan: "",
    };
  }

  async componentDidMount() {
    let urlParams = new URLSearchParams(document.location.search);
    let linkxacnhan = urlParams.get("linkxacnhan");
    let email = urlParams.get("email");
    this.setState({
      email: email,
      linkxacnhan: linkxacnhan,
    });
    let data = await apixacnhantaikhoan({
      linkxacnhan: linkxacnhan,
      email: email,
    });

    if (data && data.maCode === 0) {
      this.setState({
        trangthaixacnhan: true,
        maCode: data.maCode,
      });
    } else {
      this.setState({
        trangthaixacnhan: true,
        maCode: data && data.maCode ? data.maCode : -1,
      });
    }
  }

  render() {
    let { trangthaixacnhan, maCode } = this.state;
    return (
      <>
        {/* <HeaderTrangChu /> */}
        <div className="xacnhantaikhoan">
          {trangthaixacnhan === false ? (
            <div>Đang load</div>
          ) : (
            <div>
              {maCode === 0 ? (
                <div>Đăng ký tài khoản thành công!!!</div>
              ) : (
                <div>Tài khoản không tồn tại hoặc đã được xác nhận!!!</div>
              )}
            </div>
          )}
        </div>
        {/* <FooterTrangChu /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(XacNhanTaiKhoan);
