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
} from "../API/ApiTrangChu";
import { apirefreshtoken } from "../API/GoiApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import * as actions from "../action/actions";

class ThongTinHoa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thongtinhoa: "",
      soluong: 1,
      sanphamlienquan: "",
    };
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    await this.thongtinhoa(id);
    await this.sanphamlienquan();
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
    }
    if (prevState.thongtinhoa !== this.state.thongtinhoa) {
      this.sanphamlienquan();
    }
  }

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
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Thêm vào giỏ hàng thành công!!!")
        : toast.success("Add to cart successfully!!!");
    }
    if (kq && kq.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục!!!")
        : toast.success("You are not logged in, please log in to continue!!!");
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

  render() {
    let { thongtinhoa, soluong, sanphamlienquan } = this.state;
    let anhnoibat = "";
    if (thongtinhoa.anhnoibat) {
      anhnoibat = new Buffer(thongtinhoa.anhnoibat, "base64").toString(
        "binary"
      );
    }
    let { ngonngu } = this.props;
    return (
      <>
        {/* <HeaderTrangChu /> */}
        <div className="thongtinhoa">
          <div className="item1">
            <div className="anh">
              <img src={anhnoibat} width="500" height="650" />
            </div>
            <div className="thongtin">
              <span className="tenhoa">
                {ngonngu === "vi" ? thongtinhoa.tenhoaVi : thongtinhoa.tenhoaEn}
              </span>
              <div className="gia">
                <span className="giathuc">
                  {ngonngu === "vi"
                    ? thongtinhoa.giathucVND
                    : thongtinhoa.giathucUSD}
                  VND
                </span>
                <span className="giagiam">
                  {ngonngu === "vi"
                    ? thongtinhoa.giasaukhigiamVND
                    : thongtinhoa.giasaukhigiamUSD}
                  VND
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
            <span className="mota">Mô tả sản phẩm</span>
            <div className="boder"> </div>
          </div>
          <div className="item3">
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
                      <Link to={`/thongtinhoa/${item.id}`}
                        style={{ cursor: 'pointer' }}
                      
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
                      <Link className="linkten" to={`/thongtinhoa/${item.id}`}
                        style={{ cursor: 'pointer' }}

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
                                {item.giasaukhigiamVND}VND
                              </span>
                              <span className="giachuagiam">
                                {item.giathucVND}VND
                              </span>
                            </>
                          ) : (
                            <span className="giagiam">
                              {item.giathucVND}VND
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="gia"
                        >
                          <Link to={`/thongtinhoa/${item.id}`}
                        style={{ cursor: 'pointer' }}
                          
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
                          </Link>
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
        {/* <FooterTrangChu /> */}
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
