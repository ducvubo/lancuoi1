import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./HoaTheoDanhMuc.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apihoatheodanhmuc } from "../API/ApiTrangChu";
import { FormattedMessage } from "react-intl";
import * as actions from "../action/actions";

class HoaTheoDanhMuc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoatheodanhmuc: "",
    };
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    await this.hoatheodanhmuc(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      // Xử lý khi URL thay đổi
      let id = this.props.match.params.id;
      this.hoatheodanhmuc(id);
    }
  }

  hoatheodanhmuc = async (id) => {
    let kq = await apihoatheodanhmuc(id);
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      console.log(data1);
      let epdata = data1
        .flatMap((item) => item.danhmuc.map((item) => item.danhmuchoachitiet))
        .flat();
      epdata.map((item, index) => {
        item.donoibat = parseFloat(item.donoibat);
      });
      let sxdata = epdata.slice().sort((a, b) => b.donoibat - a.donoibat);
      this.setState({
        hoatheodanhmuc: {
          tendanhmuc:
            data1 &&
            data1.length > 0 &&
            data1.map((item) => {
              return {
                tendanhmucVi: item,
              };
            }),
          sxdata,
        },
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
    let { hoatheodanhmuc } = this.state;
    console.log(hoatheodanhmuc);
    let { ngonngu } = this.props;
    return (
      <>
        <HeaderTrangChu />
        <div className="hoatheodanhmuc">
        <div className="tendanhmuc">
          <span>
            {hoatheodanhmuc &&
              hoatheodanhmuc.tendanhmuc &&
              hoatheodanhmuc.tendanhmuc.length > 0 &&
              hoatheodanhmuc.tendanhmuc.map((item) =>
                this.props.ngonngu === "vi"
                  ? item.tendanhmucVi.tendanhmucVi
                  : item.tendanhmucVi.tendanhmucEn
              )}
          </span>
        </div>
        <div className="hoadanhmuc">
          {hoatheodanhmuc.sxdata &&
            hoatheodanhmuc.sxdata.length > 0 &&
            hoatheodanhmuc.sxdata.map((item, index) => {
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
        </div>
        <FooterTrangChu />
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

export default connect(mapStateToProps, mapDispatchToProps)(HoaTheoDanhMuc);
