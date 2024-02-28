import actionTypes from "../action/actionTypes";
const INITIAL_STATE = {
  thongtingiohang: [],
};
const thongtingiohangReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.THEM_GIO_HANG_CHUA_DANG_NHAP:
        let trangthaithem = false;
        const thongtingiohangclone = state.thongtingiohang && state.thongtingiohang.length > 0
          ? state.thongtingiohang.map((item) => {
              if (item.idhoa === action.thongtingiohang.idhoa) {
                trangthaithem = true;
                item.soluong += action.thongtingiohang.soluong;
              }
              return item;
            })
          : [];
        
        if (!trangthaithem) {
          thongtingiohangclone.push({ ...action.thongtingiohang });
        }
      return {
        ...state,
        thongtingiohang: thongtingiohangclone,
      };

      case actionTypes.SUA_GIO_HANG_CHUA_DANG_NHAP:
      return {
        ...state,
        thongtingiohang: action.thongtingiohangmoi,
      };

      case actionTypes.XOA_MA_DON_HANG_CHUA_DANG_NHAP:
      return {
        ...state,
        thongtingiohang: [],
      };

    default:
      return state;
  }
};

export default thongtingiohangReducer;
