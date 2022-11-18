import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { store, persistor } from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
