import actionTypes from "../action/actionTypes";

const INITIAL_STATE = {
  gioitinh:[],
  quyen:[],
  tatcanguoidung:[],
  nguoidung:[]
};

const adminReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
      case actionTypes.LAY_ALLCODE_GIOI_TINH_THANH_CONG:
        state.gioitinh= actions.gioitinh
      return {
        ...state,
      };
      case actionTypes.LAY_ALLCODE_GIOI_TINH_THAT_BAI:
      return {
        ...state,
      };
      case actionTypes.LAY_ALLCODE_QUYEN_THANH_CONG:
        state.quyen= actions.quyen
      return {
        ...state,
      };
      case actionTypes.LAY_ALLCODE_QUYEN_THAT_BAI:

      return {
        ...state
      }
      case actionTypes.LAY_TAT_CA_NGUOI_DUNG_THANH_CONG:
        state.tatcanguoidung= actions.tatcanguoidung
      return {
        ...state,
      };
      case actionTypes.LAY_TAT_CA_NGUOI_DUNG_THAT_BAI:
      return {
        ...state
      }
      case actionTypes.LAY_1_NGUOI_DUNG_THANH_CONG:
        state.nguoidung= actions.nguoidung
      return {
        ...state,
      };
      case actionTypes.LAY_1_NGUOI_DUNG_THAT_BAI:
      return {
        ...state
      }
    default:
      return state;
  }
};

export default adminReducer;
