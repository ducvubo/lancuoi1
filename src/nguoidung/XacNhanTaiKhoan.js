import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./XacNhanTaiKhoan.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apixacnhantaikhoan } from "../API/ApiTrangChu";
import { FormattedMessage } from "react-intl";
class XacNhanTaiKhoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trangthaixacnhan: false,
      maCode: 0,
      email: "",
      linkxacnhan: "",
    };
  }

  async componentDidMount() {
    let urlParams = new URLSearchParams(document.location.search);
    let linkxacnhan = urlParams.get("linkxacnhan");
    let email = urlParams.get("email");
    this.setState({
      email: email,
      linkxacnhan: linkxacnhan,
    });
    let data = await apixacnhantaikhoan({
      linkxacnhan: linkxacnhan,
      email: email,
    });

    if (data && data.maCode === 0) {
      this.setState({
        trangthaixacnhan: true,
        maCode: data.maCode,
      });
    } else {
      this.setState({
        trangthaixacnhan: true,
        maCode: data && data.maCode ? data.maCode : -1,
      });
    }
  }

  render() {
    let { trangthaixacnhan, maCode } = this.state;
    return (
      <>
        <HeaderTrangChu />
        <div className="xacnhantaikhoan">
          {trangthaixacnhan === false ? (
            <div><FormattedMessage id="xacnhantaikhoandangload"/> </div>
          ) : (
            <div>
              {maCode === 0 ? (
                <div><FormattedMessage id="xacnhantaikhoandkthanhcong"/></div>
              ) : (
                <div><FormattedMessage id="xacnhantaikhoandaxacnhan"/></div>
              )}
            </div>
          )}
        </div>
        <FooterTrangChu />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(XacNhanTaiKhoan);
