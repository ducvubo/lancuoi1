import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuanLyBanHoa.scss";
class QuanLyBanHoa extends Component {
  render() {
    return (
      <div>
      Quản lý bán hoa
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyBanHoa);
