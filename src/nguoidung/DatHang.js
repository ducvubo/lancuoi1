import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DatHang.scss";
import { thongtinhoadathang } from "../action/actions";
import { apitatcaphuongthucvanchuyen } from "../API/ApiTrangChu";
import NhapTTDHTrangChu from "./NhapTTDHTrangChu";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
class DatHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phuongthucvanchuyenArr: [],

      phuongthucvanchuyenid: "",
      giaship: "",

      trangthainhapthongtin: false,
    };
  }

  async componentDidMount() {
    await this.laytatcaphuongthucvanchuyen();
  }

  laytatcaphuongthucvanchuyen = async () => {
    let kq = await apitatcaphuongthucvanchuyen();

    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        phuongthucvanchuyenArr: data1,
        phuongthucvanchuyenid: data1 && data1.length > 0 ? data1[0].id : "",
      });
    }
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.phuongthucvanchuyenid !== this.state.phuongthucvanchuyenid) {
      this.setState({
        giaship: this.state.phuongthucvanchuyenArr.find(
          (item) => item.id === +this.state.phuongthucvanchuyenid
        ),
      });
    }
  }
  onChangeNhap = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  dathang = () => {
    this.setState({
      trangthainhapthongtin: true,
    });
  };

  huydathang = () => {
    this.setState({
      trangthainhapthongtin: false,
    });
  };

  quaylai = () => {
    this.props.history.goBack();
  };

  thongtinhoa = (hoa) => {
    this.props.history.push(`/thongtinhoa/${hoa.id}`);
  };

  render() {
    let { thongtinhoadathang, ngonngu, thongtinnguoidung } = this.props;
    let {
      phuongthucvanchuyenArr,
      phuongthucvanchuyenid,
      giaship,
      trangthainhapthongtin,
    } = this.state;
    let giaship123 = ngonngu === "vi" ? giaship.giaVND : giaship.giaUSD;
    let tongtien =
      ngonngu === "vi"
        ? giaship123 +
          thongtinhoadathang.giasaukhigiamVND * thongtinhoadathang.soluongmua
        : giaship123 +
          thongtinhoadathang.giasaukhigiamUSD * thongtinhoadathang.soluongmua;

    let anhnoibat = "";
    if (thongtinhoadathang.anhnoibat) {
      anhnoibat = new Buffer(thongtinhoadathang.anhnoibat, "base64").toString(
        "binary"
      );
    }
    return (
      <>
        {thongtinnguoidung && thongtinhoadathang ? (
          <>
<HeaderTrangChu/>
          <div className="dathangtrangchu">
            <div className="sanpham">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      scope="row"
                      className="tenanh"
                      onClick={() => this.thongtinhoa(thongtinhoadathang)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={anhnoibat}
                        width={"41px"}
                        height={"45px"}
                        className="mr-4"
                      />
                      {ngonngu === "vi"
                        ? thongtinhoadathang.tenhoaVi
                        : thongtinhoadathang.tenhoaEn}
                    </td>
                    <td>
                      {ngonngu === "vi"
                        ? thongtinhoadathang.giasaukhigiamVND.toLocaleString()
                        : thongtinhoadathang.giasaukhigiamUSD}
                    </td>
                    <td>{thongtinhoadathang.soluongmua}</td>
                    <td>
                      {ngonngu === "vi"
                        ? (
                            thongtinhoadathang.soluongmua *
                            thongtinhoadathang.giasaukhigiamVND
                          ).toLocaleString()
                        : thongtinhoadathang.soluongmua *
                          thongtinhoadathang.giasaukhigiamUSD}
                      {ngonngu === "vi" ? "đ" : "USD"}
                    </td>
                  </tr>

                  <tr>
                    <td className="phuongthucvanchuyen">
                      <span>Phương thức vận chuyển: </span>
                    </td>
                    <td colSpan="2">
                      <select
                        className="form-control"
                        onChange={(event) => {
                          this.onChangeNhap(event, "phuongthucvanchuyenid");
                        }}
                        value={phuongthucvanchuyenid}
                      >
                        {phuongthucvanchuyenArr &&
                          phuongthucvanchuyenArr.length > 0 &&
                          phuongthucvanchuyenArr.map((item, index) => {
                            return (
                              <option value={item.id} key={index}>
                                {ngonngu === "vi"
                                  ? item.tenphuongthucVi
                                  : item.tenphuongthucEn}
                              </option>
                            );
                          })}
                      </select>
                    </td>
                    <td>{giaship ? giaship123.toLocaleString() : null}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div className="tongtien">
                  <span>Tổng tiền (3 sản phẩm): 500000đ</span>
                </div> */}
            <div className="chitietthanhtoan">
              <div className="phuongthucthanhtoan mt-5">
                <span className="item1">Phuơng thức thanh toán: </span>
                <span className="item2">Thanh toán khi nhận hàng</span>
              </div>
            </div>
            <div className="thanhtoan mt-3">
              <span>{`Tổng tiền hàng: ${
                ngonngu === "vi"
                  ? (
                      thongtinhoadathang.giasaukhigiamVND *
                      thongtinhoadathang.soluongmua
                    ).toLocaleString()
                  : thongtinhoadathang.giasaukhigiamUSD *
                    thongtinhoadathang.soluongmua
              } ${ngonngu === "vi" ? "đ" : "USD"}`}</span>
              <span>{`Phí vận chuyển: ${
                ngonngu === "vi"
                  ? giaship123
                    ? giaship123.toLocaleString()
                    : null
                  : giaship123
              } ${ngonngu === "vi" ? "đ" : "USD"}`}</span>
              <span>
                Tổng tiền:{" "}
                <label>
                  {" "}
                  {ngonngu === "vi"
                    ? `${tongtien.toLocaleString()}đ`
                    : `${tongtien}USD`}
                </label>
              </span>
            </div>
            <div className="nutbam">
              <button className="btn btndathang" onClick={() => this.quaylai()}>
                Hủy
              </button>
              <button className="btn btndathang" onClick={() => this.dathang()}>
                Đặt hàng
              </button>
            </div>
            <NhapTTDHTrangChu
              trangthainhapthongtin={trangthainhapthongtin}
              huydathang={this.huydathang}
              phuongthucvanchuyenid={phuongthucvanchuyenid}
              tongtien={tongtien}
              doitrangthai={this.doitrangthai}
            />
          </div>
<FooterTrangChu/>
          </>
        ) : (
          <Redirect to={"/dangnhap"} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ngonngu: state.web.ngonngu,
    thongtinhoadathang: state.dathanghoa.thongtinhoadathang,
    thongtinnguoidung: state.thongtinnguoidung.thongtinnguoidung,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DatHang)
);
