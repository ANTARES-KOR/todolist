import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/**
 * CSS RESET을 위한 import
 * @see https://velog.io/@teo/2022-CSS-Reset-%EB%8B%A4%EC%8B%9C-%EC%8D%A8%EB%B3%B4%EA%B8%B0
 */
import "./styles/minireset.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
