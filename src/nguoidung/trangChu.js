import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./trangChu.scss";
import SlideShow from "./SlideShow";
import logothuonghieu1 from "../image/logothuonghieu1.webp";
import logothuonghieu2 from "../image/logothuonghieu2.webp";
import logothuonghieu3 from "../image/logothuonghieu3.webp";
import SlideKH from "./SlideKH";
import * as actions from "../action/actions";
import { apihoagiamgia, apihoatheodanhmucnoibat } from "../API/ApiTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import HeaderTrangChu from "./HeaderTrangChu";
import { FormattedMessage } from "react-intl";
class trangChu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoagiamgia: [],
      danhmuchoathu1: [],
      danhmuchoathu2: [],
      danhmuchoathu3: [],
      danhmuchoathu4: [],
      danhmuchoathu5: [],
    };
  }

  async componentDidMount() {
    await this.layhoagiamgia();
    await this.laydanhmuchoanoibat();
  }

  layhoagiamgia = async () => {
    let kq = await apihoagiamgia();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        hoagiamgia: data1,
      });
    }
  };

  laydanhmuchoanoibat = async () => {
    let kq = await apihoatheodanhmucnoibat();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      let data2 = "";
      for (let i = 0; i < data1.length; i++) {
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
        if (i === 0) {
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
          <div className="item7">
            {hoagiamgia &&
              hoagiamgia.length > 0 &&
              hoagiamgia.slice(0, 4).map((item, index) => {
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
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/32sYGCOYJUM"
                  title="CHẠY NGAY ĐI | RUN NOW | SƠN TÙNG M-TP | Official Music Video"
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
