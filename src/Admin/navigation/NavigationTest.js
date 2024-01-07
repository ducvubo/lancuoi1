import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import "./navigation.scss";

class NavigationTest extends Component {
  render() {
    let { menu } = this.props;
    return (
        <>
          <ul className="navigator-menu list-unstyled">
            {menu.map((menuGroup, index) => (
              <li key={index} className="menu-group">
                <div className="menu-group-name">
                  <FormattedMessage id={menuGroup.name} />
                </div>
                <ul className="menu-list list-unstyled">
                  {menuGroup.menus.map((menuItem, menuIndex) => (
                    <li key={menuIndex} className="menu">
                      <Link className="menu-link" to={menuItem.link}>
                        <FormattedMessage id={menuItem.name} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavigationTest);
