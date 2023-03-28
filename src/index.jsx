import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
// import { MainContextProvider } from "./utils/maincontext";
import { Provider } from "react-redux";
import store from "./store";
import { MantineProvider } from "@mantine/core";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider>
          <App />
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
