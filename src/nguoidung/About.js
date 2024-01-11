import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import testrouter from "./testrouter";
import TestSwitch from "./TestSwitch";
import "./About.scss";
import { NavLink } from "react-router-dom";
import HeaderMenu from "../Admin/menu/HeaderMenu";
class About extends Component {
  render() {
    return (
      <div>
      lihhl
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
