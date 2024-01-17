// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Redirect, Route, Switch } from "react-router-dom";
// import trangChu from "../nguoidung/trangChu";
// import ThongTinHoa from "../nguoidung/ThongTinHoa";
// import DangNhap from "../nguoidung/DangNhap";
// class NguoiDung extends Component {
//   render() {
//     let { thongtinnguoidung } = this.props;
//     let link = thongtinnguoidung ? "/quanly/" : "/trangchu";
//     console.log(thongtinnguoidung.quyenId);
//     return <Redirect to={link} />;
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     thongtinnguoidung: state.thongtinnguoidung.thongtinnguoidung,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(NguoiDung);
