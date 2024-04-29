import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import "./NhapThongTinDatHang.scss";
import {
  apidathang,
  apisuagiohang,
  apidathangchuaDN,
} from "../API/ApiTrangChu";
import { apirefreshtoken } from "../API/GoiApi";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import OtpInput from "react-otp-input";
import LoadingOverlay from "react-loading-overlay";
import auth from "../FireBase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import * as actions from "../action/actions";
class NhapThongTinDatHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tennguoinhan: "",
      email: "",
      sodienthoai: "",
      diachi: "",
      ghichu: "",
      tongtien: "",
      trangthainhapOTPgiohang: false,
      otpgiohang: "",
      loadingdathanggiohang: false,

      buildatasuagiohang: "",
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

  tuDongTichCaptChagiohang = () => {
    if (!window.RecaptchVerify) {
      window.RecaptchVerify = new RecaptchaVerifier(
        auth,
        "recaptcha-verifier",
        {
          size: "invisible",
          callback: (response) => {
            // this.guiOTPgiohang();
          },
          "expired-callback": (response) => {},
        }
      );
    }
  };

  guiOTPgiohang = async () => {
    this.setState({
      loadingdathanggiohang: true,
    });
    this.tuDongTichCaptChagiohang();
    let verifier = window.RecaptchVerify;
    let formatPhone = "+84" + this.state.sodienthoai.slice(1);
    let data = await signInWithPhoneNumber(auth, formatPhone, verifier)
      .then((result) => {
        this.props.ngonngu === "vi"
          ? toast.success("Vui lòng kiểm tra tin nhắn để xác nhận OTP")
          : toast.success("Please check your message to confirm OTP");
        window.confirmationResult = result;
        this.setState({
          trangthainhapOTPgiohang: true,
          loadingdathanggiohang: false,
        });
      })
      .catch((error) => {
        this.setState({
          loadingdathanggiohang: false,
        });
        this.props.ngonngu === "vi"
          ? toast.error(
              "Vui lòng nhập đúng số điện thoại, hoặc thử lại sau ít phút!!!"
            )
          : toast.error(
              "Please enter the correct phone number, or try again in a few minutes!!!"
            );
      });
  };

  dathang = async () => {
    this.guiOTPgiohang();
    this.setState({
      loadingdathanggiohang: true,
    });
  
    // if(this.props.thongtinnguoidung){
    //   let token = await apirefreshtoken();
    //   if (token.maCode === 10) {
    //     this.props.ngonngu === "vi"
    //       ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
    //       : toast.error("You are not logged in, please log in!!!");
    //   }
    //   let kq = await apidathang({
    //     idnguoidung: this.props.thongtinnguoidung.id,
    //     tennguoinhan: this.state.tennguoinhan,
    //     email: this.state.email,
    //     sodienthoai: this.state.sodienthoai,
    //     diachi: this.state.diachi,
    //     ghichu: this.state.ghichu,
    //     phuongthucvanchuyenid: this.props.phuongthucvanchuyenid,
    //     tongtien: this.props.tongtien,
    //     donhangchitiet: this.props.donhangchitiet,
    //     ngonngu: this.props.ngonngu,
    //     idgiohangchitietduocchon: this.props.idgiohangchitietduocchon,
    //   });

    //   if (kq && kq.maCode === 10) {
    //     this.props.ngonngu === "vi"
    //       ? toast.error(
    //           "Bạn chưa đăng nhập, vui lòng đăng nhập để đặt hàng!!!"
    //         )
    //       : toast.error(
    //           "You are not logged in, please log in to view your shopping order!!!"
    //         );
    //   }
    //   if (kq && kq.maCode === 8) {
    //     this.props.ngonngu === "vi"
    //       ? toast.error(
    //           "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
    //         )
    //       : toast.error(
    //           "Your login has expired, please log in again to continue!!!"
    //         );
    //   }
    //   if (kq && kq.maCode === 9) {
    //     this.props.ngonngu === "vi"
    //       ? toast.error(
    //           "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
    //         )
    //       : toast.error(
    //           "Your login session is invalid, please log in again to continue!!!"
    //         );
   
    //   }
    //   if (kq.maCode === 0 && kq) {
    //     this.setState({
    //       trangthainhapOTPgiohang: false,
    //     });
    //     this.props.ngonngu === "vi"
    //       ? toast.success("Đặt hàng thành công, chờ nhân viên xác nhận!!!")
    //       : toast.success(
    //           "Order successful, waiting for staff to confirm!!!"
    //         );

    //     this.props.huydathang();
    //     this.props.doitrangthai();
    //     this.props.dathangthanhcong();
    //   } else {
      
    //     this.props.ngonngu === "vi"
    //       ? toast.success("Đặt hàng thất bại")
    //       : toast.success("Order error");
    //   }
    // }else{
    //   let kq = await apidathangchuaDN({
    //     tennguoinhan: this.state.tennguoinhan,
    //     email: this.state.email,
    //     sodienthoai: this.state.sodienthoai,
    //     diachi: this.state.diachi,
    //     ghichu: this.state.ghichu,
    //     phuongthucvanchuyenid: this.props.phuongthucvanchuyenid,
    //     tongtien: this.props.tongtien,
    //     donhangchitiet: this.props.donhangchitiet,
    //     ngonngu: this.props.ngonngu,
    //   });
    //   if (kq.maCode === 0 && kq) {
    //     this.props.ngonngu === "vi"
    //       ? toast.success("Đặt hàng thành công, chờ nhân viên xác nhận!!!")
    //       : toast.success("Order successful, waiting for staff to confirm!!!");
    //     this.props.huydathang();
    //     this.props.doitrangthai();
    //     this.props.dathangthanhcong();
    //     this.props.themmadonhangmoi(kq.madonhang);
    //     let idhoadathangchuaDN = this.props.donhangchitiet.map(
    //       (item) => item.idhoa
    //     );
    //     let datasuagiohang = this.props.thongtingiohangchuadangnhap.filter(
    //       (item) => !idhoadathangchuaDN.includes(parseInt(item.idhoa))
    //     );
    //     this.props.suagiohangchuadangnhap(datasuagiohang);
    //   }
    // }

  };

  nhapotpgiohang = (event) => {
    this.setState({
      otpgiohang: event,
    });
  };

  xacnhanotpgiohang = () => {
    this.setState({
      loadingdathanggiohang: true,
    });
    window.confirmationResult
      .confirm(+this.state.otpgiohang)
      .then(async (result) => {
        this.setState({ loadingdathanggiohang: false });

        if(this.props.thongtinnguoidung){
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
            phuongthucvanchuyenid: this.props.phuongthucvanchuyenid,
            tongtien: this.props.tongtien,
            donhangchitiet: this.props.donhangchitiet,
            ngonngu: this.props.ngonngu,
            idgiohangchitietduocchon: this.props.idgiohangchitietduocchon,
          });
  
          if (kq && kq.maCode === 10) {
            this.props.ngonngu === "vi"
              ? toast.error(
                  "Bạn chưa đăng nhập, vui lòng đăng nhập để đặt hàng!!!"
                )
              : toast.error(
                  "You are not logged in, please log in to view your shopping order!!!"
                );
            this.setState({
              trangthainhapOTPgiohang: false,
            });
          }
          if (kq && kq.maCode === 8) {
            this.props.ngonngu === "vi"
              ? toast.error(
                  "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
                )
              : toast.error(
                  "Your login has expired, please log in again to continue!!!"
                );
            this.setState({
              trangthainhapOTPgiohang: false,
            });
          }
          if (kq && kq.maCode === 9) {
            this.props.ngonngu === "vi"
              ? toast.error(
                  "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
                )
              : toast.error(
                  "Your login session is invalid, please log in again to continue!!!"
                );
            this.setState({
              trangthainhapOTPgiohang: false,
            });
          }
          if (kq.maCode === 0 && kq) {
            this.setState({
              trangthainhapOTPgiohang: false,
            });
            this.props.ngonngu === "vi"
              ? toast.success("Đặt hàng thành công, chờ nhân viên xác nhận!!!")
              : toast.success(
                  "Order successful, waiting for staff to confirm!!!"
                );
  
            this.props.huydathang();
            this.props.doitrangthai();
            this.props.dathangthanhcong();
  
            delete window.confirmationResult;
            delete window.RecaptchVerify;
          } else {
            this.setState({
              trangthainhapOTPgiohang: false,
            });
            this.props.ngonngu === "vi"
              ? toast.success("Đặt hàng thất bại")
              : toast.success("Order error");
          }
        }else{
          let kq = await apidathangchuaDN({
            tennguoinhan: this.state.tennguoinhan,
            email: this.state.email,
            sodienthoai: this.state.sodienthoai,
            diachi: this.state.diachi,
            ghichu: this.state.ghichu,
            phuongthucvanchuyenid: this.props.phuongthucvanchuyenid,
            tongtien: this.props.tongtien,
            donhangchitiet: this.props.donhangchitiet,
            ngonngu: this.props.ngonngu,
          });
          if (kq.maCode === 0 && kq) {
            this.props.ngonngu === "vi"
              ? toast.success("Đặt hàng thành công, chờ nhân viên xác nhận!!!")
              : toast.success("Order successful, waiting for staff to confirm!!!");
            this.props.huydathang();
            this.props.doitrangthai();
            this.props.dathangthanhcong();
            this.props.themmadonhangmoi(kq.madonhang);
            let idhoadathangchuaDN = this.props.donhangchitiet.map(
              (item) => item.idhoa
            );
            let datasuagiohang = this.props.thongtingiohangchuadangnhap.filter(
              (item) => !idhoadathangchuaDN.includes(parseInt(item.idhoa))
            );
            this.props.suagiohangchuadangnhap(datasuagiohang);
          }
        }
      })
      .catch((err) => {
        this.setState({ loadingdathanggiohang: false });
        this.props.ngonngu === "vi"
          ? toast.error("Xác nhận OTP không đúng vui lòng nhập lại")
          : toast.error("Confirm OTP is incorrect, please re-enter");
      });
  };

  xoaOTPgiohang = () => {
    this.setState({
      otpgiohang: "",
    });
  };

  guiLaiOTPgiohang = () => {
    this.guiOTPgiohang();
    this.setState({
      loadingdathanggiohang: true,
    });
  };

  render() {
    let {
      trangthainhapthongtin,
      huydathang,
      donhangchitiet,
      phuongthucvanchuyenid,
      ngonngu,
      idgiohangchitietduocchon,
    } = this.props;
    let {
      tennguoinhan,
      email,
      sodienthoai,
      diachi,
      ghichu,
      trangthainhapOTPgiohang,
      otpgiohang,
      loadingdathanggiohang,
    } = this.state;
    return (
      <Modal
        isOpen={trangthainhapthongtin}
        className={"nhapthongtindathang"}
        size="lg"
        //centered
      >
        <LoadingOverlay
          active={loadingdathanggiohang}
          spinner
          text={ngonngu === "vi" ? "Vui lòng chờ..." : "Please wait..."}
          className="loaddingdathang"
        >
          <div className="nhapthongtindathang">
            <div className="item1">
              <span className="chu ml-3">
                <FormattedMessage id="nhapttdh" />
              </span>
              <span onClick={huydathang} className="tat mt-1 mr-1">
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="item2 row mt-4 ml-3 mr-3 mb-4">
              <div className="form-group col-12">
                <label>
                  <FormattedMessage id="nhapttdhtennhan" />
                </label>
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
                <label>
                  <FormattedMessage id="nhapttdhsdt" />
                </label>
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
                <label>
                  <FormattedMessage id="nhapttdhdiachi" />
                </label>
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
                <label>
                  <FormattedMessage id="nhapttdhghichu" />
                </label>
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
              <button
                className="btn nutbam mr-3"
                onClick={huydathang}
                disabled={trangthainhapOTPgiohang}
              >
                <FormattedMessage id="nhapttdhhuy" />
              </button>
              <button
                className="btn nutbam"
                onClick={() => this.dathang()}
                disabled={trangthainhapOTPgiohang}
              >
                <FormattedMessage id="nhapttdhxacnhan" />
              </button>
            </div>
            <div id="recaptcha-verifier"></div>
            {trangthainhapOTPgiohang && (
              <div className="tranthaiotp">
                <span className=" mr-5 spanotp">
                  <FormattedMessage id="nhapttdhxacnhantxt1" />{" "}
                  {this.state.sodienthoai}{" "}
                  <FormattedMessage id="nhapttdhxacnhantxt2" />{" "}
                </span>
                <OtpInput
                  value={otpgiohang}
                  onChange={(event) => this.nhapotpgiohang(event)}
                  numInputs={6}
                  renderSeparator={<span> * </span>}
                  renderInput={(props) => <input {...props} />}
                />
                <div className="xacnhanotpgiohang">
                  <button
                    className="btn btn-primary mr-3"
                    onClick={() => this.xacnhanotpgiohang()}
                  >
                    <FormattedMessage id="nhapttdhxacnhan" />
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => this.xoaOTPgiohang()}
                  >
                    <FormattedMessage id="nhapttdhxacnhanxoa" />
                  </button>
                  <span
                    onClick={() => this.guiLaiOTPgiohang()}
                    className="ml-3"
                    style={{ cursor: "pointer" }}
                  >
                    <FormattedMessage id="nhapttdhxacnhanguilai" />
                  </span>
                </div>
              </div>
            )}
          </div>
        </LoadingOverlay>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ngonngu: state.web.ngonngu,
    thongtinnguoidung: state.thongtinnguoidung.thongtinnguoidung,
    thongtingiohangchuadangnhap: state.giohanghoa.thongtingiohang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    themmadonhangmoi: (madonhang) =>
      dispatch(actions.themmadonhangmoi(madonhang)),
    suagiohangchuadangnhap: (datathemgiohang) =>
      dispatch(actions.suagiohangchuadangnhap(datathemgiohang)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NhapThongTinDatHang)
);
