// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/ProtectedRoute';

import LoginPage from './pages/login/LoginPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import ChamadosPage from './pages/dashboard/ChamadoPage';
import ConhecimentoPage from './pages/dashboard/ConhecimentoPage';
import SegredosPage from './pages/dashboard/SegredosPage';
import PerfilPage from './pages/dashboard/PerfilPage';
import TimeSheetPage from './pages/dashboard/TimeSheetPage';
import Dashboard from './pages/dashboard/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="inicio" />} />
            <Route path="inicio" element={<Dashboard />} />
            <Route path="perfil" element={<PerfilPage />} />
            <Route path="chamados" element={<ChamadosPage />} />
            <Route path="segredos" element={<SegredosPage />} />
            <Route path="conhecimento" element={<ConhecimentoPage />} />
            <Route path="timesheet" element={<TimeSheetPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
