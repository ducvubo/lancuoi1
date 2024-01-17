import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuanLyNhapHoa.scss";
import HeaderMenu from "../Admin/menu/HeaderMenu";
class QuanLyNhapHoa extends Component {
  render() {
    return (
      <div>
      Quản lý nhập hoa
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

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyNhapHoa);
