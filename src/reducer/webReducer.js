import actionTypes from "../action/actionTypes";
const INITIAL_STATE = {
  ngonngu: "vi",
};
const webReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.DOI_NGON_NGU:
      return {
        ...state,
        ngonngu: action.ngonngu,
      };
    default:
      return state;
  }
};

export default webReducer;
