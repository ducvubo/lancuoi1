import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./QuanLyDanhGia.scss";
import { apilaytatcadanhgia } from "../../API/GoiApi";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { Button } from "reactstrap";
import { apiduyethuyduyet, apirefreshtoken } from "../../API/GoiApi";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { apixoadanhgiatraloikh } from "../../API/ApiTrangChu";
class QuanLyDanhGia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danhgiaarr: [],

      trangthaixemanhdanhgia: false,
    };
  }
  async componentDidMount() {
    await this.laytatcadanhgia();
  }

  laytatcadanhgia = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apilaytatcadanhgia();
    if (kq.maCode === 6) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
        : toast.error("You are not an admin, please come back!!!");
    }
    if (kq.maCode === 7) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
          )
        : toast.error(
            "You are not an admin or store employee, please leave!!!"
          );
    }
    if (kq && kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 9) {
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
        danhgiaarr: data1,
      });
    }
  };

  doitrangthaidanhgia = async (id, bang, trangthai) => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apiduyethuyduyet(id, bang, trangthai);
    if (kq.maCode === 6) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
        : toast.error("You are not an admin, please come back!!!");
    }
    if (kq.maCode === 7) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
          )
        : toast.error(
            "You are not an admin or store employee, please leave!!!"
          );
    }
    if (kq && kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 9) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login session is invalid, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Cập nhật trạng thái thành công")
        : toast.success("Status update successful");
      await this.laytatcadanhgia();
    }
  };

  xemanhdanhgiaquanly = () => {
    this.setState({
      trangthaixemanhdanhgia: true,
    });
  };

  xoadanhgia = async (id, bang) => {
    let token = await apirefreshtoken();
    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apixoadanhgiatraloikh(id, bang);
    if (kq && kq.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục!!!")
        : toast.success("You are not logged in, please log in to continue!!!");
    }
    if (kq && kq.maCode === 8) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login has expired, please log in again to continue!!!"
          );
    }
    if (kq && kq.maCode === 9) {
      this.props.ngonngu === "vi"
        ? toast.error(
            "Phiên đăng nhập của bạn không hợp lệ vui lòng đăng nhập lại để tiếp tục!!!"
          )
        : toast.error(
            "Your login session is invalid, please log in again to continue!!!"
          );
    }
    if (kq && kq.data && kq.data.maCode === 0) {
      this.props.ngonngu === "vi"
        ? toast.success("Xóa đánh giá thành công!!!")
        : toast.success("Review removed successfully!!!");
      this.laytatcadanhgia();
    }
  };

  xemchitiet = (id) => {
    this.props.history.push(`/thongtinhoa/${id}`);
  };

  render() {
    let { danhgiaarr, trangthaixemanhdanhgia } = this.state;
    let { ngonngu } = this.props.ngonngu;
    return (
      <div className="quanlydanhgia">
        <div className="item1">
          <span>
            <FormattedMessage id="quanlydanhgia" />
          </span>
        </div>
        <div className="item3">
          <table className="table table-bordered">
            <thead>
              <tr className="item31">
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="quanlydanhgiatennguoidanhgia" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="quanlydanhgiatenhoa" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="quanlydanhgiasosao" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="quanlydanhgianoidung" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="quanlydanhgiahinhanh" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="quanlydanhgiavideo" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="quanlydanhgiathoigian" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="quanlyhanhdong" />
                </th>
                <th scope="col" colSpan="6">
                  <FormattedMessage id="quanlydanhgiatraloidanhgia" />
                </th>
              </tr>
              <tr className="item31">
                <th scope="col">
                  <FormattedMessage id="quanlydanhgiatennguoitraloi" />
                </th>
                <th scope="col">
                  {" "}
                  <FormattedMessage id="quanlydanhgianoidung" />
                </th>
                <th scope="col">
                  {" "}
                  <FormattedMessage id="quanlydanhgiahinhanh" />
                </th>
                <th scope="col">
                  {" "}
                  <FormattedMessage id="quanlydanhgiavideo" />
                </th>
                <th scope="col">
                  {" "}
                  <FormattedMessage id="quanlydanhgiathoigian" />
                </th>
                <th scope="col">
                  <FormattedMessage id="quanlyhanhdong" />
                </th>
              </tr>
            </thead>
            <tbody>
              {danhgiaarr && danhgiaarr.length > 0
                ? danhgiaarr.map((item, index) => {
                    let anhdanhgia = "";
                    if (item.hinhanh) {
                      anhdanhgia = new Buffer(item.hinhanh, "base64").toString(
                        "binary"
                      );
                    }
                    let videodanhgia = "";
                    if (item.video) {
                      videodanhgia = new Buffer(item.video, "base64").toString(
                        "binary"
                      );
                    }
                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td rowSpan={item.traloibinhluan.length + 1}>
                            {ngonngu === "vi"
                              ? `${item.nguoidungbinhluan.ten} ${item.nguoidungbinhluan.ho}`
                              : `${item.nguoidungbinhluan.ho} ${item.nguoidungbinhluan.ten}`}
                          </td>
                          <td rowSpan={item.traloibinhluan.length + 1}>
                            {ngonngu === "vi"
                              ? item.hoabinhluan.tenhoavi
                              : item.hoabinhluan.tenhoaEn}
                          </td>
                          <td rowSpan={item.traloibinhluan.length + 1}>
                            {item.sosaodanhgia}
                          </td>
                          <td rowSpan={item.traloibinhluan.length + 1}>
                            {item.noidung}
                          </td>
                          <td rowSpan={item.traloibinhluan.length + 1}>
                            {item.hinhanh && (
                              <>
                                <img
                                  className="anh"
                                  src={anhdanhgia}
                                  width={"50px"}
                                  height={"50px"}
                                  onClick={() => this.xemanhdanhgiaquanly()}
                                />
                                {trangthaixemanhdanhgia === true ? (
                                  <Lightbox
                                    mainSrc={anhdanhgia}
                                    onCloseRequest={() =>
                                      this.setState({
                                        trangthaixemanhdanhgia: false,
                                      })
                                    }
                                  />
                                ) : null}
                              </>
                            )}
                          </td>
                          <td rowSpan={item.traloibinhluan.length + 1}>
                            {item.video && (
                              <video
                                controls
                                width={"50px"}
                                height={"50px"}
                                className="video"
                              >
                                <source src={videodanhgia} type="video/mp4" />
                              </video>
                            )}
                          </td>
                          <td rowSpan={item.traloibinhluan.length + 1}>
                            {moment(item.thoigian).format("DD-MM-YYYY")}
                          </td>
                          <td rowSpan={item.traloibinhluan.length + 1}>
                            <div className="duyethuy">
                              {item.trangthaidanhgiaid === "BL1" ? (
                                <button
                                  className="btn btn-primary btnduyethuy"
                                  onClick={() =>
                                    this.doitrangthaidanhgia(
                                      item.id,
                                      "danhgia",
                                      "duyet"
                                    )
                                  }
                                >
                                 <FormattedMessage id="quanlydanhgiaduyet"/>
                                </button>
                              ) : (
                                <button
                                  className="btn btn-warning btnduyethuy"
                                  onClick={() =>
                                    this.doitrangthaidanhgia(
                                      item.id,
                                      "danhgia",
                                      "huyduyet"
                                    )
                                  }
                                >
                                  <FormattedMessage id="quanlydanhgiahuy"/>
                                </button>
                              )}
                              <button
                                className="btn btn-info  btnduyethuy"
                                onClick={() =>
                                  this.xoadanhgia(item.id, "danhgia")
                                }
                              >
                                <FormattedMessage id="quanlydanhgiaxoa"/>
                              </button>
                            </div>
                            <button
                              className="btn btn-danger mt-2 xem"
                              onClick={() => this.xemchitiet(item.idhoa)}
                            >
                             <FormattedMessage id="quanlydanhgiaxemchitiet"/>
                            </button>
                          </td>
                        </tr>
                        {item.traloibinhluan && item.traloibinhluan.length > 0
                          ? item.traloibinhluan.map(
                              (binhluan, binhluanindex) => {
                                let anhtraloidanhgia = "";
                                if (binhluan.hinhanh) {
                                  anhtraloidanhgia = new Buffer(
                                    item.hinhanh,
                                    "base64"
                                  ).toString("binary");
                                }
                                let videotraloidanhgia = "";
                                if (binhluan.video) {
                                  videotraloidanhgia = new Buffer(
                                    binhluan.video,
                                    "base64"
                                  ).toString("binary");
                                }
                                return (
                                  <tr key={index + "-" + binhluanindex}>
                                    <td>
                                      {ngonngu === "vi"
                                        ? `${binhluan.nguoidungtraloibinhluan.ten} ${binhluan.nguoidungtraloibinhluan.ho}`
                                        : `${binhluan.nguoidungtraloibinhluan.ho} ${binhluan.nguoidungtraloibinhluan.ten}`}
                                    </td>
                                    <td>{binhluan.noidung}</td>
                                    <td>
                                      {binhluan.hinhanh && (
                                        <>
                                          <img
                                            className="anh"
                                            src={anhtraloidanhgia}
                                            width={"50px"}
                                            height={"50px"}
                                            onClick={() =>
                                              this.xemanhdanhgiaquanly()
                                            }
                                          />
                                          {trangthaixemanhdanhgia === true ? (
                                            <Lightbox
                                              mainSrc={anhtraloidanhgia}
                                              onCloseRequest={() =>
                                                this.setState({
                                                  trangthaixemanhdanhgia: false,
                                                })
                                              }
                                            />
                                          ) : null}
                                        </>
                                      )}
                                    </td>
                                    <td>
                                      {binhluan.video && (
                                        <video
                                          controls
                                          width={"50px"}
                                          height={"50px"}
                                          className="video"
                                        >
                                          <source
                                            src={videotraloidanhgia}
                                            type="video/mp4"
                                          />
                                        </video>
                                      )}
                                    </td>
                                    <td>
                                      {moment(item.thoigian).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </td>
                                    <td>
                                      {binhluan.trangthaitraloidanhgiaid ===
                                      "BL1" ? (
                                        <button
                                          className="btn btn-primary"
                                          onClick={() =>
                                            this.doitrangthaidanhgia(
                                              binhluan.id,
                                              "traloi",
                                              "duyet"
                                            )
                                          }
                                        >
                                          <FormattedMessage id="quanlydanhgiaduyet"/>
                                        </button>
                                      ) : (
                                        <button
                                          className="btn btn-warning"
                                          onClick={() =>
                                            this.doitrangthaidanhgia(
                                              binhluan.id,
                                              "traloi",
                                              "huyduyet"
                                            )
                                          }
                                        >
                                          <FormattedMessage id="quanlydanhgiahuy"/>
                                        </button>
                                      )}
                                      <button
                                        className="btn btn-danger mt-2"
                                        onClick={() =>
                                          this.xoadanhgia(binhluan.id, "traloi")
                                        }
                                      >
                                        <FormattedMessage id="quanlydanhgiaxoa"/>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              }
                            )
                          : null}
                      </React.Fragment>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyDanhGia);
