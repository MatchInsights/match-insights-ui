import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./app/main/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <div
          className="fixed inset-0 pointer-events-none animate-pulseLiveAppBg"
          style={{
            background:
              "linear-gradient(5deg, rgb(116, 77, 27) 40%, rgb(130, 101, 15) 40%, transparent 100%)",

            filter: "blur(40px)",
            opacity: 0.25,
            zIndex: 0,
          }}
        ></div>

        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
