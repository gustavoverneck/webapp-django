import React, { useEffect, useState, useContext } from "react";
import Spinner from '../../components/Spinner';
import AuthContext from '../../context/AuthContext';
import "./DashboardContent.css";

export default function DashboardHomePage() {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        setLoading(true);
        // Simula chamada de API para informações gerais
        setTimeout(() => {
            setInfo({
                totalChamados: 42,
                abertos: 10,
                fechados: 32,
                usuarios: 8,
                mediaTempoResolucao: "2d 4h",
            });
            setLoading(false);
        }, 900);
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Olá, {user?.first_name}!</h1>
            <section className="dashboard-section">
                <div className="dashboard-section-title">Informações Gerais</div>
                {loading ? (
                    <div>
                        <Spinner /> Carregando informações...
                    </div>
                ) : (
                    <div className="dashboard-info-grid">
                        <div className="dashboard-info-card">
                            <div className="dashboard-info-label">Total de Chamados</div>
                            <div className="dashboard-info-value">{info.totalChamados}</div>
                        </div>
                        <div className="dashboard-info-card">
                            <div className="dashboard-info-label">Abertos</div>
                            <div className="dashboard-info-value">{info.abertos}</div>
                        </div>
                        <div className="dashboard-info-card">
                            <div className="dashboard-info-label">Fechados</div>
                            <div className="dashboard-info-value">{info.fechados}</div>
                        </div>
                        <div className="dashboard-info-card">
                            <div className="dashboard-info-label">Usuários</div>
                            <div className="dashboard-info-value">{info.usuarios}</div>
                        </div>
                        <div className="dashboard-info-card">
                            <div className="dashboard-info-label">Média de Resolução</div>
                            <div className="dashboard-info-value">{info.mediaTempoResolucao}</div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}