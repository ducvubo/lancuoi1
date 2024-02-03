import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./TimHoa.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apihoatheodanhmuc } from "../API/ApiTrangChu";
class TimHoa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoatimduoc: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hoa !== this.props.hoa) {
      this.buildlaidata();
    }
  }

  buildlaidata = () => {
    // let data1 =this.props.hoa;
    // let epdata = data1 ? data1 : null
    //   .flatMap((item) => item.danhmuc.map((item) => item.danhmuchoachitiet))
    //   .flat();
    // epdata.map((item, index) => {
    //   item.donoibat = parseFloat(item.donoibat);
    // });
    // let sxdata = epdata.slice().sort((a, b) => b.donoibat - a.donoibat);
    this.setState({
      hoatimduoc: this.props.hoa,
    });
  };
  render() {
    let { ngonngu } = this.props;
    let { hoatimduoc } = this.state;
    return (
      <>
        <div className="timhoa">
          {hoatimduoc &&
            hoatimduoc.length > 0 &&
            hoatimduoc.map((item, index) => {
              let anhnoibat = "";
              if (item.anhnoibat) {
                anhnoibat = new Buffer(item.anhnoibat, "base64").toString(
                  "binary"
                );
              }
              return (
                <div className="hoa" key={index}>
                  <div
                    className="anhhoa"
                    onClick={() => this.thongtinhoa(item)}
                  >
                    <img src={anhnoibat} width="261" height="326" />

                    {item.phantramgiam > 0 ? (
                      <div className="giamgia">{item.phantramgiam}% GIẢM</div>
                    ) : null}
                  </div>
                  <div className="thongtin">
                    <span className="ten">
                      {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                    </span>

                    {ngonngu === "vi" ? (
                      <div
                        className="gia"
                        onClick={() => this.thongtinhoa(item)}
                      >
                        {item.phantramgiam > 0 ? (
                          <>
                            <span className="giagiam">
                              {item.giasaukhigiamVND}đ
                            </span>
                            <span className="giachuagiam">
                              {item.giathucVND}đ
                            </span>
                          </>
                        ) : (
                          <span className="giagiam">{item.giathucVND}đ</span>
                        )}
                      </div>
                    ) : (
                      <div
                        className="gia"
                        onClick={() => this.thongtinhoa(item)}
                      >
                        {item.phantramgiam > 0 ? (
                          <>
                            <span className="giagiam">
                              {item.giasaukhigiamUSD}USD
                            </span>
                            <span className="giachuagiam">
                              {item.giathucUSD}USD
                            </span>
                          </>
                        ) : (
                          <span className="giagiam">{item.giathucUSD}USD</span>
                        )}
                      </div>
                    )}
                    <div className="dathang">
                      <a href="#">ĐẶT HÀNG</a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hoa: state.admin.hoa,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TimHoa);
