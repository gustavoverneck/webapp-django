import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaTools, FaKey, FaBook, FaClock, FaSignOutAlt, FaUser } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import './NavBar.css';

export default function Navbar() {
  const {user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Inicio', icon: <FaHome />, path: '/dashboard' },
    { label: 'Perfil', icon: <FaUser />, path: '/dashboard/perfil' },
    { label: 'Administrar Chamados', icon: <FaTools />, path: '/dashboard/chamados' },
    { label: 'Gerenciador de Segredos', icon: <FaKey />, path: '/dashboard/segredos' },
    { label: 'Base de Conhecimento', icon: <FaBook />, path: '/dashboard/conhecimento' },
    { label: 'Timesheet', icon: <FaClock />, path: '/dashboard/timesheet' },
  ];
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src="/numen-logoblack.png" alt="Numen Logo" />
      </div>
      <div className="navbar-buttons">
        {navItems.map((item, index) => (
          <button className="nav-button" key={index} onClick={() => navigate(item.path)}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
        <button className="nav-button logout-button" onClick={logoutUser}>
          <span className="nav-icon"><FaSignOutAlt /></span>
          <span className="nav-label">Sair</span>
        </button>
      </div>
    </header>
  );
}
