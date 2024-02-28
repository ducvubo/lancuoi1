import actionTypes from "../action/actionTypes";

const INITIAL_STATE = {
  thongtinhoadathang: "",
};

const thongtinhoadathangReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case actionTypes.THONG_TIN_HOA_DAT_HANG_TRANG_CHU:
      return {
        ...state,
        thongtinhoadathang: actions.hoa,
      };
    default:
      return state;
  }
};

export default thongtinhoadathangReducer;
