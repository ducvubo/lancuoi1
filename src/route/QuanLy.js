import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import HeaderMenu from "../Admin/menu/HeaderMenu";
import QuanLyNguoiDung from "../quanly/chucuahang/QuanLyNguoiDung";
import DanhMucHoaChiTiet from "../quanly/chucuahang/DanhMucHoaChiTiet";
import DanhMucHoa from "../quanly/chucuahang/DanhMucHoa";
import QuanLyHoa from "../quanly/chucuahang/QuanLyHoa";
class QuanLy extends Component {
  render() {
    return (
      <React.Fragment>
        <HeaderMenu />
        <Switch>
          <Route path={"/quanly/quanlynguoidung"} exact component={QuanLyNguoiDung}/>
          <Route path={"/quanly/quanlyhoa"} exact component={QuanLyHoa} />
          <Route path={"/quanly/quanlydanhmuchoa"} exact component={DanhMucHoa}/>
          <Route path={"/quanly/quanlydanhmuchoachitiet"} exact component={DanhMucHoaChiTiet}/>
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuanLy);
