import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Settings from "./pages/Settings"

export default function App() {
  return (
    <FinanceProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </FinanceProvider>
  );
}