import React from "react";
import ReactDOM, { Container } from "react-dom/client";
import "./index.css";
import App from "./src/App";

ReactDOM.createRoot(document.getElementById("root") as Container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
