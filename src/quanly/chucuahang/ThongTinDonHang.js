import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ThongTinDonHang.scss";
import { Modal } from "reactstrap";
import { apixacnhandonhang } from "../../API/GoiApi";
import { toast } from "react-toastify";
class ThongTinDonHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phanhoicuahang: "",
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

  xacnhandonhang = async () => {
    let kq = await apixacnhandonhang({
      dataxacnhandonhang: this.state.dataxacnhandonhang,
    });
    if (kq && kq.maCode === 0) {
        this.props.ngonngu === "vi"
          ? toast.success("Xác nhận đơn hàng thành công!!!")
          : toast.success("Order confirmation successful!!!");
        await this.laytatcadanhmuc();
      } else {
        this.props.ngonngu === "vi"
          ? toast.success("Xác nhận đơn hàng thất bại")
          : toast.success("Order confirmation successful!!!");
      }
  };

  render() {
    let {
      thongtindonhang,
      trangthaithongtindonhang,
      huyxemchitietdonhang,
      ngonngu,
    } = this.props;
    let { dataxacnhandonhang, phanhoicuahang } = this.state;
    console.log("check: ", dataxacnhandonhang);
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
            <div className="item4 mb-3">
              <button className="btn nutbam ">Hủy đơn hàng</button>
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
