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
    console.log(ws)
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  xuLyDataTuServerTraVe = (ev) => {
    const tinnhandata = JSON.parse(ev.data);
    console.log(ev)
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
    nguoidungArr.forEach(({ id, ten }) => {
      nguoi[id] = ten;
    });
    this.setState({
      nguoionline: nguoi,
    });
  };

  chonnguoichat(id) {
    this.setState({
      nguoidangnhan: id,
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
        nguoinhan: this.state.nguoidangnhan,
        noidung: this.state.tinnhanmoi,
      })
    );
    this.setState((prevState) => ({
      tinnhanmoi: "",
      tinnhanArr: [
        ...prevState.tinnhanArr,
        {
          noidung: this.state.tinnhanmoi,
          nguoigui: this.props.thongtinnguoidung.id,
          nguoinhan: this.state.nguoidangnhan,
          id: Date.now(),
        },
      ],
    }));
  };

  render() {
    let { nguoionline, nguoidangnhan, tinnhanmoi, tinnhanArr } = this.state;
    const loaibonguoidungbitrung = { ...this.state.nguoionline };
    delete loaibonguoidungbitrung[this.props.thongtinnguoidung.id];
    console.log(nguoionline);
    console.log(nguoidangnhan);
    return (
      <div className="chat">
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
                {tinnhanArr.map((item,index) => (
                  <div key={index}
                    className={
                      "" +
                      (item.nguoigui === this.props.thongtinnguoidung.id
                        ? "abc"
                        : "")
                    }
                  >
                    <div
                      className={
                        "" +
                        (item.nguoigui === this.props.thongtinnguoidung.id
                          ? " gui"
                          : "")
                      }
                    >
                      {/* <span>nguoigui:{item.nguoigui}</span>
                      <br />
                      <span> my id:{this.props.thongtinnguoidung.id}</span>
                      <br /> */}
                      {+nguoidangnhan === +item.nguoigui ||
                      +nguoidangnhan === +item.nguoinhan
                        ? item.noidung
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
