import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./HoaTheoDanhMucTheoChiTiet.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apihoatheodanhmucchitiet } from "../API/ApiTrangChu";
import { FormattedMessage } from "react-intl";
import * as actions from "../action/actions";

class HoaTheoDanhMucTheoChiTiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoatheodanhmucchitiet: "",
    };
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    await this.hoatheodanhmucchitiet(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      // Xử lý khi URL thay đổi
      let id = this.props.match.params.id;
      this.hoatheodanhmucchitiet(id);
    }
  }

  hoatheodanhmucchitiet = async (id) => {
    let kq = await apihoatheodanhmucchitiet(id);
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        hoatheodanhmucchitiet: data1,
      });
    }
  };

  thongtinhoa = (hoa) => {
    this.props.history.push(`/thongtinhoa/${hoa.id}`);
  };

  dathangtrangchu = (hoa) => {
    hoa.soluongmua = 1;
    this.props.thongtinhoadathang(hoa);
    this.props.history.push(`/dathang`);
  };

  render() {
    let { hoatheodanhmucchitiet } = this.state;
    let { ngonngu } = this.props;
    return (
      <>
        {/* <HeaderTrangChu /> */}
        <div className="hoatheodanhmuchoachitiet">
          {hoatheodanhmucchitiet &&
            hoatheodanhmucchitiet.length > 0 &&
            hoatheodanhmucchitiet.map((item, index) => {
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
                    style={{ cursor: "pointer" }}
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
                        style={{ cursor: "pointer" }}
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
                        style={{ cursor: "pointer" }}
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
                      <span
                        className="btn"
                        onClick={() => this.dathangtrangchu(item)}
                      >
                        <FormattedMessage id="trangchudathang" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {/* <FooterTrangChu /> */}
      </>
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
    thongtinhoadathang: (hoa) => dispatch(actions.thongtinhoadathang(hoa)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoaTheoDanhMucTheoChiTiet);
