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
      data1 &&
        data1.length > 0 &&
        data1.map((item) => {
          let tongsosao =
            item.hoabinhluan &&
            item.hoabinhluan.reduce(
              (total, item) => total + item.sosaodanhgia,
              0
            );
          let trungbinh = tongsosao / item.hoabinhluan.length;
          item.danhgiatrungbinh = trungbinh;
          if (item.danhgiatrungbinh % 1 >= 0.5) {
            item.danhgiatrungbinh = Math.ceil(item.danhgiatrungbinh);
          } else {
            item.danhgiatrungbinh = Math.floor(item.danhgiatrungbinh);
          }
        });
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
        <HeaderTrangChu />
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
                      <div className="giamgia">
                        {item.phantramgiam}
                        <FormattedMessage id="trangchugiamgia" />
                      </div>
                    ) : null}
                  </div>
                  <div className="thongtin">
                    <span className="ten">
                      {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                    </span>
                    <div className="rating">
                        <input
                          value="5"
                          name={`rating26${index}`}
                          id={`star526${index}`}
                          checked={item.danhgiatrungbinh === 5}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star526${index}`}></label>
                        <input
                          value="4"
                          name={`rating27${index}`}
                          id={`star427${index}`}
                          checked={item.danhgiatrungbinh === 4}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star427${index}`}></label>
                        <input
                          value="3"
                          name={`rating28${index}`}
                          id={`star328${index}`}
                          checked={item.danhgiatrungbinh === 3}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star328${index}`}></label>
                        <input
                          value="2"
                          name={`rating29${index}`}
                          id={`star229${index}`}
                          checked={item.danhgiatrungbinh === 2}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star229${index}`}></label>
                        <input
                          value="1"
                          name={`rating30${index}`}
                          id={`star130${index}`}
                          checked={item.danhgiatrungbinh === 1}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star130${index}`}></label>
                      </div>
                    {ngonngu === "vi" ? (
                      <div
                        className="gia"
                        onClick={() => this.thongtinhoa(item)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.phantramgiam > 0 ? (
                          <>
                            <span className="giagiam">
                              {item.giasaukhigiamVND.toLocaleString()}đ
                            </span>
                            <span className="giachuagiam">
                              {item.giathucVND.toLocaleString()}đ
                            </span>
                          </>
                        ) : (
                          <span className="giagiam">
                            {item.giathucVND.toLocaleString()}đ
                          </span>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoaTheoDanhMucTheoChiTiet);
