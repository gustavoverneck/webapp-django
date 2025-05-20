import React, { useEffect, useState } from "react";
import Spinner from '../../components/Spinner';
import "./DashboardContent.css";

export default function TimeSheetPage() {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    projeto: "",
  });

  useEffect(() => {
    setLoading(true);
    // Simula chamada de API
    setTimeout(() => {
      setTimesheets([
        {
          id: 1,
          descricao: "Desenvolvimento de feature X",
          status: "Pendente",
          projeto: "WebApp",
          data: "2024-06-01",
          horas: 4,
        },
        {
          id: 2,
          descricao: "Correção de bug Y",
          status: "Aprovado",
          projeto: "API",
          data: "2024-06-02",
          horas: 2,
        },
      ]);
      setLoading(false);
    }, 900);
  }, []);

  function handleFilterChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  const filteredTimesheets = timesheets.filter((t) => {
    const searchMatch =
      filters.search === "" ||
      t.descricao.toLowerCase().includes(filters.search.toLowerCase());
    const statusMatch =
      filters.status === "" || t.status === filters.status;
    const projetoMatch =
      filters.projeto === "" || t.projeto === filters.projeto;
    return searchMatch && statusMatch && projetoMatch;
  });

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Timesheet</h1>

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
              <option value="Pendente">Pendente</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Rejeitado">Rejeitado</option>
            </select>
          </div>
          <div className="dashboard-filter-field">
            <label htmlFor="projeto">Projeto</label>
            <select
              id="projeto"
              name="projeto"
              value={filters.projeto}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="WebApp">WebApp</option>
              <option value="API">API</option>
            </select>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-title">Lista de Timesheets</div>
        <div className="dashboard-table-container">
          {loading ? (
            <div>
              <Spinner /> Carregando timesheets...
            </div>
          ) : filteredTimesheets.length === 0 ? (
            <div className="dashboard-empty-message">
              Nenhum timesheet encontrado.
            </div>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descrição</th>
                  <th>Status</th>
                  <th>Projeto</th>
                  <th>Data</th>
                  <th>Horas</th>
                </tr>
              </thead>
              <tbody>
                {filteredTimesheets.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.descricao}</td>
                    <td>{t.status}</td>
                    <td>{t.projeto}</td>
                    <td>{t.data}</td>
                    <td>{t.horas}</td>
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
