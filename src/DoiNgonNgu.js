import React, { Component } from "react";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import vi from "./transalate/vi.json";
import en from "./transalate/en.json";

class DoiNgonNgu extends Component {
  render() {
    let ngonngu = this.props.ngonngu;
    // let locale = ngonngu === "en" ? en : vi;
    // let messages = ngonngu === "en" ? en : vi;

    let locale = ngonngu === "en" ? "en" : "vi";
    let messages = ngonngu === "en" ? en : vi;
    

    return (
      <IntlProvider locale={locale} messages={messages} defaultLocale={vi}>
        {this.props.children}
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ngonngu: state.web.ngonngu,
  };
};

export default connect(mapStateToProps, null)(DoiNgonNgu);
