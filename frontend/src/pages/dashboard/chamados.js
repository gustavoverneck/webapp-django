import { useContext } from 'react';
import NavBar from "../../components/NavBar";
import AuthContext from '../../context/AuthContext';

function Chamados() {
    const {user, logoutUser } = useContext(AuthContext);

    return (
        <div className="dashboard">
            <NavBar />
            <div className="dashboard-content">
                <h1>Chamados</h1>
            </div>
        </div>
    );
}

export default Dashboard;