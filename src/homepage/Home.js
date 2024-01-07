import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { increaseCounter, decreaseCounter } from "../action/actions";
class Home extends Component {
  render() {
    return (
      <div>
        <div>Count: {this.props.count}</div>

        <button onClick={() => this.props.increaseCounter()}>
          Increase Count
        </button>

        <button onClick={() => this.props.decreaseCounter()}>
          Decrease Count
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.admin.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseCounter: () => dispatch(increaseCounter()),

    decreaseCounter: () => dispatch(decreaseCounter()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
