import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "App";
import { Provider } from "react-redux";
import { MaterialUIControllerProvider } from "context";

import { store } from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
