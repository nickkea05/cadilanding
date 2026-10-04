import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css";
import { App } from "./index";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { Support } from "./pages/Support";
import { OpenInApp } from "./pages/OpenInApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/support" element={<Support />} />
        <Route path="/course/:id" element={<OpenInApp kind="course" />} />
        <Route path="/profile/:id" element={<OpenInApp kind="profile" />} />
        <Route path="/invite/:code" element={<OpenInApp kind="invite" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
