import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./Chat.scss";
import _, { uniqBy } from "lodash";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: null,
      nguoionline: {},
      nguoidangnhan: null,
      tinnhanmoi: "",
      tinnhanArr: [],
      tennguoinhan: "",
    };
  }

  componentDidMount() {
    this.ketnoiws();
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

  componentDidUpdate(prevProps, prevState, snapshot) {}

  xuLyDataTuServerTraVe = (ev) => {
    const tinnhandata = JSON.parse(ev.data);
    if ("online" in tinnhandata) {
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
      console.log("check tra ve: ", this.state.tinnhanArr);
    }
  };

  nguoiDangOnline = (nguoidungArr) => {
    const nguoi = {};
    nguoidungArr.forEach(({ idchat, ten }) => {
      nguoi[idchat] = ten;
    });
    this.setState({
      nguoionline: nguoi,
    });
  };

  chonnguoichat(idchat) {
    let tennguoinhan = this.state.nguoionline[idchat];
    console.log(tennguoinhan);
    this.setState({
      nguoidangnhan: idchat,
      tennguoinhan: tennguoinhan,
    });
  }

  nhapTinNhan = (event) => {
    this.setState({
      tinnhanmoi: event.target.value,
    });
  };

  guitinnhan = () => {
    this.state.ws.send(
      JSON.stringify({
        tennguoinhan:this.state.tennguoinhan,
        tennguoigui: this.props.thongtinnguoidung.ten,
        nguoinhan: this.state.nguoidangnhan,
        noidung: this.state.tinnhanmoi,
        thoigian: Date.now(),
      })
    );
    this.setState((prevState) => ({
      tinnhanmoi: "",
      tinnhanArr: [
        ...prevState.tinnhanArr,
        {
          noidung: this.state.tinnhanmoi,
          nguoigui: this.props.thongtinnguoidung.idchat,
          nguoinhan: this.state.nguoidangnhan,
          thoigian: Date.now(),
        },
      ],
    }));
  };

  render() {
    let { nguoionline, nguoidangnhan, tinnhanmoi, tinnhanArr } = this.state;
    const loaibonguoidungbitrung = { ...this.state.nguoionline };
    console.log(loaibonguoidungbitrung);
    delete loaibonguoidungbitrung[this.props.thongtinnguoidung.idchat];
    return (
      <div className="chat123">
        <div className="trai">
          {Object.keys(loaibonguoidungbitrung).map((item, index) => (
            <div
              key={index}
              onClick={() => this.chonnguoichat(item)}
              className={
                "nguoichat" + (item === nguoidangnhan ? " selected" : "")
              }
            >
              <span>{nguoionline[item]}</span>
            </div>
          ))}
        </div>
        <div className="phai">
          {!nguoidangnhan ? (
            <div>Vui lòng chọn người chat</div>
          ) : (
            <>
              <div>
                {tinnhanArr.map((item, index) => (
                  <div
                    key={index}
                    className={
                      "" +
                      (item.nguoigui === this.props.thongtinnguoidung.idchat
                        ? "abc"
                        : "")
                    }
                  >
                    <div
                      className={
                        "" +
                        (item.nguoigui === this.props.thongtinnguoidung.idchat
                          ? " gui"
                          : "")
                      }
                    >
                      {/* <span>nguoigui:{item.nguoigui}</span>
                      <br />
                      <span> my id:{this.props.thongtinnguoidung.idchat}</span>
                      <br />  */}
                      {nguoidangnhan === item.nguoigui ||
                      nguoidangnhan === item.nguoinhan
                        ? `${item.noidung} ${item.thoigian}`
                        : null}
                      {/* {item.noidung} */}
                    </div>
                  </div>
                ))}
              </div>
              <input
                value={tinnhanmoi}
                className="form-control input mr-2"
                onChange={(event) => this.nhapTinNhan(event)}
              />
              <button
                className="btn btn-primary button"
                onClick={() => this.guitinnhan()}
              >
                Gửi
              </button>
            </>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
