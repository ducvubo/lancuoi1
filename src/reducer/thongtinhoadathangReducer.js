import actionTypes from "../action/actionTypes";

const INITIAL_STATE = {
  thongtinhoadathang: "",
};

const adminReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case actionTypes.THONG_TIN_HOA_DAT_HANG_TRANG_CHU:
      return {
        ...state,
        thongtinhoadathang: actions.hoa,
      };
    case actionTypes.XOA_THONG_TIN_NGUOI_DUNG:
      return {
        ...state,
        thongtinhoadathang:''
      };
    default:
      return state;
  }
};

export default adminReducer;
