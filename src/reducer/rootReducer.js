import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import webReducer from './webReducer'
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import store from "../redux/store";

// sdfdsf

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const appPersistConfig = {
  ...persistCommonConfig,
  key: 'web',
  whitelist: ['ngonngu']
}


const rootReducer = combineReducers({
  web: persistReducer(appPersistConfig,webReducer),
  admin: adminReducer
});

export default rootReducer;
