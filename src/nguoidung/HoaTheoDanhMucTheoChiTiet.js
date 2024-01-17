import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./HoaTheoDanhMucTheoChiTiet.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apihoatheodanhmucchitiet } from "../API/ApiTrangChu";
class HoaTheoDanhMucTheoChiTiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoatheodanhmucchitiet: "",
    };
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    await this.hoatheodanhmucchitiet(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      // Xử lý khi URL thay đổi
      let id = this.props.match.params.id;
      this.hoatheodanhmucchitiet(id);
    }
  }

  hoatheodanhmucchitiet = async (id) => {
    let kq = await apihoatheodanhmucchitiet(id);
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        hoatheodanhmucchitiet: data1,
      });
    }
  };

  thongtinhoa = (hoa) => {
    this.props.history.push(`/thongtinhoa/${hoa.id}`);
  }

  render() {
    let { hoatheodanhmucchitiet } = this.state;
    let { ngonngu } = this.props;
    return (
      <>
        <HeaderTrangChu />
        <div className="hoatheodanhmuchoachitiet">
          {hoatheodanhmucchitiet &&
            hoatheodanhmucchitiet.length > 0 &&
            hoatheodanhmucchitiet.map((item, index) => {
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
                      <div className="giamgia">{item.phantramgiam}% GIẢM</div>
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
                              {item.giasaukhigiamVND}VND
                            </span>
                            <span className="giachuagiam">
                              {item.giathucVND}VND
                            </span>
                          </>
                        ) : (
                          <span className="giagiam">{item.giathucVND}VND</span>
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
                      <a href="#">ĐẶT HÀNG</a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HoaTheoDanhMucTheoChiTiet);
