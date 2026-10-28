import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f1c1a",
            color: "#faf8f5",
            border: "1px solid rgba(201,168,124,0.3)",
            fontFamily: "Jost, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.05em",
          },
          success: {
            iconTheme: {
              primary: "#c9a87c",
              secondary: "#1f1c1a",
            },
          },
          error: {
            iconTheme: {
              primary: "#e8a4a4",
              secondary: "#1f1c1a",
            },
          },
          duration: 4000,
        }}
      />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
