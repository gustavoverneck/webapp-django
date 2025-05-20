import React, { useEffect, useState } from "react";
import Spinner from '../../components/Spinner';
import "./DashboardContent.css";

export default function ChamadosPage() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    prioridade: "",
  });

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setChamados([
        {
          id: 1,
          titulo: "Erro no login",
          status: "Aberto",
          prioridade: "Alta",
          criado_em: "2024-06-01",
        },
        {
          id: 2,
          titulo: "Atualizar cadastro",
          status: "Fechado",
          prioridade: "Baixa",
          criado_em: "2024-06-02",
        },
      ]);
      setLoading(false);
    }, 900);
  }, []);

  function handleFilterChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  const filteredChamados = chamados.filter((c) => {
    const searchMatch =
      filters.search === "" ||
      c.titulo.toLowerCase().includes(filters.search.toLowerCase());
    const statusMatch =
      filters.status === "" || c.status === filters.status;
    const prioridadeMatch =
      filters.prioridade === "" || c.prioridade === filters.prioridade;
    return searchMatch && statusMatch && prioridadeMatch;
  });

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
                placeholder="Título do chamado"
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
                <option value="Aberto">Aberto</option>
                <option value="Fechado">Fechado</option>
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
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-title">Lista de Chamados</div>
          <div className="dashboard-table-container">
            {loading ? (
              <div>
                <Spinner />
                Carregando chamados...
              </div>
            ) : filteredChamados.length === 0 ? (
              <div className="dashboard-empty-message">
                Nenhum chamado encontrado.
              </div>
            ) : (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Status</th>
                    <th>Prioridade</th>
                    <th>Criado em</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChamados.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.titulo}</td>
                      <td>{c.status}</td>
                      <td>{c.prioridade}</td>
                      <td>{c.criado_em}</td>
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
