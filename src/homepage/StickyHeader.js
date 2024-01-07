import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./StickyHeader.scss";
import { danhmuchoanoibat } from "../API/ApiTrangChu";

class StickyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
          danhmucnoibat: "",
        };
      }
    
      async componentDidMount() {
        await this.laydanhmuchoanoibat();
      }
    
      laydanhmuchoanoibat = async () => {
        let kq = await danhmuchoanoibat();
        if (kq && kq.maCode === 0) {
          let data1 = kq.data;
          this.setState({
            danhmucnoibat: data1,
          });
        }
      };
      render() {
        let { ngonngu } = this.props;
        let { danhmucnoibat } = this.state;
    return (
      <div className="stickyheader">
      <div className="item3">
          <ul className="hovermenu">
            {danhmucnoibat &&
              danhmucnoibat.length > 0 &&
              danhmucnoibat.map((item, index) => {
                return (
                  <li key={index}>
                    {ngonngu === "vi" ? item.tendanhmucVi : item.tendanhmucEn}
                    <ul>
                      {item.danhmuc && item.danhmuc.length > 0
                        ? item.danhmuc.map((item1, index1) => {
                            return (
                              <li key={index1}>
                                {ngonngu === "vi"
                                  ? item1.tendanhmucchitietVi
                                  : item1.tendanhmucchitietEn}
                              </li>
                            );
                          })
                        : null}
                    </ul>
                  </li>
                );
              })}
          </ul>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StickyHeader);
