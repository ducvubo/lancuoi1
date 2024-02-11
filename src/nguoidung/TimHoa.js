import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./TimHoa.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apitatcahoanguoidung } from "../API/ApiTrangChu";
import { FormattedMessage } from "react-intl";
import _, { debounce } from "lodash";
import * as actions from "../action/actions";
class TimHoa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tatcahoanguoidung: "",
    };
  }

  async componentDidMount() {
    await this.laytatcahoanguoidung();
  }

  componentDidUpdate(prevProps) {}

  laytatcahoanguoidung = async () => {
    let kq = await apitatcahoanguoidung();
    let data1 = kq.data;
    if (kq && kq.maCode === 0) {
      this.setState({
        tatcahoanguoidung: data1,
      });
    }
  };
  thongtinhoa = (hoa) => {
    this.props.history.push(`/thongtinhoa/${hoa.id}`);
  };

  dathangtrangchu = (hoa) => {
    hoa.soluongmua = 1;
    this.props.thongtinhoadathang(hoa);
    this.props.history.push(`/dathang`);
  };
  timhoanguoidung = debounce((event) => {
    let timkiem = event.target.value;
    if (timkiem) {
      let clone = _.cloneDeep(this.state.tatcahoanguoidung);
      clone = clone.filter((item) =>
        (this.props.ngonngu === "vi"
          ? item.tenhoaVi
            ? item.tenhoaVi
            : ""
          : item.tenhoaEn
          ? item.tenhoaEn
          : ""
        )
          .toLowerCase()
          .includes(timkiem.toLowerCase())
      );
      this.setState({
        tatcahoanguoidung: clone,
      });
    } else {
      this.laytatcahoanguoidung();
    }
  }, 2000);
  render() {
    let { ngonngu } = this.props;
    let { tatcahoanguoidung } = this.state;
    return (
      <>
        <HeaderTrangChu />
        <div className="timhoa">
          <span className="sptimhoa mr-3">Nhập tên hoa cần tìm: </span>
          <input
            className="form-control iptimhoa"
            onChange={(event) => this.timhoanguoidung(event)}
          />
        </div>
        <div className="tatcahoanguoidung">
          {tatcahoanguoidung &&
            tatcahoanguoidung.length > 0 &&
            tatcahoanguoidung.map((item, index) => {
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
                    style={{ cursor: "pointer" }}
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
                        style={{ cursor: "pointer" }}
                      >
                        {item.phantramgiam > 0 ? (
                          <>
                            <span className="giagiam">
                              {item.giasaukhigiamVND}đ
                            </span>
                            <span className="giachuagiam">
                              {item.giathucVND}đ
                            </span>
                          </>
                        ) : (
                          <span className="giagiam">{item.giathucVND}đ</span>
                        )}
                      </div>
                    ) : (
                      <div
                        className="gia"
                        onClick={() => this.thongtinhoa(item)}
                        style={{ cursor: "pointer" }}
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
        <FooterTrangChu />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ngonngu:state.web.ngonngu
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    thongtinhoadathang: (hoa) => dispatch(actions.thongtinhoadathang(hoa)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimHoa);
