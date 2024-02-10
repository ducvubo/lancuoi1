import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ChatCuaHang.scss";
import { apitatcacuoctrochuyen, apitatcakhachhang } from "../../API/GoiApi";
import Xulyanh from "../../XuLyAnh/Xulyanh";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import _, { debounce } from "lodash";
class ChatCuaHang extends Component {
  constructor(props) {
    super(props);
    this.cuonxuongduoi = React.createRef();
    this.state = {
      ws: null,
      anhUrl: "",
      anh: "",
      xemanh: false,
      nguoidangnhan: null,
      tinnhanmoi: "",
      tinnhanArr: [],
      tennguoinhan: "",
      tatcadoanchat: [],
    };
  }

  async componentDidMount() {
    this.ketnoiws();
    await this.laytatcacuoctrochuyen();
    await this.laytatcakhachhang();
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
    }
    if (prevState.tennguoinhan !== this.state.tennguoinhan) {
      this.xemtinhanmoinhat();
    }
  }

  xuLyDataTuServerTraVe = async (ev) => {
    const tinnhandata = JSON.parse(ev.data);
    if ("online" in tinnhandata) {
      console.log(tinnhandata);
      this.nguoiDangOnline(tinnhandata.online);
    } else if ("noidung" in tinnhandata) {
      this.setState((prevState) => ({
        tinnhanArr: [
          ...prevState.tinnhanArr,
          {
            ...tinnhandata,
          },
        ],
      }));
    }
  };

  nguoiDangOnline = (nguoidungArr) => {
    const nguoi = {};
    nguoidungArr.forEach(({ idchat, ten }) => {
      nguoi[idchat] = ten;
    });
    console.log(nguoidungArr);
    this.setState((prevState) => ({
      tatcadoanchat: prevState.tatcadoanchat.concat(nguoidungArr),
    }));

    let copy = [...this.state.tatcadoanchat];
    let demobj = {};
    copy.forEach((obj) => {
      demobj[obj.idchat] = (demobj[obj.idchat] || 0) + 1;
    });
    copy.forEach((obj) => {
      obj.trangthai = demobj[obj.idchat] > 1;
    });

    let giatrixuathien = new Set();

    let dataok = copy.filter((obj) => {
      let isDuplicate = giatrixuathien.has(obj.ten);
      giatrixuathien.add(obj.ten);
      return !isDuplicate;
    });
    this.setState({
      tatcadoanchat: dataok,
    });
  };

  chonnguoichat(nguoi) {
    this.setState({
      nguoidangnhan: nguoi.idchat,
      tennguoinhan: nguoi.ten,
    });
  }

  nhapTinNhan = (event) => {
    this.setState({
      tinnhanmoi: event.target.value,
    });
  };

  guitinnhan = async () => {
    this.state.ws.send(
      JSON.stringify({
        tennguoinhan: this.state.tennguoinhan,
        tennguoigui: this.props.thongtinnguoidung.ten,
        nguoinhan: this.state.nguoidangnhan,
        noidung: this.state.tinnhanmoi ? this.state.tinnhanmoi : null,
        anh: this.state.anh ? this.state.anh : null,
        thoigian: Date.now(),
      })
    );
    this.setState((prevState) => ({
      tinnhanmoi: "",
      anh: "",
      anhUrl: "",
      tinnhanArr: [
        ...prevState.tinnhanArr,
        {
          //noidung: this.state.tinnhanmoi,
          nguoigui: this.props.thongtinnguoidung.idchat,
          nguoinhan: this.state.nguoidangnhan,
          //thoigian: Date.now(),
        },
      ],
    }));
  };

  laytatcacuoctrochuyen = async () => {
    let kq = await apitatcacuoctrochuyen();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState((prevState) => ({
        tinnhanArr: [...prevState.tinnhanArr, ...data1],
      }));
    }
  };

  laytatcakhachhang = async () => {
    let kq = await apitatcakhachhang();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      let data = [...this.state.tatcadoanchat, ...data1];
      let copy = [...data];
      let demobj = {};
      copy.forEach((obj) => {
        demobj[obj.idchat] = (demobj[obj.idchat] || 0) + 1;
      });
      copy.forEach((obj) => {
        obj.trangthai = demobj[obj.idchat] > 1;
      });

      let giatrixuathien = new Set();

      let dataok = copy.filter((obj) => {
        let isDuplicate = giatrixuathien.has(obj.ten);
        giatrixuathien.add(obj.ten);
        return !isDuplicate;
      });
      this.setState({
        tatcadoanchat: dataok,
      });
    }
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

  timdoanchat = debounce((event) => {
    let timkiem = event.target.value;
    if (timkiem) {
      let clonedoanchat = _.cloneDeep(this.state.tatcadoanchat);
      clonedoanchat = clonedoanchat.filter((item) =>
        item.ten.toLowerCase().includes(timkiem.toLowerCase())
      );
      this.setState({
        tatcadoanchat: clonedoanchat,
      });
    } else {
      this.laytatcakhachhang();
    }
  }, 1000);

  render() {
    let {
      nguoidangnhan,
      tinnhanmoi,
      tinnhanArr,
      tatcadoanchat,
      tennguoinhan,
      anh,
      anhUrl,
      xemanh,
    } = this.state;
    console.log(tatcadoanchat);
    tatcadoanchat = tatcadoanchat.filter((item) => item.idchat !== "nhanvien");
    let { ngonngu, thongtinnguoidung } = this.props;
    console.log(tatcadoanchat);
    return (
      <div className="chatcuahang">
        <div className="container-fluid h-100">
          <div className="row justify-content-center h-100">
            <div className="col-md-4 col-xl-2 chat">
              <div className="card mb-sm-3 mb-md-0 contacts_card">
                <div className="card-header">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder={
                        ngonngu === "vi" ? "Tìm kiếm..." : "Search..."
                      }
                      name=""
                      className="form-control search"
                      onChange={(event) => this.timdoanchat(event)}
                    />
                    <div className="input-group-prepend">
                      <span className="input-group-text search_btn">
                        <i className="fas fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card-body contacts_body">
                  <ul className="contacts">
                    {tatcadoanchat.map((item, index) => {
                      return (
                        <li
                          className={
                            item.idchat === nguoidangnhan ? " active" : ""
                          }
                          key={index}
                          onClick={() => this.chonnguoichat(item)}
                        >
                          <div className="d-flex bd-highlight">
                            <div className="img_cont">
                              <span
                                className={
                                  item.trangthai === true
                                    ? "online_icon"
                                    : "online_icon offline"
                                }
                              ></span>
                            </div>
                            <div className="user_info">
                              <span className="ten">{item.ten}</span>
                              {item.trangthai === true ? (
                                <p className="onof">Online</p>
                              ) : (
                                <p className="onof">Offline</p>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="card-footer canhan">
                  <i className="fas fa-user"></i>: {thongtinnguoidung.ten}
                </div>
              </div>
            </div>

            <div className="col-md-8 col-xl-3 chat">
              <div className="card">
                {!nguoidangnhan ? (
                  <div className="chonnguoichat">
                    <i className="fas fa-hand-point-left"></i> Vui lòng chọn
                    người chat
                  </div>
                ) : (
                  <>
                    <div className="card-header msg_head">
                      <div className="d-flex bd-highlight">
                        <div className="user_info">
                          <span>
                            <b>{tennguoinhan}</b>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="card-body msg_card_body">
                      {tinnhanArr.map((item, index) => {
                        if (item.nguoigui === nguoidangnhan) {
                          let anh = "";
                          if (item.anh) {
                            anh = new Buffer(item.anh, "base64").toString(
                              "binary"
                            );
                          }
                          if (
                            item.noidung === null &&
                            nguoidangnhan === item.nguoigui &&
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
                                      nguoidangnhan === item.nguoigui ||
                                      nguoidangnhan === item.nguoinhan
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
                                      nguoidangnhan === item.nguoigui ||
                                      nguoidangnhan === item.nguoinhan
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
                          if (item.noidung && nguoidangnhan === item.nguoigui) {
                            return (
                              <div
                                className="d-flex justify-content-start mb-4"
                                key={index}
                              >
                                <div className="msg_cotainer_send">
                                  {nguoidangnhan === item.nguoigui ||
                                  nguoidangnhan === item.nguoinhan
                                    ? `${item.noidung ? item.noidung : ""} `
                                    : null}
                                </div>
                              </div>
                            );
                          }
                        } else if (
                          (item.nguoinhan === nguoidangnhan && item.noidung) ||
                          item.anh
                        ) {
                          let anh = "";
                          if (item.anh) {
                            anh = new Buffer(item.anh, "base64").toString(
                              "binary"
                            );
                          }
                          if (
                            item.noidung === null &&
                            nguoidangnhan === item.nguoinhan
                          ) {
                            return (
                              <div
                                className="d-flex justify-content-end mb-4"
                                key={index}
                              >
                                {typeof item.anh === "object" ? (
                                  <img
                                    className="tinnhananh"
                                    src={
                                      nguoidangnhan === item.nguoigui ||
                                      nguoidangnhan === item.nguoinhan
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
                                      nguoidangnhan === item.nguoigui ||
                                      nguoidangnhan === item.nguoinhan
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
                          if (
                            item.noidung &&
                            nguoidangnhan === item.nguoinhan
                          ) {
                            return (
                              <div
                                className="d-flex justify-content-end mb-4"
                                key={index}
                              >
                                <div className="msg_cotainer">
                                  {nguoidangnhan === item.nguoigui ||
                                  nguoidangnhan === item.nguoinhan
                                    ? `${item.noidung ? item.noidung : ""} `
                                    : null}
                                </div>
                              </div>
                            );
                          }
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
                              accept="image/jpeg, image/png, image/gif"
                              hidden
                              onChange={(event) =>
                                this.onChangexemanhchat(event)
                              }
                            />
                          </span>
                        </div>
                        {anhUrl === "" ? (
                          <input
                            name=""
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
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatCuaHang);
