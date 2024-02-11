import React, { Component } from "react";
import { connect } from "react-redux";
import NavigationTest from "../navigation/NavigationTest";
import { menu } from "./menuApp";
import "./Header.scss";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { doiNgonNgu, dangxuat } from "../../action/actions";
import { apidangxuat } from "../../API/GoiApi";
import { FormattedMessage } from "react-intl";
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

  dangxuat = async () => {
    await apidangxuat();
    this.props.dangxuat();
    this.props.history.push("/dangnhap");
  };
  render() {
    let { thongtinnguoidung, ngonngu } = this.props;
    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <NavigationTest menu={this.state.menuApp} />
        </div>
        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="quanlyxinchao" />
            {ngonngu === "vi"
              ? `${thongtinnguoidung.ho} ${thongtinnguoidung.ten}`
              : `${thongtinnguoidung.ten} ${thongtinnguoidung.ho}`}
            !!!
          </span>
          <span
            className={ngonngu === "vi" ? "language-vi" : "language-vi ngonngu"}
            onClick={() => this.doiNgonNgu("vi")}
          >
            VN
          </span>
          <span
            className={ngonngu === "en" ? "language-en" : "language-en ngonngu"}
            onClick={() => this.doiNgonNgu("en")}
          >
            EN
          </span>
          <div className="btn btn-logout" onClick={() => this.dangxuat()}>
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
    thongtinnguoidung: state.thongtinnguoidung.thongtinnguoidung,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doiNgonNgu: (ngongu) => dispatch(doiNgonNgu(ngongu)),
    dangxuat: () => dispatch(dangxuat()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderMenu)
);
