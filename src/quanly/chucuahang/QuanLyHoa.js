import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../action/actions";
import "./QuanLyHoa.scss";
import {
  tatcadanhmucchitiet,
  apithemhoa,
  apitatcahoa,
  apisuahoa,
  apixoahoa,
  apirefreshtoken,
} from "../../API/GoiApi";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Xulyanh from "../../XuLyAnh/Xulyanh";
import { toast } from "react-toastify";
import _, { debounce } from "lodash";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt();

class QuanLyHoa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danhmuchoachitietArr: [],
      anhUrlnoibat: "",
      openmoanhnoibat: false,

      id: "",
      iddanhmuchoachitiet: "",
      anhnoibat: "",
      tenhoaVi: "",
      tenhoaEn: "",
      tieudehoaVi: "",
      tieudehoaEn: "",
      soluongcon: "",
      soluongnhap: "",
      soluongban: "",
      giathucVND: "",
      giathucUSD: "",
      phantramgiam: "",
      giasaukhigiamVND: "",
      giasaukhigiamUSD: "",
      motaspVi: "",
      motaspEn: "",
      motasphtmlVi: "",
      motasphtmlEn: "",
      donoibat: "",
      ghichuVi: "",
      ghichuEn: "",
      tatcahoa: "",

      trangthainut: false,
    };
  }

  async componentDidMount() {
    await this.laytatcadanhmucchitiet();
    await this.laytatcahoa();
  }

  laytatcadanhmucchitiet = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await tatcadanhmucchitiet();
    if (kq.maCode === 6) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
        : toast.error("You are not an admin, please come back!!!");
    }
    if (kq.maCode === 7) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
          )
        : toast.error(
            "You are not an admin or store employee, please leave!!!"
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
    let data1 = kq.data;
    if (kq && kq.maCode === 0) {
      this.setState({
        danhmuchoachitietArr: data1,
        iddanhmuchoachitiet: data1 && data1.length > 0 ? data1[0].id : "",
      });
    }
  };

  laytatcahoa = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apitatcahoa();
    if (kq.maCode === 6) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
        : toast.error("You are not an admin, please come back!!!");
    }
    if (kq.maCode === 7) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
          )
        : toast.error(
            "You are not an admin or store employee, please leave!!!"
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
    let data1 = kq.data;
    if (kq && kq.maCode === 0) {
      this.setState({
        tatcahoa: data1,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.soluongnhap !== this.state.soluongnhap ||
      prevState.soluongban !== this.state.soluongban
    ) {
      this.setState({
        soluongcon: this.state.soluongnhap - this.state.soluongban,
      });
    }

    if (
      prevState.giathucVND !== this.state.giathucVND ||
      prevState.phantramgiam !== this.state.phantramgiam ||
      prevState.giathucUSD !== this.state.giathucUSD
    ) {
      this.setState({
        giasaukhigiamUSD:
          this.state.giathucUSD -
          (this.state.phantramgiam / 100) * this.state.giathucUSD,
        giasaukhigiamVND:
          this.state.giathucVND -
          (this.state.phantramgiam / 100) * this.state.giathucVND,
      });
    }
  }

  onChangexemanh = async (event) => {
    let data = event.target.files;
    let fileanh = data[0];
    if (fileanh) {
      let anhbase64 = await Xulyanh.getBase64(fileanh);
      let Url = URL.createObjectURL(fileanh);
      this.setState({
        anhUrlnoibat: Url,
        anhnoibat: anhbase64,
      });
    }
  };

  nhanxemanh = () => {
    if (!this.state.anhUrlnoibat) return;
    this.setState({
      openmoanhnoibat: true,
    });
  };

  nhapmotaVi = ({ html, text }) => {
    this.setState({
      motaspVi: text,
      motasphtmlVi: html,
    });
  };

  nhapmotaEn = ({ html, text }) => {
    this.setState({
      motaspEn: text,
      motasphtmlEn: html,
    });
  };

  nhapdulieu = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  ktdanhapthongtinchua = () => {
    let kt = true;
    let nhapdaydu = [
      "iddanhmuchoachitiet",
      "anhnoibat",
      "tenhoaVi",
      "tenhoaEn",
      "tieudehoaVi",
      "tieudehoaEn",
      "soluongcon",
      "soluongnhap",
      "soluongban",
      "giathucVND",
      "giathucUSD",
      "giasaukhigiamVND",
      "giasaukhigiamUSD",
      "motaspVi",
      "motaspEn",
      "motasphtmlVi",
      "motasphtmlEn",
      "donoibat",
      "ghichuVi",
      "ghichuEn",
    ];
    for (let i = 0; i < nhapdaydu.length; i++) {
      if (!this.state[nhapdaydu[i]] || this.state[nhapdaydu[i]] === null) {
        kt = false;
        this.props.ngonngu === "vi"
          ? alert("Vui lòng nhập đầy đủ thông tin")
          : alert("Please enter complete information");
        break;
      }
    }
    return kt;
  };

  clickthemhoa = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;

    let kq = await apithemhoa({
      iddanhmuchoachitiet: this.state.iddanhmuchoachitiet,
      anhnoibat: this.state.anhnoibat,
      tenhoaVi: this.state.tenhoaVi,
      tenhoaEn: this.state.tenhoaEn,
      tieudehoaVi: this.state.tieudehoaVi,
      tieudehoaEn: this.state.tieudehoaEn,
      soluongcon: this.state.soluongcon,
      soluongnhap: this.state.soluongnhap,
      soluongban: this.state.soluongban,
      giathucVND: this.state.giathucVND,
      giathucUSD: this.state.giathucUSD,
      phantramgiam: this.state.phantramgiam,
      giasaukhigiamVND: this.state.giasaukhigiamVND,
      giasaukhigiamUSD: this.state.giasaukhigiamUSD,
      motaspVi: this.state.motaspVi,
      motaspEn: this.state.motaspEn,
      motasphtmlVi: this.state.motasphtmlVi,
      motasphtmlEn: this.state.motasphtmlEn,
      donoibat: this.state.donoibat,
      ghichuVi: this.state.ghichuVi,
      ghichuEn: this.state.ghichuEn,
      anhnoibat: this.state.anhnoibat,
    });
    if (kq.maCode === 6) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
        : toast.error("You are not an admin, please come back!!!");
    }
    if (kq.maCode === 7) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
          )
        : toast.error(
            "You are not an admin or store employee, please leave!!!"
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
    if (kq.maCode === 0 && kq) {
      this.props.ngonngu === "vi"
        ? toast.success("Thêm hoa thành công")
        : toast.success("Added flower successfully");
      this.setState({
        // iddanhmuchoachitiet: "",
        anhnoibat: "",
        tenhoaVi: "",
        tenhoaEn: "",
        tieudehoaVi: "",
        tieudehoaEn: "",
        soluongcon: "",
        soluongnhap: "",
        soluongban: "",
        giathucVND: "",
        giathucUSD: "",
        phantramgiam: "",
        giasaukhigiamVND: "",
        giasaukhigiamUSD: "",
        motaspVi: "",
        motaspEn: "",
        motasphtmlVi: "",
        motasphtmlEn: "",
        donoibat: "",
        ghichuVi: "",
        ghichuEn: "",
        anhUrlnoibat: "",
      });
      await this.laytatcahoa();
      await this.laytatcadanhmucchitiet();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Thêm hoa thất bại")
        : toast.success("Add hoa category");
    }
  };

  clicksuahoa = (hoa) => {
    let anhnoibatbase64 = "";

    if (hoa.anhnoibat) {
      anhnoibatbase64 = new Buffer(hoa.anhnoibat, "base64").toString("binary");
    }
    this.setState({
      id: hoa.id,
      iddanhmuchoachitiet: hoa.iddanhmuchoachitiet
        ? hoa.iddanhmuchoachitiet
        : null,
      anhnoibat: anhnoibatbase64 ? anhnoibatbase64 : null,
      tenhoaVi: hoa.tenhoaVi,
      tenhoaEn: hoa.tenhoaEn ? hoa.tenhoaEn : null,
      tieudehoaVi: hoa.tieudehoaVi ? hoa.tieudehoaVi : null,
      tieudehoaEn: hoa.tieudehoaEn ? hoa.tieudehoaEn : null,
      soluongcon: hoa.soluongcon ? hoa.soluongcon : null,
      soluongnhap: hoa.soluongnhap ? hoa.soluongnhap : null,
      soluongban: hoa.soluongban ? hoa.soluongban : null,
      giathucVND: hoa.giathucVND ? hoa.giathucVND : null,
      giathucUSD: hoa.giathucUSD ? hoa.giathucUSD : null,
      phantramgiam: hoa.phantramgiam ? hoa.phantramgiam : null,
      giasaukhigiamVND: hoa.giasaukhigiamVND ? hoa.giasaukhigiamVND : null,
      giasaukhigiamUSD: hoa.giasaukhigiamUSD ? hoa.giasaukhigiamUSD : null,
      motaspVi: hoa.motaspVi ? hoa.motaspVi : null,
      motaspEn: hoa.motaspEn ? hoa.motaspEn : null,
      motasphtmlVi: hoa.motasphtmlVi ? hoa.motasphtmlVi : null,
      motasphtmlEn: hoa.motasphtmlEn ? hoa.motasphtmlEn : null,
      donoibat: hoa.donoibat ? hoa.donoibat : null,
      ghichuVi: hoa.ghichuVi ? hoa.ghichuVi : null,
      ghichuEn: hoa.ghichuEn ? hoa.ghichuEn : null,
      anhUrlnoibat: anhnoibatbase64 ? anhnoibatbase64 : null,
      trangthainut: true,
    });
  };

  clickbtnsuahoa = async () => {
    let anhnoibat = "";
    if (this.state.anhnoibat) {
      anhnoibat = new Buffer(this.state.anhnoibat, "base64").toString("binary");
    }
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;

    let kq = await apisuahoa({
      id: this.state.id,
      iddanhmuchoachitiet: this.state.iddanhmuchoachitiet,
      anhnoibat: this.state.anhnoibat,
      tenhoaVi: this.state.tenhoaVi,
      tenhoaEn: this.state.tenhoaEn,
      tieudehoaVi: this.state.tieudehoaVi,
      tieudehoaEn: this.state.tieudehoaEn,
      soluongcon: this.state.soluongcon,
      soluongnhap: this.state.soluongnhap,
      soluongban: this.state.soluongban,
      giathucVND: this.state.giathucVND,
      giathucUSD: this.state.giathucUSD,
      phantramgiam: this.state.phantramgiam,
      giasaukhigiamVND: this.state.giasaukhigiamVND,
      giasaukhigiamUSD: this.state.giasaukhigiamUSD,
      motaspVi: this.state.motaspVi,
      motaspEn: this.state.motaspEn,
      motasphtmlVi: this.state.motasphtmlVi,
      motasphtmlEn: this.state.motasphtmlEn,
      donoibat: this.state.donoibat,
      ghichuVi: this.state.ghichuVi,
      ghichuEn: this.state.ghichuEn,
    });
    if (kq.maCode === 6) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
        : toast.error("You are not an admin, please come back!!!");
    }
    if (kq.maCode === 7) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
          )
        : toast.error(
            "You are not an admin or store employee, please leave!!!"
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
        ? toast.success("Sửa hoa thành công")
        : toast.success("Edit flower successfully");
      this.setState({
        id: "",
        iddanhmuchoachitiet: "",
        anhnoibat: "",
        tenhoaVi: "",
        tenhoaEn: "",
        tieudehoaVi: "",
        tieudehoaEn: "",
        soluongcon: "",
        soluongnhap: "",
        soluongban: "",
        giathucVND: "",
        giathucUSD: "",
        phantramgiam: "",
        giasaukhigiamVND: "",
        giasaukhigiamUSD: "",
        motaspVi: "",
        motaspEn: "",
        motasphtmlVi: "",
        motasphtmlEn: "",
        donoibat: "",
        trangthainut: false,
        anhUrlnoibat: "",
        ghichuVi: "",
        ghichuEn: "",
      });
      await this.laytatcahoa();
      await this.laytatcadanhmucchitiet();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Sửa hoa thất bại")
        : toast.success("Edit error flower");
    }
  };

  clickxoahoa = async (id) => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apixoahoa(id);
    if (kq.maCode === 6) {
      this.props.ngonngu === "vi"
        ? toast.error("Chỉ có admin mới được phép xóa hoa!!!")
        : toast.error("Only admins are allowed to delete flowers!!!");
    }
    if (kq.maCode === 7) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
          )
        : toast.error(
            "You are not an admin or store employee, please leave!!!"
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
        ? toast.success("Xóa hoa thành công")
        : toast.success("Delete flower successfully");
      await this.laytatcahoa();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Xóa hoa thất bại")
        : toast.success("Delete error flower");
    }
  };

  timkiem = (event) => {
    let timkiem = event.target.value;
    if (timkiem) {
      let clone = _.cloneDeep(this.state.tatcahoa);
      clone = clone.filter((item) =>
        (this.props.ngonngu === "vi"
          ? item.tenhoaVi
            ? item.tenhoaVi
            : ""
          : item.tenhoaEn
          ? item.tenhoaEn
          : ""
        )
          .toLowerCase()
          .includes(timkiem.toLowerCase())
      );
      this.setState({
        tatcahoa: clone,
      });
    } else {
      this.laytatcahoa();
    }
  };

  render() {
    let {
      trangthainut,
      iddanhmuchoachitiet,
      danhmuchoachitietArr,
      tenhoaVi,
      tenhoaEn,
      tieudehoaVi,
      tieudehoaEn,
      soluongcon,
      soluongnhap,
      soluongban,
      giathucVND,
      giathucUSD,
      phantramgiam,
      giasaukhigiamVND,
      giasaukhigiamUSD,
      motaspVi,
      motaspEn,
      donoibat,
      tatcahoa,
      ghichuVi,
      ghichuEn,
      anhnoibat,
    } = this.state;
    let { ngonngu } = this.props;
    return (
      <div className="quanlyhoa">
        <div className="item1">
          <span>
            <FormattedMessage id="quanlyhoa" />
          </span>
        </div>
        <div className="row item2">
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlyhoadmct" />
            </label>
            <select
              className="form-control"
              onChange={(event) => {
                this.nhapdulieu(event, "iddanhmuchoachitiet");
              }}
              value={iddanhmuchoachitiet ? iddanhmuchoachitiet : ""}
            >
              <option value={null}>
                {this.props.ngonngu === "vi"
                  ? "Chưa có danh mục hoa chi tiết vui lòng chọn danh mục!!"
                  : "here is no detailed flower list yet, please select a category!!!"}
              </option>
              {danhmuchoachitietArr &&
                danhmuchoachitietArr.length > 0 &&
                danhmuchoachitietArr.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {ngonngu === "vi"
                        ? item.tendanhmucchitietVi
                        : item.tendanhmucchitietEn}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlyhoatenhoaVi" />
            </label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.nhapdulieu(event, "tenhoaVi");
              }}
              value={tenhoaVi ? tenhoaVi : ""}
            />
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="quanlyhoatenhoaEn" />
            </label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.nhapdulieu(event, "tenhoaEn");
              }}
              value={tenhoaEn ? tenhoaEn : ""}
            />
          </div>
          <div className="form-group col-6">
            <label>
              <FormattedMessage id="quanlyhoatieudeVi" />
            </label>
            <textarea
              className="form-control inputtieude"
              type="text"
              onChange={(event) => {
                this.nhapdulieu(event, "tieudehoaVi");
              }}
              value={tieudehoaVi ? tieudehoaVi : ""}
            ></textarea>
          </div>
          <div className="form-group col-6">
            <label>
              <FormattedMessage id="quanlyhoatieudeEn" />
            </label>
            <textarea
              className="form-control inputtieude"
              type="text"
              onChange={(event) => {
                this.nhapdulieu(event, "tieudehoaEn");
              }}
              value={tieudehoaEn ? tieudehoaEn : ""}
            ></textarea>
          </div>
          <div className="gia gia1">
            <div className="form-group khoigia">
              <label>
                <FormattedMessage id="quanlyhoaanhnoibat" />
              </label>
              <div className="anhabc">
                <input
                  id="anhImg"
                  type="file"
                  hidden
                  accept="image/jpeg, image/png, image/gif"
                  onChange={(event) => this.onChangexemanh(event)}
                />
                <label className="upanh" htmlFor="anhImg">
                  <FormattedMessage id="quanlyhoataianh" />
                  <i className="fas fa-upload"></i>
                </label>
                <div
                  className="anh"
                  style={{
                    //backgroundImage: this.state.anhUrlnoibat ? `url(${this.state.anhUrlnoibat})` : 'none',
                    backgroundImage: `url(${this.state.anhUrlnoibat})`,
                  }}
                  onClick={() => this.nhanxemanh()}
                ></div>
              </div>
              {this.state.openmoanhnoibat === true && (
                <Lightbox
                  mainSrc={this.state.anhnoibat}
                  onCloseRequest={() =>
                    this.setState({ openmoanhnoibat: false })
                  }
                />
              )}
            </div>
            <div className="form-group khoigia">
              <label>
                <FormattedMessage id="quanlyhoasoluongnhap" />
              </label>
              <input
                className="form-control"
                type="number"
                onChange={(event) => {
                  this.nhapdulieu(event, "soluongnhap");
                }}
                value={soluongnhap ? soluongnhap : ""}
              />
            </div>
            <div className="form-group khoigia">
              <label>
                <FormattedMessage id="quanlyhoasoluongban" />
              </label>
              <input
                className="form-control"
                type="number"
                onChange={(event) => {
                  this.nhapdulieu(event, "soluongban");
                }}
                value={soluongban ? soluongban : ""}
              />
            </div>
            <div className="form-group khoigia">
              <label>
                <FormattedMessage id="quanlyhoasoluongcon" />
              </label>
              <input
                className="form-control"
                type="number"
                disabled={true}
                value={soluongcon ? soluongcon : ""}
              />
            </div>
            <div className="form-group khoigia">
              <label>
                <FormattedMessage id="quanlyhoadonoibat" />
              </label>
              <input
                className="form-control"
                type="number"
                onChange={(event) => {
                  this.nhapdulieu(event, "donoibat");
                }}
                value={donoibat ? donoibat : ""}
              />
            </div>
          </div>
          <div className="gia">
            <div className="form-group khoigia">
              <label>
                <FormattedMessage id="quanlyhoagiavnd" />
              </label>
              <input
                className="form-control"
                type="number"
                onChange={(event) => {
                  this.nhapdulieu(event, "giathucVND");
                }}
                value={giathucVND ? giathucVND : ""}
              />
            </div>
            <div className="form-group khoigia">
              <label>
                <FormattedMessage id="quanlyhoagiausd" />
              </label>
              <input
                className="form-control"
                type="number"
                onChange={(event) => {
                  this.nhapdulieu(event, "giathucUSD");
                }}
                value={giathucUSD ? giathucUSD : ""}
              />
            </div>
            <div className="form-group khoigia">
              <label>
                <FormattedMessage id="quanlyhoaphantramgian" />
              </label>
              <input
                className="form-control"
                type="number"
                onChange={(event) => {
                  this.nhapdulieu(event, "phantramgiam");
                }}
                value={phantramgiam ? phantramgiam : ""}
              />
            </div>
            <div className="form-group khoigia">
              <label>
                <FormattedMessage id="quanlyhoagiabanvnd" />
              </label>
              <input
                className="form-control"
                type="text"
                value={giasaukhigiamVND ? giasaukhigiamVND : ""}
                disabled={true}
              />
            </div>
            <div className="form-group khoigia">
              <label>
                <FormattedMessage id="quanlyhoagiabanusd" />
              </label>
              <input
                className="form-control"
                type="text"
                value={giasaukhigiamUSD ? giasaukhigiamUSD : ""}
                disabled={true}
              />
            </div>
          </div>

          <div className="form-group col-6">
            <label>
              <FormattedMessage id="quanlyhoaghichuVi" />
            </label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.nhapdulieu(event, "ghichuVi");
              }}
              value={ghichuVi ? ghichuVi : ""}
            />
          </div>
          <div className="form-group col-6">
            <label>
              <FormattedMessage id="quanlyhoaghichuEn" />
            </label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.nhapdulieu(event, "ghichuEn");
              }}
              value={ghichuEn ? ghichuEn : ""}
            />
          </div>
        </div>

        <div className="item4">
          <br />
          <label>
            <FormattedMessage id="quanlyhoamotaVi" />
          </label>{" "}
          <br />
          <MdEditor
            style={{ height: "200px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.nhapmotaVi}
            value={motaspVi ? motaspVi : ""}
          />
          <br />
          <label>
            <FormattedMessage id="quanlyhoamotaEn" />
          </label>{" "}
          <br />
          <MdEditor
            style={{ height: "200px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.nhapmotaEn}
            value={motaspEn ? motaspEn : ""}
          />
        </div>

        {trangthainut === false ? (
          <button
            className="btn btn-primary mt-3"
            onClick={() => this.clickthemhoa()}
          >
            <FormattedMessage id="quanlyhoathemhoa" />
          </button>
        ) : (
          <button
            className="btn btn-primary mt-3"
            onClick={() => this.clickbtnsuahoa()}
          >
            <FormattedMessage id="quanlyhoasuahoa" />
          </button>
        )}
        <input
          className="form-control timkiemhoa"
          placeholder={ngonngu === "vi" ? "Tìm kiếm..." : "Search..."}
          onChange={(event) => this.timkiem(event)}
        />

        <div className="item3">
          <table className="table table-bordered ">
            <thead>
              <tr className="item31">
                <th scope="col">
                  <FormattedMessage id="quanlyhoadmct" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlyhoatenhoa" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlyhoasoluongnhap" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlyhoasoluongban" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlyhoasoluongcon" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlyhoagiachuagiam" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlyhoaphantramgian" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlyhoagiasaukhigiam" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlyhoadonoibat" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlyhanhdong" />
                </th>
              </tr>
            </thead>
            <tbody>
              {tatcahoa && tatcahoa.length > 0
                ? tatcahoa.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {item.iddanhmuchoachitiet
                            ? ngonngu === "vi"
                              ? item.danhmuchoachitiet.tendanhmucchitietVi
                              : item.danhmuchoachitiet.tendanhmucchitietEn
                            : null}
                        </td>
                        <td>
                          {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                        </td>
                        <td>{item.soluongnhap}</td>
                        <td>{item.soluongban}</td>
                        <td>{item.soluongcon}</td>

                        <td>{`${
                          ngonngu === "vi"
                            ? `${
                                item.giathucVND
                                  ? item.giathucVND.toLocaleString()
                                  : ""
                              } đ`
                            : `${item.giathucUSD} USD`
                        }`}</td>
                        <td>{item.phantramgiam} %</td>
                        <td>{`${
                          ngonngu === "vi"
                            ? `${
                                item.giasaukhigiamVND
                                  ? item.giasaukhigiamUSD.toLocaleString()
                                  : ""
                              } đ`
                            : `${item.giasaukhigiamUSD} USD`
                        }`}</td>
                        <td>{item.donoibat}</td>
                        <td>
                          <button>
                            <i
                              className="fas fa-edit"
                              onClick={() => this.clicksuahoa(item)}
                            ></i>
                          </button>
                          <button>
                            <i
                              className="fas fa-trash"
                              onClick={() => this.clickxoahoa(item.id)}
                            ></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyHoa);
