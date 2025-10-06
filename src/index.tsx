import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./App.css";
import { Toaster as SonnerToaster } from "sonner";
// import { HealthBadge } from "./components/HealthBadge";
import TanstackProvider from "./components/providers/tanstack-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TanstackProvider>
      {/* <HealthBadge /> */}
      <SonnerToaster />
      <App />
    </TanstackProvider>
  </React.StrictMode>
);
