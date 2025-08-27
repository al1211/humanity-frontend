import Dashboard from "./pages/Dashboard";
import React from "react";
import ProtectedRoute from "./components/Project.routes.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Singup.jsx";

export default function App() {
  return (
   <BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/sinup" element={<Signup />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  </Routes>
</BrowserRouter>

  );
}
