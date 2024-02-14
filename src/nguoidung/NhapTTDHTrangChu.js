import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import "./NhapTTDHTrangChu.scss";
import { apidathangtrangchu } from "../API/ApiTrangChu";
import { apirefreshtoken } from "../API/GoiApi";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import auth from "../FireBase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import VerifyOTP from "./VerifyOTP";
import OtpInput from "react-otp-input";
import LoadingOverlay from "react-loading-overlay";
class NhapTTDHTrangChu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tennguoinhan: "",
      email: "",
      sodienthoai: "",
      diachi: "",
      ghichu: "",
      tongtien: "",
      otp: "",
      loadingdathang: false,
      trangthainhapOTP: false,
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

  tuDongTichCaptCha = () => {
    if (!window.RecaptchVerify) {
      window.RecaptchVerify = new RecaptchaVerifier(
        auth,
        "recaptcha-verifier",
        {
          size: "invisible",
          callback: (response) => {
            console.log({ callback: response });
            // this.guiOTP();
          },
          "expired-callback": (response) => {
            console.log("expired: ", response);
          },
        }
      );
    }
  };

  guiOTP = () => {
    this.setState({
      loadingdathang: true,
    });
    this.tuDongTichCaptCha();
    let verifier = window.RecaptchVerify;
    let formatPhone = "+84" + this.state.sodienthoai.slice(1);
    signInWithPhoneNumber(auth, formatPhone, verifier)
      .then((result) => {
        console.log(result);
        this.props.ngonngu === "vi"
          ? toast.success("Vui lòng kiểm tra tin nhắn để xác nhận OTP")
          : toast.success("Please check your message to confirm OTP");
        window.confirmationResult = result;
        this.setState({
          trangthainhapOTP: true,
          loadingdathang: false,
        });
      })
      .catch((error) => {
        this.setState({
          loadingdathang: false,
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
    this.guiOTP();
    this.setState({
      loadingdathang: true,
    });
    // let token = await apirefreshtoken();
    // if (token.maCode === 10) {
    //   this.props.ngonngu === "vi"
    //     ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
    //     : toast.error("You are not logged in, please log in!!!");
    // }
    // let kq = await apidathangtrangchu({
    //   idnguoidung: this.props.thongtinnguoidung.id,
    //   tennguoinhan: this.state.tennguoinhan,
    //   email: this.state.email,
    //   sodienthoai: this.state.sodienthoai,
    //   diachi: this.state.diachi,
    //   ghichu: this.state.ghichu,
    //   phuongthucvanchuyenid: this.props.phuongthucvanchuyenid,
    //   tongtien: this.props.tongtien,
    //   ngonngu: this.props.ngonngu,
    //   idhoa: this.props.thongtinhoadathang.id,
    //   soluongmua: this.props.thongtinhoadathang.soluongmua,
    //   tongtienhang:
    //     this.props.thongtinhoadathang.soluongmua *
    //     (this.props.ngonngu === "vi"
    //       ? this.props.thongtinhoadathang.giasaukhigiamVND *
    //         this.props.thongtinhoadathang.soluongmua
    //       : this.props.thongtinhoadathang.giasaukhigiamUSD *
    //         this.props.thongtinhoadathang.soluongmua),
    // });
    // if (kq && kq.maCode === 10) {
    //   this.props.ngonngu === "vi"
    //     ? toast.error("Bạn chưa đăng nhập, vui lòng đăng nhập để đặt hàng!!!")
    //     : toast.error(
    //         "You are not logged in, please log in to view your shopping order!!!"
    //       );
    // }
    // if (kq && kq.maCode === 8) {
    //   this.props.ngonngu === "vi"
    //     ? toast.error(
    //         "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
    //       )
    //     : toast.error(
    //         "Your login has expired, please log in again to continue!!!"
    //       );
    // }
    // if (kq && kq.maCode === 9) {
    //   this.props.ngonngu === "vi"
    //     ? toast.error(
    //         "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
    //       )
    //     : toast.error(
    //         "Your login session is invalid, please log in again to continue!!!"
    //       );
    // }
    // if (kq.maCode === 0 && kq) {
    //   this.props.ngonngu === "vi"
    //     ? toast.success("Đặt hàng thành công, chờ nhân viên xác nhận!!!")
    //     : toast.success("Order successful, waiting for staff to confirm!!!");
    //   this.props.huydathang();
    //   this.props.history.push("/trangchu");
    //   // this.props.doitrangthai()
    //   // this.props.dathangthanhcong ()
    //   // this.props.history.push(`/giohang/${this.props.thongtinnguoidung.id}`)
    // } else {
    //   this.props.ngonngu === "vi"
    //     ? toast.success("Đặt hàng thất bại")
    //     : toast.success("Order error");
    // }
  };
  nhapotp = (event) => {
    console.log(event);
    this.setState({
      otp: event,
    });
  };
  xacnhanotp = () => {
    this.setState({
      loadingdathang: true,
    });
    window.confirmationResult
      .confirm(+this.state.otp)
      .then(async (result) => {
        this.setState({ loadingdathang: false });
        let token = await apirefreshtoken();
        if (token.maCode === 10) {
          this.props.ngonngu === "vi"
            ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
            : toast.error("You are not logged in, please log in!!!");
        }
        let kq = await apidathangtrangchu({
          idnguoidung: this.props.thongtinnguoidung.id,
          tennguoinhan: this.state.tennguoinhan,
          email: this.state.email,
          sodienthoai: this.state.sodienthoai,
          diachi: this.state.diachi,
          ghichu: this.state.ghichu,
          phuongthucvanchuyenid: this.props.phuongthucvanchuyenid,
          tongtien: this.props.tongtien,
          ngonngu: this.props.ngonngu,
          idhoa: this.props.thongtinhoadathang.id,
          soluongmua: this.props.thongtinhoadathang.soluongmua,
          tongtienhang:
            this.props.thongtinhoadathang.soluongmua *
            (this.props.ngonngu === "vi"
              ? this.props.thongtinhoadathang.giasaukhigiamVND *
                this.props.thongtinhoadathang.soluongmua
              : this.props.thongtinhoadathang.giasaukhigiamUSD *
                this.props.thongtinhoadathang.soluongmua),
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
            trangthainhapOTP: false,
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
            trangthainhapOTP: false,
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
            trangthainhapOTP: false,
          });
        }
        if (kq.maCode === 0 && kq) {
          this.setState({
            trangthainhapOTP: false,
          });
          this.props.ngonngu === "vi"
            ? toast.success("Đặt hàng thành công, chờ nhân viên xác nhận!!!")
            : toast.success(
                "Order successful, waiting for staff to confirm!!!"
              );
          this.props.huydathang();
          this.props.history.push("/trangchu");
          // this.props.doitrangthai()
          // this.props.dathangthanhcong ()
          // this.props.history.push(`/giohang/${this.props.thongtinnguoidung.id}`)
        } else {
          this.props.ngonngu === "vi"
            ? toast.success("Đặt hàng thất bại")
            : toast.success("Order error");
        }
      })
      .catch((err) => {
        this.setState({ loadingdathang: false });
        this.props.ngonngu === "vi"
          ? toast.error("Xác nhận OTP không đúng vui lòng nhập lại")
          : toast.error("Confirm OTP is incorrect, please re-enter");
      });
  };
  xoaOTP = () => {
    this.setState({
      otp: "",
    });
  };
  guiLaiOTP = () => {
    this.guiOTP();
    this.setState({
      loadingdathang: true,
    });
  };
  render() {
    let {
      trangthainhapthongtin,
      huydathang,
      donhangchitiet,
      phuongthucvanchuyenid,
      ngonngu,
    } = this.props;
    let { trangthainhapOTP, otp, loadingdathang } = this.state;
    let { tennguoinhan, email, sodienthoai, diachi, ghichu } = this.state;
    console.log(otp);
    return (
      <Modal
        isOpen={trangthainhapthongtin}
        className={"nhapthongtindathangtrangchu"}
        size="lg"
        //centered
      >
        <LoadingOverlay
          active={loadingdathang}
          spinner
          text={ngonngu === "vi" ? "Vui lòng chờ..." : "Please wait..."}
          className="loaddingdathang"
        >
          <div className="nhapthongtindathangtrangchu">
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
                disabled={trangthainhapOTP === true ? true : false}
              >
                <FormattedMessage id="nhapttdhhuy" />
              </button>
              <button
                className="btn nutbam"
                onClick={() => this.dathang()}
                disabled={trangthainhapOTP === true ? true : false}
              >
                <FormattedMessage id="nhapttdhxacnhan" />
              </button>
            </div>
            <div id="recaptcha-verifier"></div>
            {trangthainhapOTP && (
              <div className="tranthaiotp">
                <span className=" mr-5 spanotp">
                  <FormattedMessage id="nhapttdhxacnhantxt1"/>{" "}
                  {this.state.sodienthoai} <FormattedMessage id="nhapttdhxacnhantxt2"/>{" "}
                </span>
                <OtpInput
                  value={otp}
                  onChange={(event) => this.nhapotp(event)}
                  numInputs={6}
                  renderSeparator={<span> * </span>}
                  renderInput={(props) => <input {...props} />}
                />
                <div className="xacnhanotp">
                  <button
                    className="btn btn-primary mr-3"
                    onClick={() => this.xacnhanotp()}
                  >
                    <FormattedMessage id="nhapttdhxacnhan"/>
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => this.xoaOTP()}
                  >
                    <FormattedMessage id="nhapttdhxacnhanxoa"/>
                  </button>
                  <span
                    onClick={() => this.guiLaiOTP()}
                    className="ml-3"
                    style={{ cursor: "pointer" }}
                  >
                    <FormattedMessage id="nhapttdhxacnhanguilai"/>
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
    thongtinhoadathang: state.dathanghoa.thongtinhoadathang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NhapTTDHTrangChu)
);
