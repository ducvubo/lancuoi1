import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./TimHoa.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apihoatheodanhmuc } from "../API/ApiTrangChu";
class TimHoa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoatheodanhmuc: "",
    };
  }

  async componentDidMount() {
    // let id = this.props.match.params.id;
    // await this.hoatheodanhmuc(id);
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.match.params.id !== this.props.match.params.id) {
    //   // Xử lý khi URL thay đổi
    //   let id = this.props.match.params.id;
    //   this.hoatheodanhmuc(id);
    // }
  }

//   hoatheodanhmuc = async (id) => {
//     let kq = await apihoatheodanhmuc(id);
//     if (kq && kq.maCode === 0) {
//       let data1 = kq.data;
//       let epdata = data1
//         .flatMap((item) => item.danhmuc.map((item) => item.danhmuchoachitiet))
//         .flat();
//       epdata.map((item, index) => {
//         item.donoibat = parseFloat(item.donoibat);
//       });
//       let sxdata = epdata.slice().sort((a, b) => b.donoibat - a.donoibat);
//       this.setState({
//         hoatheodanhmuc: sxdata,
//       });
//     }
//   };


//   thongtinhoa = (hoa) => {
//     this.props.history.push(`/thongtinhoa/${hoa.id}`);
//   }

  render() {
    let { hoatheodanhmuc } = this.state;
    let { ngonngu } = this.props;
    return (
      <>
        <HeaderTrangChu />
        {/* <div className="hoatheodanhmuc">
          {hoatheodanhmuc &&
            hoatheodanhmuc.length > 0 &&
            hoatheodanhmuc.map((item, index) => {
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
        </div> */}
        <FooterTrangChu />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TimHoa);
