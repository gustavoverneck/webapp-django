// src/pages/dashboard/DashboardLayout.js
import { Outlet } from 'react-router-dom';
import NavBar from "../../components/NavBar";
import './DashboardContent.css';

function DashboardLayout() {
  return (
    <>
      <NavBar />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
}

export default DashboardLayout;
