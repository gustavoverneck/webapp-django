// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/ProtectedRoute';

import LoginPage from './pages/login/LoginPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import ChamadosPage from './pages/dashboard/ChamadosPage';
import ConhecimentoPage from './pages/dashboard/ConhecimentoPage';
import SegredosPage from './pages/dashboard/SegredosPage';
import PerfilPage from './pages/dashboard/PerfilPage';
import TimeSheetPage from './pages/dashboard/TimeSheetPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path="chamados" element={<ChamadosPage />} />
            <Route path="conhecimento" element={<ConhecimentoPage />} />
            <Route path="segredos" element={<SegredosPage />} />
            <Route path="perfil" element={<PerfilPage />} />
            <Route path="timesheet" element={<TimeSheetPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;