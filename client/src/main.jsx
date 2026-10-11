// main.jsx
// This is the first file React runs.
// It puts our <App /> inside the <div id="root"> in index.html

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import "./index.css";
import "./dashboard/dashboard.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
