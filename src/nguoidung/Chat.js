import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./Chat.scss";
import _, { uniqBy } from "lodash";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: null,
      onlinePeople: {},
      selectedUserId: null,
      newMessageText: "",
      messages: [],
    };
  }

  componentDidMount() {
    this.connectToWs();
  }

  connectToWs = () => {
    const ws = new WebSocket("ws://localhost:8080");
    this.setState({
      ws: ws,
    });
    ws.addEventListener("message", this.handleMessage);
    ws.addEventListener("close", () => {
      setTimeout(() => {
        console.log("Ket noi lai");
        this.connectToWs();
      }, 3000);
    });
  };

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if(prevState.messages !== this.state.messages){
  //     this.state.ws.addEventListener("message", this.handleMessage);
  //   }
  // }

  handleMessage = (ev) => {
    const messageData = JSON.parse(ev.data);
    if ("online" in messageData) {
      this.showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      this.setState((prevState) => ({
        messages: [
          ...prevState.messages,
          {
            ...messageData,
          },
        ],
      }));
      console.log("check tra ve: ", this.state.messages);
    }
  };

  showOnlinePeople = (peopleArr) => {
    const people = {};
    peopleArr.forEach(({ userId, userName }) => {
      people[userId] = userName;
    });
    this.setState({
      onlinePeople: people,
    });
  };

  selectContact(userId) {
    this.setState({
      selectedUserId: userId,
    });
  }

  nhapTinNhan = (event) => {
    this.setState({
      newMessageText: event.target.value,
    });
  };

  sendMessage = () => {
    this.state.ws.send(
      JSON.stringify({
        recipient: this.state.selectedUserId,
        text: this.state.newMessageText,
      })
    );
    this.setState((prevState) => ({
      newMessageText: "",
      messages: [
        ...prevState.messages,
        {
          text: this.state.newMessageText,
          sender: this.props.thongtinnguoidung.id,
          recipient: this.state.selectedUserId,
          id: Date.now(),
        },
      ],
    }));
  };

  render() {
    let { onlinePeople, selectedUserId, newMessageText, messages } = this.state;
    const onlinePeopleExclOurUser = { ...this.state.onlinePeople };
    delete onlinePeopleExclOurUser[this.props.thongtinnguoidung.id];
    const messageWithouDupes = uniqBy(messages, "id");
    console.log(messageWithouDupes);
    console.log(selectedUserId)
    return (
      <div className="chat">
        <div className="trai">
          {Object.keys(onlinePeopleExclOurUser).map((item, index) => (
            <div
              key={index}
              onClick={() => this.selectContact(item)}
              className={
                "nguoichat" + (item === selectedUserId ? " selected" : "")
              }
            >
              <span>{onlinePeople[item]}</span>
            </div>
          ))}
        </div>
        <div className="phai">
          {/* {!selectedUserId ? (
            <div>
              {messages.map((item) => (
                <div>
                  <span>sender:{item.sender}</span>
                  <span> my id:{this.props.thongtinnguoidung.id}</span>
                  {item.text}
                </div>
              ))}
            </div>
          ) : null} */}
          {!selectedUserId ? (
            <div>Vui lòng chọn người chat</div>
          ) : (
            <>
              <div>
                {messages.map((item) => (
                  <div
                    className={
                      "" +
                      (item.sender === this.props.thongtinnguoidung.id
                        ? "abc"
                        : "")
                    }
                  >
                    <div
                      className={
                        "" +
                        (item.sender === this.props.thongtinnguoidung.id
                          ? " gui"
                          : "")
                      }
                    >
                      {/* <span>sender:{item.sender}</span>
                      <br />
                      <span> my id:{this.props.thongtinnguoidung.id}</span>
                      <br /> */}
                      {+selectedUserId === +item.sender || +selectedUserId === +item.recipient
                        ? item.text
                        : null}
                      {/* {item.text} */}
                    </div>
                  </div>
                ))}
              </div>
              <input
                value={newMessageText}
                className="form-control input mr-2"
                onChange={(event) => this.nhapTinNhan(event)}
              />
              <button
                className="btn btn-primary button"
                onClick={() => this.sendMessage()}
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
