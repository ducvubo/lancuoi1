import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./BannerShow.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import bannervalentine from "../image/8312193.jpg";
class BannerShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  }
  tatbanner = () => {
    this.setState({
      modal: false,
    });
  };

  render() {
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} {...this.props}>
        <div className="showbanner">
          <span className="tatbanner" onClick={() => this.tatbanner()}>
            <i className="fas fa-times"></i>
          </span>
          <Link to={`/hoatheodanhmuc/18`}>
            <img
              className="anhbanner"
              src={bannervalentine}
              width={"800px"}
              height={"467px"}
            />
          </Link>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerShow);
