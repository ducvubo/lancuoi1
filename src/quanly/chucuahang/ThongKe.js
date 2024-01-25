import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ThongKe.scss";
class ThongKe extends Component {
  render() {
    return (
      <div className="thongke">
        <div>Thống kê nhập hàng</div>
        
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

export default connect(mapStateToProps, mapDispatchToProps)(ThongKe);
