import actionTypes from "../action/actionTypes";
const INITIAL_STATE = {
  madonhangArr: [],
};
const madonhangReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.THEM_MA_DON_HANG_CHUA_DANG_NHAP:
      console.log(action.madonhang);
      return {
        ...state,
        madonhangArr: [...state.madonhangArr, action.madonhang],
      };

      case actionTypes.XOA_MA_DON_HANG_CHUA_DANG_NHAP:
      return {
        ...state,
        madonhangArr: [],
      };

    default:
      return state;
  }
};

export default madonhangReducer;
