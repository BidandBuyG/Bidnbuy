import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { HealthBadge } from "./features/components/HealthBadge";
import TanstackProvider from "./features/components/providers/tanstack-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TanstackProvider>
      <HealthBadge />
      <Toaster />
      <App />
    </TanstackProvider>
  </React.StrictMode>
);
