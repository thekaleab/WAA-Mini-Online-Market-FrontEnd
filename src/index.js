import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "react-loading-skeleton/dist/skeleton.css";

import store from './redux/store';

import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  ,
  document.getElementById("root")
);
