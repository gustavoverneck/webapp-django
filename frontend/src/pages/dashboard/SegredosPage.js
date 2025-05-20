import React, { useEffect, useState } from "react";
import Spinner from '../../components/Spinner';
import "./DashboardContent.css";

export default function SegredosPage() {
  const [segredos, setSegredos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    categoria: "",
    nivel: "",
  });

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSegredos([
        {
          id: 1,
          titulo: "Senha do servidor",
          categoria: "TI",
          nivel: "Alto",
          criado_em: "2024-06-01",
        },
        {
          id: 2,
          titulo: "Chave API",
          categoria: "Desenvolvimento",
          nivel: "Médio",
          criado_em: "2024-06-02",
        },
      ]);
      setLoading(false);
    }, 900);
  }, []);

  function handleFilterChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  const filteredSegredos = segredos.filter((s) => {
    const searchMatch =
      filters.search === "" ||
      s.titulo.toLowerCase().includes(filters.search.toLowerCase());
    const categoriaMatch =
      filters.categoria === "" || s.categoria === filters.categoria;
    const nivelMatch =
      filters.nivel === "" || s.nivel === filters.nivel;
    return searchMatch && categoriaMatch && nivelMatch;
  });

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Gerenciador de Segredos</h1>

      <section className="dashboard-section">
        <div className="dashboard-section-title">Filtros</div>
        <div className="dashboard-filters-grid">
          <div className="dashboard-filter-field">
            <label htmlFor="search">Buscar</label>
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Título do segredo"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
          <div className="dashboard-filter-field">
            <label htmlFor="categoria">Categoria</label>
            <select
              id="categoria"
              name="categoria"
              value={filters.categoria}
              onChange={handleFilterChange}
            >
              <option value="">Todas</option>
              <option value="TI">TI</option>
              <option value="Desenvolvimento">Desenvolvimento</option>
            </select>
          </div>
          <div className="dashboard-filter-field">
            <label htmlFor="nivel">Nível</label>
            <select
              id="nivel"
              name="nivel"
              value={filters.nivel}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="Alto">Alto</option>
              <option value="Médio">Médio</option>
              <option value="Baixo">Baixo</option>
            </select>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-title">Lista de Segredos</div>
        <div className="dashboard-table-container">
          {loading ? (
            <div>
              <Spinner /> Carregando segredos...
            </div>
          ) : filteredSegredos.length === 0 ? (
            <div className="dashboard-empty-message">
              Nenhum segredo encontrado.
            </div>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Categoria</th>
                  <th>Nível</th>
                  <th>Criado em</th>
                </tr>
              </thead>
              <tbody>
                {filteredSegredos.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.titulo}</td>
                    <td>{s.categoria}</td>
                    <td>{s.nivel}</td>
                    <td>{s.criado_em}</td>
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
