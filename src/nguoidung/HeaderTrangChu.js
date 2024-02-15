import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from "../image/logo.png";
import "./HeaderTrangChu.scss";
import { FormattedMessage } from "react-intl";
import { danhmuchoanoibat } from "../API/ApiTrangChu";
import { dangxuat, doiNgonNgu } from "../action/actions";
import { apidangxuat } from "../API/GoiApi";
import { withRouter } from "react-router-dom";
import { debounce } from "lodash";
class HeaderTrangChu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danhmucnoibat: "",
      tenhoa: "",
      hoatimduoc: [],
    };
    // this.debouncedSearch = debounce(this.nhaphoacantim, 3000);
  }

  async componentDidMount() {
    await this.laydanhmuchoanoibat();
  }

  doiNgonNgu = (ngonngu) => {
    this.props.doiNgonNgu(ngonngu);
  };

  laydanhmuchoanoibat = async () => {
    let kq = await danhmuchoanoibat();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      this.setState({
        danhmucnoibat: data1,
      });
    }
  };

  dangxuat = async () => {
    this.props.dangxuat();
    await apidangxuat();
  };

  render() {
    let { ngonngu, thongtinnguoidung, hoa } = this.props;
    let { danhmucnoibat, tenhoa, hoatimduoc } = this.state;
    return (
      <>
        <div className="headeritem1">
          <div className="sdt">
            <FormattedMessage id="headersdt" />: 1900 633 045 | 0865 160 360
          </div>
          <div className="tk-gh-tt">
            <div className="icon taikhoan">
              <span>
                <i className="fas fa-user"></i>
              </span>
              <span>
                {thongtinnguoidung ? (
                  ngonngu === "vi" ? (
                    `${thongtinnguoidung.ten} ${thongtinnguoidung.ho}`
                  ) : (
                    `${thongtinnguoidung.ho} ${thongtinnguoidung.ten}`
                  )
                ) : (
                  <FormattedMessage id="headertaikhoan" />
                )}{" "}
              </span>
              <ul>
                {thongtinnguoidung ? (
                  <li
                    onClick={() => this.dangxuat()}
                    className={ngonngu === "vi" ? "" : "ml-1"}
                  >
                    <FormattedMessage id="headerdangxuat" />
                  </li>
                ) : (
                  <Link
                    className={ngonngu === "vi" ? "dangnhap" : "dangnhap mr-4"}
                    to={"/dangnhap"}
                  >
                    <li>
                      <FormattedMessage id="headerdangnhap" />
                    </li>
                  </Link>
                )}
                <Link className="dangky" to={"/dangky"}>
                  <li>
                    <FormattedMessage id="headerdangky" />
                  </li>
                </Link>
                <Link className= "thongtinnguoidung" to={"/thongtinnguoidung"}>
                  <li className={ngonngu === "vi" ? " " : "thongtinnguoidungen"}>
                    <FormattedMessage id="headerthongtinnguoidung" />
                  </li>
                </Link>
              </ul>
            </div>
            <div className="icon">
              <Link
                className="iconlink"
                to={`/giohang/${thongtinnguoidung.id}`}
              >
                <span>
                  <i className="fas fa-shopping-cart"></i>
                </span>
                <span>
                  <FormattedMessage id="headergioahang" />
                </span>
              </Link>
            </div>
            <div className="icon">
              <Link
                className="iconlink"
                to={`/donhang/${thongtinnguoidung.id}`}
              >
                <span>
                  <i className="fas fa-truck"></i>
                </span>
                <span>
                  <FormattedMessage id="headerdonhang" />
                </span>
              </Link>
            </div>
            <div className="icon ngonngu">
              <span
                className={
                  ngonngu === "vi" ? "ngonngukhongduocchon" : "ngonnguduocchon"
                }
                onClick={() => this.doiNgonNgu("vi")}
              >
                VN
              </span>
              <span
                className={
                  ngonngu === "en" ? "ngonngukhongduocchon" : "ngonnguduocchon"
                }
                onClick={() => this.doiNgonNgu("en")}
              >
                EN
              </span>
            </div>
          </div>
        </div>
        <div className="headeritem2">
          <div className="fb-tw-it">
            <span className="fb">
              <i className="fab fa-facebook-f"></i>
            </span>
            <span className="tw">
              <i className="fab fa-twitter"></i>
            </span>
            <span className="it">
              <i className="fab fa-instagram "></i>
            </span>
          </div>
          <div className="logo">
            <Link to={"/trangchu"}>
              <img src={logo} width={"350px"} height={"350px"} />
            </Link>
          </div>
          <div className="tk-gh">
            <span>
              <Link className="iconlink" to={`/timhoa`}>
                <i className="fas fa-search search"></i>
              </Link>
            </span>

            <span>
              <Link
                className="iconlink"
                to={`/giohang/${thongtinnguoidung.id}`}
              >
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </span>
          </div>
        </div>
        <div className="headeritem3">
          <ul className="hovermenu">
            {danhmucnoibat &&
              danhmucnoibat.length > 0 &&
              danhmucnoibat.map((item, index) => {
                return (
                  <li key={index} className="lidau">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/hoatheodanhmuc/${item.id}`}
                    >
                      {ngonngu === "vi" ? item.tendanhmucVi : item.tendanhmucEn}
                    </Link>
                    <ul>
                      {item.danhmuc && item.danhmuc.length > 0
                        ? item.danhmuc.map((item, index1) => {
                            return (
                              <li key={index1}>
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                  to={`/hoatheodanhmucchitiet/${item.id}`}
                                >
                                  {ngonngu === "vi"
                                    ? item.tendanhmucchitietVi
                                    : item.tendanhmucchitietEn}
                                </Link>
                              </li>
                            );
                          })
                        : null}
                    </ul>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="headeritem4">
          <span>
            <FormattedMessage id="headerdemu" />
          </span>
        </div>
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
    doiNgonNgu: (ngongu) => dispatch(doiNgonNgu(ngongu)),
    dangxuat: () => dispatch(dangxuat()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTrangChu);
