// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}
