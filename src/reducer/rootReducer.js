import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import webReducer from './webReducer'
import thongtinnguoidungReducer from "./thongtinnguoidungReducer";
import thongtinhoadathangReducer from './thongtinhoadathangReducer'
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import store from "../redux/store";

// sdfdsf

const khoitaolocalstorage = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const bienngonngu = {
  ...khoitaolocalstorage,
  key: 'web',
  whitelist: ['ngonngu']
}

const thongtinnguoidung = {
  ...khoitaolocalstorage,
  key: 'thongtinnguoidung',
  whitelist: ['thongtinnguoidung','ktdangnhap']
}
const thongtinhoadathang = {
  ...khoitaolocalstorage,
  key: 'thongtinhoadathang',
  whitelist: ['thongtinhoadathang']
}


const rootReducer = combineReducers({
  web: persistReducer(bienngonngu,webReducer),
  thongtinnguoidung: persistReducer(thongtinnguoidung,thongtinnguoidungReducer),
  admin: adminReducer,
  dathanghoa: persistReducer(thongtinhoadathang,thongtinhoadathangReducer),

});

export default rootReducer;
