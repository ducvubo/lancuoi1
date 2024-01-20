import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import "./GioHang.scss";
import hoagiamgia1 from "../image/hoagiamgia1.webp";
import hoagiamgia2 from "../image/hoagiamgia2.webp";
import { apigiohang, apisuagiohang } from "../API/ApiTrangChu";
import { apirefreshtoken } from "../API/GoiApi";
import { toast } from "react-toastify";
class GioHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      giohang: [],
      suagiohang: "",
      giachuagiam: 0,
      giagiam: 0,
    };
  }

  async componentDidMount() {
    await this.laygiohang();
    this.capNhatGiaChuaGiam();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.ngonngu !== this.props.ngonngu ||
      prevState.giohang !== this.state.giohang
    ) {
      this.capNhatGiaChuaGiam();
    }
  }

  capNhatGiaChuaGiam = () => {
    let giachuagiam = 0;
    let giagiam = 0;
    for (let i = 0; i < this.state.giohang.length; i++) {
      giachuagiam +=
        this.state.giohang[i].Giohanghoa.soluong *
        (this.props.ngonngu === "vi"
          ? this.state.giohang[i].giathucVND
          : this.state.giohang[i].giathucUSD);
      giagiam +=
        this.state.giohang[i].Giohanghoa.soluong *
        (this.props.ngonngu === "vi"
          ? this.state.giohang[i].giasaukhigiamVND
          : this.state.giohang[i].giasaukhigiamUSD);
    }

    this.setState({
      giachuagiam: giachuagiam.toLocaleString(),
      giagiam: giagiam.toLocaleString(),
    });
  };

  laygiohang = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      toast.error("Phiên làm việc đã hết hạn vui lòng đăng nhập lại");
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

  tangsoluong = async (hoa) => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      toast.error("Phiên làm việc đã hết hạn vui lòng đăng nhập lại");
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
      toast.error("Phiên làm việc đã hết hạn vui lòng đăng nhập lại");
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
  }
  render() {
    let { giohang, giachuagiam, giagiam } = this.state;
    let { ngonngu } = this.props;

    console.log(giohang);
    return (
      <>
        <HeaderTrangChu />
        <div className="giohang">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Hình ảnh</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Số lượng còn</th>
                <th scope="col">Số lượng mua</th>
                <th scope="col">Giá thực</th>
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
                          <td onClick={() => this.thongtinhoa(item.id)}
                          style={{ cursor: 'pointer' }}
                          >
                            <img
                              src={anhnoibat}
                              width={"41px"}
                              height={"51px"}
                            />
                          </td>
                        <td>
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
                            : item.giathucUSD.toLocaleString()}
                        </td>
                        <td>
                          {ngonngu === "vi"
                            ? item.giasaukhigiamVND.toLocaleString()
                            : item.giasaukhigiamUSD.toLocaleString()}
                        </td>
                        <td>
                          {ngonngu == "vi"
                            ? (
                                item.Giohanghoa.soluong * item.giasaukhigiamVND
                              ).toLocaleString()
                            : item.Giohanghoa.soluong *
                              item.giasaukhigiamUSD.toLocaleString()}
                        </td>
                      </tr>
                    );
                  }
                })}

              <tr>
                <td colSpan="6" className="gia">
                  Giá chưa giảm
                </td>
                <td>{giachuagiam}</td>
              </tr>
              <tr>
                <td colSpan="6" className="gia">
                  Giá sau khi giảm
                </td>
                <td>{giagiam}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
