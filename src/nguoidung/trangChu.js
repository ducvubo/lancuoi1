import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./trangChu.scss";
import SlideShow from "./SlideShow";
import logothuonghieu1 from "../image/logothuonghieu1.webp";
import logothuonghieu2 from "../image/logothuonghieu2.webp";
import logothuonghieu3 from "../image/logothuonghieu3.webp";
import SlideKH from "./SlideKH";

import {
  apihoagiamgia,
  apihoakhaitruong,
  apihoasinhnhat,
  apihoatet,
  apilanhodiep,
} from "../API/ApiTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import HeaderTrangChu from "./HeaderTrangChu";
import { FormattedMessage } from "react-intl";
class trangChu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoagiamgia: [],
      hoatetbanchay: [],
      hoatetgiamgia: [],
      hoakhaitruong: [],
      hoasinhnhat: [],
      lanhodiep: [],
    };
  }

  async componentDidMount() {
    await this.layhoagiamgia();
    await this.layhoakhaitruong();
    await this.layhoatet();
    await this.layhoasinhnhat();
    await this.laylanhodiep();
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
  layhoatet = async () => {
    let kq = await apihoatet();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      let epdata = data1
        .flatMap((item) => item.danhmuc.map((item) => item.danhmuchoachitiet))
        .flat();

      epdata.map((item, index) => {
        item.donoibat = parseFloat(item.donoibat);
        item.donoibat = parseFloat(item.phantramgiam);
      });
      let sxdata = epdata.slice().sort((a, b) => b.soluongban - a.soluongban);
      let sxdata1 = epdata
        .slice()
        .sort((a, b) => b.phantramgiam - a.phantramgiam);

      this.setState({
        hoatetgiamgia: sxdata1,
        hoatetbanchay: sxdata,
      });
    }
  };
  layhoakhaitruong = async () => {
    let kq = await apihoakhaitruong();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      let epdata = data1
        .flatMap((item) => item.danhmuc.map((item) => item.danhmuchoachitiet))
        .flat();
      epdata.map((item, index) => {
        item.donoibat = parseFloat(item.donoibat);
      });
      let sxdata = epdata.slice().sort((a, b) => b.donoibat - a.donoibat);
      this.setState({
        hoakhaitruong: sxdata,
      });
    }
  };
  layhoasinhnhat = async () => {
    let kq = await apihoasinhnhat();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      let epdata = data1
        .flatMap((item) => item.danhmuc.map((item) => item.danhmuchoachitiet))
        .flat();

      epdata.map((item, index) => {
        item.donoibat = parseFloat(item.donoibat); // Hoặc parseInt(item.donoibat) nếu donoibat là số nguyên
      });
      let sxdata = epdata.slice().sort((a, b) => b.donoibat - a.donoibat);
      this.setState({
        hoasinhnhat: sxdata,
      });
    }
  };
  laylanhodiep = async () => {
    let kq = await apilanhodiep();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      let epdata = data1
        .flatMap((item) => item.danhmuc.map((item) => item.danhmuchoachitiet))
        .flat();

      epdata.map((item, index) => {
        item.donoibat = parseFloat(item.donoibat); // Hoặc parseInt(item.donoibat) nếu donoibat là số nguyên
      });
      let sxdata = epdata.slice().sort((a, b) => b.donoibat - a.donoibat);
      this.setState({
        lanhodiep: sxdata,
      });
    }
  };

  thongtinhoa = (hoa) => {
    this.props.history.push(`/thongtinhoa/${hoa.id}`);
  };

  render() {
    let { ngonngu } = this.props;
    let {
      hoagiamgia,
      hoatetbanchay,
      hoatetgiamgia,
      hoakhaitruong,
      hoasinhnhat,
      lanhodiep,
    } = this.state;
    return (
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
                    >
                      {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                    </span>

                    {ngonngu === "vi" ? (
                      <div className="gia">
                        {item.phantramgiam > 0 ? (
                          <>
                            <span className="giagiam">
                              {item.giasaukhigiamVND.toLocaleString()}VND
                            </span>
                            <span className="giachuagiam">
                              {item.giathucVND.toLocaleString()}VND
                            </span>
                          </>
                        ) : (
                          <span className="giagiam">
                            {item.giathucVND.toLocaleString()}VND
                          </span>
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
                      <a href="#">
                        <FormattedMessage id="trangchudathang" />
                      </a>
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
          <span><FormattedMessage id= "trangchuhoatetgiamgia"/></span>
        </div>
        <div className="item9">
          {hoatetgiamgia &&
            hoatetgiamgia.length > 0 &&
            hoatetgiamgia.slice(0, 8).map((item, index) => {
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
                      <div className="giamgia">{item.phantramgiam}<FormattedMessage id="trangchugiamgia" /></div>
                    ) : null}
                  </div>
                  <div className="thongtin">
                    <span
                      className="ten"
                      onClick={() => this.thongtinhoa(item)}
                    >
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
                              {item.giasaukhigiamVND.toLocaleString()}VND
                            </span>
                            <span className="giachuagiam">
                              {item.giathucVND.toLocaleString()}VND
                            </span>
                          </>
                        ) : (
                          <span className="giagiam">
                            {item.giathucVND.toLocaleString()}VND
                          </span>
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
                      <a href="#"><FormattedMessage id="trangchudathang" /></a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="item6">
          <span><FormattedMessage id="trangchuhoatetbanchay"/></span>
        </div>
        <div className="item9">
          {hoatetbanchay &&
            hoatetbanchay.length > 0 &&
            hoatetbanchay.slice(0, 8).map((item, index) => {
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
                      <div className="giamgia">{item.phantramgiam}<FormattedMessage id="trangchugiamgia" /></div>
                    ) : null}
                  </div>
                  <div className="thongtin">
                    <span
                      className="ten"
                      onClick={() => this.thongtinhoa(item)}
                    >
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
                              {item.giasaukhigiamVND.toLocaleString()}VND
                            </span>
                            <span className="giachuagiam">
                              {item.giathucVND.toLocaleString()}VND
                            </span>
                          </>
                        ) : (
                          <span className="giagiam">
                            {item.giathucVND.toLocaleString()}VND
                          </span>
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
                      <a href="#"><FormattedMessage id="trangchudathang" /></a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="item6">
          <span><FormattedMessage id="trangchuhoasinhnhat"/></span>
        </div>
        <div className="item7">
          {hoasinhnhat &&
            hoasinhnhat.length > 0 &&
            hoasinhnhat.slice(0, 4).map((item, index) => {
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
                      <div className="giamgia">{item.phantramgiam}<FormattedMessage id="trangchugiamgia" /></div>
                    ) : null}
                  </div>
                  <div className="thongtin">
                    <span
                      className="ten"
                      onClick={() => this.thongtinhoa(item)}
                    >
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
                              {item.giasaukhigiamVND.toLocaleString()}VND
                            </span>
                            <span className="giachuagiam">
                              {item.giathucVND.toLocaleString()}VND
                            </span>
                          </>
                        ) : (
                          <span className="giagiam">
                            {item.giathucVND.toLocaleString()}VND
                          </span>
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
                      <a href="#"><FormattedMessage id="trangchudathang" /></a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="item6">
          <span><FormattedMessage id="trangchuhoakhaitruong"/></span>
        </div>
        <div className="item9">
          {hoakhaitruong &&
            hoakhaitruong.length > 0 &&
            hoakhaitruong.slice(0, 8).map((item, index) => {
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
                      <div className="giamgia">{item.phantramgiam}<FormattedMessage id="trangchugiamgia" /></div>
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
                              {item.giasaukhigiamVND.toLocaleString()}VND
                            </span>
                            <span className="giachuagiam">
                              {item.giathucVND.toLocaleString()}VND
                            </span>
                          </>
                        ) : (
                          <span className="giagiam">
                            {item.giathucVND.toLocaleString()}VND
                          </span>
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
                      <a href="#"><FormattedMessage id="trangchudathang" /></a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="item6">
          <span><FormattedMessage id="trangchulanhodiep"/></span>
        </div>

        <div className="item7">
          {lanhodiep &&
            lanhodiep.length > 0 &&
            lanhodiep.slice(0, 4).map((item, index) => {
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
                      <div className="giamgia">{item.phantramgiam}<FormattedMessage id="trangchugiamgia" /></div>
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
                              {item.giasaukhigiamVND.toLocaleString()}VND
                            </span>
                            <span className="giachuagiam">
                              {item.giathucVND.toLocaleString()}VND
                            </span>
                          </>
                        ) : (
                          <span className="giagiam">
                            {item.giathucVND.toLocaleString()}VND
                          </span>
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
                      <a href="#"><FormattedMessage id="trangchudathang" /></a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="item6">
          <span><FormattedMessage id="trangchukhachhangtieubieu"/></span>
        </div>
        <SlideKH />
        <div className="item6">
          <span><FormattedMessage id="trangchutenshop"/></span>
        </div>
        <div className="item10">
          <span>
           <FormattedMessage id="trangchuioithieu"/>
            <br />
            <br />
          </span>
        </div>

        <div className="item11">
          <div className="item11-trai">
            <span>
              <b><FormattedMessage id="trangchutraiindam"/></b> <FormattedMessage id="trangchutraiitem1"/>
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
                <FormattedMessage id="trangchutraiitem2"/>
                <br />
              </span>
            </div>
            <span>
              <br />
              <FormattedMessage id="trangchutraiitem3"/>
              <br />
            </span>
            <span>
              <br />
              <FormattedMessage id="trangchutraiitem4"/>
              <br />
            </span>
            <div className="item10" style={{ fontWeight: "400" }}>
              {" "}
              <span>
                <br />
                <FormattedMessage id="trangchutraiitem5"/>
                <br />
              </span>
            </div>
            <span>
              <br />
              <FormattedMessage id="trangchutraiitem6"/>
              <br />
            </span>
            <span>
              <br />
              <FormattedMessage id="trangchutraiitem7"/>
              <br />
            </span>
            <div className="item10" style={{ fontWeight: "400" }}>
              {" "}
              <span>
                <br />
                <FormattedMessage id="trangchutraiitem8"/>
                <br />
              </span>
            </div>
            <span>
              <br />
             <FormattedMessage id="trangchutraiitem9"/>
              <br />
            </span>
            <span>
              <br />
             <FormattedMessage id = "trangchutraiitem10"/>
              <br />
            </span>
          </div>
          <div className="item11-phai">
            <span>
              <FormattedMessage id="trangchuphaiitem1"/>
            </span>
            <div className="item12">
              <span>
                <br />
                <FormattedMessage id="trangchuphaiitem2"/>
                <br />
              </span>
            </div>
            <span>
              <br />
              <FormattedMessage id="trangchuphaiitem3"/>
              <br />
            </span>
            <span>
              <br />
             <FormattedMessage id="trangchuphaiitem4"/>
              <br />
            </span>
            <span>
              <br />
             <FormattedMessage id="trangchuphaiitem5"/>
              <br />
            </span>
            <div className="item12">
              <span>
                <br />
                <FormattedMessage id="trangchuphaiitem6"/>
                <br />
              </span>
            </div>
            <span>
              <br />
              <FormattedMessage id="trangchuphaiitem7"/>
              <br />
            </span>
            <ul>
              <li>
               <FormattedMessage id="trangchuphaiitem8"/>
              </li>
              <li>
                <FormattedMessage id="trangchuphaiitem9"/>
              </li>
              <li>
                <FormattedMessage id="trangchuphaiitem10"/>
              </li>
              <li>
                <FormattedMessage id="trangchuphaiitem11"/>
              </li>
              <li>
                <FormattedMessage id="trangchuphaiitem12"/>
              </li>
              <li>
                <FormattedMessage id="trangchuphaiitem13"/>
              </li>
            </ul>
            <span>
              <br />
              <FormattedMessage id="trangchuphaiitem14"/>
              <br />
            </span>
            <div className="item12">
              <span>
                <br />
                <FormattedMessage id="trangchuphaiitem15"/>
                <br />
              </span>
            </div>
            <span>
              <br />
              <FormattedMessage id="trangchuphaiitem16"/>
              <br />
            </span>
            <ul>
              <li><FormattedMessage id="trangchuphaiitem17"/></li>
              <li><FormattedMessage id= "trangchuphaiitem18"/></li>
              <li><FormattedMessage id="trangchuphaiitem19"/> </li>
              <li><FormattedMessage id="trangchuphaiitem20"/></li>
            </ul>
            <div className="item12">
              <span>
                <br />
                <FormattedMessage id="trangchuphaiitem21"/>
                <br />
              </span>
            </div>
            <span>
              <br />
             <FormattedMessage id="trangchuphaiitem22"/>
              <br />
            </span>
            <ul>
              <li><FormattedMessage id="trangchuphaiitem23"/></li>
              <li><FormattedMessage id="trangchuphaiitem24"/></li>
              <li><FormattedMessage id="trangchuphaiitem25"/></li>
            </ul>
            <span>
              <br />
             <FormattedMessage id="trangchuphaiitem26"/>
              <br />
            </span>
          </div>
        </div>
        <FooterTrangChu />
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

export default connect(mapStateToProps, mapDispatchToProps)(trangChu);
