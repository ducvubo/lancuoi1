import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ThongTinDonHang.scss";
import { Modal } from "reactstrap";
import {
  apixacnhandonhang,
  apihuydonhang,
  apixacnhandaxulyyeucauhoanhanghoantien,
  apirefreshtoken
} from "../../API/GoiApi";
import { toast } from "react-toastify";
import _ from "lodash";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../image/logo.png";
import VHCENTNbold from "../../font/VHCENTNbold";
import RobotoRegularnormal from "../../font/RobotoRegularnormal";
import RobotoBlacknormal from "../../font/RobotoBlacknormal";
import RobotoMediumnormal from "../../font/RobotoMediumnormal";
class ThongTinDonHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataxacnhandonhang: "",
    };
  }
  componentDidMount() {
    this.buildataxacnhandonhang();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.thongtindonhang !== this.props.thongtindonhang ||
      prevState.phanhoicuahang !== this.state.phanhoicuahang
    ) {
      this.buildataxacnhandonhang();
    }
  }

  onChangeNhap = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  ktdanhapthongtinchua = () => {
    let kt = true;
    let nhapdaydu = ["phanhoicuahang"];
    for (let i = 0; i < nhapdaydu.length; i++) {
      if (!this.state[nhapdaydu[i]]) {
        kt = false;
        this.props.ngonngu === "vi"
          ? alert("Vui lòng nhập đầy đủ thông tin")
          : alert("Please enter complete information");
        break;
      }
    }
    return kt;
  };

  buildataxacnhandonhang = () => {
    let dataxacnhandonhang = {};
    dataxacnhandonhang = {
      madonhang: this.props.thongtindonhang.madonhang,
      phanhoicuahang: this.state.phanhoicuahang,
      hoa: [],
    };
    dataxacnhandonhang.hoa =
      this.props.thongtindonhang && this.props.thongtindonhang.hoas
        ? this.props.thongtindonhang.hoas.map((item) => {
            return {
              id: item.id,
              soluongmua: item.Donhangchitiet.soluongmua,
            };
          })
        : [];
    this.setState({
      dataxacnhandonhang: dataxacnhandonhang,
    });
  };

  hoadontiengviet = () => {
    const doc = new jsPDF();

    let sanpham = [];

    let copy = _.cloneDeep(this.props.thongtindonhang.hoas);
    if (copy && copy.length > 0) {
      copy.map((item) => {
        let arr = [];
        arr[0] = item.tenhoaVi;
        arr[1] = item.giasaukhigiamVND;
        arr[2] = item.Donhangchitiet.soluongmua;
        arr[3] = item.Donhangchitiet.tongtien;
        sanpham.push(arr);
      });
    }

    doc.addImage(logo, "PNG", 10, 10, 40, 40);
    doc.setFont("Roboto-Medium");
    doc.setFontSize(25);
    doc.text(`HÓA ĐƠN ĐẶT HÀNG`, 90, 25);
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    doc.setFont("Roboto-Regular");
    doc.setFontSize(14);
    doc.text(`Hà Nội, Ngày ${day} tháng ${month} năm ${year}`, 120, 40);
    doc.setFontSize(12);
    doc.text(`Đơn vị bán hàng: HHFLOWER`, 15, 55);
    doc.text(
      `Địa chỉ: Số 7 Ngách 24, Ngõ, 165 Đường Cầu Giấy, Cầu Giấy, Hà Nội`,
      15,
      60
    );
    doc.text(`Số điện thoại: 0344573591`, 15, 65);
    doc.text(
      `------------------------------------------------------------------------------------------------------------------------------------------------------------`,
      15,
      68
    );
    doc.text(`Mã đơn hàng: ${this.props.thongtindonhang.madonhang}`, 15, 73);
    doc.text(
      `Tên người nhận: ${this.props.thongtindonhang.tennguoinhan}`,
      15,
      78
    );
    doc.text(`Email: ${this.props.thongtindonhang.email}`, 15, 83);
    doc.text(
      `Số điện thoại: ${this.props.thongtindonhang.sodienthoai}`,
      15,
      88
    );
    doc.text(`Địa chỉ: ${this.props.thongtindonhang.diachi}`, 15, 93);
    doc.text(`Ghi chú: ${this.props.thongtindonhang.ghichu}`, 15, 98);
    doc.text(`Tổng tiền: ${this.props.thongtindonhang.tongtien} ${"đ"}`, 15, 103);
    doc.text(
      `------------------------------------------------------------------------------------------------------------------------------------------------------------`,
      15,
      106
    );
    doc.setFont("Roboto-Regular");
    doc.setFontSize(14);
    let chieucaocuabang = 0;
    const tableConfig = {
      startY: 110,
      startX: 110, // Vị trí bắt đầu vẽ bảng
      head: [["Tên hoa", "Giá", "Số lượng mua", "Tổng tiền"]],
      body: sanpham, // Dữ liệu của bảng
      headStyles: {
        font: "Roboto-Regular",
        fontSize: 12,
        fontStyle: "normal",
        fillColor: [245, 245, 245],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        font: "Roboto-Regular",
        fontSize: 10,
        fontStyle: "normal",
      },

      rowPageBreak: "auto",
    };

    doc.autoTable(tableConfig);
    chieucaocuabang = doc.autoTable.previous.finalY;

    let chieucaoketiepcuabang = chieucaocuabang;
    doc.text(
      `-------------------------------------------------------------------------------------------------------------------------------------`,
      15,
      chieucaoketiepcuabang + 8
    );

    doc.text(
      `Lưu ý: ${this.state.phanhoicuahang ? this.state.phanhoicuahang : ''}`,
      15,
      chieucaoketiepcuabang + 13
    );
    doc.text(
      `Hình thức thanh toán: Thanh toán khi nhận hàng.`,
      15,
      chieucaoketiepcuabang + 18
    );
    doc.text(
      `Quý khách kiểm tra hàng kỹ trước khi nhận hàng.`,
      15,
      chieucaoketiepcuabang + 23
    );
    doc.setFont("Roboto-Medium");
    doc.setFontSize(15);
    doc.text(
      `QÚY KHÁCH VUI LÒNG QUAY LẠI VIDEO KHI NHẬN HÀNG VÀ KIỂM TRA HÀNG,
ĐỂ CÓ THỂ THỰC HIỆN VIỆC TRẢ HÀNG VÀ HOÀN TIỀN MỘT CÁCH MINH 
BẠCH VÀ RÕ RÀNG. CỬA HÀNG CHỈ CHẤP NHẬN ĐỔI HÀNG VÀ HOÀN TIỀN 
KHI CÓ VIDEO QUAY RÕ RÀNG`,
      15,
      chieucaoketiepcuabang + 33
    );
    doc.setFont("Roboto-Regular");
    doc.setFontSize(12);
    doc.text(
      `------------------------------------------------------------------------------------------------------------------------------------------------------------`,

      15,
      chieucaoketiepcuabang + 58
    );

    doc.text(`Người mua hàng`, 28, chieucaoketiepcuabang + 63);
    doc.text(`(Ký,ghi rõ họ, tên)`, 27, chieucaoketiepcuabang + 68);
    doc.text(`Người bán hàng`, 134, chieucaoketiepcuabang + 63);
    doc.text(`(Ký,ghi rõ họ, tên)`, 133, chieucaoketiepcuabang + 68);

    doc.save(`${this.props.thongtindonhang.tennguoinhan}.pdf`);
  };

  hoadontienganh = () => {
    const doc = new jsPDF();

    let sanpham = [];

    let copy = _.cloneDeep(this.props.thongtindonhang.hoas);
    if (copy && copy.length > 0) {
      copy.map((item) => {
        let arr = [];
        arr[0] = item.tenhoaEn;
        arr[1] = item.giasaukhigiamUSD;
        arr[2] = item.Donhangchitiet.soluongmua;
        arr[3] = item.Donhangchitiet.tongtien;
        sanpham.push(arr);
      });
    }

    doc.addImage(logo, "PNG", 10, 10, 40, 40);
    doc.setFont("Roboto-Medium");
    doc.setFontSize(25);
    doc.text(`ORDERS INVOICE`, 90, 25);
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    doc.setFont("Roboto-Regular");
    doc.setFontSize(14);
    doc.text(`Ha Noi, Date ${day} month ${month} year ${year}`, 120, 40);
    doc.setFontSize(12);
    doc.text(`Sales unit: HHFLOWER`, 15, 55);
    doc.text(
      `Address: No. 7 Alley 24, Alley, 165 Cau Giay Street, Cau Giay, Hanoi`,
      15,
      60
    );
    doc.text(`Phone number: 0344573591`, 15, 65);
    doc.text(
      `------------------------------------------------------------------------------------------------------------------------------------------------------------`,
      15,
      68
    );
    doc.text(`Code orders: ${this.props.thongtindonhang.madonhang}`, 15, 73);
    doc.text(
      `Recipient's name: ${this.props.thongtindonhang.tennguoinhan}`,
      15,
      78
    );
    doc.text(`Email: ${this.props.thongtindonhang.email}`, 15, 83);
    doc.text(`Phone number: ${this.props.thongtindonhang.sodienthoai}`, 15, 88);
    doc.text(`Address: ${this.props.thongtindonhang.diachi}`, 15, 93);
    doc.text(`Note: ${this.props.thongtindonhang.ghichu}`, 15, 98);
    doc.text(`Total amount: ${this.props.thongtindonhang.tongtien}`, 15, 103);
    doc.text(
      `------------------------------------------------------------------------------------------------------------------------------------------------------------`,
      15,
      106
    );
    doc.setFont("Roboto-Regular");
    doc.setFontSize(14);
    let chieucaocuabang = 0;
    const tableConfig = {
      startY: 110,
      startX: 110, // Vị trí bắt đầu vẽ bảng
      head: [["Flower name", "Price", "Quantity purchased", "Total amount"]],
      body: sanpham, //
      headStyles: {
        font: "Roboto-Regular",
        fontSize: 12,
        fontStyle: "normal",
        fillColor: [245, 245, 245],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        font: "Roboto-Regular",
        fontSize: 10,
        fontStyle: "normal",
      },

      rowPageBreak: "auto",
    };

    doc.autoTable(tableConfig);
    chieucaocuabang = doc.autoTable.previous.finalY;

    let chieucaoketiepcuabang = chieucaocuabang;
    doc.text(
      `-------------------------------------------------------------------------------------------------------------------------------------`,
      15,
      chieucaoketiepcuabang + 8
    );

    doc.text(
      `Note: ${this.state.phanhoicuahang}`,
      15,
      chieucaoketiepcuabang + 13
    );
    doc.text(
      `Payment method: Payment upon receipt.`,
      15,
      chieucaoketiepcuabang + 18
    );
    doc.text(
      `Please check the goods carefully before receiving the goods.`,
      15,
      chieucaoketiepcuabang + 23
    );
    doc.setFont("Roboto-Medium");
    doc.setFontSize(15);
    doc.text(
      `CUSTOMERS PLEASE RECORD THE VIDEO WHEN RECEIVING THE GOODS AND 
CHECK THE GOODS, TO BE ABLE TO MAKE RETURNS AND REFUNDS IN 
A TRANSPARENT WAY CLEAR AND CLEAR. STORE ONLY ACCEPTS 
EXCHANGES AND REFUNDS WHEN THERE IS A CLEAR VIDEO`,
      15,
      chieucaoketiepcuabang + 33
    );
    doc.setFont("Roboto-Regular");
    doc.setFontSize(12);
    doc.text(
      `------------------------------------------------------------------------------------------------------------------------------------------------------------`,

      15,
      chieucaoketiepcuabang + 58
    );

    doc.text(`Buyer`, 37, chieucaoketiepcuabang + 63);
    doc.text(`(Sign, write full name)`, 27, chieucaoketiepcuabang + 68);
    doc.text(`Salesman`, 141, chieucaoketiepcuabang + 63);
    doc.text(`(Sign, write full name)`, 133, chieucaoketiepcuabang + 68);

    doc.save(`${this.props.thongtindonhang.tennguoinhan}.pdf`);
  };

  xacnhandonhang = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apixacnhandonhang({
      dataxacnhandonhang: this.state.dataxacnhandonhang,
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
      this.props.ngonngu === "vi"
        ? toast.success("Xác nhận đơn hàng thành công!!!")
        : toast.success("Order confirmation successful!!!");
      this.props.thongtindonhang.ngonngu === "vi"
        ? this.hoadontiengviet()
        : this.hoadontienganh();
      this.props.huyxemchitietdonhang();
      this.props.laytatcadonhang();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Xác nhận đơn hàng thất bại")
        : toast.success("Order confirmation successful!!!");
    }
  };

  huydonhang = async () => {
    let kt = this.ktdanhapthongtinchua();
    if (kt === false) return;
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apihuydonhang({
      madonhang: this.props.thongtindonhang.madonhang,
      phanhoicuahang: this.state.phanhoicuahang,
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
      this.props.ngonngu === "vi"
        ? toast.success("Hủy đơn hàng thành công!!!")
        : toast.success("Order cancel successful!!!");
      this.props.huyxemchitietdonhang();
      this.props.laytatcadonhang();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Hủy đơn hàng thất bại")
        : toast.success("Order cancel failed!!!");
    }
  };

  daxuly = async () => {
    let token = await apirefreshtoken();

    if (token.maCode === 10) {
      this.props.ngonngu === "vi"
        ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
        : toast.error("You are not logged in, please log in!!!");
    }
    let kq = await apixacnhandaxulyyeucauhoanhanghoantien({
      madonhang: this.props.thongtindonhang.madonhang,
      phanhoicuahang: this.state.phanhoicuahang,
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
      this.props.ngonngu === "vi"
        ? toast.success("Đã xử lý đơn hàng thành công!!!")
        : toast.success("Order processed successfully!!!");
      this.props.huyxemchitietdonhang();
      this.props.laytatcadonhang();
    } else {
      this.props.ngonngu === "vi"
        ? toast.success("Xử lý đơn hàng thất bại")
        : toast.success("Order processed failed!!!");
    }
  };

  render() {
    let {
      thongtindonhang,
      trangthaithongtindonhang,
      huyxemchitietdonhang,
      ngonngu,
    } = this.props;
    let { phanhoicuahang } = this.state;
    return (
      <div className="thongtindonhang">
        <Modal
          isOpen={trangthaithongtindonhang}
          className={"thongtindonhang"}
          size="xl"
        >
          <div className="thongtindonhang">
            <div className="item1">
              <span className="chu ml-3">Thông tin đơn hàng</span>
              <span onClick={huyxemchitietdonhang} className="tat mt-1 mr-1">
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="item2 ml-4 mt-3 mb-3">
              <span>
                <b>Mã đơn hàng:</b> {thongtindonhang.madonhang}
              </span>
              <span>
                <b>Tên người nhận:</b> {thongtindonhang.tennguoinhan}
              </span>
              <span>
                <b>Email:</b> {thongtindonhang.email}
              </span>
              <span>
                <b>Số điện thoại:</b> {thongtindonhang.sodienthoai}
              </span>
              <span>
                <b>Địa chỉ:</b> {thongtindonhang.diachi}
              </span>
              <span>
                <b>Ghi chú:</b> {thongtindonhang.ghichu}
              </span>
              {thongtindonhang.trangthaidonhangid === "H7" ? (
                <span>
                  <b>Lý do:</b> {thongtindonhang.phanhoikhachhang}
                </span>
              ) : null}
              <span>
                <b>Tổng tiền:</b>{" "}
                {`${thongtindonhang.tongtien} ${
                  thongtindonhang.ngonngu === "vi" ? " đ" : " USD"
                }`}
              </span>
            </div>
            <div className="item3 ml-4 mr-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Tên hoa</th>
                    <th scope="col">Số lượng còn</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng mua</th>
                    <th scope="col">Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {thongtindonhang &&
                  thongtindonhang.hoas &&
                  thongtindonhang.hoas.length > 0
                    ? thongtindonhang.hoas.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {thongtindonhang.ngonngu === "vi"
                              ? item.tenhoaVi
                              : item.tenhoaVi}
                          </td>
                          <td>{item.soluongcon}</td>
                          <td>
                            {thongtindonhang.ngonngu === "vi"
                              ? `${item.giathucVND} đ`
                              : `${item.giathucUSD} USD`}
                          </td>
                          <td>{item.Donhangchitiet.soluongmua}</td>
                          <td>{`${item.Donhangchitiet.tongtien} ${
                            thongtindonhang.ngonngu === "vi" ? " đ" : " USD"
                          }`}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
            {thongtindonhang.trangthaidonhangid === "H1" ? (
              <div className="row">
                <div className="form-group col-12 pl-5 pr-5">
                  <label>Ghi chú</label>
                  <textarea
                    className="form-control"
                    type="text"
                    onChange={(event) => {
                      this.onChangeNhap(event, "phanhoicuahang");
                    }}
                    value={phanhoicuahang}
                  ></textarea>
                </div>
              </div>
            ) : null}

            <div className="item4 mb-3">
              {thongtindonhang.trangthaidonhangid === "H1" ? (
                <button
                  className="btn nutbam"
                  onClick={() => this.huydonhang()}
                >
                  Hủy đơn hàng
                </button>
              ) : (
                <button className="btn nutbam" onClick={() => this.daxuly()}>
                  Đã xử lý
                </button>
              )}

              <button
                className="btn nutbam ml-4"
                onClick={() => this.xacnhandonhang()}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ThongTinDonHang);
