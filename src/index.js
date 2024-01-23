import React from "react";
import "./assets/global.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3} autoHideDuration={2000} variant="success">
      <App />
    </SnackbarProvider>
  </Provider>
);
