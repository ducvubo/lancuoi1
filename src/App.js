import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import trangChu from "./homepage/trangChu";
import QuanLy from "./route/QuanLy";
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          <Switch>
            <Route path={"/"} exact component={trangChu} />
            <Route path={"/quanly/"} component={QuanLy} />
          </Switch>
        </Router>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
