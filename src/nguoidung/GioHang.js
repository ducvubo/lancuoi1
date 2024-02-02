import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import "./GioHang.scss";
import hoagiamgia1 from "../image/hoagiamgia1.webp";
import hoagiamgia2 from "../image/hoagiamgia2.webp";
import {
  apigiohang,
  apisuagiohang,
  apitatcaphuongthucvanchuyen,
} from "../API/ApiTrangChu";
import { apirefreshtoken } from "../API/GoiApi";
import { toast } from "react-toastify";
import NhapThongTinDatHang from "./NhapThongTinDatHang";
class GioHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      giohang: [],
      sanphamduocchon: [],
      phuongthucvanchuyenArr: [],
      donhangchitiet: [],

      idgiohangchitietduocchon: "",
      suagiohang: "",
      giachuagiam: 0,
      giagiam: 0,
      phuongthucvanchuyenid: "",
      giaship: "",

      trangthai: false,
      trangthainhapthongtin: false,
    };
  }

  async componentDidMount() {
    await this.laygiohang();
    this.capNhatGiaChuaGiam();
    await this.laytatcaphuongthucvanchuyen();
  }

  laygiohang = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apigiohang(this.props.thongtinnguoidung.id);
    if (kq && kq.maCode === 0) {
      let data1 = kq.data ? kq.data.hoas : null;
      this.setState({
        giohang: data1,
        idgiohang: kq.data.id,
      });
    }
    if (kq && kq.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn chưa đăng nhập, vui lòng đăng nhập để xem giỏ hàng!!!"
          )
        : toast.error(
            "You are not logged in, please log in to view your shopping cart!!!"
          );
    }
  };

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
    if (
      prevProps.ngonngu !== this.props.ngonngu ||
      prevState.giohang !== this.state.giohang ||
      prevState.sanphamduocchon !== this.state.sanphamduocchon
    ) {
      this.capNhatGiaChuaGiam();
      this.buildonhangchitiet();
    }
    if (prevProps.thongtinnguoidung !== this.props.thongtinnguoidung) {
      this.setState({
        giohang: [],
      });
    }
    if (prevState.phuongthucvanchuyenid !== this.state.phuongthucvanchuyenid) {
      this.setState({
        giaship: this.state.phuongthucvanchuyenArr.find(
          (item) => item.id === +this.state.phuongthucvanchuyenid
        ),
      });
    }
    if (prevState.trangthainhapthongtin !== this.state.trangthainhapthongtin) {
      await this.laygiohang();
    }
  }

  onChangeNhap = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  capNhatGiaChuaGiam = () => {
    let giachuagiam = 0;
    let giagiam = 0;
    for (let i = 0; i < this.state.sanphamduocchon.length; i++) {
      giachuagiam +=
        this.state.sanphamduocchon[i].Giohanghoa.soluong *
        (this.props.ngonngu === "vi"
          ? this.state.sanphamduocchon[i].giathucVND
          : this.state.sanphamduocchon[i].giathucUSD);
      giagiam +=
        this.state.sanphamduocchon[i].Giohanghoa.soluong *
        (this.props.ngonngu === "vi"
          ? this.state.sanphamduocchon[i].giasaukhigiamVND
          : this.state.sanphamduocchon[i].giasaukhigiamUSD);
    }
    this.setState({
      giachuagiam: giachuagiam,
      giagiam: giagiam,
    });
  };

  tangsoluong = async (hoa) => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let indexhoa = this.state.giohang.findIndex((item) => {
      return item.id == hoa.id;
    });
    let giohangclone = [...this.state.giohang];
    giohangclone[indexhoa] = { ...hoa };
    giohangclone[indexhoa].Giohanghoa.soluong++;
    this.setState({
      giohang: giohangclone,
    });

    let datasuagiohang = this.state.giohang.filter(
      (item) => item.Giohanghoa.soluong > 0
    );
    let buildata = {
      idgiohang: this.state.idgiohang,
      Giohanghoa: datasuagiohang.map((hoa) => {
        return {
          idgiohang: hoa.Giohanghoa.idgiohang,
          idhoa: hoa.id,
          soluong: hoa.Giohanghoa.soluong,
        };
      }),
    };
    await apisuagiohang(buildata);
  };

  giamsoluong = async (hoa) => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let indexhoa = this.state.giohang.findIndex((item) => {
      return item.id == hoa.id;
    });
    let giohangclone = [...this.state.giohang];
    giohangclone[indexhoa] = { ...hoa };
    giohangclone[indexhoa].Giohanghoa.soluong--;

    this.setState({
      giohang: giohangclone,
    });

    let datasuagiohang = this.state.giohang.filter(
      (item) => item.Giohanghoa.soluong > 0
    );
    let buildata = {
      idgiohang: this.state.idgiohang,
      Giohanghoa: datasuagiohang.map((hoa) => {
        return {
          idgiohang: hoa.Giohanghoa.idgiohang,
          idhoa: hoa.id,
          soluong: hoa.Giohanghoa.soluong,
        };
      }),
    };
    await apisuagiohang(buildata);
  };

  thongtinhoa = (id) => {
    this.props.history.push(`/thongtinhoa/${id}`);
  };

  chonsanpham = (hoa) => {
    const isChecked = this.state.sanphamduocchon.includes(hoa);
    this.setState((prevState) => ({
      sanphamduocchon: isChecked
        ? prevState.sanphamduocchon.filter((sanpham) => sanpham !== hoa)
        : [...prevState.sanphamduocchon, hoa],
    }));
  };

  doitrangthai = () => {
    this.setState({
      trangthai: !this.state.trangthai,
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

  buildonhangchitiet = () => {
    let donhangclone = [];
    let idgiohangchitietduocchonclone = {};
    donhangclone = this.state.sanphamduocchon.map((item, index) => {
      return {
        idhoa: item.id,
        soluongmua: item.Giohanghoa.soluong,
        tongtien:
          this.props.ngonngu === "vi"
            ? item.Giohanghoa.soluong * item.giasaukhigiamVND
            : item.Giohanghoa.soluong * item.giasaukhigiamUSD,
      };
    });
    idgiohangchitietduocchonclone = this.state.sanphamduocchon.map(
      (item, index) => {
        return {
          id: item.Giohanghoa.id,
        };
      }
    );

    this.setState({
      donhangchitiet: donhangclone,
      idgiohangchitietduocchon: idgiohangchitietduocchonclone,
    });
  };

  dathangthanhcong = () => {
    this.setState({
      sanphamduocchon: [],
      giagiam: 0,
      giachuagiam: 0,
    });
  };
  render() {
    let {
      giohang,
      giachuagiam,
      giagiam,
      sanphamduocchon,
      trangthai,
      trangthainhapthongtin,
      phuongthucvanchuyenArr,
      phuongthucvanchuyenid,
      giaship,
      donhangchitiet,
      idgiohangchitietduocchon,
    } = this.state;
    let { ngonngu } = this.props;
    let giaship123 = ngonngu === "vi" ? giaship.giaVND : giaship.giaUSD;
    let tongtien = giaship123 + giagiam;

    return (
      <>
        {/* <HeaderTrangChu /> */}
        {trangthai === false ? (
          <div className="giohang">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th> </th>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Số lượng còn</th>
                  <th scope="col">Số lượng mua</th>
                  <th scope="col">Giá thực</th>
                  <th scope="col">Giảm</th>
                  <th scope="col">Giá giảm</th>
                  <th scope="col">Tổng cộng</th>
                </tr>
              </thead>
              <tbody>
                {giohang &&
                  giohang.length > 0 &&
                  giohang.map((item, index) => {
                    let anhnoibat = "";
                    if (item.anhnoibat) {
                      anhnoibat = new Buffer(item.anhnoibat, "base64").toString(
                        "binary"
                      );
                    }
                    if (item.Giohanghoa.soluong > 0) {
                      return (
                        <tr key={index}>
                          <td>
                            {item.soluongcon > 0 &&
                            item.soluongcon >= item.Giohanghoa.soluong ? (
                              <input
                                type="checkbox"
                                onChange={() => this.chonsanpham(item)}
                              />
                            ) : null}
                          </td>
                          <td
                            onClick={() => this.thongtinhoa(item.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={anhnoibat}
                              width={"41px"}
                              height={"51px"}
                            />
                          </td>
                          <td 
                          onClick={() => this.thongtinhoa(item.id)}
                          style={{ cursor: 'pointer' }}
                          >
                            {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                          </td>
                          <td>{item.soluongcon}</td>
                          <td>
                            <button
                              className="btn"
                              onClick={() => this.giamsoluong(item)}
                            >
                              <i className="fas fa-angle-left"></i>
                            </button>
                            <span>{item.Giohanghoa.soluong}</span>

                            {item.Giohanghoa.soluong < item.soluongcon ? (
                              <button
                                className="btn"
                                onClick={() => this.tangsoluong(item)}
                              >
                                <i className="fas fa-angle-right"></i>
                              </button>
                            ) : null}
                          </td>
                          <td>
                            {ngonngu === "vi"
                              ? item.giathucVND.toLocaleString()
                              : item.giathucUSD}
                          </td>
                          <td>{item.phantramgiam}%</td>
                          <td>
                            {ngonngu === "vi"
                              ? item.giasaukhigiamVND.toLocaleString()
                              : item.giasaukhigiamUSD}
                          </td>
                          <td>
                            {ngonngu == "vi"
                              ? (
                                  item.Giohanghoa.soluong *
                                  item.giasaukhigiamVND
                                ).toLocaleString()
                              : item.Giohanghoa.soluong * item.giasaukhigiamUSD}
                          </td>
                        </tr>
                      );
                    }
                  })}
                {sanphamduocchon.length > 0 ? (
                  <>
                    <tr>
                      <td colSpan="8" className="gia">
                        Giá chưa giảm
                      </td>
                      <td>{giachuagiam.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td colSpan="8" className="gia">
                        Giá sau khi giảm
                      </td>
                      <td>{giagiam.toLocaleString()}</td>
                    </tr>
                  </>
                ) : null}
              </tbody>
            </table>
            {sanphamduocchon.length > 0 ? (
              <button
                className="btn btndathang"
                onClick={() => this.doitrangthai()}
              >
                Mua hàng
              </button>
            ) : null}
          </div>
        ) : (
          <>
            <div className="dathang">
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
                    {sanphamduocchon &&
                      sanphamduocchon.length > 0 &&
                      sanphamduocchon.map((item, index) => {
                        let anhnoibat = "";
                        if (item.anhnoibat) {
                          anhnoibat = new Buffer(
                            item.anhnoibat,
                            "base64"
                          ).toString("binary");
                        }
                        return (
                          <tr key={index}>
                            <td scope="row" className="tenanh"
                            onClick={() => this.thongtinhoa(item.id)}
                            style={{ cursor: 'pointer' }}
                            >
                              <img
                                src={anhnoibat}
                                width={"41px"}
                                height={"45px"}
                                className="mr-4"
                              />
                              {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                            </td>
                            <td>
                              {ngonngu === "vi"
                                ? item.giasaukhigiamVND.toLocaleString()
                                : item.giasaukhigiamUSD}
                            </td>
                            <td>{item.Giohanghoa.soluong}</td>
                            <td>
                              {item.Giohanghoa.soluong *
                                (ngonngu === "vi"
                                  ? item.giasaukhigiamVND
                                  : item.giasaukhigiamUSD)}
                            </td>
                          </tr>
                        );
                      })}

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
                      <td>{giaship123}</td>
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
                  ngonngu === "vi" ? giagiam.toLocaleString() : giagiam
                } ${ngonngu === "vi" ? "đ" : "USD"}`}</span>
                <span>{`Phí vận chuyển: ${
                  ngonngu === "vi" ? giaship123.toLocaleString() : giaship123
                } ${ngonngu === "vi" ? "đ" : "USD"}`}</span>
                {/* <span>{giagiam}</span>
                <span>{giaship123}</span> */}
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
                <button
                  className="btn btndathang"
                  onClick={() => this.doitrangthai()}
                >
                  Hủy
                </button>
                <button
                  className="btn btndathang"
                  onClick={() => this.dathang()}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
            <NhapThongTinDatHang
              trangthainhapthongtin={trangthainhapthongtin}
              huydathang={this.huydathang}
              donhangchitiet={donhangchitiet}
              phuongthucvanchuyenid={phuongthucvanchuyenid}
              tongtien={tongtien}
              idgiohangchitietduocchon={idgiohangchitietduocchon}
              doitrangthai={this.doitrangthai}
              dathangthanhcong={this.dathangthanhcong}
            />
          </>
        )}
        {/* <FooterTrangChu /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    thongtinnguoidung: state.thongtinnguoidung.thongtinnguoidung,
    ngonngu: state.web.ngonngu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GioHang);
