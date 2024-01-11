import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import HeaderMenu from "../Admin/menu/HeaderMenu";
import QuanLyNguoiDung from "../quanly/chucuahang/QuanLyNguoiDung";
import DanhMucHoaChiTiet from "../quanly/chucuahang/DanhMucHoaChiTiet";
import DanhMucHoa from "../quanly/chucuahang/DanhMucHoa";
import QuanLyHoa from "../quanly/chucuahang/QuanLyHoa";
class QuanLy extends Component {
  render() {
    let { thongtinnguoidung } = this.props;
    return (
      <>
        {thongtinnguoidung.quyenId === "R1" ||
        thongtinnguoidung.quyenId === "R3" ? (
          <React.Fragment>
            <HeaderMenu />
            <Switch>
              <Route path={"/quanly/quanlynguoidung"} exactcomponent={QuanLyNguoiDung}/>
              <Route path={"/quanly/quanlyhoa"} exact component={QuanLyHoa} />
              <Route path={"/quanly/quanlydanhmuchoa"} exact component={DanhMucHoa}/>
              <Route path={"/quanly/quanlydanhmuchoachitiet"} exact component={DanhMucHoaChiTiet}/>
            </Switch>
          </React.Fragment>
        ) : (
          <div>
            Trang này chỉ dành cho nhân viên và chủ cửa hàng. Nếu bạn là khách
            hàng, vui lòng <Link to={"/home"}>nhấn vào đây</Link>.
          </div>
        )}
      </>

      // <React.Fragment>
      //  {thongtinnguoidung.quyenId === 'R1' || thongtinnguoidung.quyenId === 'R3' ? (<HeaderMenu />
      //   <Switch>
      //     <Route path={"/quanly/quanlynguoidung"} exact component={QuanLyNguoiDung}/>
      //     <Route path={"/quanly/quanlyhoa"} exact component={QuanLyHoa} />
      //     <Route path={"/quanly/quanlydanhmuchoa"} exact component={DanhMucHoa}/>
      //     <Route path={"/quanly/quanlydanhmuchoachitiet"} exact component={DanhMucHoaChiTiet}/>
      //   </Switch>)
      //   : (<div>Trang này chỉ dành cho nhân viên và chủ cửa hàng. Nếu bạn là khách hàng, vui lòng <Link to={"/home"}>nhấn vào đây</Link>.</div>)}
      // </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuanLy);
