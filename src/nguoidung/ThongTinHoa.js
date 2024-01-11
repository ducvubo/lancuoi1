import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ThongTinHoa.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import hoagiamgia4 from "../image/hoagiamgia2.webp";
import vanchuyen from "../image/vanchuyen.png";
import banner from "../image/banner.png";
import ms from "../image/ms.png";
import zalo from "../image/zalo.png";
import { apithongtinhoa } from "../API/ApiTrangChu";
class ThongTinHoa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thongtinhoa: "",
    };
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    await this.thongtinhoa(id);
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
  render() {
    let { thongtinhoa } = this.state;
    let anhnoibat = "";
    if (thongtinhoa.anhnoibat) {
      anhnoibat = new Buffer(thongtinhoa.anhnoibat, "base64").toString(
        "binary"
      );
    }
    let { ngonngu } = this.props;
    return (
      <>
        <HeaderTrangChu />
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
                      value={thongtinhoa.soluongcon}
                      disabled={true}
                      type="number"
                      className="form-control "
                    />
                  </div>
                  <div className="form-group">
                    <label>Số lượng mua</label>
                    <input type="number" className="form-control" min="0" />
                  </div>
                </div>

                <div className="nutbam">
                  <button className="btn gh">
                    <i className="fas fa-cart-plus"></i>
                  </button>
                  <button className="btn dh">Đặt hàng</button>
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

          <div className="item4"></div>
        </div>
        {/* <div className="thongtinhoa">
          <div className="item1">
            <div className="anh">
              <img src={hoagiamgia4} width="500" height="650" />
            </div>
            <div className="thongtin">
              <span className="tenhoa">Hồng Dịu Dàng</span>
              <div className="gia">
                <span className="giathuc">630000VND</span>
                <span className="giagiam">530000VND</span>
                <span className="phantram">16% giảm</span>
              </div>
              <span className="tieude">
                Có khi nhớ lắm một nụ cười ai đó nhưng ngại ngùng không muốn
                nói, có khi cần lắm một bàn tay ấm áp dịu dàng nhưng lại ở quá
                xa, có khi yêu lắm một ánh nhìn đầy đáng yêu, lãng mạn. Những
                gào này nha.
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
                  Sản phẩm này không hỗ trợ giao vào ngày: 08-02-2024,
                  09-02-2024, 10-02-2024, 11-02-2024, 12-02-2024, 13-02-2024,
                  14-02-2024, 15-02-2024
                </span>
              </div>
              <div className="sl-gh-dh">
                <div className="sl">
                  <div className="form-group">
                    <label>Số lượng còn</label>
                    <input
                      disabled={true}
                      type="number"
                      className="form-control "
                    />
                  </div>
                  <div className="form-group">
                    <label>Số lượng mua</label>
                    <input type="number" className="form-control" min="0" />
                  </div>
                </div>

                <div className="nutbam">
                  <button className="btn gh">
                    <i className="fas fa-cart-plus"></i>
                  </button>
                  <button className="btn dh">Đặt hàng</button>
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
            Có khi nhớ lắm một nụ cười ai đó nhưng ngại ngùng không muốn nói, có
            khi cần lắm một bàn tay ấm áp dịu dàng nhưng lại ở quá xa, có khi
            yêu lắm một ánh nhìn đầy đáng yêu, lãng mạn. Những giây phút ấy hẳn
            sẽ không bao giờ có thể quên, vì vật hãy tạo thêm những giây phút
            yêu đầu đầy hạnh phúc và bất ngờ cho người bạn yêu nhé. Tặng ngay
            cho người ấy một bó hoa lãng mạn với 15 hồng kem pastel thật ngọt
            ngào này nha. Bó hoa Hồng Dịu Dàng được thiết kế từ Hoa hồng kem: 15
            cành Các loại hoa lá phụ: Cúc thách thảo trắng Lưu ý: **Do được làm
            thủ công, nên sản phẩm ngoài thực tế sẽ có đôi chút khác biệt so với
            hình ảnh trên website. Tuy nhiên, Flowercorner cam kết hoa sẽ giống
            khoảng 80% so với hình ảnh. ** Vì các loại hoa lá phụ sẽ có tùy vào
            thời điểm trong năm, Flowercorner đảm bảo các loại hoa chính, các
            loại hoa lá phụ sẽ thay đổi phù hợp giá cả và thiết kế sản phẩm.
          </div>

          <div className="item4"></div>
        </div> */}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ThongTinHoa);
