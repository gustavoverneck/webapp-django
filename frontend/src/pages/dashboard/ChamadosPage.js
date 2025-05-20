import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import "./DashboardContent.css";
import AuthContext from '../../context/AuthContext';

export default function ChamadosPage() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    prioridade: "",
  });

  const navigate = useNavigate();
  const { authTokens, logoutUser } = useContext(AuthContext);

  const fetchChamados = async () => {
    setLoading(true);
    let query = new URLSearchParams();

    if (filters.search) query.append('search', filters.search);
    if (filters.status) query.append('status', filters.status);
    if (filters.prioridade) query.append('prioridade', filters.prioridade);

    try {
      const response = await fetch(`http://localhost:8000/api/chamados/?${query.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens?.access}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setChamados(data);
      } else if (response.status === 401) {
        alert('Sessão expirada. Faça login novamente.');
        logoutUser();
      }
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
    }

    setLoading(false);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Lista de campos a serem exibidos na tabela
  const fields = [
    'id', 'projeto', 'tipo_chamado', 'user_abertura', 'descricao',
    'modulo', 'status', 'data_abertura', 'data_atualizacao',
    'recurso_alocado', 'horas_estimadas', 'horas_aprovadas',
    'horas_gastas', 'gerente', 'alterado_por',
    'segmento', 'data_aprovacao_horas', 'tipo_contrato'
  ];

  // Mapeamento de nomes amigáveis para os campos
  const fieldLabels = {
    id: 'ID',
    projeto: 'Projeto',
    tipo_chamado: 'Tipo',
    user_abertura: 'Usuário Abertura',
    descricao: 'Descrição',
    modulo: 'Módulo',
    status: 'Status',
    data_abertura: 'Data Abertura',
    data_atualizacao: 'Data Atualização',
    recurso_alocado: 'Recurso Alocado',
    horas_estimadas: 'Horas Est.',
    horas_aprovadas: 'Horas Aprov.',
    horas_gastas: 'Horas Gastas',
    gerente: 'Gerente',
    alterado_por: 'Alterado Por',
    segmento: 'Segmento',
    data_aprovacao_horas: 'Data Aprovação Horas',
    tipo_contrato: 'Tipo Contrato'
  };

  // Função para formatação de datas
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString();
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Administrar Chamados</h1>

      <section className="dashboard-section">
        <div className="dashboard-section-title">Filtros</div>
        <div className="dashboard-filters-grid">
          <div className="dashboard-filter-field">
            <label htmlFor="search">Buscar</label>
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Descrição"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
          <div className="dashboard-filter-field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="ABERTO">Aberto</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="CONCLUIDO">Concluído</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>
          <div className="dashboard-filter-field">
            <label htmlFor="prioridade">Prioridade</label>
            <select
              id="prioridade"
              name="prioridade"
              value={filters.prioridade}
              onChange={handleFilterChange}
            >
              <option value="">Todas</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>
        </div>
        <button onClick={fetchChamados} className="dashboard-button">
          Buscar
        </button>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-title">Lista de Chamados</div>
        <div className="dashboard-table-container">
          {loading ? (
            <div>
              <Spinner />
              Carregando chamados...
            </div>
          ) : chamados.length === 0 ? (
            <div className="dashboard-empty-message">
              Nenhum chamado encontrado.
            </div>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr>
                  {fields.map((field) => (
                    <th key={field}>{fieldLabels[field] || field}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chamados.map((c) => (
                  <tr
                    key={c.id}
                    className="dashboard-chamado-table-row-clickable"
                    onClick={() => navigate(`/dashboard/chamados/${c.id}/detalhes`)}
                  >
                    {fields.map((field) => {
                      let value = c[field];
                      // Formatar datas
                      if (
                        field === 'data_abertura' ||
                        field === 'data_atualizacao' ||
                        field === 'data_aprovacao_horas'
                      ) {
                        value = formatDate(value);
                      }
                      // Exibir nome do usuário se for objeto
                      if (
                        (field === 'user_abertura' ||
                          field === 'recurso_alocado' ||
                          field === 'gerente' ||
                          field === 'alterado_por') &&
                        value &&
                        typeof value === 'object'
                      ) {
                        value = value.username || value.nome || value.email || '';
                      }
                      // Exibir nome do projeto se for objeto
                      if (field === 'projeto' && value && typeof value === 'object') {
                        value = value.nome || value.titulo || value.id || '';
                      }
                      // Exibir nome do segmento se for objeto
                      if (field === 'segmento' && value && typeof value === 'object') {
                        value = value.nome || value.id || '';
                      }
                      return <td key={field}>{value !== undefined && value !== null ? value : ''}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
