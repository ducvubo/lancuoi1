import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import DoiNgonNgu from "./DoiNgonNgu";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/rootReducer";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const store1 = createStore(rootReducer, applyMiddleware(thunk));
const persistedStore = persistStore(store1);

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store1}>
      <PersistGate persistor={persistedStore} loading={null}>
        <DoiNgonNgu>
          <App />
        </DoiNgonNgu>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
  );
};

renderApp();


// ReactDOM.render(
//  <Provider store={store1}>
//     <React.StrictMode>
//     <PersistGate loading={null} persistor={persistedStore}>
//       <DoiNgonNgu>
//         <App />
//       </DoiNgonNgu>
//     </PersistGate>
//     </React.StrictMode>
//   </Provider>,
//   document.getElementById("root")
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
