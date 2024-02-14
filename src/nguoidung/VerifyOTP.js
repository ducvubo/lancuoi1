import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./VerifyOTP.scss";
class VerifyOTP extends Component {
  render() {
    return (
      <div className="otp">
      abc
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOTP);
