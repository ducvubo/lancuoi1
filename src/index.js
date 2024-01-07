import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import DoiNgonNgu from "./DoiNgonNgu";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/en";
import "@formatjs/intl-pluralrules/locale-data/vi";

import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/en";
import "@formatjs/intl-relativetimeformat/locale-data/vi";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/rootReducer";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const store1 = createStore(rootReducer, applyMiddleware(thunk));
const persistedStore = persistStore(store1);

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

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store1}>
      <PersistGate loading={null} persistor={persistedStore}>
        <DoiNgonNgu>
          <App />
        </DoiNgonNgu>
      </PersistGate>
    </Provider>,
    document.getElementById("root")
  );
};

renderApp();

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
