import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Provider } from "react-redux";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { store } from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
