import actionTypes from "./actionTypes";
import {
  layAllCode,
  themnguoidung,
  laytatcanguoidung,
  lay1nguoidung,
  apixoanguoidung,
  apisuanguoidung,
  apirefreshtoken,
} from "../API/GoiApi";
import { apitimhoanguoidung } from "../API/ApiTrangChu";
import { toast } from "react-toastify";
import store from "../redux/store";

// function handleStorageChange(event) {
//   return async (dispatch, getState) => {
//     try {
//       let myVariable = localStorage.getItem("persist:web");
//       let parsedData = JSON.parse(myVariable);
//       let ngonnguValue = parsedData.ngonngu;
//       dispatch(doiNgonNgu(ngonnguValue.replace(/^"(.*)"$/, "$1")));
//     } catch (e) {
//       console.log("layGioiTinhThatBai loi: ", e);
//     }
//   };
// }

// // Lắng nghe sự kiện storage
// window.addEventListener("storage", handleStorageChange);

// let ngonngu1 = store.getState().web.ngonngu;
// export const doiNgonNgu = (ngonngu) => {
//   console.log(ngonngu);
//   ngonngu1 = ngonngu;
//   return {
//     type: actionTypes.DOI_NGON_NGU,
//     ngonngu: ngonngu,
//   };
// };

// function handleStorageChange(event) {
//   let myVariable = localStorage.getItem("persist:web");
//   let parsedData = JSON.parse(myVariable);
//   let ngonnguValue = parsedData.ngonngu;
//   doiNgonNgu(ngonnguValue.replace(/^"(.*)"$/, "$1"));
// }

// // Lắng nghe sự kiện storage
// window.addEventListener("storage", handleStorageChange);
let myVariable = localStorage.getItem("persist:web");
  let parsedData = JSON.parse(myVariable);
  let ngonnguValue = parsedData.ngonngu;
//   doiNgonNgu(ngonnguValue.replace(/^"(.*)"$/, "$1"));
// let ngonngu1 = store.getState().web.ngonngu;
let ngonngu1 = ngonnguValue.replace(/^"(.*)"$/, "$1");
export const doiNgonNgu = (ngonngu) => (
  // console.log(ngonngu),
  // (ngonngu1 = ngonngu),
  {
    type: actionTypes.DOI_NGON_NGU,
    ngonngu: ngonngu,
  }
);

export const thongtinnguoidung = (thongtinnguoidung) => ({
  type: actionTypes.LUU_THONG_TIN_NGUOI_DUNG,
  thongtinnguoidung: thongtinnguoidung,
});

export const dangxuat = () => ({
  type: actionTypes.XOA_THONG_TIN_NGUOI_DUNG,
});

export const themmoinguoidung = (data) => {
  return async (dispatch, getState) => {
    try {
      let token = await apirefreshtoken();

      if (token.maCode === 10) {
        ngonngu1 === "vi"
          ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
          : toast.error("You are not logged in, please log in!!!");
      }
      let res = await themnguoidung(data);
      if (res.maCode === 6) {
        ngonngu1 === "vi"
          ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
          : toast.error("You are not an admin, please come back!!!");
      }
      if (res.maCode === 7) {
        ngonngu1 === "vi"
          ? toast.error(
              "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
            )
          : toast.error(
              "You are not an admin or store employee, please leave!!!"
            );
      }
      if (res && res.maCode === 0) {
        ngonngu1 === "vi"
          ? toast.success("Thêm người dùng thành công")
          : toast.success("User added successfully!");
        dispatch(themnguoidungthanhcong());
        dispatch(allnguoidung());
      } else {
        dispatch(themnguoidungthatbai());
        ngonngu1 === "vi"
          ? toast.success("Thêm người dùng thất bại")
          : toast.success("Added users failed");
        // ngonngu1 === "vi" ? alert(res.thongDiep) : alert(res.thongDiepen);
      }
    } catch (e) {
      dispatch(themnguoidungthatbai());
      console.log("themnguoidungthatbai error: ", e);
    }
  };
};
export const themnguoidungthatbai = () => ({
  type: actionTypes.THEM_NGUOI_DUNG_THAT_BAI,
});
export const themnguoidungthanhcong = () => ({
  type: actionTypes.THEM_NGUOI_DUNG_THANH_CONG,
});

export const layGioiTinh = () => {
  return async (dispatch, getState) => {
    try {
      let res = await layAllCode("GIOITINH");

      if (res && res.maCode === 0) {
        dispatch(layGioiTinhThanhCong(res.data));
      } else {
        dispatch(layGioiTinhThatBai());
      }
    } catch (e) {
      dispatch(layGioiTinhThatBai());
      console.log("layGioiTinhThatBai loi: ", e);
    }
  };
};
export const layGioiTinhThanhCong = (gioitinh) => ({
  type: actionTypes.LAY_ALLCODE_GIOI_TINH_THANH_CONG,
  gioitinh: gioitinh,
});
export const layGioiTinhThatBai = () => ({
  type: actionTypes.LAY_ALLCODE_GIOI_TINH_THAT_BAI,
});

export const layQuyen = () => {
  return async (dispatch, getState) => {
    try {
      let kq = await layAllCode("QUYEN");

      if (kq && kq.maCode === 0) {
        dispatch(layQuyenThanhCong(kq.data));
      } else {
        dispatch(layQuyenThatBai());
      }
    } catch (e) {
      dispatch(layQuyenThatBai());
      console.log("layQuyenThatBai loi: ", e);
    }
  };
};
export const layQuyenThanhCong = (quyen) => ({
  type: actionTypes.LAY_ALLCODE_QUYEN_THANH_CONG,
  quyen: quyen,
});
export const layQuyenThatBai = () => ({
  type: actionTypes.LAY_ALLCODE_QUYEN_THAT_BAI,
});

export const allnguoidung = () => {
  return async (dispatch, getState) => {
    try {
      let token = await apirefreshtoken();

      if (token.maCode === 10) {
        ngonngu1 === "vi"
          ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
          : toast.error("You are not logged in, please log in!!!");
      }

      let res = await laytatcanguoidung();
      if (res.maCode === 6) {
        ngonngu1 === "vi"
          ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
          : toast.error("You are not an admin, please come back!!!");
      }
      if (res.maCode === 7) {
        ngonngu1 === "vi"
          ? toast.error(
              "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
            )
          : toast.error(
              "You are not an admin or store employee, please leave!!!"
            );
      }
      if (res && res.maCode === 0) {
        dispatch(laytatcanguoidungthanhcong(res.data));
      } else {
        dispatch(laytatcanguoidungthatbai());
      }
    } catch (e) {
      dispatch(laytatcanguoidungthatbai());
      console.log("laytatcanguoidungthatbai loi: ", e);
    }
  };
};
export const laytatcanguoidungthanhcong = (data) => ({
  type: actionTypes.LAY_TAT_CA_NGUOI_DUNG_THANH_CONG,
  tatcanguoidung: data,
});
export const laytatcanguoidungthatbai = () => ({
  type: actionTypes.LAY_TAT_CA_NGUOI_DUNG_THAT_BAI,
});

export const laynguoidung = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await lay1nguoidung(id);
      if (res) {
        dispatch(layNguoiDungThanhCong(res));
      } else {
        dispatch(layNguoiDungThatBai());
      }
    } catch (e) {
      dispatch(layNguoiDungThatBai());
      console.log("layNguoiDungThatBai loi: ", e);
    }
  };
};
export const layNguoiDungThanhCong = (data) => ({
  type: actionTypes.LAY_1_NGUOI_DUNG_THANH_CONG,
  nguoidung: data,
});
export const layNguoiDungThatBai = () => ({
  type: actionTypes.LAY_1_NGUOI_DUNG_THAT_BAI,
});

export const xoanguoidung = (id) => {
  return async (dispatch, getState) => {
    try {
      let token = await apirefreshtoken();

      if (token.maCode === 10) {
        ngonngu1 === "vi"
          ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
          : toast.error("You are not logged in, please log in!!!");
      }

      let res = await apixoanguoidung(id);
      if (res.maCode === 6) {
        ngonngu1 === "vi"
          ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
          : toast.error("You are not an admin, please come back!!!");
      }
      if (res.maCode === 7) {
        ngonngu1 === "vi"
          ? toast.error(
              "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
            )
          : toast.error(
              "You are not an admin or store employee, please leave!!!"
            );
      }
      if (res && res.maCode === 0) {
        ngonngu1 === "vi"
          ? toast.success("Xóa người dùng thành công")
          : toast.success("Delete users success");
        dispatch(xoanguoidungthanhcong());
        dispatch(allnguoidung());
      } else {
        dispatch(xoanguoidungthatbai());
        ngonngu1 === "vi"
          ? toast.success("Xóa người dùng thất bại")
          : toast.success("Delete users failed");
      }
    } catch (e) {
      dispatch(xoanguoidungthatbai());
      console.log("themnguoidungthatbai error: ", e);
    }
  };
};
export const xoanguoidungthatbai = () => ({
  type: actionTypes.XOA_NGUOI_DUNG_THAT_BAI,
});
export const xoanguoidungthanhcong = () => ({
  type: actionTypes.XOA_NGUOI_DUNG_THANH_CONG,
});

export const suanguoidung = (data) => {
  return async (dispatch, getState) => {
    try {
      let token = await apirefreshtoken();

      if (token.maCode === 10) {
        ngonngu1 === "vi"
          ? toast.error("Bạn chưa đăng nhập vui lòng đăng nhập!!!")
          : toast.error("You are not logged in, please log in!!!");
      }

      let res = await apisuanguoidung(data);
      if (res.maCode === 6) {
        ngonngu1 === "vi"
          ? toast.error("Bạn không phải admin vui lòng quay ra!!!")
          : toast.error("You are not an admin, please come back!!!");
      }
      if (res.maCode === 7) {
        ngonngu1 === "vi"
          ? toast.error(
              "Bạn không phải admin hay nhân viên của cửa hàng vui lòng quay ra!!!"
            )
          : toast.error(
              "You are not an admin or store employee, please leave!!!"
            );
      }
      if (res && res.maCode === 0) {
        ngonngu1 === "vi"
          ? toast.success("Sửa người dùng thành công")
          : toast.success("Edit users success");
        dispatch(suanguoidungthanhcong());
        dispatch(allnguoidung());
      } else {
        dispatch(suanguoidungthatbai());
        ngonngu1 === "vi"
          ? toast.success("Sửa người dùng thất bại")
          : toast.success("Edit users failed");
      }
    } catch (e) {
      dispatch(suanguoidungthatbai());
      console.log("themnguoidungthatbai error: ", e);
    }
  };
};
export const suanguoidungthatbai = () => ({
  type: actionTypes.SUA_NGUOI_DUNG_THAT_BAI,
});
export const suanguoidungthanhcong = () => ({
  type: actionTypes.SUA_NGUOI_DUNG_THANH_CONG,
});

export const thongtinhoadathang = (hoa) => ({
  type: actionTypes.THONG_TIN_HOA_DAT_HANG_TRANG_CHU,
  hoa: hoa,
});
