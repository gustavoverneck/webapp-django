import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import "./ChamadoDetailPage.css";

export default function ChamadoDetailPage() {
    const { id } = useParams();
    const { authTokens, logoutUser } = useContext(AuthContext);
    const [mensagens, setMensagens] = useState([]);
    const [novaMensagem, setNovaMensagem] = useState('');
    const [loadingChamado, setLoadingChamado] = useState(true);
    const [loadingMensagens, setLoadingMensagens] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [horasEstimadas, setHorasEstimadas] = useState('');
    const [horasGastas, setHorasGastas] = useState('');
    const [novoStatus, setNovoStatus] = useState('');
    const [chamado, setChamado] = useState(null);

    useEffect(() => {
    const fetchChamado = async () => {
        setLoadingChamado(true);
        try {
        const response = await fetch(`http://localhost:8000/api/chamados/${id}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens?.access}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setChamado(data);
        } else {
            console.error('Erro ao buscar chamado:', response.status);
        }
        } catch (error) {
        console.error('Erro ao buscar chamado:', error);
        } finally {
        setLoadingChamado(false);
        }
    };

    fetchChamado();
    }, [id]);

    useEffect(() => {
    fetchMensagens();
    }, [id]);

    const fetchMensagens = async () => {
        try {
            setLoadingMensagens(true);
            const response = await fetch(`http://localhost:8000/api/mensagens/?chamado=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authTokens?.access}`,
            },
            });

            if (response.ok) {
            const data = await response.json();
            setMensagens(Array.isArray(data) ? data : data.mensagens || []);
            } else if (response.status === 401) {
            alert('Sessão expirada. Faça login novamente.');
            logoutUser();
            }
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
        } finally {
            setLoadingMensagens(false);
        }
        };

    const handleEnviarMensagem = async () => {
    if (!novaMensagem.trim()) return;

    setEnviando(true);
    try {
        const response = await fetch(`http://localhost:8000/api/mensagens/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens?.access}`,
        },
        body: JSON.stringify({
            conteudo: novaMensagem,
            chamado: id,
            horas_estimadas: horasEstimadas || null,
            horas_gastas: horasGastas || null,
            novo_status: novoStatus || null,
            }),
        });

        if (response.ok) {
        setNovaMensagem('');
        fetchMensagens(); // Atualiza lista após envio
        } else {
        alert('Erro ao enviar mensagem');
        }
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    } finally {
        setEnviando(false);
    }
    };

return (
    <div className="dashboard-container">
        <h1 className="dashboard-title">Chamado #{id}</h1>

        {loadingChamado ? (
            <Spinner />
        ) : (
            <div className="dashboard-detail-grid">
            {/* Esquerda: informações do chamado */}
            <div className="dashboard-detail-left">
                <div className="dashboard-section">
                    <h2 className="dashboard-section-title">Informações do Chamado</h2>
                    <div className="dashboard-info-grid">
                        <div className="dashboard-info-card">
                            <div className="dashboard-info-label">Título</div>
                            <div className="dashboard-info-value" style={{ fontSize: '1rem' }}>{chamado?.titulo || '—'}</div>
                        </div>
                        <div className="dashboard-info-card">
                            <div className="dashboard-info-label">Cliente</div>
                            <div className="dashboard-info-value" style={{ fontSize: '1rem' }}>{chamado?.cliente?.nome || '—'}</div>
                        </div>
                        <div className="dashboard-info-card">
                            <div className="dashboard-info-label">Status</div>
                            <div className="dashboard-info-value" style={{ fontSize: '1rem' }}>{chamado?.status || '—'}</div>
                        </div>
                        <div className="dashboard-info-card">
                            <div className="dashboard-info-label">Prioridade</div>
                            <div className="dashboard-info-value" style={{ fontSize: '1rem' }}>{chamado?.prioridade || '—'}</div>
                        </div>
                        <div className="dashboard-info-card">
                            <div className="dashboard-info-label">Tipo</div>
                            <div className="dashboard-info-value" style={{ fontSize: '1rem' }}>{chamado?.tipo || '—'}</div>
                        </div>
                        <div className="dashboard-info-card">
                            <div className="dashboard-info-label">Criado em</div>
                            <div className="dashboard-info-value" style={{ fontSize: '1rem' }}>
                                {chamado?.data_criacao ? new Date(chamado.data_criacao).toLocaleString() : '—'}
                            </div>
                        </div>
                        <div className="dashboard-info-card">
                            <div className="dashboard-info-label">Horas Estimadas</div>
                            <div className="dashboard-info-value" style={{ fontSize: '1rem' }}>
                                {chamado?.horas_estimadas ?? '—'}
                            </div>
                        </div>
                        <div className="dashboard-info-card">
                            <div className="dashboard-info-label">Horas Gastas</div>
                            <div className="dashboard-info-value" style={{ fontSize: '1rem' }}>
                                {chamado?.horas_gastas ?? '—'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Direita: nova mensagem + mensagens */}
            <div className="dashboard-detail-right">
                <div className="dashboard-section">
                    <h3 className="dashboard-section-title">Adicionar nova mensagem</h3>
                    <textarea
                        rows="4"
                        value={novaMensagem}
                        onChange={(e) => setNovaMensagem(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        style={{ width: '100%', padding: '8px' }}
                    />
                    <div className="dashboard-filters-grid" style={{ marginTop: '1rem' }}>
                        <div className="dashboard-filter-field">
                            <label>Horas Estimadas</label>
                            <input
                                type="number"
                                value={horasEstimadas}
                                onChange={(e) => setHorasEstimadas(e.target.value)}
                                placeholder="Ex: 10"
                            />
                        </div>
                        <div className="dashboard-filter-field">
                            <label>Horas Gastas</label>
                            <input
                                type="number"
                                value={horasGastas}
                                onChange={(e) => setHorasGastas(e.target.value)}
                                placeholder="Ex: 8"
                            />
                        </div>
                        <div className="dashboard-filter-field">
                            <label>Status</label>
                            <select
                                value={novoStatus}
                                onChange={(e) => setNovoStatus(e.target.value)}
                            >
                                <option value="">Selecione</option>
                                <option value="aberto">Aberto</option>
                                <option value="em_andamento">Em andamento</option>
                                <option value="concluido">Concluído</option>
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={handleEnviarMensagem}
                        disabled={enviando}
                        className="dashboard-btn"
                        style={{ marginTop: '8px' }}
                    >
                        {enviando ? 'Enviando...' : 'Adicionar Mensagem'}
                    </button>
                </div>
                {/* Lista de mensagens */}
                <div className="dashboard-section" style={{ marginTop: '2rem' }}>
                    <h3 className="dashboard-section-title">Mensagens</h3>
                    {loadingMensagens ? (
                        <Spinner />
                    ) : (
                        <div className="dashboard-messages-list">
                            {mensagens.length === 0 ? (
                                <div style={{ color: '#888' }}>Nenhuma mensagem ainda.</div>
                            ) : (
                                <ul className="mensagens-list">
                                {mensagens.map((msg) => (
                                    <li key={msg.id} className="dashboard-message-card">
                                    <div className="dashboard-message-header">
                                        <span className="dashboard-message-user">{msg.autor?.full_name || 'Usuário'}</span>
                                        <span className="dashboard-message-date">
                                        {msg.data_criacao ? new Date(msg.data_criacao).toLocaleString() : ''}
                                        </span>
                                    </div>
                                    <div className="dashboard-message-content">{msg.conteudo}</div>
                                    {(msg.horas_estimadas || msg.horas_gastas || msg.novo_status) && (
                                        <div className="dashboard-message-meta">
                                        {msg.horas_estimadas && <span>Horas Estimadas: {msg.horas_estimadas}</span>}
                                        {msg.horas_gastas && <span>Horas Gastas: {msg.horas_gastas}</span>}
                                        {msg.novo_status && <span>Status: {msg.novo_status}</span>}
                                        </div>
                                    )}
                                    </li>
                                ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )}
</div>
);
}
