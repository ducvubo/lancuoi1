import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ChatKhachHang.scss";
import { apidoanchatkhachang } from "../API/GoiApi";
import Xulyanh from "../XuLyAnh/Xulyanh";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { apirefreshtoken } from "../API/GoiApi";
import { toast } from "react-toastify";
class ChatKhachHang extends Component {
  constructor(props) {
    super(props);
    this.cuonxuongduoi = React.createRef();
    this.state = {
      ws: null,
      anhUrl: "",
      anh: "",
      xemanh: false,
      tinnhanmoi: "",
      tinnhanArr: [],
      tennguoinhan: "",
    };
  }

  async componentDidMount() {
    this.props.tatthongbaotinnhanmoingdung();
    let kq = await this.laydoanchatkhachhang();
    if (kq !== -1) {
      this.ketnoiws();
    }
  }

  ketnoiws = () => {
    const ws = new WebSocket("ws://localhost:8080");
    this.setState({
      ws: ws,
    });
    ws.addEventListener("message", this.xuLyDataTuServerTraVe);
    ws.addEventListener("close", () => {
      setTimeout(() => {
        console.log("Ket noi lai");
        this.ketnoiws();
      }, 3000);
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.tinnhanArr !== this.state.tinnhanArr) {
      this.xemtinhanmoinhat();

      this.setState({
        tinnhanArr: this.state.tinnhanArr,
      });
    }
    if (prevState.tennguoinhan !== this.state.tennguoinhan) {
      this.xemtinhanmoinhat();
    }
  }

  laydoanchatkhachhang = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
      this.props.tatchat();
      return -1;
    }
    let kq = await apidoanchatkhachang(this.props.thongtinnguoidung.idchat);
    if (kq && kq.maCode === 8) {
      this.props.tatchat();
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
      return -1;
    }
    if (kq && kq.maCode === 9) {
      this.props.tatchat();
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login session is invalid, please log in again to continue!!!"
          );
      return -1;
    }
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState((prevState) => ({
        tinnhanArr: [...prevState.tinnhanArr, ...data1],
      }));
    }
  };

  xuLyDataTuServerTraVe = (ev) => {
    const tinnhandata = JSON.parse(ev.data);
    if ("noidung" in tinnhandata) {
      this.setState((prevState) => ({
        tinnhanArr: [
          ...prevState.tinnhanArr,
          {
            ...tinnhandata,
          },
        ],
      }));
      this.props.thongbaotinnhanmoingdung();
    }
  };

  nhapTinNhan = (event) => {
    this.setState({
      tinnhanmoi: event.target.value,
    });
  };

  guitinnhan = () => {
    this.state.ws.send(
      JSON.stringify({
        tennguoinhan: "Cua hang",
        tennguoigui: this.props.thongtinnguoidung.ten,
        nguoinhan: "nhanvien",
        noidung: this.state.tinnhanmoi ? this.state.tinnhanmoi : null,
        anh: this.state.anh ? this.state.anh : null,
        thoigian: Date.now(),
      })
    );
    this.setState((prevState) => ({
      tinnhanArr: [
        ...prevState.tinnhanArr,
        {
          anh: this.state.anh ? this.state.anh : null,
          noidung: this.state.tinnhanmoi ? this.state.tinnhanmoi : null,
          nguoigui: this.props.thongtinnguoidung.idchat,
          nguoinhan: "nhanvien",
          thoigian: Date.now(),
        },
      ],
      tinnhanmoi: "",
      anh: "",
      anhUrl: "",
    }));
  };

  onChangexemanhchat = async (event) => {
    let data = event.target.files;
    let fileanh = data[0];
    if (fileanh) {
      let anhbase64 = await Xulyanh.getBase64(fileanh);
      let Url = URL.createObjectURL(fileanh);
      this.setState({
        anhUrl: Url,
        anh: anhbase64,
      });
    }
  };
  nhanxemanhchat = () => {
    if (!this.state.anhUrl) return;
    this.setState({
      xemanh: true,
    });
  };

  xoaanh = () => {
    this.setState({
      anh: "",
      anhUrl: "",
    });
  };
  guitinnhanenter = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.guitinnhan();
    }
  };

  xemtinhanmoinhat = () => {
    this.cuonxuongduoi.current?.scrollIntoView({ behavior: "smooth" });
  };

  xemdanhdagui = (anh) => {
    this.setState({
      anh: anh,
      xemanh: true,
    });
  };

  render() {
    let { tinnhanmoi, tinnhanArr, anhUrl, xemanh } = this.state;
    let { ngonngu } = this.props;
    return (
      <div className="chatkhachhang">
        <div className="container-fluid h-100">
          <div className="row justify-content-center h-100">
            <div className="col-md-8 col-xl-3 chat">
              <div className="card">
                <div className="card-header msg_head">
                  <div className="d-flex bd-highlight">
                    <div className="user_info">
                      <span>
                        <b>HHFLOWER</b>
                      </span>
                    </div>
                  </div>
                </div>
                <>
                  <div className="card-body msg_card_body">
                    {tinnhanArr.map((item, index) => {
                      if (
                        item.nguoinhan === this.props.thongtinnguoidung.idchat
                      ) {
                        let anh = "";
                        if (item.anh) {
                          anh = new Buffer(item.anh, "base64").toString(
                            "binary"
                          );
                        }
                        if (
                          item.noidung === null &&
                          "nhanvien" === item.nguoigui &&
                          item.tennguoigui &&
                          item.tennguoinhan
                        ) {
                          return (
                            <div
                              className="d-flex justify-content-start mb-4"
                              key={index}
                            >
                              {typeof item.anh === "object" ? (
                                <img
                                  className="tinnhananh"
                                  src={
                                    "nhanvien" === item.nguoigui ||
                                    "nhanvien" === item.nguoinhan
                                      ? `${anh ? anh : ""} `
                                      : null
                                  }
                                  width={"100px"}
                                  height={"100px"}
                                  onClick={() => this.xemdanhdagui(anh)}
                                />
                              ) : (
                                <img
                                  className="tinnhananh"
                                  src={
                                    "nhanvien" === item.nguoigui ||
                                    "nhanvien" === item.nguoinhan
                                      ? `${item.anh ? item.anh : ""} `
                                      : null
                                  }
                                  width={"100px"}
                                  height={"100px"}
                                  onClick={() => this.xemdanhdagui(item.anh)}
                                />
                              )}
                              {xemanh === true && (
                                <Lightbox
                                  mainSrc={this.state.anh}
                                  onCloseRequest={() =>
                                    this.setState({ xemanh: false })
                                  }
                                />
                              )}
                            </div>
                          );
                        }
                        if (item.noidung && "nhanvien" === item.nguoigui) {
                          return (
                            <div
                              className="d-flex justify-content-start mb-4"
                              key={index}
                            >
                              <div className="msg_cotainer_send">
                                {"nhanvien" === item.nguoigui ||
                                "nhanvien" === item.nguoinhan
                                  ? `${item.noidung ? item.noidung : ""} `
                                  : null}
                              </div>
                            </div>
                          );
                        }
                      } else if (
                        item.nguoigui === this.props.thongtinnguoidung.idchat
                      ) {
                        let anh = "";
                        if (item.anh) {
                          anh = new Buffer(item.anh, "base64").toString(
                            "binary"
                          );
                        }
                        if (
                          item.noidung === null &&
                          "nhanvien" === item.nguoinhan
                        ) {
                          if (typeof item.anh === "object") {
                            return (
                              <div
                                className="d-flex justify-content-end mb-4"
                                key={index}
                              >
                                <img
                                  className="tinnhananh"
                                  src={anh ? anh : ""}
                                  width={"100px"}
                                  height={"100px"}
                                  onClick={() => this.xemdanhdagui(anh)}
                                />
                                {xemanh === true && (
                                  <Lightbox
                                    mainSrc={this.state.anh}
                                    onCloseRequest={() =>
                                      this.setState({ xemanh: false })
                                    }
                                  />
                                )}
                              </div>
                            );
                          } else {
                            return (
                              <div
                                className="d-flex justify-content-end mb-4"
                                key={index}
                              >
                                <img
                                  className="tinnhananh"
                                  src={item.anh ? item.anh : ""}
                                  width={"100px"}
                                  height={"100px"}
                                  onClick={() => this.xemdanhdagui(item.anh)}
                                />
                                {xemanh === true && (
                                  <Lightbox
                                    mainSrc={this.state.anh}
                                    onCloseRequest={() =>
                                      this.setState({ xemanh: false })
                                    }
                                  />
                                )}
                              </div>
                            );
                          }
                        }
                      }
                      if (item.noidung && item.nguoinhan === "nhanvien") {
                        return (
                          <div
                            className="d-flex justify-content-end mb-4"
                            key={index}
                          >
                            <div className="msg_cotainer">
                              {item.noidung ? item.noidung : ""}
                            </div>
                          </div>
                        );
                      }
                    })}
                    <div ref={this.cuonxuongduoi} />
                  </div>
                  <div className="card-footer">
                    <div className="input-group">
                      <div className="input-group-append">
                        <span className="input-group-text attach_btn">
                          <label htmlFor="anhchat">
                            <i className="fas fa-paperclip"></i>
                          </label>
                          <input
                            id="anhchat"
                            type="file"
                            hidden
                            accept="image/jpeg, image/png, image/gif"
                            onChange={(event) => this.onChangexemanhchat(event)}
                          />
                        </span>
                      </div>
                      {anhUrl === "" ? (
                        <input
                          className="form-control type_msg"
                          placeholder={
                            ngonngu === "vi"
                              ? "Nhập tin nhắn..."
                              : "Enter message..."
                          }
                          value={tinnhanmoi}
                          onChange={(event) => this.nhapTinNhan(event)}
                          onKeyDown={(event) => this.guitinnhanenter(event)}
                        />
                      ) : (
                        <>
                          <div
                            className="form-control type_msg anhchat"
                            style={{
                              //backgroundImage: this.state.anhUrlnoibat ? `url(${this.state.anhUrlnoibat})` : 'none',
                              backgroundImage: `url(${anhUrl})`,
                            }}
                            onClick={() => this.nhanxemanhchat()}
                          ></div>
                          <span
                            className="xoaanh"
                            onClick={() => this.xoaanh()}
                          >
                            <i className="fas fa-times"></i>
                          </span>
                          {xemanh === true && (
                            <Lightbox
                              mainSrc={this.state.anh}
                              onCloseRequest={() =>
                                this.setState({ xemanh: false })
                              }
                            />
                          )}
                        </>
                      )}

                      <div
                        className="input-group-append"
                        onClick={() => this.guitinnhan()}
                      >
                        <span className="input-group-text send_btn">
                          <i className="fas fa-location-arrow"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    thongtinnguoidung: state.thongtinnguoidung.thongtinnguoidung,
    ngonngu: state.web.ngonngu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatKhachHang);
