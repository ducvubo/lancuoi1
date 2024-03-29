import actionTypes from "../action/actionTypes";
const INITIAL_STATE = {
  thongtinnguoidung:'',
  ktdangnhap:false
};
const thongtinnguoidungReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case actionTypes.LUU_THONG_TIN_NGUOI_DUNG:
      return {
        ...state,
        thongtinnguoidung: action.thongtinnguoidung,
        ktdangnhap:true
      };

      case actionTypes.XOA_THONG_TIN_NGUOI_DUNG:
        return {
          ...state,
          thongtinnguoidung: '',
          ktdangnhap:false
        };
        
    default:
      return state;
  }
};

export default thongtinnguoidungReducer;
