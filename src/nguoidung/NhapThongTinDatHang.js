import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import "./NhapThongTinDatHang.scss";
import { apidathang } from "../API/ApiTrangChu";
import { apirefreshtoken } from "../API/GoiApi";
import { toast } from "react-toastify";
import { withRouter } from 'react-router-dom';
class NhapThongTinDatHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tennguoinhan: "",
      email: "",
      sodienthoai: "",
      diachi: "",
      ghichu: "",
      tongtien:''
    };
  }

  onChangeNhap = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  ktdanhapthongtinchua = () => {
    let kt = true;
    let nhapdaydu = [
      "tennguoinhan",
      "email",
      "sodienthoai",
      "diachi",
      "ghichu",
    ];
    for (let i = 0; i < nhapdaydu.length; i++) {
      if (!this.state[nhapdaydu[i]]) {
        kt = false;
        this.props.ngonngu === "vi"
          ? alert("Vui lòng nhập đầy đủ thông tin")
          : alert("Please enter complete information");
        break;
      }
    }
    return kt;
  };

  dathang = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apidathang({
      idnguoidung: this.props.thongtinnguoidung.id,
      tennguoinhan: this.state.tennguoinhan,
      email: this.state.email,
      sodienthoai: this.state.sodienthoai,
      diachi: this.state.diachi,
      ghichu: this.state.ghichu,
      phuongthucvanchuyenid:this.props.phuongthucvanchuyenid,
      tongtien:this.props.tongtien,
      donhangchitiet:this.props.donhangchitiet,
      ngonngu:this.props.ngonngu,
      idgiohangchitietduocchon:this.props.idgiohangchitietduocchon
    });
    
    if (kq && kq.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn chưa đăng nhập, vui lòng đăng nhập để đặt hàng!!!"
          )
        : toast.error(
            "You are not logged in, please log in to view your shopping order!!!"
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
    if (kq.maCode === 0 && kq) {
      this.props.ngonngu === "vi"
        ? toast.success("Đặt hàng thành công, chờ nhân viên xác nhận!!!")
        : toast.success("Order successful, waiting for staff to confirm!!!");
        this.props.huydathang()
        this.props.doitrangthai()
        this.props.dathangthanhcong ()
        // this.props.history.push(`/giohang/${this.props.thongtinnguoidung.id}`)

    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Đặt hàng thất bại")
        : toast.success("Order error");
    }
  };



  render() {
    let {
      trangthainhapthongtin,
      huydathang,
      donhangchitiet,
      phuongthucvanchuyenid,
      ngonngu
    } = this.props;
    let { tennguoinhan, email, sodienthoai, diachi, ghichu } = this.state;
    return (
      <Modal
        isOpen={trangthainhapthongtin}
        className={"nhapthongtindathang"}
        size="lg"
        //centered
      >
        <div className="nhapthongtindathang">
          <div className="item1">
            <span className="chu ml-3">Thông tin đặt hàng</span>
            <span onClick={huydathang} className="tat mt-1 mr-1">
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="item2 row mt-4 ml-3 mr-3 mb-4">
            <div className="form-group col-12">
              <label>Tên người nhận</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => {
                  this.onChangeNhap(event, "tennguoinhan");
                }}
                value={tennguoinhan}
              />
            </div>
            <div className="form-group col-6">
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => {
                  this.onChangeNhap(event, "email");
                }}
                value={email}
              />
            </div>
            <div className="form-group col-6">
              <label>Số điện thoại</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => {
                  this.onChangeNhap(event, "sodienthoai");
                }}
                value={sodienthoai}
              />
            </div>
            <div className="form-group col-6">
              <label>Địa chỉ</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => {
                  this.onChangeNhap(event, "diachi");
                }}
                value={diachi}
              />
            </div>
            <div className="form-group col-6">
              <label>Ghi chú</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => {
                  this.onChangeNhap(event, "ghichu");
                }}
                value={ghichu}
              />
            </div>
          </div>
          <div className="item3 mb-3">
            <button className="btn nutbam mr-3" onClick={huydathang}>
              Hủy
            </button>
            <button className="btn nutbam" onClick={() => this.dathang()}>
              Xác nhận
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ngonngu : state.web.ngonngu,
    thongtinnguoidung: state.thongtinnguoidung.thongtinnguoidung,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NhapThongTinDatHang));
