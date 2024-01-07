import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../action/actions";
import "./QuanLyHoa.scss";
import {
  tatcadanhmucchitiet,
  apithemhoa,
  apitatcahoa,
  apisuahoa,
  apixoahoa
} from "../../API/GoiApi";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Xulyanh from "../../XuLyAnh/Xulyanh";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt();

class QuanLyHoa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danhmuchoachitietArr: [],
      anhUrlnoibat: "",
      openmoanhnoibat: false,
      anhUrlanh2: "",
      openmoanh2: false,
      anhUrlanh3: "",
      openmoanh3: false,
      anhUrlanh4: "",
      openmoanh4: false,

      id: "",
      iddanhmuchoachitiet: "",
      anhnoibat: "",
      anh2: "",
      anh3: "",
      anh4: "",
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
      tatcahoa: "",

      trangthainut: false,
    };
  }

  async componentDidMount() {
    await this.laytatcadanhmucchitiet();
    await this.laytatcahoa();
  }

  laytatcadanhmucchitiet = async () => {
    let kq = await tatcadanhmucchitiet();
    let data1 = kq.data;
    if (kq && kq.maCode === 0) {
      this.setState({
        danhmuchoachitietArr: data1,
        iddanhmuchoachitiet: data1 && data1.length > 0 ? data1[0].id : "",
      });
    }
    console.log("check dm chi tiet: ", data1);
  };

  laytatcahoa = async () => {
    let kq = await apitatcahoa();
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
      console.log("Check url: ", Url);
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

  onChangexemanh2 = async (event) => {
    let data = event.target.files;
    let fileanh = data[0];
    if (fileanh) {
      let anhbase64 = await Xulyanh.getBase64(fileanh);
      let Url = URL.createObjectURL(fileanh);
      this.setState({
        anhUrlanh2: Url,
        anh2: anhbase64,
      });
    }
  };
  nhanxemanh2 = () => {
    if (!this.state.anhUrlanh2) return;
    this.setState({
      openmoanh2: true,
    });
  };

  onChangexemanh3 = async (event) => {
    let data = event.target.files;
    let fileanh = data[0];
    if (fileanh) {
      let anhbase64 = await Xulyanh.getBase64(fileanh);
      let Url = URL.createObjectURL(fileanh);
      this.setState({
        anhUrlanh3: Url,
        anh3: anhbase64,
      });
    }
  };
  nhanxemanh3 = () => {
    if (!this.state.anhUrlanh3) return;
    this.setState({
      openmoanh3: true,
    });
  };

  onChangexemanh4 = async (event) => {
    let data = event.target.files;
    let fileanh = data[0];
    if (fileanh) {
      let anhbase64 = await Xulyanh.getBase64(fileanh);
      let Url = URL.createObjectURL(fileanh);
      this.setState({
        anhUrlanh4: Url,
        anh4: anhbase64,
      });
    }
  };
  nhanxemanh4 = () => {
    if (!this.state.anhUrlanh4) return;
    this.setState({
      openmoanh4: true,
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
    let arrCheck = [
      "iddanhmuchoachitiet",
      "anhnoibat",
      "anh2",
      "anh3",
      "anh4",
      "tenhoaVi",
      "tenhoaEn",
      "tieudehoaVi",
      "tieudehoaEn",
      "soluongcon",
      "soluongnhap",
      "soluongban",
      "giathucVND",
      "giathucUSD",
      "phantramgiam",
      "giasaukhigiamVND",
      "giasaukhigiamUSD",
      "motaspVi",
      "motaspEn",
      "motasphtmlVi",
      "motasphtmlEn",
      "donoibat",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        console.log(this.state[arrCheck[i]]);

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
    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;

    let kq = await apithemhoa({
      iddanhmuchoachitiet: this.state.iddanhmuchoachitiet,
      anhnoibat: this.state.anhnoibat,
      anh2: this.state.anh2,
      anh3: this.state.anh3,
      anh4: this.state.anh4,
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
    });

    if (kq.maCode === 0 && kq) {
      this.props.ngonngu === "vi"
        ? toast.success("Thêm hoa thành công")
        : toast.success("Added flower successfully");
      this.setState({
        iddanhmuchoachitiet: "",
        anhnoibat: "",
        anh2: "",
        anh3: "",
        anh4: "",
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
      });
      await this.laytatcahoa();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Thêm hoa thất bại")
        : toast.success("Add hoa category");
    }
  };

  clicksuahoa = (hoa) => {
    let anhnoibatbase64 = "";
    let anh2base64 = "";
    let anh3base64 = "";
    let anh4base64 = "";

    // if (hoa.anhnoibat || hoa.anh2 || hoa.anh3 || hoa.anh4) {
      anhnoibatbase64 = new Buffer(hoa.anhnoibat, "base64").toString("binary");
      anh2base64 = new Buffer(hoa.anh2, "base64").toString("binary");
      anh3base64 = new Buffer(hoa.anh3, "base64").toString("binary");
      anh4base64 = new Buffer(hoa.anh4, "base64").toString("binary");
    // }
    this.setState({
      id: hoa.id,
      iddanhmuchoachitiet: hoa.iddanhmuchoachitiet,
      anhnoibat: hoa.anhnoibat,
      anh2: hoa.anh2,
      anh3: hoa.anh3,
      anh4: hoa.anh4,
      tenhoaVi: hoa.tenhoaVi,
      tenhoaEn: hoa.tenhoaEn,
      tieudehoaVi: hoa.tieudehoaVi,
      tieudehoaEn: hoa.tieudehoaEn,
      soluongcon: hoa.soluongcon,
      soluongnhap: hoa.soluongnhap,
      soluongban: hoa.soluongban,
      giathucVND: hoa.giathucVND,
      giathucUSD: hoa.giathucUSD,
      phantramgiam: hoa.phantramgiam,
      giasaukhigiamVND: hoa.giasaukhigiamVND,
      giasaukhigiamUSD: hoa.giasaukhigiamUSD,
      motaspVi: hoa.motaspVi,
      motaspEn: hoa.motaspEn,
      motasphtmlVi: hoa.motasphtmlVi,
      motasphtmlEn: hoa.motasphtmlEn,
      donoibat: hoa.donoibat,
      anhUrlnoibat: anhnoibatbase64,
      anhUrlanh2: anh2base64,
      anhUrlanh3: anh3base64,
      anhUrlanh4: anh4base64,
      trangthainut: true,
    });
  };

  clickbtnsuahoa = async () => {
    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;

    let kq = await apisuahoa({
      id: this.state.id,
      iddanhmuchoachitiet: this.state.iddanhmuchoachitiet,
      anhnoibat: this.state.anhnoibat,
      anh2: this.state.anh2,
      anh3: this.state.anh3,
      anh4: this.state.anh4,
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
    });
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Sửa hoa thành công")
        : toast.success("Edit flower successfully");
      this.setState({
        id: "",
        iddanhmuchoachitiet: "",
        anhnoibat: "",
        anh2: "",
        anh3: "",
        anh4: "",
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
      });
      await this.laytatcahoa();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Sửa hoa thất bại")
        : toast.success("Edit error flower");
    }
  };

  clickxoahoa = async (id) => {
    let kq = await apixoahoa(id);
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Xóa hoa thành công")
        : toast.success("Delete flower successfully");
      await this.laytatcahoa();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Xóa danh mục thất bại")
        : toast.success("Delete error flower");
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
    } = this.state;
    let { ngonngu } = this.props;

    console.log("check hoa: ", this.state);
    return (
      <div className="quanlyhoa">
        <div className="item1">
          <span>Quản lý hoa</span>
        </div>
        <div className="row item2">
          <div className="form-group col-4">
            <label>Danh mục hoa chi tiết</label>
            <select
              className="form-control"
              onChange={(event) => {
                this.nhapdulieu(event, "iddanhmuchoachitiet");
              }}
              value={iddanhmuchoachitiet}
            >
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
            <label>Tên hoa tiếng Việt</label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.nhapdulieu(event, "tenhoaVi");
              }}
              value={tenhoaVi}
            />
          </div>
          <div className="form-group col-4">
            <label>Tên hoa tiếng Anh</label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.nhapdulieu(event, "tenhoaEn");
              }}
              value={tenhoaEn}
            />
          </div>
          <div className="form-group col-6">
            <label>Tiêu đề hoa tiếng Việt</label>
            <textarea
              className="form-control inputtieude"
              type="text"
              onChange={(event) => {
                this.nhapdulieu(event, "tieudehoaVi");
              }}
              value={tieudehoaVi}
            ></textarea>
          </div>
          <div className="form-group col-6">
            <label>Tiêu đề hoa tiếng Anh</label>
            <textarea
              className="form-control inputtieude"
              type="text"
              onChange={(event) => {
                this.nhapdulieu(event, "tieudehoaEn");
              }}
              value={tieudehoaEn}
            ></textarea>
          </div>
          <div className="col-3">
            <label>Ảnh nổi bật</label>
            <div className="anhabc">
              <input
                id="anhImg"
                type="file"
                hidden
                onChange={(event) => this.onChangexemanh(event)}
              />
              <label className="upanh" htmlFor="anhImg">
                Tải ảnh<i className="fas fa-upload"></i>
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
                onCloseRequest={() => this.setState({ openmoanhnoibat: false })}
              />
            )}
          </div>
          <div className="col-3">
            <label>Ảnh hoa 2</label>
            <div className="anhabc">
              <input
                id="anhImg2"
                type="file"
                hidden
                onChange={(event) => this.onChangexemanh2(event)}
              />
              <label className="upanh" htmlFor="anhImg2">
                Tải ảnh<i className="fas fa-upload"></i>
              </label>
              <div
                className="anh"
                style={{
                  backgroundImage: `url(${this.state.anhUrlanh2})`,
                }}
                onClick={() => this.nhanxemanh2()}
              ></div>
            </div>
            {this.state.openmoanh2 === true && (
              <Lightbox
                mainSrc={this.state.anh2}
                onCloseRequest={() => this.setState({ openmoanh2: false })}
              />
            )}
          </div>
          <div className="col-3">
            <label>Ảnh hoa 3</label>
            <div className="anhabc">
              <input
                id="anhImg3"
                type="file"
                hidden
                onChange={(event) => this.onChangexemanh3(event)}
              />
              <label className="upanh" htmlFor="anhImg3">
                Tải ảnh<i className="fas fa-upload"></i>
              </label>
              <div
                className="anh"
                style={{
                  backgroundImage: `url(${this.state.anhUrlanh3})`,
                }}
                onClick={() => this.nhanxemanh3()}
              ></div>
            </div>
            {this.state.openmoanh3 === true && (
              <Lightbox
                mainSrc={this.state.anh3}
                onCloseRequest={() => this.setState({ openmoanh3: false })}
              />
            )}
          </div>
          <div className="col-3">
            <label>Ảnh hoa 4</label>
            <div className="anhabc">
              <input
                id="anhImg4"
                type="file"
                hidden
                onChange={(event) => this.onChangexemanh4(event)}
              />
              <label className="upanh" htmlFor="anhImg4">
                Tải ảnh<i className="fas fa-upload"></i>
              </label>
              <div
                className="anh"
                style={{
                  backgroundImage: `url(${this.state.anhUrlanh4})`,
                }}
                onClick={() => this.nhanxemanh4()}
              ></div>
            </div>
            {this.state.openmoanh4 === true && (
              <Lightbox
                mainSrc={this.state.anh4}
                onCloseRequest={() => this.setState({ openmoanh4: false })}
              />
            )}
          </div>
          <div className="form-group col-3">
            <label>Số lượng hoa nhập</label>
            <input
              className="form-control"
              type="number"
              onChange={(event) => {
                this.nhapdulieu(event, "soluongnhap");
              }}
              value={soluongnhap}
            />
          </div>
          <div className="form-group col-3">
            <label>Số lượng hoa đã bán</label>
            <input
              className="form-control"
              type="number"
              onChange={(event) => {
                this.nhapdulieu(event, "soluongban");
              }}
              value={soluongban}
            />
          </div>
          <div className="form-group col-3">
            <label>Số lượng còn</label>
            <input
              className="form-control"
              type="number"
              disabled={true}
              value={soluongcon}
            />
          </div>
          <div className="form-group col-3">
            <label>Độ nổi bật</label>
            <input
              className="form-control"
              type="number"
              onChange={(event) => {
                this.nhapdulieu(event, "donoibat");
              }}
              value={donoibat}
            />
          </div>
          <div className="gia">
            <div className="form-group khoigia">
              <label>Giá VND</label>
              <input
                className="form-control"
                type="number"
                onChange={(event) => {
                  this.nhapdulieu(event, "giathucVND");
                }}
                value={giathucVND}
              />
            </div>
            <div className="form-group khoigia">
              <label>Giá USD</label>
              <input
                className="form-control"
                type="number"
                onChange={(event) => {
                  this.nhapdulieu(event, "giathucUSD");
                }}
                value={giathucUSD}
              />
            </div>
            <div className="form-group khoigia">
              <label>Phần trăm giảm giá</label>
              <input
                className="form-control"
                type="number"
                onChange={(event) => {
                  this.nhapdulieu(event, "phantramgiam");
                }}
                value={phantramgiam}
              />
            </div>
            <div className="form-group khoigia">
              <label>Giá bán VND</label>
              <input
                className="form-control"
                type="text"
                value={giasaukhigiamVND}
                disabled={true}
              />
            </div>
            <div className="form-group khoigia">
              <label>Giá bán USD</label>
              <input
                className="form-control"
                type="text"
                value={giasaukhigiamUSD}
                disabled={true}
              />
            </div>
          </div>
        </div>
        <div className="item4">
          <br />
          <label>Mô tả sản phẩm tiếng Việt</label> <br />
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.nhapmotaVi}
            value={motaspVi}
          />
          <br />
          <label>Mô tả sản phẩm tiếng Anh</label> <br />
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.nhapmotaEn}
            value={motaspEn}
          />
        </div>

        {trangthainut === false ? (
          <button
            className="btn btn-primary"
            onClick={() => this.clickthemhoa()}
          >
            Thêm danh mục
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => this.clickbtnsuahoa()}
          >
            Sửa danh mục
          </button>
        )}

        <div className="item3">
          <table className="table">
            <thead className="thead-dark">
              <tr className="item31">
                <th scope="col">Danh mục chi tiết</th>
                <th scope="col">Tên hoa tiếng Việt</th>
                <th scope="col">Tên hoa tiếng Anh</th>
                <th scope="col">Số lượng còn</th>
                <th scope="col">Số lượng nhập</th>
                <th scope="col">Số lượng bán</th>
                <th scope="col">Giá VND</th>
                <th scope="col">Giá USD</th>
                <th scope="col">% Giảm</th>
                <th scope="col">Độ nổi bật</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {tatcahoa && tatcahoa.length > 0
                ? tatcahoa.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{item.iddanhmuchoachitiet}</th>
                        <td>{item.tenhoaVi}</td>
                        <td>{item.tenhoaEn}</td>
                        <td>{item.soluongcon}</td>
                        <td>{item.soluongnhap}</td>
                        <td>{item.soluongban}</td>
                        <td>{item.giathucVND}</td>
                        <td>{item.giathucUSD}</td>
                        <td>{item.phantramgiam}</td>
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
