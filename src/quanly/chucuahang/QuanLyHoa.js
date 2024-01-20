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
      toast.error("Phiên làm việc đã hết hạn vui lòng đăng nhập lại");
    }

    let kq = await tatcadanhmucchitiet();
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
      toast.error("Phiên làm việc đã hết hạn vui lòng đăng nhập lại");
    }

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
      toast.error("Phiên làm việc đã hết hạn vui lòng đăng nhập lại");
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
    let anhnoibatbase64 = ''

    if (hoa.anhnoibat || hoa.anh2 || hoa.anh3 || hoa.anh4) {
      anhnoibatbase64 = new Buffer(hoa.anhnoibat, "base64").toString("binary");
    }
    this.setState({
      id: hoa.id,
      iddanhmuchoachitiet: hoa.iddanhmuchoachitiet
        ? hoa.iddanhmuchoachitiet
        : null,
      anhnoibat: hoa.anhnoibat ? hoa.anhnoibat : null,
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
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      toast.error("Phiên làm việc đã hết hạn vui lòng đăng nhập lại");
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
      toast.error("Phiên làm việc đã hết hạn vui lòng đăng nhập lại");
    }
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
      ghichuVi,
      ghichuEn,
    } = this.state;
    let { ngonngu } = this.props;
    console.log(this.state);
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
              value={iddanhmuchoachitiet ? iddanhmuchoachitiet : ""}
            >
              <option value={null}>
                Chưa có danh mục hoa chi tiết vui lòng chọn danh mục!!!
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
            <label>Tên hoa tiếng Việt</label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.nhapdulieu(event, "tenhoaVi");
              }}
              value={tenhoaVi ? tenhoaVi : ''}
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
              value={tenhoaEn ? tenhoaEn : ''}
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
              value={tieudehoaVi ? tieudehoaVi : ''}
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
              value={tieudehoaEn ? tieudehoaEn : ''}
            ></textarea>
          </div>
          <div className="gia gia1">
            <div className="form-group khoigia">
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
                  onCloseRequest={() =>
                    this.setState({ openmoanhnoibat: false })
                  }
                />
              )}
            </div>
            <div className="form-group khoigia">
              <label>Số lượng hoa nhập</label>
              <input
                className="form-control"
                type="number"
                onChange={(event) => {
                  this.nhapdulieu(event, "soluongnhap");
                }}
                value={soluongnhap ? soluongnhap : ''}
              />
            </div>
            <div className="form-group khoigia">
              <label>Số lượng hoa đã bán</label>
              <input
                className="form-control"
                type="number"
                onChange={(event) => {
                  this.nhapdulieu(event, "soluongban");
                }}
                value={soluongban ? soluongban : ''}
              />
            </div>
            <div className="form-group khoigia">
              <label>Số lượng còn</label>
              <input
                className="form-control"
                type="number"
                disabled={true}
                value={soluongcon ? soluongcon : ''}
              />
            </div>
            <div className="form-group khoigia">
              <label>Độ nổi bật</label>
              <input
                className="form-control"
                type="number"
                onChange={(event) => {
                  this.nhapdulieu(event, "donoibat");
                }}
                value={donoibat ? donoibat : ''}
              />
            </div>
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
                value={giathucVND ? giathucVND : ''}
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
                value={giathucUSD ? giathucUSD : ''}
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
                value={phantramgiam ? phantramgiam : ''}
              />
            </div>
            <div className="form-group khoigia">
              <label>Giá bán VND</label>
              <input
                className="form-control"
                type="text"
                value={giasaukhigiamVND ? giasaukhigiamVND : ''}
                disabled={true}
              />
            </div>
            <div className="form-group khoigia">
              <label>Giá bán USD</label>
              <input
                className="form-control"
                type="text"
                value={giasaukhigiamUSD ? giasaukhigiamUSD : ''}
                disabled={true}
              />
            </div>
          </div>

          <div className="form-group col-6">
            <label>Ghi chú tiếng Việt</label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.nhapdulieu(event, "ghichuVi");
              }}
              value={ghichuVi ? ghichuVi : ''}
            />
          </div>
          <div className="form-group col-6">
            <label>Ghi chú tiếng Anh</label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                this.nhapdulieu(event, "ghichuEn");
              }}
              value={ghichuEn ? ghichuEn :''}
            />
          </div>
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
        <div className="item4">
          <br />
          <label>Mô tả sản phẩm tiếng Việt</label> <br />
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.nhapmotaVi}
            value={motaspVi ? motaspVi : ''}
          />
          <br />
          <label>Mô tả sản phẩm tiếng Anh</label> <br />
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.nhapmotaEn}
            value={motaspEn ? motaspEn : ''}
          />
        </div>

        {/* {trangthainut === false ? (
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
        )} */}

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
                        <th scope="row">
                          {item.iddanhmuchoachitiet
                            ? ngonngu === "vi"
                              ? item.danhmuchoachitiet.tendanhmucchitietVi
                              : item.danhmuchoachitiet.tendanhmucchitietEn
                            : null}
                        </th>
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
