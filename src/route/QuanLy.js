import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import HeaderMenu from "../Admin/menu/HeaderMenu";
import QuanLyNguoiDung from "../quanly/chucuahang/QuanLyNguoiDung";
import DanhMucHoaChiTiet from "../quanly/chucuahang/DanhMucHoaChiTiet";
import DanhMucHoa from "../quanly/chucuahang/DanhMucHoa";
import QuanLyHoa from "../quanly/chucuahang/QuanLyHoa";
import QuanLyDonHangChuaXacNhan from "../quanly/chucuahang/QuanLyDonHangChuaXacNhan";
import QuanLyNhapHoa from "../quanly/chucuahang/QuanLyNhapHoa";
import QuanLyNhapHoaChiTiet from "../quanly/chucuahang/QuanLyNhapHoaChiTiet";
import QuanLyDonHangChoVanChuyen from "../quanly/chucuahang/QuanLyDonHangChoVanChuyen";
import QuanLyDonHangDaHuy from "../quanly/chucuahang/QuanLyDonHangDaHuy";
import QuanLyDonHangDangVanChuyen from "../quanly/chucuahang/QuanLyDonHangDangVanChuyen";
import QuanLyDonHangGiaoThanhCong from "../quanly/chucuahang/QuanLyDonHangGiaoThanhCong";
import DonHangDaGiaoDenKH from "../quanly/chucuahang/DonHangDaGiaoDenKH";
import DonHangYcHHHT from "../quanly/chucuahang/DonHangYcHHHT";
import DonHangDaXLHHHT from "../quanly/chucuahang/DonHangDaXLHHHT";
import ms from "../image/ms.png";
import "./QuanLy.scss";
import ChatCuaHang from "../quanly/chucuahang/ChatCuaHang";
import ThongKeBanHoa from "../quanly/chucuahang/ThongKeBanHoa";
 import ThongKeNhapHoa from "../quanly/chucuahang/ThongKeNhapHoa";
class QuanLy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trangthai: false,
    };
  }
  battatchat = () => {
    this.setState({
      trangthai: !this.state.trangthai,
    });
  };

  render() {
    let { thongtinnguoidung } = this.props;
    let { trangthai } = this.state;
    return (
      <div className="quanly">
        {thongtinnguoidung.quyenId === "R1" ||
        thongtinnguoidung.quyenId === "R3" ? (
          <React.Fragment>
            <HeaderMenu />
            <Switch>
              <Route path={"/quanly/quanlyhoa"} exact component={QuanLyHoa} />
              <Route path={"/quanly/quanlynguoidung"} exact component={QuanLyNguoiDung} />
              <Route path={"/quanly/quanlydanhmuchoa"} exact component={DanhMucHoa} />
              <Route path={"/quanly/quanlydanhmuchoachitiet"} exact component={DanhMucHoaChiTiet} />
              <Route path={"/quanly/quanlyhoadonnhaphoa"} exact component={QuanLyNhapHoa}  />
              <Route path={"/quanly/quanlynhaphoachitiet"} exact component={QuanLyNhapHoaChiTiet}  />
              <Route path={"/quanly/quanlydonhangchuaxacnhan"} exact component={QuanLyDonHangChuaXacNhan} />
              <Route path={"/quanly/quanlydonhangchovanchuyen"} exact component={QuanLyDonHangChoVanChuyen} />
              <Route path={"/quanly/quanlydondanggiao"} exact component={QuanLyDonHangDangVanChuyen} />
              <Route path={"/quanly/quanlydondagiaodenkhachhang"} exact component={DonHangDaGiaoDenKH} />
              <Route path={"/quanly/quanlydonkhachdanhan"} exact component={QuanLyDonHangGiaoThanhCong} />
              <Route path={"/quanly/quanlydondahuy"} exact component={QuanLyDonHangDaHuy} />
              <Route path={"/quanly/quanlydonyeucauhoanhanghoantien"} exact component={DonHangYcHHHT} />
              <Route path={"/quanly/quanlydonhangdaxulyhoanhanghoantien"} exact component={DonHangDaXLHHHT} />
              <Route path={"/quanly/thongkenhaphoa"} exact component={ThongKeNhapHoa} />
              <Route path={"/quanly/thongkebanhoa"} exact component={ThongKeBanHoa} />

            </Switch>
          </React.Fragment>
        ) : (
          <div>
            Trang này chỉ dành cho nhân viên và chủ cửa hàng. Nếu bạn là khách
            hàng, vui lòng <Link to={"/trangchu"}>nhấn vào đây</Link>.
          </div>
        )}

        {thongtinnguoidung.idchat === "nhanvien" ? (
          <div className="chat">
            <img className="iconchat" src={ms} onClick={() => this.battatchat()} />
          </div>
        ) : null}

        {trangthai === true ? (
          <div className="manhinhchat">
            <ChatCuaHang />
          </div>
        ) : null}
      </div>
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
