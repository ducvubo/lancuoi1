import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ThongTinHoa.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { withRouter } from "react-router-dom";
import vanchuyen from "../image/vanchuyen.png";
import banner from "../image/banner.png";
import ms from "../image/ms.png";
import zalo from "../image/zalo.png";
import { FormattedMessage } from "react-intl";
import {
  apithongtinhoa,
  apithemgiohang,
  apisanphamlienquan,
  apibinhluantheohoa,
  apithemdanhgia,
  apithemtraloidanhgia,
  apixoadanhgiatraloikh,
} from "../API/ApiTrangChu";
import { apirefreshtoken } from "../API/GoiApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import * as actions from "../action/actions";
import anhdaidien from "../image/anhdaidien.png";
import moment from "moment";
import Xulyanh from "../XuLyAnh/Xulyanh";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import logo from "../image/logo.png";
class ThongTinHoa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thongtinhoa: "",
      soluong: 1,
      sanphamlienquan: "",
      binhluantheohoa: "",
      videodanhgia: "",
      videodanhgiaurl: "",
      anhdanhgia: "",
      anhdanhgiaurl: "",
      noidungdanhgia: "",
      noidungdanhgiatraloi: "",
      danhgiachitietid: [],
      trangthaidanhgiamota: true,
      trangthaiphanhoichitiet: false,
      trangthaitraloidanhgia: false,
      sosaodanhgia: "",
    };
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    await this.thongtinhoa(id);
    await this.sanphamlienquan();
    await this.laybinhluantheohoa();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.id !== this.props.match.params.id
      // || prevState.thongtinhoa !== this.state.thongtinhoa
    ) {
      // Xử lý khi URL thay đổi
      let id = this.props.match.params.id;
      this.thongtinhoa(id);
      this.sanphamlienquan();
      this.laybinhluantheohoa(id);
    }
    if (prevState.thongtinhoa !== this.state.thongtinhoa) {
      this.sanphamlienquan();
    }
  }

  ktdanhapthongtinchua = () => {
    let kt = true;
    let nhapdaydu = ["noidungdanhgia", "sosaodanhgia"];
    for (let i = 0; i < nhapdaydu.length; i++) {
      if (!this.state[nhapdaydu[i]]) {
        kt = false;
        this.props.ngonngu === "vi"
          ? alert("Vui lòng nhập nôị dung và chọn sao đánh giá")
          : alert("Please enter content and select star rating");
        break;
      }
    }
    return kt;
  };

  laybinhluantheohoa = async () => {
    let kq = await apibinhluantheohoa(this.props.match.params.id);
    if (kq && kq.maCode === 0) {
      let data = kq.data;
      this.setState({
        binhluantheohoa: data,
      });
    }
  };

  thongtinhoa = async (id) => {
    let kq = await apithongtinhoa(id);
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        thongtinhoa: data1,
      });
    }
  };

  sanphamlienquan = async () => {
    let kq = await apisanphamlienquan(
      this.state.thongtinhoa.iddanhmuchoachitiet,
      this.state.thongtinhoa.id
    );
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        sanphamlienquan: data1,
      });
    }
  };

  tangsoluong = () => {
    this.setState((prevState) => ({
      soluong: prevState.soluong + 1,
    }));
  };

  giamsoluong = () => {
    this.setState((prevState) => ({
      soluong: prevState.soluong - 1,
    }));
  };

  themgiohang = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apithemgiohang({
      idnguoidung: this.props.thongtinnguoidung.id,
      idhoa: this.state.thongtinhoa.id,
      soluong: this.state.soluong,
    });
    if (kq && kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 9) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login session is invalid, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục!!!")
        : toast.success("You are not logged in, please log in to continue!!!");
    }
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Thêm vào giỏ hàng thành công!!!")
        : toast.success("Add to cart successfully!!!");
    }
  };

  dathangtrangchu = (hoa) => {
    hoa.soluongmua = 1;
    this.props.thongtinhoadathang(hoa);
    this.props.history.push(`/dathang`);
  };

  dathangthongtinhoa = () => {
    let hoa = { ...this.state.thongtinhoa };
    hoa.soluongmua = this.state.soluong;
    this.props.thongtinhoadathang(hoa);
    this.props.history.push(`/dathang`);
  };

  doitrangthaisangmota = () => {
    this.setState({
      trangthaidanhgiamota: false,
    });
  };

  doitrangthaisangdanhgia = () => {
    this.setState({
      trangthaidanhgiamota: true,
    });
  };

  chonsaodanhgia = (event) => {
    this.setState({
      sosaodanhgia: event.target.value,
    });
  };

  xemphanhoichitiet = (id) => {
    this.setState({
      danhgiachitietid: [...this.state.danhgiachitietid, id],
    });
  };

  tatxemphanhoi = (id) => {
    let mangidmoi = this.state.danhgiachitietid.filter((item) => item !== id);
    this.setState({
      danhgiachitietid: mangidmoi,
    });
  };

  chonvideodanhgia = async (event) => {
    let data = event.target.files;
    let fileanh = data[0];
    if (fileanh) {
      let videodanhgiabase64 = await Xulyanh.getBase64(fileanh);
      let videodanhgiaurl = URL.createObjectURL(fileanh);
      this.setState({
        videodanhgiaurl: videodanhgiaurl,
        videodanhgia: videodanhgiabase64,
      });
    }
  };

  chonanhdanhgia = async (event) => {
    let data = event.target.files;
    let fileanh = data[0];
    if (fileanh) {
      let anhdanhgiabase64 = await Xulyanh.getBase64(fileanh);
      let anhdanhgiaurl = URL.createObjectURL(fileanh);
      this.setState({
        anhdanhgiaurl: anhdanhgiaurl,
        anhdanhgia: anhdanhgiabase64,
      });
    }
  };

  xemanhdanhgia = () => {
    this.setState({
      trangthaixemanhdanhgia: true,
    });
  };

  nhapdanhgia = (event) => {
    this.setState({
      noidungdanhgia: event.target.value,
    });
  };

  guidanhgia = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    if (this.state.trangthaitraloidanhgia === false) {
      let kt = this.ktdanhapthongtinchua();
      if (kt === false) return;
      let kq = await apithemdanhgia({
        idhoa: this.props.match.params.id,
        idnguoidung: this.props.thongtinnguoidung.id,
        sosaodanhgia: this.state.sosaodanhgia,
        noidung: this.state.noidungdanhgia,
        hinhanh: this.state.anhdanhgia,
        video: this.state.videodanhgia,
        thoigian: new Date(),
      });
      if (kq && kq.maCode === 10) {
        this.props.ngonngu === "vi"
          ? toast.error("Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục!!!")
          : toast.success(
              "You are not logged in, please log in to continue!!!"
            );
      }
      if (kq && kq.maCode === 8) {
        this.props.ngonngu === "vi"
          ? toast.error(
              "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
            )
          : toast.error(
              "Your login has expired, please log in again to continue!!!"
            );
      }
      if (kq && kq.maCode === 9) {
        this.props.ngonngu === "vi"
          ? toast.error(
              "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
            )
          : toast.error(
              "Your login session is invalid, please log in again to continue!!!"
            );
      }
      if (kq && kq.maCode === 0) {
        this.props.ngonngu === "vi"
          ? toast.success(
              "Đánh giá của bạn đã được gửi đi vui lòng chờ duyệt!!!"
            )
          : toast.success(
              "Your review has been sent, please wait for approval!!!"
            );
        this.laybinhluantheohoa();
        this.setState({
          sosaodanhgia: "",
          noidungdanhgia: "",
          videodanhgia: "",
          videodanhgiaurl: "",
          anhdanhgia: "",
          anhdanhgiaurl: "",
        });
      }
    } else {
      if (!this.state.noidungdanhgia) {
        this.props.ngonngu === "vi"
          ? alert("Vui lòng nhập nội dung ")
          : alert("Please enter content");
        return;
      }
      if (this.state.noidungdanhgia) {
        let kq = await apithemtraloidanhgia({
          idbinhluan: this.state.noidungdanhgiatraloi.id,
          idnguoidung: this.props.thongtinnguoidung.id,
          noidung: this.state.noidungdanhgia,
          hinhanh: this.state.anhdanhgia ? this.state.anhdanhgia : null,
          video: this.state.videodanhgia ? this.state.videodanhgia : null,
          thoigian: new Date(),
        });
        if (kq && kq.maCode === 10) {
          this.props.ngonngu === "vi"
            ? toast.error(
                "Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục!!!"
              )
            : toast.success(
                "You are not logged in, please log in to continue!!!"
              );
        }
        if (kq && kq.maCode === 8) {
          this.props.ngonngu === "vi"
            ? toast.error(
                "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
              )
            : toast.error(
                "Your login has expired, please log in again to continue!!!"
              );
        }
        if (kq && kq.maCode === 9) {
          this.props.ngonngu === "vi"
            ? toast.error(
                "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
              )
            : toast.error(
                "Your login session is invalid, please log in again to continue!!!"
              );
        }
        if (kq && kq.maCode === 0) {
          this.props.ngonngu === "vi"
            ? toast.success(
                "Trả lời của bạn đã được gửi đi vui lòng chờ duyệt!!!"
              )
            : toast.success(
                "Your reply has been sent, please wait for approval!!!"
              );
          this.laybinhluantheohoa();
          this.setState({
            sosaodanhgia: "",
            noidungdanhgia: "",
            videodanhgia: "",
            videodanhgiaurl: "",
            anhdanhgia: "",
            anhdanhgiaurl: "",
            trangthaitraloidanhgia: false,
          });
        }
      }
    }
  };

  traloidanhgia = (noidungdanhgiatraloi) => {
    this.setState({
      noidungdanhgiatraloi: noidungdanhgiatraloi,
      trangthaitraloidanhgia: true,
      noidungdanhgia: "",
    });
  };

  huytraloidanhgia = () => {
    this.setState({
      trangthaitraloidanhgia: false,
      noidungdanhgia: "",
    });
  };

  xemanhdanhgiadaduyet = (anh) => {
    this.setState({
      trangthaixemanhdanhgia: true,
    });
  };

  xoadanhgiatraloikh = async (id, bang) => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apixoadanhgiatraloikh(id, bang);
    if (kq && kq.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục!!!")
        : toast.success("You are not logged in, please log in to continue!!!");
    }
    if (kq && kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 9) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login session is invalid, please log in again to continue!!!"
          );
    }
    if (kq && kq.data && kq.data.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Xóa đánh giá thành công!!!")
        : toast.success("Review removed successfully!!!");
      this.laybinhluantheohoa();
    }
  };
  render() {
    let {
      thongtinhoa,
      soluong,
      sanphamlienquan,
      trangthaidanhgiamota,
      sosaodanhgia,
      anhdanhgia,
      anhdanhgiaurl,
      videodanhgia,
      videodanhgiaurl,
      noidungdanhgia,
      trangthaixemanhdanhgia,
      binhluantheohoa,
      trangthaitraloidanhgia,
      noidungdanhgiatraloi,
      danhgiachitietid,
    } = this.state;
    let anhnoibat = "";
    if (thongtinhoa.anhnoibat) {
      anhnoibat = new Buffer(thongtinhoa.anhnoibat, "base64").toString(
        "binary"
      );
    }
    let { ngonngu } = this.props;

    let anhtraloidanhgia = "";
    if (noidungdanhgiatraloi.hinhanh) {
      anhtraloidanhgia = new Buffer(
        noidungdanhgiatraloi.hinhanh,
        "base64"
      ).toString("binary");
    }
    let videotraloidanhgia = "";
    if (noidungdanhgiatraloi.video) {
      videotraloidanhgia = new Buffer(
        noidungdanhgiatraloi.video,
        "base64"
      ).toString("binary");
    }
    let date = new Date().toLocaleDateString("vi-VN", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return (
      <>
        <HeaderTrangChu />
        <div className="thongtinhoa">
          <div className="item1">
            <div className="anh">
              <img src={anhnoibat} width="507" height="650" />
            </div>
            <div className="thongtin">
              <span className="tenhoa">
                {ngonngu === "vi" ? thongtinhoa.tenhoaVi : thongtinhoa.tenhoaEn}
              </span>
              <div className="gia">
                <span className="giathuc">
                  {ngonngu === "vi"
                    ? thongtinhoa.giathucVND
                      ? thongtinhoa.giathucVND.toLocaleString()
                      : null
                    : thongtinhoa.giathucUSD}
                  {ngonngu === "vi" ? "đ" : "USD"}
                </span>
                <span className="giagiam">
                  {ngonngu === "vi"
                    ? thongtinhoa.giasaukhigiamVND
                      ? thongtinhoa.giasaukhigiamVND.toLocaleString()
                      : null
                    : thongtinhoa.giasaukhigiamUSD}
                  {ngonngu === "vi" ? "đ" : "USD"}
                </span>
                <span className="phantram">
                  {thongtinhoa.phantramgiam}% giảm
                </span>
              </div>
              <span className="tieude">
                {ngonngu === "vi"
                  ? thongtinhoa.tieudehoaVi
                  : thongtinhoa.tieudehoaEn}
              </span>
              <div className="sdt">
                <span className="goi">Gọi ngay:</span>
                <span className="sodienthoai">0373853243</span>
              </div>
              <div className="chat">
                <span>Chat ngay:</span>
                <div className="icon">
                  <img src={ms} />
                  <img src={zalo} />
                </div>
              </div>
              <div className="giaohang">
                <div className="giaohang1">
                  <span>Vận chuyển: </span>
                  <span className="giaohang11">
                    Nhanh chóng theo yêu cầu của quý khách
                  </span>
                </div>

                <span>Phí giao hàng miễn phí</span>
              </div>
              <div className="ghichu">
                <i className="fas fa-exclamation"></i>
                <span>
                  {ngonngu === "vi"
                    ? thongtinhoa.ghichuVi
                    : thongtinhoa.ghichuEn}
                </span>
              </div>
              <div className="sl-gh-dh">
                <div className="sl">
                  <div className="form-group">
                    <label>Số lượng còn</label>
                    <input
                      value={thongtinhoa.soluongcon || 0}
                      disabled={true}
                      type="number"
                      className="form-control "
                      style={{ width: "100px", textAlign: "center" }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Số lượng mua</label>
                    <div className="soluongmua">
                      {soluong > 1 && (
                        <button
                          className="btn nuttgiam"
                          onClick={() => this.giamsoluong()}
                        >
                          <i className="fas fa-angle-left"></i>
                        </button>
                      )}

                      <input
                        className="form-control inputsoluongmua"
                        value={soluong}
                        disabled={true}
                        style={soluong > 1 ? { marginLeft: "4px" } : undefined}
                      />
                      {soluong < thongtinhoa.soluongcon && (
                        <button
                          className="btn nuttang"
                          onClick={() => this.tangsoluong()}
                        >
                          <i className="fas fa-angle-right"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="nutbam">
                  {thongtinhoa.soluongcon > 0 ? (
                    <>
                      <button
                        className="btn gh"
                        onClick={() => this.themgiohang()}
                      >
                        <i className="fas fa-cart-plus"></i>
                      </button>
                      <button
                        className="btn dh"
                        onClick={() => this.dathangthongtinhoa()}
                      >
                        Đặt hàng
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="tangkem">
                <div className="giaohangnhanh">
                  <img src={vanchuyen} width="64" height="53" />
                  <span>Giao hoa NHANH trong 60 phút</span>
                </div>
                <div className="thiep">
                  <img src={banner} width="64" height="53" />
                  <span>Tặng miễn phí thiệp hoặc banner</span>
                </div>
              </div>
            </div>
          </div>
          <div className="item2">
            <span
              className={
                trangthaidanhgiamota === false ? "mota" : "mota boderbottom"
              }
              onClick={() => this.doitrangthaisangmota()}
            >
              Mô tả hoa
            </span>
            <span
              className={
                trangthaidanhgiamota === false
                  ? "danhgia boderbottom"
                  : "danhgia"
              }
              onClick={() => this.doitrangthaisangdanhgia()}
            >
              Đánh giá
            </span>
            <div className="boder"></div>
          </div>
          {trangthaidanhgiamota === false ? (
            <div className="item3mota">
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      ngonngu === "vi"
                        ? thongtinhoa.motasphtmlVi
                        : thongtinhoa.motasphtmlEn, //hien thi đoạn code html
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="item3danhgia mt-3">
              <div className="tatcadanhgia">
                {binhluantheohoa &&
                  binhluantheohoa.length > 0 &&
                  binhluantheohoa.map((item, index) => {
                    {
                      let anhnguoidanhgia = "";
                      if (
                        item.nguoidungbinhluan &&
                        item.nguoidungbinhluan.anhdaidien
                      ) {
                        anhnguoidanhgia = new Buffer(
                          item.nguoidungbinhluan.anhdaidien,
                          "base64"
                        ).toString("binary");
                      }
                      let anhdanhgia = "";
                      if (item.hinhanh) {
                        anhdanhgia = new Buffer(
                          item.hinhanh,
                          "base64"
                        ).toString("binary");
                      }
                      let videodanhgia = "";
                      if (item.video) {
                        videodanhgia = new Buffer(
                          item.video,
                          "base64"
                        ).toString("binary");
                      }
                      let datedanhgia = new Date(
                        item.thoigian
                      ).toLocaleDateString(
                        `${ngonngu === "vi" ? "vi-VN" : "en-US"}`,
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      );
                      return (
                        <div className="danhgia" key={index}>
                          <div className="danhgiachinh">
                            <div className="danhgiatrai">
                              <img
                                className="anhdaidien"
                                src={
                                  item.nguoidungbinhluan &&
                                  item.nguoidungbinhluan.quyenId === "R4"
                                    ? anhnguoidanhgia
                                      ? anhnguoidanhgia
                                      : anhdaidien
                                    : logo
                                }
                                width={"50px"}
                                height={"50px"}
                              />
                            </div>
                            <div className="danhgiaphai">
                              <div className="tendate">
                                <span
                                  className={
                                    item.nguoidungbinhluan.idchat === "nhanvien"
                                      ? "ten chucuahang"
                                      : "ten"
                                  }
                                >
                                  {item.nguoidungbinhluan.idchat === "nhanvien"
                                    ? `${
                                        ngonngu === "vi" ? "Cửa hàng " : "Shop "
                                      }`
                                    : `${
                                        ngonngu === "vi"
                                          ? `${item.nguoidungbinhluan.ten} ${item.nguoidungbinhluan.ho}`
                                          : `${item.nguoidungbinhluan.ho} ${item.nguoidungbinhluan.ten}`
                                      }`}
                                  {item.nguoidungbinhluan.idchat ===
                                  "nhanvien" ? (
                                    <i className="fas fa-check-circle"></i>
                                  ) : null}
                                </span>
                                <span className="date">{datedanhgia}</span>
                              </div>
                              <div className="rating">
                                <input
                                  value="5"
                                  name="rating"
                                  id="star51"
                                  checked={item.sosaodanhgia === 5}
                                  readOnly
                                  type="radio"
                                />
                                <label htmlFor="star51"></label>
                                <input
                                  value="4"
                                  name="rating"
                                  id="star41"
                                  checked={item.sosaodanhgia === 4}
                                  readOnly
                                  type="radio"
                                />
                                <label htmlFor="star41"></label>
                                <input
                                  value="3"
                                  name="rating"
                                  id="star31"
                                  checked={item.sosaodanhgia === 3}
                                  readOnly
                                  type="radio"
                                />
                                <label htmlFor="star31"></label>
                                <input
                                  value="2"
                                  name="rating"
                                  id="star21"
                                  checked={item.sosaodanhgia === 2}
                                  readOnly
                                  type="radio"
                                />
                                <label htmlFor="star21"></label>
                                <input
                                  value="1"
                                  name="rating"
                                  id="star11"
                                  checked={item.sosaodanhgia === 1}
                                  readOnly
                                  type="radio"
                                />
                                <label htmlFor="star11"></label>
                              </div>

                              <div className="noidung">
                                <span>{item.noidung}</span>
                                <div className="anhvideo">
                                  {item.hinhanh && (
                                    <>
                                      <img
                                        className="anh"
                                        src={anhdanhgia}
                                        width={"100px"}
                                        height={"100px"}
                                        onClick={() =>
                                          this.xemanhdanhgiadaduyet()
                                        }
                                      />
                                      {trangthaixemanhdanhgia === true ? (
                                        <Lightbox
                                          mainSrc={anhdanhgia}
                                          onCloseRequest={() =>
                                            this.setState({
                                              trangthaixemanhdanhgia: false,
                                            })
                                          }
                                        />
                                      ) : null}
                                    </>
                                  )}

                                  {item.video && (
                                    <video
                                      controls
                                      width={"100px"}
                                      height={"100px"}
                                      className="video"
                                    >
                                      <source
                                        src={videodanhgia}
                                        type="video/mp4"
                                      />
                                    </video>
                                  )}
                                </div>
                              </div>
                              <span
                                className="xemphanhoi ml-3"
                                onClick={() => this.traloidanhgia(item)}
                              >
                                Trả lời
                              </span>
                              {danhgiachitietid.includes(item.id) ? (
                                <span
                                  className="xemphanhoi ml-3"
                                  onClick={() => this.tatxemphanhoi(item.id)}
                                >
                                  Đóng phản hồi
                                </span>
                              ) : (
                                <span
                                  className="xemphanhoi ml-3"
                                  onClick={() =>
                                    this.xemphanhoichitiet(item.id)
                                  }
                                >
                                  Xem phản hồi({item.traloibinhluan.length})
                                </span>
                              )}
                              {item.idnguoidung ===
                                this.props.thongtinnguoidung.id && (
                                <span
                                  className="xemphanhoi ml-3"
                                  onClick={() =>
                                    this.xoadanhgiatraloikh(item.id, "danhgia")
                                  }
                                >
                                  Xóa
                                </span>
                              )}
                            </div>
                          </div>

                          {item.traloibinhluan &&
                            item.traloibinhluan.length > 0 &&
                            item.traloibinhluan.map(
                              (traloibinhluanitem, traloibinhluanindex) => {
                                let anhnguoidungtraloibinhluan = "";
                                if (
                                  traloibinhluanitem.nguoidungtraloibinhluan &&
                                  traloibinhluanitem.nguoidungtraloibinhluan
                                    .anhdaidien
                                ) {
                                  anhnguoidungtraloibinhluan = new Buffer(
                                    traloibinhluanitem.nguoidungtraloibinhluan.anhdaidien,
                                    "base64"
                                  ).toString("binary");
                                }
                                let anhtraloidanhgia = "";
                                if (traloibinhluanitem.hinhanh) {
                                  anhtraloidanhgia = new Buffer(
                                    traloibinhluanitem.hinhanh,
                                    "base64"
                                  ).toString("binary");
                                }
                                let videotraloidanhgia = "";
                                if (traloibinhluanitem.video) {
                                  videodanhgia = new Buffer(
                                    traloibinhluanitem.video,
                                    "base64"
                                  ).toString("binary");
                                }
                                let datetraloidanhgia = new Date(
                                  traloibinhluanitem.thoigian
                                ).toLocaleDateString(
                                  `${ngonngu === "vi" ? "vi-VN" : "en-US"}`,
                                  {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                );
                                return (
                                  <div
                                    className="danhgiaphu mt-3"
                                    key={traloibinhluanindex}
                                    style={
                                      danhgiachitietid.includes(
                                        traloibinhluanitem.idbinhluan
                                      )
                                        ? null
                                        : { display: "none" }
                                    }
                                  >
                                    {danhgiachitietid.includes(
                                      traloibinhluanitem.idbinhluan
                                    ) ? (
                                      <>
                                        <div className="danhgiatrai">
                                          {/* <img
                                            className="anhdaidien"
                                            src={anhdaidien}
                                            width={"50px"}
                                            height={"50px"}
                                          /> */}
                                          <img
                                            className="anhdaidien"
                                            src={
                                              traloibinhluanitem.nguoidungtraloibinhluan &&
                                              traloibinhluanitem
                                                .nguoidungtraloibinhluan
                                                .quyenId === "R4"
                                                ? anhnguoidungtraloibinhluan
                                                  ? anhnguoidungtraloibinhluan
                                                  : anhdaidien
                                                : logo
                                            }
                                            width={"50px"}
                                            height={"50px"}
                                          />
                                        </div>
                                        <div className="danhgiaphai">
                                          <div className="tendate">
                                            <span
                                              className={
                                                traloibinhluanitem
                                                  .nguoidungtraloibinhluan
                                                  .idchat === "nhanvien"
                                                  ? "ten chucuahang mt-3"
                                                  : "ten mt-3"
                                              }
                                            >
                                              {traloibinhluanitem
                                                .nguoidungtraloibinhluan
                                                .idchat === "nhanvien"
                                                ? `${
                                                    ngonngu === "vi"
                                                      ? "Cửa hàng "
                                                      : "Shop "
                                                  }`
                                                : `${
                                                    ngonngu === "vi"
                                                      ? `${
                                                          traloibinhluanitem &&
                                                          traloibinhluanitem.nguoidungtraloibinhluan
                                                            ? traloibinhluanitem
                                                                .nguoidungtraloibinhluan
                                                                .ten
                                                            : null
                                                        } ${
                                                          traloibinhluanitem &&
                                                          traloibinhluanitem.nguoidungtraloibinhluan
                                                            ? traloibinhluanitem
                                                                .nguoidungtraloibinhluan
                                                                .ho
                                                            : null
                                                        }`
                                                      : `${
                                                          traloibinhluanitem &&
                                                          traloibinhluanitem.nguoidungtraloibinhluan
                                                            ? traloibinhluanitem
                                                                .nguoidungtraloibinhluan
                                                                .ho
                                                            : null
                                                        } ${
                                                          traloibinhluanitem &&
                                                          traloibinhluanitem.nguoidungtraloibinhluan
                                                            ? traloibinhluanitem
                                                                .nguoidungtraloibinhluan
                                                                .ten
                                                            : null
                                                        }`
                                                  }`}
                                              {traloibinhluanitem
                                                .nguoidungtraloibinhluan
                                                .idchat === "nhanvien" ? (
                                                <i className="fas fa-check-circle"></i>
                                              ) : null}
                                            </span>
                                            <span className="date">
                                              {datetraloidanhgia}
                                            </span>
                                            {traloibinhluanitem.idnguoidung ===
                                              this.props.thongtinnguoidung
                                                .id && (
                                              <span
                                                className="ten mt-3"
                                                onClick={() =>
                                                  this.xoadanhgiatraloikh(
                                                    traloibinhluanitem.id,
                                                    "traloi"
                                                  )
                                                }
                                              >
                                                <i className="fas fa-times"></i>
                                              </span>
                                            )}
                                          </div>
                                          <div className="noidung">
                                            <span className="mt-2">
                                              {traloibinhluanitem.noidung}
                                            </span>

                                            <div className="anhvideo">
                                              {anhtraloidanhgia && (
                                                <>
                                                  <img
                                                    className="anh"
                                                    src={anhtraloidanhgia}
                                                    width={"100px"}
                                                    height={"100px"}
                                                    onClick={() =>
                                                      this.xemanhdanhgiadaduyet()
                                                    }
                                                  />
                                                  {trangthaixemanhdanhgia ===
                                                  true ? (
                                                    <Lightbox
                                                      mainSrc={anhtraloidanhgia}
                                                      onCloseRequest={() =>
                                                        this.setState({
                                                          trangthaixemanhdanhgia: false,
                                                        })
                                                      }
                                                    />
                                                  ) : null}
                                                </>
                                              )}
                                              {videotraloidanhgia && (
                                                <video
                                                  controls
                                                  width={"100px"}
                                                  height={"100px"}
                                                  className="video"
                                                >
                                                  <source
                                                    src={videotraloidanhgia}
                                                    type="video/mp4"
                                                  />
                                                </video>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ) : null}
                                  </div>
                                );
                              }
                            )}
                        </div>
                      );
                    }
                  })}
              </div>

              <div className="themdanhgia mt-4">
                {trangthaitraloidanhgia === true && noidungdanhgiatraloi ? (
                  <div className="noidungtraloidanhgia ml-3 mt-3">
                    <div className="danhgiatrai">
                      <img
                        className="anhdaidien"
                        src={anhdaidien}
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                    <div className="danhgiaphai">
                      <div className="tendate">
                        <span
                          className={
                            noidungdanhgiatraloi.nguoidungbinhluan.idchat ===
                            "nhanvien"
                              ? "ten chucuahang"
                              : "ten"
                          }
                        >
                          {noidungdanhgiatraloi.nguoidungbinhluan.idchat ===
                          "nhanvien"
                            ? `${ngonngu === "vi" ? "Cửa hàng " : "Shop "}`
                            : `${
                                ngonngu === "vi"
                                  ? `${noidungdanhgiatraloi.nguoidungbinhluan.ten} ${noidungdanhgiatraloi.nguoidungbinhluan.ho}`
                                  : `${noidungdanhgiatraloi.nguoidungbinhluan.ho} ${noidungdanhgiatraloi.nguoidungbinhluan.ten}`
                              }`}
                          {noidungdanhgiatraloi.nguoidungbinhluan.idchat ===
                          "nhanvien" ? (
                            <i className="fas fa-check-circle"></i>
                          ) : null}
                        </span>
                        <span className="date">{date}</span>
                      </div>
                      <div className="rating">
                        <input
                          value="5"
                          name="rating"
                          id="star51"
                          checked={noidungdanhgiatraloi.sosaodanhgia === 5}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor="star51"></label>
                        <input
                          value="4"
                          name="rating"
                          id="star41"
                          checked={noidungdanhgiatraloi.sosaodanhgia === 4}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor="star41"></label>
                        <input
                          value="3"
                          name="rating"
                          id="star31"
                          checked={noidungdanhgiatraloi.sosaodanhgia === 3}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor="star31"></label>
                        <input
                          value="2"
                          name="rating"
                          id="star21"
                          checked={noidungdanhgiatraloi.sosaodanhgia === 2}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor="star21"></label>
                        <input
                          value="1"
                          name="rating"
                          id="star11"
                          checked={noidungdanhgiatraloi.sosaodanhgia === 1}
                          readOnly
                          type="radio"
                        />
                        <label htmlFor="star11"></label>
                      </div>

                      <div className="noidung">
                        <span>{noidungdanhgiatraloi.noidung}</span>
                        <div className="anhvideo">
                          {noidungdanhgiatraloi.hinhanh && (
                            <>
                              <img
                                className="anh"
                                src={anhtraloidanhgia}
                                width={"100px"}
                                height={"100px"}
                                onClick={() => this.xemanhdanhgiadaduyet()}
                              />
                              {trangthaixemanhdanhgia === true ? (
                                <Lightbox
                                  mainSrc={anhtraloidanhgia}
                                  onCloseRequest={() =>
                                    this.setState({
                                      trangthaixemanhdanhgia: false,
                                    })
                                  }
                                />
                              ) : null}
                            </>
                          )}

                          {noidungdanhgiatraloi.video && (
                            <video
                              controls
                              width={"100px"}
                              height={"100px"}
                              className="video"
                            >
                              <source
                                src={videotraloidanhgia}
                                type="video/mp4"
                              />
                            </video>
                          )}
                        </div>
                      </div>
                    </div>
                    <span
                      className="huytraloidanhgia"
                      onClick={() => this.huytraloidanhgia()}
                    >
                      <i className="fas fa-times"></i>
                    </span>
                  </div>
                ) : (
                  <>
                    <span className="spanthem mt-3 ml-3">Thêm đánh giá</span>
                    <div className="saodanhgia mt-3 ml-3">
                      <span className="spandanhgia mt-1">
                        Đánh giá của bạn:{" "}
                      </span>
                      <div className="rating">
                        <input
                          value={5}
                          id="star5"
                          type="radio"
                          checked={+sosaodanhgia === 5}
                          onChange={(event) => this.chonsaodanhgia(event)}
                        />
                        <label htmlFor="star5"></label>
                        <input
                          value={4}
                          id="star4"
                          type="radio"
                          checked={+sosaodanhgia === 4}
                          onChange={(event) => this.chonsaodanhgia(event)}
                        />
                        <label htmlFor="star4"></label>
                        <input
                          value={3}
                          id="star3"
                          type="radio"
                          checked={+sosaodanhgia === 3}
                          onChange={(event) => this.chonsaodanhgia(event)}
                        />
                        <label htmlFor="star3"></label>
                        <input
                          value={2}
                          id="star2"
                          type="radio"
                          checked={+sosaodanhgia === 2}
                          onChange={(event) => this.chonsaodanhgia(event)}
                        />
                        <label htmlFor="star2"></label>
                        <input
                          value={1}
                          id="star1"
                          type="radio"
                          checked={+sosaodanhgia === 1}
                          onChange={(event) => this.chonsaodanhgia(event)}
                        />
                        <label htmlFor="star1"></label>
                      </div>
                    </div>
                  </>
                )}
                {trangthaitraloidanhgia === true ? (
                  <span className="spannhanxet mt-3 ml-3">
                    Nội dung trả lời
                  </span>
                ) : (
                  <span className="spannhanxet mt-3 ml-3">
                    Nhận xét của bạn:
                  </span>
                )}

                <div className="videoanhdanhgia">
                  {videodanhgiaurl ? (
                    <video
                      controls
                      width={"100px"}
                      height={"100px"}
                      className="video mt-3 ml-3"
                    >
                      <source src={videodanhgiaurl} type="video/mp4" />
                    </video>
                  ) : null}
                  {anhdanhgiaurl ? (
                    <div>
                      <img
                        className="anh mt-3 ml-3"
                        src={anhdanhgiaurl}
                        width={"100px"}
                        height={"100px"}
                        onClick={() => this.xemanhdanhgia()}
                      />
                      {trangthaixemanhdanhgia === true ? (
                        <Lightbox
                          mainSrc={anhdanhgia}
                          onCloseRequest={() =>
                            this.setState({ trangthaixemanhdanhgia: false })
                          }
                        />
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <div className="vietdanhgia mt-3 ml-3 mb-3 mr-3">
                  <textarea
                    className="form-control inputdanhgia"
                    onChange={(event) => this.nhapdanhgia(event)}
                    value={noidungdanhgia}
                  ></textarea>
                  <label className="mt-2" htmlFor="videodanhgia">
                    <input
                      type="file"
                      id="videodanhgia"
                      accept="video/mp4"
                      hidden
                      onChange={(event) => this.chonvideodanhgia(event)}
                    />
                    <i className="fas fa-file-video"></i>
                  </label>
                  <label className="mt-2" htmlFor="anhdanhgia">
                    <input
                      type="file"
                      id="anhdanhgia"
                      hidden
                      accept="image/jpeg, image/png, image/gif"
                      onChange={(event) => this.chonanhdanhgia(event)}
                    />
                    <i className="fas fa-images"></i>
                  </label>
                </div>
                <button
                  className="btn guidanhgia mt-3 mb-3 ml-3"
                  onClick={() => this.guidanhgia()}
                >
                  Gửi đi
                </button>
              </div>
            </div>
          )}

          <div className="item4">SẢN PHẨM LIÊN QUAN</div>
          <div className="item5">
            {sanphamlienquan &&
              sanphamlienquan.length > 0 &&
              sanphamlienquan.slice(0, 4).map((item, index) => {
                let anhnoibat = "";
                if (item.anhnoibat) {
                  anhnoibat = new Buffer(item.anhnoibat, "base64").toString(
                    "binary"
                  );
                }
                return (
                  <div className="hoa" key={index}>
                    <div className="anhhoa">
                      <Link
                        to={`/thongtinhoa/${item.id}`}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={anhnoibat} width="261" height="326" />

                        {item.phantramgiam > 0 ? (
                          <div className="giamgia">
                            {item.phantramgiam}% GIẢM
                          </div>
                        ) : null}
                      </Link>
                    </div>
                    <div className="thongtin">
                      <Link
                        className="linkten"
                        to={`/thongtinhoa/${item.id}`}
                        style={{ cursor: "pointer" }}
                      >
                        <span className="ten">
                          {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                        </span>
                      </Link>

                      {ngonngu === "vi" ? (
                        <div className="gia">
                          {item.phantramgiam > 0 ? (
                            <>
                              <span className="giagiam">
                                {item.giasaukhigiamVND
                                  ? item.giasaukhigiamVND.toLocaleString()
                                  : null}
                                đ
                              </span>
                              <span className="giachuagiam">
                                {item.giathucVND
                                  ? item.giathucVND.toLocaleString()
                                  : null}
                                đ
                              </span>
                            </>
                          ) : (
                            <span className="giagiam">
                              {item.giathucVND
                                ? item.giathucVND.toLocaleString()
                                : null}
                              đ
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="gia">
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
        </div>
        <FooterTrangChu />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ngonngu: state.web.ngonngu,
    thongtinnguoidung: state.thongtinnguoidung.thongtinnguoidung,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    thongtinhoadathang: (hoa) => dispatch(actions.thongtinhoadathang(hoa)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ThongTinHoa)
);
