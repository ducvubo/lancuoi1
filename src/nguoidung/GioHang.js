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
import { FormattedMessage } from "react-intl";
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
      datasuagiohang: "",

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
    if (kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq.maCode === 9) {
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
        ? toast.error(
            "Bạn chưa đăng nhập, vui lòng đăng nhập để xem giỏ hàng!!!"
          )
        : toast.error(
            "You are not logged in, please log in to view your shopping cart!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      let data1 = kq.data ? kq.data.hoas : null;
      this.setState({
        giohang: data1,
        idgiohang: kq.data.id,
      });
    }
    if (kq && kq.maCode === 2) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Xin lỗi vì sự bất tiện này,quý khách vui lòng liên hệ với cửa hàng để khắc phục"
          )
        : toast.error(
            "Sorry for this inconvenience, please contact the store to fix it"
          );
    }
  };

  laytatcaphuongthucvanchuyen = async () => {
    let kq = await apitatcaphuongthucvanchuyen();
    if (kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq.maCode === 9) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login session is invalid, please log in again to continue!!!"
          );
    }
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
    // if (prevState.giohang !== this.state.giohang) {
    //   console.log("abc")
    //   this.setState({
    //     idgiohangchitietduocchon: "",
    //     sanphamduocchon: [],
    //     donhangchitiet: [],
    //   });
    // }
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
    // let token = await apirefreshtoken();

    // if (token.maCode === 10) {
    //   this.props.ngonngu === "vi"
    //     ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
    //     : toast.error("You are not logged in, please log in!!!");
    // }

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
    let copysanphamduocchon = [...this.state.sanphamduocchon];
    copysanphamduocchon &&
      copysanphamduocchon.length > 0 &&
      copysanphamduocchon.map((item) => item.soluongmua--);
    this.setState({
      sanphamduocchon: copysanphamduocchon,
      datasuagiohang: buildata,
    });
    // let kq = await apisuagiohang(buildata);
    // if (kq.maCode === 0) {
    //   await this.laygiohang();
    //   this.setState({
    //     idgiohangchitietduocchon: "",
    //     sanphamduocchon: [],
    //     donhangchitiet: [],
    //   });
    // }
    // if (kq.maCode === 8) {
    //   this.props.ngonngu === "vi"
    //     ? toast.error(
    //         "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
    //       )
    //     : toast.error(
    //         "Your login has expired, please log in again to continue!!!"
    //       );
    // }
    // if (kq.maCode === 9) {
    //   this.props.ngonngu === "vi"
    //     ? toast.error(
    //         "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
    //       )
    //     : toast.error(
    //         "Your login session is invalid, please log in again to continue!!!"
    //       );
    // }
  };

  giamsoluong = async (hoa) => {
    // let token = await apirefreshtoken();

    // if (token.maCode === 10) {
    //   this.props.ngonngu === "vi"
    //     ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
    //     : toast.error("You are not logged in, please log in!!!");
    // }

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
    let copysanphamduocchon = [...this.state.sanphamduocchon];
    copysanphamduocchon &&
      copysanphamduocchon.length > 0 &&
      copysanphamduocchon.map((item) => item.soluongmua--);
    this.setState({
      sanphamduocchon: copysanphamduocchon,
    });
    let copysanphamduocchon2 = [...this.state.sanphamduocchon];
    let copyidgiohangchitietduocchon = [...this.state.idgiohangchitietduocchon];

    copysanphamduocchon2 = copysanphamduocchon2.filter(
      (item) => item.Giohanghoa.soluong !== 0
    );
    copyidgiohangchitietduocchon = copyidgiohangchitietduocchon.filter(
      (item) => item.soluongmua !== 0
    );

    this.setState({
      sanphamduocchon: copysanphamduocchon2,
      idgiohangchitietduocchon: copyidgiohangchitietduocchon,
      datasuagiohang: buildata,
    });

    // let kq = await apisuagiohang(buildata);
    // if (kq.maCode === 0) {
    //   await this.laygiohang();
    //   this.setState({
    //     idgiohangchitietduocchon: "",
    //     sanphamduocchon: [],
    //     donhangchitiet: [],
    //   });
    // }
    // if (kq.maCode === 8) {
    //   this.props.ngonngu === "vi"
    //     ? toast.error(
    //         "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
    //       )
    //     : toast.error(
    //         "Your login has expired, please log in again to continue!!!"
    //       );
    // }
    // if (kq.maCode === 9) {
    //   this.props.ngonngu === "vi"
    //     ? toast.error(
    //         "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
    //       )
    //     : toast.error(
    //         "Your login session is invalid, please log in again to continue!!!"
    //       );
    // }
  };
  componentWillUnmount() {
    apisuagiohang(this.state.datasuagiohang);
  }

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
          soluongmua: item.Giohanghoa.soluong,
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
    console.log("dbe");
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
    console.log(sanphamduocchon);
    console.log(donhangchitiet);
    console.log(idgiohangchitietduocchon);
    let { ngonngu } = this.props;
    let giaship123 = ngonngu === "vi" ? giaship.giaVND : giaship.giaUSD;
    let tongtien = giaship123 + giagiam;

    return (
      <>
        <HeaderTrangChu />
        {trangthai === false ? (
          <div className="giohang">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th> </th>
                  <th scope="col">
                    <FormattedMessage id="giohanghinhanh" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="giohangtensp" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="giohangsoluongcon" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="giohangsoluongmua" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="giohanggiathuc" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="giohanggiam" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="giohanggiagiam" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="giohangtongcong" />
                  </th>
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
                            style={{ cursor: "pointer" }}
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
                            {this.props.ngonngu === "vi" ? "đ" : "USD"}
                          </td>
                          <td>{item.phantramgiam}%</td>
                          <td>
                            {ngonngu === "vi"
                              ? item.giasaukhigiamVND.toLocaleString()
                              : item.giasaukhigiamUSD}
                            {this.props.ngonngu === "vi" ? "đ" : "USD"}
                          </td>
                          <td>
                            {ngonngu == "vi"
                              ? (
                                  item.Giohanghoa.soluong *
                                  item.giasaukhigiamVND
                                ).toLocaleString()
                              : item.Giohanghoa.soluong * item.giasaukhigiamUSD}
                            {this.props.ngonngu === "vi" ? "đ" : "USD"}
                          </td>
                        </tr>
                      );
                    }
                  })}
                {sanphamduocchon.length > 0 ? (
                  <>
                    <tr>
                      <td colSpan="8" className="gia">
                        <FormattedMessage id="giohanggiachuagiam" />
                      </td>
                      <td>
                        {giachuagiam.toLocaleString()}{" "}
                        {this.props.ngonngu === "vi" ? "đ" : "USD"}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="8" className="gia">
                        <FormattedMessage id="giohanggiasaukhigiam" />
                      </td>

                      <td>
                        {giagiam.toLocaleString()}{" "}
                        {this.props.ngonngu === "vi" ? "đ" : "USD"}
                      </td>
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
                <FormattedMessage id="giohangmuahang" />
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
                      <th scope="col">
                        <FormattedMessage id="dathangsanpham" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="dathangdongia" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="dathangsoluong" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="dathangthanhtien" />
                      </th>
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
                            <td
                              scope="row"
                              className="tenanh"
                              onClick={() => this.thongtinhoa(item.id)}
                              style={{ cursor: "pointer" }}
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
                              {ngonngu === "vi" ? "đ" : "USD"}
                            </td>
                            <td>{item.Giohanghoa.soluong}</td>
                            <td>
                              {item.Giohanghoa.soluong *
                                (ngonngu === "vi"
                                  ? item.giasaukhigiamVND
                                  : item.giasaukhigiamUSD)}
                              {ngonngu === "vi" ? "đ" : "USD"}
                            </td>
                          </tr>
                        );
                      })}

                    <tr>
                      <td className="phuongthucvanchuyen">
                        <span>
                          <FormattedMessage id="dathangptvanchuyen" />
                        </span>
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
              <div className="chitietthanhtoan">
                <div className="phuongthucthanhtoan mt-5">
                  <span className="item1">
                    <FormattedMessage id="dathangptthanhtoan" />
                  </span>
                  <span className="item2">
                    <FormattedMessage id="dathangthanhtoankhinhan" />
                  </span>
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
                  <FormattedMessage id="dathangtongtien" />{" "}
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
                  <FormattedMessage id="dathanghuy" />
                </button>
                <button
                  className="btn btndathang"
                  onClick={() => this.dathang()}
                >
                  <FormattedMessage id="dathang" />
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
        <FooterTrangChu />
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
