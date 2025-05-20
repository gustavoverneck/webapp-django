import React, { useEffect, useState } from "react";
import Spinner from '../../components/Spinner';
import "./DashboardContent.css";

export default function ConhecimentoPage() {
  const [artigos, setArtigos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    categoria: "",
  });

  useEffect(() => {
    setLoading(true);
    // Simula chamada de API
    setTimeout(() => {
      setArtigos([
        {
          id: 1,
          titulo: "Como redefinir sua senha",
          categoria: "Acesso",
          criado_em: "2024-06-01",
        },
        {
          id: 2,
          titulo: "Configuração de e-mail",
          categoria: "Configuração",
          criado_em: "2024-06-02",
        },
      ]);
      setLoading(false);
    }, 900);
  }, []);

  function handleFilterChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  const filteredArtigos = artigos.filter((a) => {
    const searchMatch =
      filters.search === "" ||
      a.titulo.toLowerCase().includes(filters.search.toLowerCase());
    const categoriaMatch =
      filters.categoria === "" || a.categoria === filters.categoria;
    return searchMatch && categoriaMatch;
  });

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Base de Conhecimento</h1>

      <section className="dashboard-section">
        <div className="dashboard-section-title">Filtros</div>
        <div className="dashboard-filters-grid">
          <div className="dashboard-filter-field">
            <label htmlFor="search">Buscar</label>
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Título do artigo"
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
              <option value="Acesso">Acesso</option>
              <option value="Configuração">Configuração</option>
            </select>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-title">Lista de Artigos</div>
        <div className="dashboard-table-container">
          {loading ? (
            <div>
              <Spinner /> Carregando artigos...
            </div>
          ) : filteredArtigos.length === 0 ? (
            <div className="dashboard-empty-message">
              Nenhum artigo encontrado.
            </div>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Categoria</th>
                  <th>Criado em</th>
                </tr>
              </thead>
              <tbody>
                {filteredArtigos.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.titulo}</td>
                    <td>{a.categoria}</td>
                    <td>{a.criado_em}</td>
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