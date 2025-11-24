import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import LandingPage from "./pages/LandingPage.jsx";
import App from "./pages/App.jsx";
import Demo from "./pages/Demo.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<App />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
