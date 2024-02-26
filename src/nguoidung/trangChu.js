import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./trangChu.scss";
import SlideShow from "./SlideShow";
import logothuonghieu1 from "../image/logothuonghieu1.webp";
import logothuonghieu2 from "../image/logothuonghieu2.webp";
import logothuonghieu3 from "../image/logothuonghieu3.webp";
import SlideKH from "./SlideKH";
import * as actions from "../action/actions";
import {
  apihoagiamgia,
  apihoatheodanhmucnoibat,
  apihoabannhieunhat,
  apitatcahoanguoidung,
} from "../API/ApiTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import HeaderTrangChu from "./HeaderTrangChu";
import BannerShow from "./BannerShow";
import { FormattedMessage } from "react-intl";
import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";
class trangChu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoagiamgia: [],
      hoabannhieunhat: [],
      hoadanhgiacaonhat: [],
      danhmuchoathu1: [],
      danhmuchoathu2: [],
      danhmuchoathu3: [],
      danhmuchoathu4: [],
      danhmuchoathu5: [],
    };
  }

  async componentDidMount() {
    await this.laydanhmuchoanoibat();
    await this.laytatcahoa();
  }

  laytatcahoa = async () => {
    let kq = await apitatcahoanguoidung();
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
          trungbinh = item.hoabinhluan.length ? trungbinh : 0;
          item.danhgiatrungbinh = trungbinh;
          if (item.danhgiatrungbinh % 1 >= 0.5) {
            item.danhgiatrungbinh = Math.ceil(item.danhgiatrungbinh);
          } else {
            item.danhgiatrungbinh = Math.floor(item.danhgiatrungbinh);
          }
        });
      let sxdata = data1
        .slice()
        .sort((a, b) => b.danhgiatrungbinh - a.danhgiatrungbinh);
      let sxdata1 = data1.slice().sort((a, b) => b.soluongban - a.soluongban);
      let sxdata2 = data1
        .slice()
        .sort((a, b) => b.phantramgiam - a.phantramgiam);
      this.setState({
        hoadanhgiacaonhat: sxdata,
        hoabannhieunhat: sxdata1,
        hoagiamgia: sxdata2,
      });
    }
  };

  laydanhmuchoanoibat = async () => {
    let kq = await apihoatheodanhmucnoibat();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      let data2 = "";
      for (let i = 0; i < data1.length; i++) {
        if (i === 5) {
          data2 = [data1[i]];
          let epdata = data2
            .flatMap((item) =>
              item.danhmuc.map((item) => item.danhmuchoachitiet)
            )
            .flat();
          epdata.map((item, index) => {
            item.donoibat = parseFloat(item.donoibat);
          });
          let sxdata = epdata.slice().sort((a, b) => b.donoibat - a.donoibat);

          sxdata &&
            sxdata.length > 0 &&
            sxdata.map((item) => {
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
            danhmuchoathu1: {
              tendanhmuc:
                data2 &&
                data2.length > 0 &&
                data2.map((item) => {
                  return {
                    tendanhmucVi: item,
                  };
                }),
              sxdata,
            },
          });
        }
        if (i === 4) {
          data2 = [data1[i]];
          let epdata = data2
            .flatMap((item) =>
              item.danhmuc.map((item) => item.danhmuchoachitiet)
            )
            .flat();
          epdata.map((item, index) => {
            item.donoibat = parseFloat(item.donoibat);
          });
          let sxdata = epdata.slice().sort((a, b) => b.donoibat - a.donoibat);

          sxdata &&
            sxdata.length > 0 &&
            sxdata.map((item) => {
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
            danhmuchoathu2: {
              tendanhmuc:
                data2 &&
                data2.length > 0 &&
                data2.map((item) => {
                  return {
                    tendanhmucVi: item,
                  };
                }),
              sxdata,
            },
          });
        }
        if (i === 3) {
          data2 = [data1[i]];
          let epdata = data2
            .flatMap((item) =>
              item.danhmuc.map((item) => item.danhmuchoachitiet)
            )
            .flat();
          epdata.map((item, index) => {
            item.donoibat = parseFloat(item.donoibat);
          });
          let sxdata = epdata.slice().sort((a, b) => b.donoibat - a.donoibat);

          sxdata &&
            sxdata.length > 0 &&
            sxdata.map((item) => {
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
            danhmuchoathu3: {
              tendanhmuc:
                data2 &&
                data2.length > 0 &&
                data2.map((item) => {
                  return {
                    tendanhmucVi: item,
                  };
                }),
              sxdata,
            },
          });
        }
        if (i === 2) {
          data2 = [data1[i]];
          let epdata = data2
            .flatMap((item) =>
              item.danhmuc.map((item) => item.danhmuchoachitiet)
            )
            .flat();
          epdata.map((item, index) => {
            item.donoibat = parseFloat(item.donoibat);
          });
          let sxdata = epdata.slice().sort((a, b) => b.donoibat - a.donoibat);

          sxdata &&
            sxdata.length > 0 &&
            sxdata.map((item) => {
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
            danhmuchoathu4: {
              tendanhmuc:
                data2 &&
                data2.length > 0 &&
                data2.map((item) => {
                  return {
                    tendanhmucVi: item,
                  };
                }),
              sxdata,
            },
          });
        }
        if (i === 1) {
          data2 = [data1[i]];
          let epdata = data2
            .flatMap((item) =>
              item.danhmuc.map((item) => item.danhmuchoachitiet)
            )
            .flat();
          epdata.map((item, index) => {
            item.donoibat = parseFloat(item.donoibat);
          });
          let sxdata = epdata.slice().sort((a, b) => b.donoibat - a.donoibat);

          sxdata &&
            sxdata.length > 0 &&
            sxdata.map((item) => {
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
            danhmuchoathu5: {
              tendanhmuc:
                data2 &&
                data2.length > 0 &&
                data2.map((item) => {
                  return {
                    tendanhmucVi: item,
                  };
                }),
              sxdata,
            },
          });
        }
      }
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
    let { ngonngu } = this.props;
    let {
      hoagiamgia,
      danhmuchoathu1,
      danhmuchoathu2,
      danhmuchoathu3,
      danhmuchoathu4,
      danhmuchoathu5,
      hoabannhieunhat,
      hoadanhgiacaonhat,
    } = this.state;
    return (
      <>
        <div className="trangchu">
          <HeaderTrangChu />
          <SlideShow />
          <div className="item6">
            <span>
              <FormattedMessage id="trangchudanggiamgia" />
            </span>
          </div>
          <div className="item9">
            {hoagiamgia &&
              hoagiamgia.length > 0 &&
              hoagiamgia.slice(0, 8).map((item, index) => {
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
                      <span
                        className="ten"
                        onClick={() => this.thongtinhoa(item)}
                        style={{ cursor: "pointer" }}
                      >
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
                        <div className="gia">
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
                            <span className="giagiam">
                              {item.giathucUSD}USD
                            </span>
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

          <div className="item6">
            <span>
              <FormattedMessage id="trangchubannhieunhat" />
            </span>
          </div>
          <div className="item9">
            {hoabannhieunhat &&
              hoabannhieunhat.length > 0 &&
              hoabannhieunhat.slice(0, 4).map((item, index) => {
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
                      <span
                        className="ten"
                        onClick={() => this.thongtinhoa(item)}
                        style={{ cursor: "pointer" }}
                      >
                        {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                      </span>
                      <div className="rating">
                        <input
                          value="5"
                          name={`rating31${index}`}
                          id={`star531${index}`}
                          checked={item.danhgiatrungbinh === 5}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star531${index}`}></label>
                        <input
                          value="4"
                          name={`rating32${index}`}
                          id={`star432${index}`}
                          checked={item.danhgiatrungbinh === 4}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star432${index}`}></label>
                        <input
                          value="3"
                          name={`rating333${index}`}
                          id={`star333${index}`}
                          checked={item.danhgiatrungbinh === 3}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star333${index}`}></label>
                        <input
                          value="2"
                          name={`rating34${index}`}
                          id={`star234${index}`}
                          checked={item.danhgiatrungbinh === 2}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star234${index}`}></label>
                        <input
                          value="1"
                          name={`rating35${index}`}
                          id={`star135${index}`}
                          checked={item.danhgiatrungbinh === 1}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star135${index}`}></label>
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
                            <span className="giagiam">
                              {item.giathucUSD}USD
                            </span>
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

          <div className="item6">
            <span>
              <FormattedMessage id="trangchudanhgiacaonhat" />
            </span>
          </div>
          <div className="item9">
            {hoadanhgiacaonhat &&
              hoadanhgiacaonhat.length > 0 &&
              hoadanhgiacaonhat.slice(0, 8).map((item, index) => {
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
                      <span
                        className="ten"
                        onClick={() => this.thongtinhoa(item)}
                        style={{ cursor: "pointer" }}
                      >
                        {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                      </span>
                      <div className="rating">
                        <input
                          value="5"
                          name={`rating31${index}`}
                          id={`star531${index}`}
                          checked={item.danhgiatrungbinh === 5}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star531${index}`}></label>
                        <input
                          value="4"
                          name={`rating32${index}`}
                          id={`star432${index}`}
                          checked={item.danhgiatrungbinh === 4}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star432${index}`}></label>
                        <input
                          value="3"
                          name={`rating333${index}`}
                          id={`star333${index}`}
                          checked={item.danhgiatrungbinh === 3}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star333${index}`}></label>
                        <input
                          value="2"
                          name={`rating34${index}`}
                          id={`star234${index}`}
                          checked={item.danhgiatrungbinh === 2}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star234${index}`}></label>
                        <input
                          value="1"
                          name={`rating35${index}`}
                          id={`star135${index}`}
                          checked={item.danhgiatrungbinh === 1}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star135${index}`}></label>
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
                            <span className="giagiam">
                              {item.giathucUSD}USD
                            </span>
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

          <div className="item8">
            <div className="thongtin">
              <img src={logothuonghieu1} width="100" height="100" />
              <span className="khauhieu">
                <FormattedMessage id="trangchumienphigiaohang" />
              </span>
              <span className="noidung">
                <FormattedMessage id="trangchumienphigiaohangnd" />
              </span>
            </div>
            <div className="thongtin">
              <img src={logothuonghieu2} width="100" height="100" />
              <span className="khauhieu">
                <FormattedMessage id="trangchugiaohangnhanh" />
              </span>
              <span className="noidung">
                <FormattedMessage id="trangchugiaohangnhanhnd" />
              </span>
            </div>
            <div className="thongtin">
              <img src={logothuonghieu3} width="100" height="100" />
              <span className="khauhieu">
                <FormattedMessage id="trangchuhoanhuhinh" />
              </span>
              <span className="noidung">
                <FormattedMessage id="trangchuhoanhuhinhnd" />
              </span>
            </div>
          </div>

          <div className="item6">
            <span>
              {danhmuchoathu1 &&
                danhmuchoathu1.tendanhmuc &&
                danhmuchoathu1.tendanhmuc.length > 0 &&
                danhmuchoathu1.tendanhmuc.map((item) =>
                  this.props.ngonngu === "vi"
                    ? item.tendanhmucVi.tendanhmucVi
                    : item.tendanhmucVi.tendanhmucEn
                )}
            </span>
          </div>
          <div className="item9">
            {danhmuchoathu1 &&
              danhmuchoathu1.sxdata &&
              danhmuchoathu1.sxdata.length > 0 &&
              danhmuchoathu1.sxdata.slice(0, 8).map((item, index) => {
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
                      <span
                        className="ten"
                        onClick={() => this.thongtinhoa(item)}
                        style={{ cursor: "pointer" }}
                      >
                        {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                      </span>
                      <div className="rating">
                        <input
                          value="5"
                          name={`rating5${index}`}
                          id={`star55${index}`}
                          checked={item.danhgiatrungbinh === 5}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star55${index}`}></label>
                        <input
                          value="4"
                          name={`rating4${index}`}
                          id={`star44${index}`}
                          checked={item.danhgiatrungbinh === 4}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star44${index}`}></label>
                        <input
                          value="3"
                          name={`rating3${index}`}
                          id={`star33${index}`}
                          checked={item.danhgiatrungbinh === 3}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star33${index}`}></label>
                        <input
                          value="2"
                          name={`rating2${index}`}
                          id={`star22${index}`}
                          checked={item.danhgiatrungbinh === 2}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star22${index}`}></label>
                        <input
                          value="1"
                          name={`rating11${index}`}
                          id={`star11${index}`}
                          checked={item.danhgiatrungbinh === 1}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star11${index}`}></label>
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
                            <span className="giagiam">
                              {item.giathucUSD}USD
                            </span>
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

          <div className="item6">
            <span>
              {danhmuchoathu2 &&
                danhmuchoathu2.tendanhmuc &&
                danhmuchoathu2.tendanhmuc.length > 0 &&
                danhmuchoathu2.tendanhmuc.map((item) =>
                  this.props.ngonngu === "vi"
                    ? item.tendanhmucVi.tendanhmucVi
                    : item.tendanhmucVi.tendanhmucEn
                )}
            </span>
          </div>
          <div className="item9">
            {danhmuchoathu2 &&
              danhmuchoathu2.sxdata &&
              danhmuchoathu2.sxdata.length > 0 &&
              danhmuchoathu2.sxdata.slice(0, 8).map((item, index) => {
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
                      <span
                        className="ten"
                        onClick={() => this.thongtinhoa(item)}
                        style={{ cursor: "pointer" }}
                      >
                        {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                      </span>
                      <div className="rating">
                        <input
                          value="5"
                          name={`rating6${index}`}
                          id={`star56${index}`}
                          checked={item.danhgiatrungbinh === 5}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star56${index}`}></label>
                        <input
                          value="4"
                          name={`rating7${index}`}
                          id={`star47${index}`}
                          checked={item.danhgiatrungbinh === 4}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star47${index}`}></label>
                        <input
                          value="3"
                          name={`rating8${index}`}
                          id={`star38${index}`}
                          checked={item.danhgiatrungbinh === 3}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star38${index}`}></label>
                        <input
                          value="2"
                          name={`rating9${index}`}
                          id={`star29${index}`}
                          checked={item.danhgiatrungbinh === 2}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star29${index}`}></label>
                        <input
                          value="1"
                          name={`rating10${index}`}
                          id={`star110${index}`}
                          checked={item.danhgiatrungbinh === 1}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star110${index}`}></label>
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
                            <span className="giagiam">
                              {item.giathucUSD}USD
                            </span>
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

          <div className="item6">
            <span>
              {danhmuchoathu3 &&
                danhmuchoathu3.tendanhmuc &&
                danhmuchoathu3.tendanhmuc.length > 0 &&
                danhmuchoathu3.tendanhmuc.map((item) =>
                  this.props.ngonngu === "vi"
                    ? item.tendanhmucVi.tendanhmucVi
                    : item.tendanhmucVi.tendanhmucEn
                )}
            </span>
          </div>
          <div className="item7">
            {danhmuchoathu3 &&
              danhmuchoathu3.sxdata &&
              danhmuchoathu3.sxdata.length > 0 &&
              danhmuchoathu3.sxdata.slice(0, 4).map((item, index) => {
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
                      <span
                        className="ten"
                        onClick={() => this.thongtinhoa(item)}
                        style={{ cursor: "pointer" }}
                      >
                        {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                      </span>
                      <div className="rating">
                        <input
                          value="5"
                          name={`rating11${index}`}
                          id={`star511${index}`}
                          checked={item.danhgiatrungbinh === 5}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star511${index}`}></label>
                        <input
                          value="4"
                          name={`rating12${index}`}
                          id={`star412${index}`}
                          checked={item.danhgiatrungbinh === 4}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star412${index}`}></label>
                        <input
                          value="3"
                          name={`rating13${index}`}
                          id={`star313${index}`}
                          checked={item.danhgiatrungbinh === 3}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star313${index}`}></label>
                        <input
                          value="2"
                          name={`rating14${index}`}
                          id={`star214${index}`}
                          checked={item.danhgiatrungbinh === 2}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star214${index}`}></label>
                        <input
                          value="1"
                          name={`rating15${index}`}
                          id={`star115${index}`}
                          checked={item.danhgiatrungbinh === 1}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star115${index}`}></label>
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
                            <span className="giagiam">
                              {item.giathucUSD}USD
                            </span>
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

          <div className="item6">
            <span>
              {danhmuchoathu4 &&
                danhmuchoathu4.tendanhmuc &&
                danhmuchoathu4.tendanhmuc.length > 0 &&
                danhmuchoathu4.tendanhmuc.map((item) =>
                  this.props.ngonngu === "vi"
                    ? item.tendanhmucVi.tendanhmucVi
                    : item.tendanhmucVi.tendanhmucEn
                )}
              {/* <FormattedMessage id="trangchuhoakhaitruong" /> */}
            </span>
          </div>
          <div className="item9">
            {danhmuchoathu4 &&
              danhmuchoathu4.sxdata &&
              danhmuchoathu4.sxdata.length > 0 &&
              danhmuchoathu4.sxdata.slice(0, 8).map((item, index) => {
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
                          name={`rating16${index}`}
                          id={`star516${index}`}
                          checked={item.danhgiatrungbinh === 5}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star516${index}`}></label>
                        <input
                          value="4"
                          name={`rating17${index}`}
                          id={`star417${index}`}
                          checked={item.danhgiatrungbinh === 4}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star417${index}`}></label>
                        <input
                          value="3"
                          name={`rating18${index}`}
                          id={`star318${index}`}
                          checked={item.danhgiatrungbinh === 3}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star318${index}`}></label>
                        <input
                          value="2"
                          name={`rating19${index}`}
                          id={`star219${index}`}
                          checked={item.danhgiatrungbinh === 2}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star219${index}`}></label>
                        <input
                          value="1"
                          name={`rating20${index}`}
                          id={`star120${index}`}
                          checked={item.danhgiatrungbinh === 1}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star120${index}`}></label>
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
                            <span className="giagiam">
                              {item.giathucUSD}USD
                            </span>
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

          <div className="item6">
            <span>
              {danhmuchoathu5 &&
                danhmuchoathu5.tendanhmuc &&
                danhmuchoathu5.tendanhmuc.length > 0 &&
                danhmuchoathu5.tendanhmuc.map((item) =>
                  this.props.ngonngu === "vi"
                    ? item.tendanhmucVi.tendanhmucVi
                    : item.tendanhmucVi.tendanhmucEn
                )}
            </span>
          </div>

          <div className="item7">
            {danhmuchoathu5 &&
              danhmuchoathu5.sxdata &&
              danhmuchoathu5.sxdata.length > 0 &&
              danhmuchoathu5.sxdata.slice(0, 4).map((item, index) => {
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
                          name={`rating21${index}`}
                          id={`star521${index}`}
                          checked={item.danhgiatrungbinh === 5}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star521${index}`}></label>
                        <input
                          value="4"
                          name={`rating22${index}`}
                          id={`star422${index}`}
                          checked={item.danhgiatrungbinh === 4}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star422${index}`}></label>
                        <input
                          value="3"
                          name={`rating23${index}`}
                          id={`star323${index}`}
                          checked={item.danhgiatrungbinh === 3}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star323${index}`}></label>
                        <input
                          value="2"
                          name={`rating24${index}`}
                          id={`star224${index}`}
                          checked={item.danhgiatrungbinh === 2}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star224${index}`}></label>
                        <input
                          value="1"
                          name={`rating25${index}`}
                          id={`star125${index}`}
                          checked={item.danhgiatrungbinh === 1}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor={`star125${index}`}></label>
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
                            <span className="giagiam">
                              {item.giathucUSD}USD
                            </span>
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

          <div className="item6">
            <span>
              <FormattedMessage id="trangchukhachhangtieubieu" />
            </span>
          </div>
          <SlideKH />
          <div className="item6">
            <span>
              <FormattedMessage id="trangchutenshop" />
            </span>
          </div>
          <div className="item10">
            <span>
              <FormattedMessage id="trangchuioithieu" />
              <br />
              <br />
            </span>
          </div>

          <div className="item11">
            <div className="item11-trai">
              <span>
                <b>
                  <FormattedMessage id="trangchutraiindam" />
                </b>{" "}
                <FormattedMessage id="trangchutraiitem1" />
              </span>
              <div>
                <br />
                {/* <iframe
                  width="988"
                  height="556"
                  src="https://www.youtube.com/embed/20N-4QG0_V4"
                  title="Hoa tươi hhflower"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe> */}
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/20N-4QG0_V4"
                  title="Hoa tươi hhflower"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                <br />
              </div>
              <div className="item10" style={{ fontWeight: "400" }}>
                {" "}
                <span>
                  <br />
                  <FormattedMessage id="trangchutraiitem2" />
                  <br />
                </span>
              </div>
              <span>
                <br />
                <FormattedMessage id="trangchutraiitem3" />
                <br />
              </span>
              <span>
                <br />
                <FormattedMessage id="trangchutraiitem4" />
                <br />
              </span>
              <div className="item10" style={{ fontWeight: "400" }}>
                {" "}
                <span>
                  <br />
                  <FormattedMessage id="trangchutraiitem5" />
                  <br />
                </span>
              </div>
              <span>
                <br />
                <FormattedMessage id="trangchutraiitem6" />
                <br />
              </span>
              <span>
                <br />
                <FormattedMessage id="trangchutraiitem7" />
                <br />
              </span>
              <div className="item10" style={{ fontWeight: "400" }}>
                {" "}
                <span>
                  <br />
                  <FormattedMessage id="trangchutraiitem8" />
                  <br />
                </span>
              </div>
              <span>
                <br />
                <FormattedMessage id="trangchutraiitem9" />
                <br />
              </span>
              <span>
                <br />
                <FormattedMessage id="trangchutraiitem10" />
                <br />
              </span>
            </div>
            <div className="item11-phai">
              <span>
                <FormattedMessage id="trangchuphaiitem1" />
              </span>
              <div className="item12">
                <span>
                  <br />
                  <FormattedMessage id="trangchuphaiitem2" />
                  <br />
                </span>
              </div>
              <span>
                <br />
                <FormattedMessage id="trangchuphaiitem3" />
                <br />
              </span>
              <span>
                <br />
                <FormattedMessage id="trangchuphaiitem4" />
                <br />
              </span>
              <span>
                <br />
                <FormattedMessage id="trangchuphaiitem5" />
                <br />
              </span>
              <div className="item12">
                <span>
                  <br />
                  <FormattedMessage id="trangchuphaiitem6" />
                  <br />
                </span>
              </div>
              <span>
                <br />
                <FormattedMessage id="trangchuphaiitem7" />
                <br />
              </span>
              <ul>
                <li>
                  <FormattedMessage id="trangchuphaiitem8" />
                </li>
                <li>
                  <FormattedMessage id="trangchuphaiitem9" />
                </li>
                <li>
                  <FormattedMessage id="trangchuphaiitem10" />
                </li>
                <li>
                  <FormattedMessage id="trangchuphaiitem11" />
                </li>
                <li>
                  <FormattedMessage id="trangchuphaiitem12" />
                </li>
                <li>
                  <FormattedMessage id="trangchuphaiitem13" />
                </li>
              </ul>
              <span>
                <br />
                <FormattedMessage id="trangchuphaiitem14" />
                <br />
              </span>
              <div className="item12">
                <span>
                  <br />
                  <FormattedMessage id="trangchuphaiitem15" />
                  <br />
                </span>
              </div>
              <span>
                <br />
                <FormattedMessage id="trangchuphaiitem16" />
                <br />
              </span>
              <ul>
                <li>
                  <FormattedMessage id="trangchuphaiitem17" />
                </li>
                <li>
                  <FormattedMessage id="trangchuphaiitem18" />
                </li>
                <li>
                  <FormattedMessage id="trangchuphaiitem19" />{" "}
                </li>
                <li>
                  <FormattedMessage id="trangchuphaiitem20" />
                </li>
              </ul>
              <div className="item12">
                <span>
                  <br />
                  <FormattedMessage id="trangchuphaiitem21" />
                  <br />
                </span>
              </div>
              <span>
                <br />
                <FormattedMessage id="trangchuphaiitem22" />
                <br />
              </span>
              <ul>
                <li>
                  <FormattedMessage id="trangchuphaiitem23" />
                </li>
                <li>
                  <FormattedMessage id="trangchuphaiitem24" />
                </li>
                <li>
                  <FormattedMessage id="trangchuphaiitem25" />
                </li>
              </ul>
              <span>
                <br />
                <FormattedMessage id="trangchuphaiitem26" />
                <br />
              </span>
            </div>
          </div>
          <FooterTrangChu />
        </div>
        <BannerShow />
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

export default connect(mapStateToProps, mapDispatchToProps)(trangChu);
