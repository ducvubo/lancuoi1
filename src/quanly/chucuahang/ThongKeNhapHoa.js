import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ThongKeNhapHoa.scss";
import { apithongkenhaphoa, apitatcahoadon } from "../../API/GoiApi";
import { apirefreshtoken } from "../../API/GoiApi";
import moment from "moment";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
class ThongKeNhapHoa extends Component {
  constructor(props) {
    super(props);
    const ngay = new Date();
    ngay.setDate(ngay.getDate() + 1);
    this.ngayhomnay = ngay.toISOString().split("T")[0];
    this.state = {
      tungay: this.ngayhomnay,
      denngay: this.ngayhomnay,
      hoadonthongke: "",
      dataexcel: "",
    };
  }

  async componentDidMount() {
    await this.laytatcahoadon();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.tungay !== this.state.tungay ||
      prevState.denngay !== this.state.denngay
    ) {
      this.thongkenhaphoa();
    }
  }

  laytatcahoadon = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }

    let kq = await apitatcahoadon();
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
        hoadonthongke: data1,
      });
    }
    let builddataexcel = [];
    if (this.state.hoadonthongke && this.state.hoadonthongke.length > 0) {
      let builddataexcel = [
        [
          "Tên nhân viên",
          "Mã phiếu nhập",
          "Ngày nhập",
          "Tên nhà cung cấp",
          "Tổng hóa đơn",
          "Tên hoa",
          "Số lượng",
          "Giá nhập",
          "Tổng tiền",
        ],
      ];

      this.state.hoadonthongke.map((item) => {
        item.hoa123.map((hoa) => {
          let arr = [
            item.nhanvien.ten,
            item.maphieunhap,
            moment(item.ngaynhap).format("DD-MM-YYYY"),
            item.tennhacungcap,
            `${item.tonghoadon.toLocaleString()} đ`,
            hoa.hoa123.tenhoavi,
            hoa.soluongnhapthucte,
            `${hoa.gianhap.toLocaleString()} đ`,
            `${hoa.giatong.toLocaleString()} đ`,
          ];
          builddataexcel.push(arr);
        });
      });
      this.setState({
        dataexcel: builddataexcel,
      });
    }
  };

  thongkenhaphoa = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apithongkenhaphoa({
      tungay: this.state.tungay,
      denngay: this.state.denngay,
    });
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
        hoadonthongke: data1,
      });
    }
    let builddataexcel = [];
    if (this.state.hoadonthongke && this.state.hoadonthongke.length > 0) {
      let builddataexcel = [
        [
          "Tên nhân viên",
          "Mã phiếu nhập",
          "Ngày nhập",
          "Tên nhà cung cấp",
          "Tổng hóa đơn",
          "Tên hoa",
          "Số lượng",
          "Giá nhập",
          "Tổng tiền",
        ],
      ];

      this.state.hoadonthongke.map((item) => {
        item.hoa123.map((hoa) => {
          let arr = [
            item.nhanvien.ten,
            item.maphieunhap,
            moment(item.ngaynhap).format("DD-MM-YYYY"),
            item.tennhacungcap,
            item.tonghoadon.toLocaleString(),
            hoa.hoa123.tenhoavi,
            hoa.soluongnhapthucte,
            hoa.gianhap.toLocaleString(),
            hoa.giatong.toLocaleString(),
          ];
          builddataexcel.push(arr);
        });
      });
      this.setState({
        dataexcel: builddataexcel,
      });
    }
  };

  onChangeNhap = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  xuatexcel = () => {
    const ws = XLSX.utils.aoa_to_sheet(this.state.dataexcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(
      wb,
      `${moment(this.state.tungay).format("DD-MM-YYYY")} đến ${moment(
        this.state.denngay
      ).format("DD-MM-YYYY")}.xlsx`
    );
  };

  render() {
    let { hoadonthongke, tungay, denngay, dataexcel } = this.state;
    return (
      <div className="thongkenhaphoa">
        <div className="item1">
          <span>
            <FormattedMessage id="thongkenhaphoa" />
          </span>
        </div>
        <div className="row item2">
          <div className="col-2 chonngay">
            <span>
              <FormattedMessage id="thongkenhaphoachonngay" />
            </span>
          </div>
          <div className="form-group col-4 ml-2">
            <label>
              <FormattedMessage id="thongkenhaphoatungay" />
            </label>
            <input
              className="form-control"
              type="date"
              onChange={(event) => {
                this.onChangeNhap(event, "tungay");
              }}
              value={tungay}
              max={this.ngayhomnay}
            />
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="thongkenhaphoadenngay" />
            </label>
            <input
              className="form-control"
              type="Date"
              onChange={(event) => {
                this.onChangeNhap(event, "denngay");
              }}
              value={denngay}
              max={this.ngayhomnay}
            />
          </div>
          <button
            disabled={dataexcel ? false : true}
            className="btn btn-primary xuatfileexcel"
            onClick={this.xuatexcel}
          >
            <i className="fas fa-download"></i> Excel
          </button>
        </div>
        <div className="item3">
          <table className="table table-bordered">
            <thead>
              <tr className="item31">
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="thongkenhaphoatennhanvien" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="thongkenhaphoamaphieunhap" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="thongkenhaphoangaynhap" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="thongkenhaphoatennhacc" />
                </th>
                <th scope="col" rowSpan="2">
                  <FormattedMessage id="thongkenhaphoatonghoadon" />
                </th>
                <th scope="col" colSpan="4">
                  <FormattedMessage id="thongkenhaphoathongtin" />
                </th>
              </tr>
              <tr className="item31">
                <th scope="col">
                  <FormattedMessage id="thongkenhaphoatenhoa" />
                </th>
                <th scope="col">
                  <FormattedMessage id="thongkenhaphoasoluong" />
                </th>
                <th scope="col">
                  <FormattedMessage id="thongkenhaphoagianhap" />
                </th>
                <th scope="col">
                  <FormattedMessage id="thongkenhaphoagiatong" />
                </th>
              </tr>
            </thead>
            <tbody>
              {hoadonthongke && hoadonthongke.length > 0
                ? hoadonthongke.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td rowSpan={item.hoa123.length + 1}>
                            {item.nhanvien.ten}
                          </td>
                          <td rowSpan={item.hoa123.length + 1}>
                            {item.maphieunhap}
                          </td>
                          <td rowSpan={item.hoa123.length + 1}>
                            {moment(item.ngaynhap).format("DD-MM-YYYY")}
                          </td>
                          <td rowSpan={item.hoa123.length + 1}>
                            {item.tennhacungcap}
                          </td>
                          <td rowSpan={item.hoa123.length + 1}>
                            {item.tonghoadon.toLocaleString()} đ
                          </td>
                        </tr>

                        {item.hoa123 && item.hoa123.length > 0
                          ? item.hoa123.map((hoa, hoaIndex) => {
                              return (
                                <tr key={index + "-" + hoaIndex}>
                                  <td>{hoa.hoa123.tenhoavi}</td>
                                  <td>{hoa.soluongnhapthucte}</td>
                                  <td>{hoa.gianhap.toLocaleString()}</td>
                                  <td>{hoa.giatong.toLocaleString()} đ</td>
                                </tr>
                              );
                            })
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
    ngonngu:state.web.ngonngu
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeNhapHoa);
