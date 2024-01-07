import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./trangChu.scss";
import logo from "../image/logo.png";
import SlideShow from "./SlideShow";
import TestSwitch from "./TestSwitch";
import hoagiamgia1 from "../image/hoagiamgia1.webp";
import hoagiamgia2 from "../image/hoagiamgia2.webp";
import hoagiamgia3 from "../image/hoagimagia3.webp";
import hoagiamgia4 from "../image/hoagiamgia4.webp";
import logothuonghieu1 from "../image/logothuonghieu1.webp";
import logothuonghieu2 from "../image/logothuonghieu2.webp";
import logothuonghieu3 from "../image/logothuonghieu3.webp";

import SlideKH from "./SlideKH";
import {
  danhmuchoanoibat,
  apitatcahoa,
  apihoagiamgia,
  apihoakhaitruong,
  apihoasinhnhat,
  apihoatetbanchay,
  apilanhodiep,
  hoatetgiamgia,
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
    await this.layhoatetbanchay();
    await this.layhoatetgiamgia();
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
  layhoatetbanchay = async () => {
    let kq = await apihoatetbanchay();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        hoatetbanchay: data1,
      });
    }
  };
  layhoatetgiamgia = async () => {
    let kq = await hoatetgiamgia();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        hoatetgiamgia: data1,
      });
    }
  };
  layhoakhaitruong = async () => {
    let kq = await apihoakhaitruong();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        hoakhaitruong: data1,
      });
    }
  };
  layhoasinhnhat = async () => {
    let kq = await apihoasinhnhat();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        hoasinhnhat: data1,
      });
    }
  };
  laylanhodiep = async () => {
    let kq = await apilanhodiep();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        lanhodiep: data1,
      });
    }
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
          <span>Đang giảm giá</span>
        </div>
        <div className="item7">
          {hoagiamgia &&
            hoagiamgia.length > 0 &&
            hoagiamgia.map((item, index) => {
              let anhnoibat = "";
              if (item.anhnoibat) {
                anhnoibat = new Buffer(item.anhnoibat, "base64").toString(
                  "binary"
                );
              }
              return (
                <div className="hoa" key={index}>
                  <div className="anhhoa">
                    <img src={anhnoibat} width="261" height="326" />
                    <div className="giamgia">{item.phantramgiam}% GIẢM</div>
                  </div>
                  <div className="thongtin">
                    <span className="ten">
                      {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                    </span>
                    <div className="gia">
                      <span className="giagiam">
                        {item.giasaukhigiamVND}VND
                      </span>
                      <span className="giachuagiam">{item.giathucVND}VND</span>
                    </div>
                    <div className="dathang">
                      <a href="#">ĐẶT HÀNG</a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="item8">
          <div className="thongtin">
            <img src={logothuonghieu1} width="100" height="100" />
            <span className="khauhieu">FREE SHIPPING</span>
            <span className="noidung">
              Hh flower giao miễn phí các nội thành TP.HCM đối với tất cả bó
              hoa, lẵng hoa, và kệ hoa trên 1 triệu.
            </span>
          </div>
          <div className="thongtin">
            <img src={logothuonghieu2} width="100" height="100" />
            <span className="khauhieu">GIAO NHANH TRONG 90 PHÚT</span>
            <span className="noidung">
              Hh flower có thể giao nhanh trong 90' khu vực nội thành TP.HCM với
              bó / lẵng hoa đơn giản.
            </span>
          </div>
          <div className="thongtin">
            <img src={logothuonghieu3} width="100" height="100" />
            <span className="khauhieu">HOA ĐẸP NHƯ HÌNH</span>
            <span className="noidung">
              Cam kết hoa đẹp như hình và giống đến 90% so với hình chụp trên
              website.
            </span>
          </div>
        </div>

        <div className="item6">
          <span>hoa tết giảm giá</span>
        </div>
        <div className="item9">
          {hoatetgiamgia &&
            hoatetgiamgia.length > 0 &&
            hoatetgiamgia.map((item, index) => {
              let anhnoibat = "";
              if (item.anhnoibat) {
                anhnoibat = new Buffer(item.anhnoibat, "base64").toString(
                  "binary"
                );
              }
              return (
                <div className="hoa" key={index}>
                  <div className="anhhoa">
                    <img src={anhnoibat} width="261" height="326" />
                    <div className="giamgia">{item.phantramgiam}% GIẢM</div>
                  </div>
                  <div className="thongtin">
                    <span className="ten">
                      {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                    </span>
                    <div className="gia">
                      <span className="giagiam">
                        {item.giasaukhigiamVND}VND
                      </span>
                      <span className="giachuagiam">{item.giathucVND}VND</span>
                    </div>
                    <div className="dathang">
                      <a href="#">ĐẶT HÀNG</a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="item6">
          <span>hoa tết bán chạy</span>
        </div>
        <div className="item9">
          {hoatetbanchay &&
            hoatetbanchay.length > 0 &&
            hoatetbanchay.map((item, index) => {
              let anhnoibat = "";
              if (item.anhnoibat) {
                anhnoibat = new Buffer(item.anhnoibat, "base64").toString(
                  "binary"
                );
              }
              return (
                <div className="hoa" key={index}>
                  <div className="anhhoa">
                    <img src={anhnoibat} width="261" height="326" />
                    <div className="giamgia">{item.phantramgiam}% GIẢM</div>
                  </div>
                  <div className="thongtin">
                    <span className="ten">
                      {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                    </span>
                    <div className="gia">
                      <span className="giagiam">
                        {item.giasaukhigiamVND}VND
                      </span>
                      <span className="giachuagiam">{item.giathucVND}VND</span>
                    </div>
                    <div className="dathang">
                      <a href="#">ĐẶT HÀNG</a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="item6">
          <span>hoa sinh nhật</span>
        </div>
        <div className="item7">
          {hoasinhnhat &&
            hoasinhnhat.length > 0 &&
            hoasinhnhat.map((item, index) => {
              let anhnoibat = "";
              if (item.anhnoibat) {
                anhnoibat = new Buffer(item.anhnoibat, "base64").toString(
                  "binary"
                );
              }
              return (
                <div className="hoa" key={index}>
                  <div className="anhhoa">
                    <img src={anhnoibat} width="261" height="326" />
                    <div className="giamgia">{item.phantramgiam}% GIẢM</div>
                  </div>
                  <div className="thongtin">
                    <span className="ten">
                      {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                    </span>
                    <div className="gia">
                      <span className="giagiam">
                        {item.giasaukhigiamVND}VND
                      </span>
                      <span className="giachuagiam">{item.giathucVND}VND</span>
                    </div>
                    <div className="dathang">
                      <a href="#">ĐẶT HÀNG</a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="item6">
          <span>hoa khai trương</span>
        </div>
        <div className="item9">
          {hoakhaitruong &&
            hoakhaitruong.length > 0 &&
            hoakhaitruong.map((item, index) => {
              let anhnoibat = "";
              if (item.anhnoibat) {
                anhnoibat = new Buffer(item.anhnoibat, "base64").toString(
                  "binary"
                );
              }
              return (
                <div className="hoa" key={index}>
                  <div className="anhhoa">
                    <img src={anhnoibat} width="261" height="326" />
                    <div className="giamgia">{item.phantramgiam}% GIẢM</div>
                  </div>
                  <div className="thongtin">
                    <span className="ten">
                      {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                    </span>
                    <div className="gia">
                      <span className="giagiam">
                        {item.giasaukhigiamVND}VND
                      </span>
                      <span className="giachuagiam">{item.giathucVND}VND</span>
                    </div>
                    <div className="dathang">
                      <a href="#">ĐẶT HÀNG</a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="item6">
          <span>lan hồ điệp</span>
        </div>
        <div className="item7">
          {lanhodiep &&
            lanhodiep.length > 0 &&
            lanhodiep.map((item, index) => {
              let anhnoibat = "";
              if (item.anhnoibat) {
                anhnoibat = new Buffer(item.anhnoibat, "base64").toString(
                  "binary"
                );
              }
              return (
                <div className="hoa" key={index}>
                  <div className="anhhoa">
                    <img src={anhnoibat} width="261" height="326" />
                    <div className="giamgia">{item.phantramgiam}% GIẢM</div>
                  </div>
                  <div className="thongtin">
                    <span className="ten">
                      {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                    </span>
                    <div className="gia">
                      <span className="giagiam">
                        {item.giasaukhigiamVND}VND
                      </span>
                      <span className="giachuagiam">{item.giathucVND}VND</span>
                    </div>
                    <div className="dathang">
                      <a href="#">ĐẶT HÀNG</a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="item6">
          <span>KHÁCH HÀNG TIÊU BIỂU</span>
        </div>
        <SlideKH />
        <div className="item6">
          <span>Shop Hoa Tươi Hhflower.vn</span>
        </div>
        <div className="item10">
          <span>
            Giới Thiệu Về Hhflower.vn
            <br />
            <br />
          </span>
        </div>

        <div className="item11">
          <div className="item11-trai">
            <span>
              <b>shop hoa tươi</b> Hhflower.vn là một trong những tiệm hoa tươi
              uy tín nhất tại TP HCM, Việt Nam. Hhflower.vn cung cấp dịch vụ đặt
              hoa online giao tận nơi tại TP HCM, Hà Nội và trên tất cả các tỉnh
              – thành phố tại Việt Nam. Với hệ thống cửa hàng hoa tươi liên kết
              rộng khắp tất cả các tỉnh – thành phố trên toàn quốc, Hhflower.vn
              có thể giúp bạn gửi tặng hoa tươi cho người thân ở bất cứ nơi đâu
              tại Việt Nam. Hhflower cam kết mang đến cho bạn những sản phẩm hoa
              tươi chất lượng cao, với mức giá tốt nhất và dịch chuyên nghiệp
              nhất khi sử dụng dịch vụ đặt hoa tươi online giao tận nơi tại
              Hhflower.vn.
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
                Đặt Hoa Online – Ưu Đãi Hấp Dẫn
                <br />
              </span>
            </div>
            <span>
              <br />
              đặt hoa online tại shop hoa tươi flower corner
              <br />
            </span>
            <span>
              <br />
              Khi đặt hoa online tại shop hoa tươi Hhflower, bạn không chỉ được
              miễn phí giao hàng trong khu vực nội thành TP HCM, tặng kèm thiệp
              chúc mừng, mà còn được giảm đến 50k cho đơn hàng đầu tiên. Bên
              cạnh đó, vào mỗi thứ 6 hàng tuần, bạn cũng sẽ được giảm ngay 10%
              tối đa lên đến 100k với chương trình ưu đãi Thứ 6 vui vẻ. Đặc
              biệt, những khách hàng cũ cũng sẽ được giảm giá lên đến 10% cho
              các đơn hàng tiếp theo.
              <br />
            </span>
            <div className="item10" style={{ fontWeight: "400" }}>
              {" "}
              <span>
                <br />
                Đặt Hoa Online mọi lúc, mọi nơi
                <br />
              </span>
            </div>
            <span>
              <br />
              Ưu điểm của tiệm hoa Hhflower đó là cho phép bạn đặt hoa tươi gửi
              tặng người thân dù bạn đang ở bất cứ nơi đâu, vào bất cứ thời điểm
              nào chỉ với vài thao tác đơn giản ngay trên website{" "}
              <a href="#" style={{ color: "#e91e63", fontWeight: "500" }}>
                flowercorne.vn
              </a>{" "}
              hoặc trên ứng dụng Hh flower.
              <br />
            </span>
            <span>
              <br />
              Nếu bạn đang phân vân không biết nên lựa chọn loài hoa nào để phù
              hợp cho từng sự kiện, bạn có thể chat ngay với các nhân viên tư
              vấn của Hh flower để được tư vấn lựa chọn mẫu hoa phù hợp nhất.
              <br />
            </span>
            <div className="item10" style={{ fontWeight: "400" }}>
              {" "}
              <span>
                <br />
                Đặt hoa đơn giản, thanh toán dễ dàng
                <br />
              </span>
            </div>
            <span>
              <br />
              Với shop hoa tươi Hh flower, thay vì mất hàng giờ chạy xe lòng
              vòng qua các shop hoa tươi gần đây, thì bạn chỉ cần ngồi một chỗ
              và thực hiện vài thao tác đơn giản trên ứng dụng hoặc website là
              đã có ngay một mẫu hoa thật đẹp để tặng vợ, bạn gái, người thân
              hay đối tác. Nếu vẫn cảm thấy chưa yên tâm về chất lượng hoa, bạn
              có thể yêu cầu nhân viên của Hhflower chụp và gửi hình hoa để
              duyệt trước khi giao.
              <br />
            </span>
            <span>
              <br />
              Shop hoa Hhflower cung cấp cho bạn nhiều lựa chọn về phương thức
              thanh toán từ: COD, chuyển khoản ngân hàng, thanh toán qua thẻ
              visa, master card, Paypal… để bạn có thể dễ dàng đặt hoa mà không
              gặp phải bất cứ trở ngại nào.
              <br />
            </span>
          </div>
          <div className="item11-phai">
            <span>
              Shop hoa tươi Hhflower Được thành lập từ năm 2017 với mục tiêu
              mang đến cho khách hàng trải nghiệm tuyệt vời về một dịch vụ{" "}
              <b>đặt hoa online</b> chuyên nghiệp. Sau hơn 5 năm hoạt động, cửa
              hàng hoa tươi Hhflower đã giúp hàng chục ngàn khách hàng gửi tặng
              những bó hoa tươi đẹp và đầy ý nghĩa đến những người thân yêu
              trong tất cả những dịp đặc biệt trong năm.
            </span>
            <div className="item12">
              <span>
                <br />
                Đặt hoa online giá tốt – Giao nhanh trong 90p
                <br />
              </span>
            </div>
            <span>
              <br />
              Nếu bạn đang tìm kiếm một trang website đặt hoa online giao tận
              nơi thì flowercorner.vn là một sự lựa chọn tuyệt vời dành cho bạn.
              Tại shop hoa tươi Hhflower, bạn có thể dễ dàng lựa chọn một mẫu
              hoa đẹp, ý nghĩa giữa hàng trăm mẫu hoa được thiết kế sẵn để gửi
              tặng người thân, bạn bè, đối tác trong tất cả các dịp đặc biệt
              trong năm hay trong những sự kiện như: khai trương, sinh nhật, lễ
              cưới, lễ tang…
              <br />
            </span>
            <span>
              <br />
              Ngoài những mẫu hoa có sẵn trên website, shop hoa tươi Flower
              Corner cũng nhận thiết kế hoa tươi theo yêu cầu với mọi mức giá để
              đáp ứng mọi nhu cầu của khách hàng. Nhờ thế, việc đặt hoa online
              tại Hh flower trở nên nhanh chóng, dễ dàng và đơn giản hơn.
              <br />
            </span>
            <span>
              <br />
              Đặc biệt, với dịch vụ giao hoa nhanh trong 90 phút, shop hoa tươi
              Hhflower sẽ giúp bạn kịp thời gửi tặng một bó hoa tới người thân,
              bạn bè nếu như bạn cần đặt gấp trong ngày.
              <br />
            </span>
            <div className="item12">
              <span>
                <br />
                Danh mục sản phẩm của Hhflower
                <br />
              </span>
            </div>
            <span>
              <br />
              Đến với cửa hàng hoa Hhflower, bạn có thể thoải mái lựa chọn giữa
              hơn 500+ mẫu hoa tươi được thiết kế sẵn theo các chủ đề như:
              <br />
            </span>
            <ul>
              <li>
                <a href="#" style={{ color: "#e91e63", fontWeight: "500" }}>
                  Hoa sinh nhật
                </a>{" "}
                : Hoa tặng sinh nhật vợ, bạn gái, ba mẹ, anh chị, bạn bè, đối
                tác hay đồng nghiệp.
              </li>
              <li>
                <a href="#" style={{ color: "#e91e63", fontWeight: "500" }}>
                  Hoa khai trương
                </a>{" "}
                : hoa chúc mừng khai trương cửa hàng, công ty.
              </li>
              <li>
                <a href="#" style={{ color: "#e91e63", fontWeight: "500" }}>
                  Hoa cưới
                </a>
                : hoa cầm tay cô dâu, hoa cài áo chú rể..
              </li>
              <li>
                <a href="#" style={{ color: "#e91e63", fontWeight: "500" }}>
                  Hoa tốt nghiệp
                </a>
                : hoa tặng bạn bè, người thân trong lễ tốt nghiệp.
              </li>
              <li>
                <a href="#" style={{ color: "#e91e63", fontWeight: "500" }}>
                  Hoa tang lễ
                </a>
                Hoa tang lễ: hoa chia buồn để gửi tới các đám tang.
              </li>
              <li>
                <a href="#" style={{ color: "#e91e63", fontWeight: "500" }}>
                  Hoa chúc mừng các dịp đặc biệt
                </a>
                : Valentine, ngày của mẹ, ngày của cha, ngày quốc tế phụ nữ 8-3,
                ngày nhà giáo Việt Nam 20/11….
              </li>
            </ul>
            <span>
              <br />
              Đặc biệt, ngoài những mẫu hoa được thiết kế từ các loài hoa trong
              nước, shop hoa tươi Hhflower cũng cung cấp các mẫu hoa nhập khẩu
              cao cấp, sang trọng.
              <br />
            </span>
            <div className="item12">
              <span>
                <br />
                Tại sao nên chọn shop hoa Hhflower
                <br />
              </span>
            </div>
            <span>
              <br />
              Không khó để bạn tìm được một cửa hàng hoa cung cấp dịch vụ đặt
              hoa online giao tận nơi. Vậy tại sao bạn nên sử dụng dịch vụ điện
              hoa (Flower Delivery) của shop hoa tươi Hh flower?
              <br />
            </span>
            <ul>
              <li>Hoa đẹp, thiết kế đa dạng phù hợp với tất cả sự kiện.</li>
              <li>Thiết kế theo yêu cầu của khách hàng.</li>
              <li>Gửi hình hoa trước khi giao.</li>
              <li>Đội ngũ florists chuyên nghiệp với nhiều năm kinh nghiệm.</li>
            </ul>
            <div className="item12">
              <span>
                <br />
                Cam kết từ shop hoa tươi Hh flower
                <br />
              </span>
            </div>
            <span>
              <br />
              Hh flower hiểu rằng, hoa tươi dù không mang nhiều giá trị về mặt
              vật chất, nhưng lại có ý nghĩa rất lớn về mặt tinh thần. Mỗi một
              bó hoa gửi đi gửi gắm rất nhiều tình cảm, thông điệp yêu thương mà
              bạn muốn gửi đến những người thân. Chính vì thế, Flower Corner
              luôn nỗ lực nâng cao chất lượng sản phẩm và dịch vụ để mang đến
              bạn những trải nghiệm tuyệt vời nhất khi sử dụng dịch vụ của Hh
              flower. Shop hoa tươi Hh flower cam kết:
              <br />
            </span>
            <ul>
              <li>Chỉ sử dụng hoa tươi mới nhập về trong ngày.</li>
              <li>Hoa đẹp và 90% giống như hình.</li>
              <li>Giao hoa nhanh, đúng giờ.</li>
            </ul>
            <span>
              <br />
              Nếu bạn đang cần đặt hoa để gửi tặng người thân trong những dịp
              đặc biệt, gọi ngay 1900 633 045 để được tư vấn hoặc đặt hoa giao
              nhanh với shop hoa tươi Hhflower!
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
