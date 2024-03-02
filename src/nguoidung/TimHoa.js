import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./TimHoa.scss";
import HeaderTrangChu from "./HeaderTrangChu";
import FooterTrangChu from "./FooterTrangChu";
import { apitatcahoanguoidung } from "../API/ApiTrangChu";
import { FormattedMessage } from "react-intl";
import _, { debounce } from "lodash";
import * as actions from "../action/actions";
import ReactPaginate from "react-paginate";
class TimHoa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tatcahoanguoidung: "",
      kieusx: "",
    };
  }

  async componentDidMount() {
    await this.laytatcahoanguoidung();
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.ngonngu !== this.props.ngonngu) {
    //   this.sxhoa();
    // }
  }

  laytatcahoanguoidung = async () => {
    let kq = await apitatcahoanguoidung();
    if (kq && kq.maCode === 0) {
      let data1 = kq.data;
      data1 &&
        data1.length > 0 &&
        data1.map((item) => {
          let tongsosao =
            item.hoabinhluan &&
            item.hoabinhluan.reduce(
              (total, item) => total + item.sosaodanhgia,
              0
            );
          let trungbinh = tongsosao / item.hoabinhluan.length;
          item.danhgiatrungbinh = trungbinh;
          if (item.danhgiatrungbinh % 1 >= 0.5) {
            item.danhgiatrungbinh = Math.ceil(item.danhgiatrungbinh);
          } else {
            item.danhgiatrungbinh = Math.floor(item.danhgiatrungbinh);
          }
        });
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

  //  handlePageClick = (event) => {
  //   alert(event.selected)
  // };
  // sxhoa = (event) => {
  //   let tatcahoaclone = "";
  //   this.setState({
  //     kieusx: event.target.value ?
  //   });
  //   if (this.state.kieusx === "caothap") {
  //     tatcahoaclone =
  //       this.props.ngonngu === "vi"
  //         ? this.state.tatcahoanguoidung
  //             .slice()
  //             .sort((a, b) => +b.giasaukhigiamVND - +a.giasaukhigiamVND)
  //         : this.state.tatcahoanguoidung
  //             .slice()
  //             .sort((a, b) => +b.giasaukhigiamUSD - +a.giasaukhigiamUSD);
  //   }
  //   if (this.state.kieusx === "thapcao") {
  //     tatcahoaclone =
  //       this.props.ngonngu === "vi"
  //         ? this.state.tatcahoanguoidung
  //             .slice()
  //             .sort((a, b) => +a.giasaukhigiamVND - +b.giasaukhigiamVND)
  //         : this.state.tatcahoanguoidung
  //             .slice()
  //             .sort((a, b) => +a.giasaukhigiamUSD - +b.giasaukhigiamUSD);
  //   }
  //   if (this.state.kieusx === "caonhat") {
  //     tatcahoaclone = this.state.tatcahoanguoidung
  //       .slice()
  //       .filter((item) => !isNaN(item.danhgiatrungbinh)) // Lọc bỏ các phần tử có giá trị NaN
  //       .sort((a, b) => b.danhgiatrungbinh - a.danhgiatrungbinh);
  //   }
  //   this.setState({
  //     tatcahoanguoidung: tatcahoaclone,
  //   });

  //   // alert(event.target.value);
  // };
  render() {
    let { ngonngu } = this.props;
    let { tatcahoanguoidung } = this.state;
    console.log(tatcahoanguoidung);
    return (
      <>
        <HeaderTrangChu />

        <div className="timhoa">
          <span className="sptimhoa mr-3">
            <FormattedMessage id="timhoa" />{" "}
          </span>
          <input
            className="form-control iptimhoa"
            onChange={(event) => this.timhoanguoidung(event)}
          />
        </div>
        {/* <div className="sxhoa mt-3">
          <span className="spansx mr-3">
            <FormattedMessage id="timhoasx" />
          </span>
          <select
            className="form-control selectsx"
            onChange={(event) => this.sxhoa(event)}
          >
            <option value="md">Mặc định</option>
            <option value="caothap">Giá cao tới thấp</option>
            <option value="thapcao">Giá thấp tới cao</option>
            <option value="caonhat">Đánh giá cao nhất</option>
          </select>
        </div> */}
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
                      <div className="giamgia">
                        {item.phantramgiam}
                        <FormattedMessage id="trangchugiamgia" />
                      </div>
                    ) : null}
                  </div>
                  <div className="thongtin">
                    <span className="ten">
                      {ngonngu === "vi" ? item.tenhoaVi : item.tenhoaEn}
                    </span>
                    <div className="rating">
                      <input
                        value="5"
                        name={`rating26${index}`}
                        id={`star526${index}`}
                        checked={item.danhgiatrungbinh === 5}
                        readOnly
                        type="radio"
                      />
                      <label htmlFor={`star526${index}`}></label>
                      <input
                        value="4"
                        name={`rating27${index}`}
                        id={`star427${index}`}
                        checked={item.danhgiatrungbinh === 4}
                        readOnly
                        type="radio"
                      />
                      <label htmlFor={`star427${index}`}></label>
                      <input
                        value="3"
                        name={`rating28${index}`}
                        id={`star328${index}`}
                        checked={item.danhgiatrungbinh === 3}
                        readOnly
                        type="radio"
                      />
                      <label htmlFor={`star328${index}`}></label>
                      <input
                        value="2"
                        name={`rating29${index}`}
                        id={`star229${index}`}
                        checked={item.danhgiatrungbinh === 2}
                        readOnly
                        type="radio"
                      />
                      <label htmlFor={`star229${index}`}></label>
                      <input
                        value="1"
                        name={`rating30${index}`}
                        id={`star130${index}`}
                        checked={item.danhgiatrungbinh === 1}
                        readOnly
                        type="radio"
                      />
                      <label htmlFor={`star130${index}`}></label>
                    </div>

                    {ngonngu === "vi" ? (
                      <div
                        className="gia"
                        onClick={() => this.thongtinhoa(item)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.phantramgiam > 0 ? (
                          <>
                            <span className="giagiam">
                              {item.giasaukhigiamVND.toLocaleString()}đ
                            </span>
                            <span className="giachuagiam">
                              {item.giathucVND.toLocaleString()}đ
                            </span>
                          </>
                        ) : (
                          <span className="giagiam">
                            {item.giathucVND.toLocaleString()}đ
                          </span>
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
        {/* <ReactPaginate
        nextLabel="next >"
        onPageChange={this.handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={50}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      /> */}
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
  return {
    thongtinhoadathang: (hoa) => dispatch(actions.thongtinhoadathang(hoa)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimHoa);
