import { createStore } from "redux";
import rootReducer from "../reducer/rootReducer";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { applyMiddleware } from "redux";

// const store = createStore(rootReducer);
const store = createStore(rootReducer, applyMiddleware(thunk));
const persistedStore = persistStore(store);
// export default store;
export { store, persistedStore };
