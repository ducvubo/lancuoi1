import React, { Component } from "react";
import { connect } from "react-redux";
import NavigationTest from "../navigation/NavigationTest";
import { menu } from "./menuApp";
import "./Header.scss";
import _ from "lodash";

import { doiNgonNgu } from "../../action/actions";

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }

  componentDidMount() {
    this.setState({
      menuApp: menu,
    });
  }
  doiNgonNgu = (ngonngu) => {
    this.props.doiNgonNgu(ngonngu);
  };
  render() {
    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <NavigationTest menu={this.state.menuApp} />
        </div>
        <div className="languages">
          <span className="welcome">Welcome</span>
          <span className="language-vi" onClick={() => this.doiNgonNgu("vi")}>
            VN
          </span>
          <span className="language-en" onClick={() => this.doiNgonNgu("en")}>
            EN
          </span>
          {/* nút logout */}
          <div
            className="btn btn-logout"
            // onClick={processLogout}
            // title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ngonngu: state.web.ngonngu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doiNgonNgu: (ngongu) => dispatch(doiNgonNgu(ngongu)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
