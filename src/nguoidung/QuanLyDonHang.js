import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuanLyDonHang.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
class QuanLyDonHang extends Component {
  render() {
    return (
      <>
        <HeaderTrangChu />
        <div className="quanlydonhang">Quản lý đơn hàng</div>
        <FooterTrangChu />
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

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyDonHang);
