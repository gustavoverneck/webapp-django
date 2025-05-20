import React, { useEffect, useState } from "react";
import Spinner from '../../components/Spinner';
import "./DashboardContent.css";

export default function PerfilPage() {
  const [perfil, setPerfil] = useState({
    nome: "",
    email: "",
    telefone: "",
  });
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    setLoading(true);
    // Simula chamada à API para buscar dados do perfil
    setTimeout(() => {
      setPerfil({
        nome: "João Fulano",
        email: "joaofulano10@email.com",
        telefone: "(27) 99999-9999",
      });
      setLoading(false);
    }, 900);
  }, []);

  function handleChange(e) {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  }

  function handleEditar() {
    setEditando(true);
    setMensagem("");
  }

  function handleCancelar() {
    setEditando(false);
    setMensagem("");
    // Simula recarregar dados originais
    setLoading(true);
    setTimeout(() => {
      setPerfil({
        nome: "João Fulano",
        email: "joaofulano10@email.com",
        telefone: "(27) 99999-9999",
      });
      setLoading(false);
    }, 400);
  }

  function handleSalvar(e) {
    e.preventDefault();
    setLoading(true);
    // Simula salvar na API
    setTimeout(() => {
      setEditando(false);
      setLoading(false);
      setMensagem("Perfil atualizado com sucesso!");
    }, 800);
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Meu Perfil</h1>
      <section className="dashboard-section">
        <div className="dashboard-section-title">Informações do Usuário</div>
        <div className="dashboard-table-container">
          {loading ? (
            <div>
              <Spinner /> Carregando perfil...
            </div>
          ) : (
            <form className="dashboard-form" onSubmit={handleSalvar}>
              <div className="dashboard-form-grid">
                <div className="dashboard-form-field">
                  <label htmlFor="nome">Nome</label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    value={perfil.nome}
                    onChange={handleChange}
                    disabled={!editando}
                    required
                  />
                </div>
                <div className="dashboard-form-field">
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={perfil.email}
                    onChange={handleChange}
                    disabled={!editando}
                    required
                  />
                </div>
                <div className="dashboard-form-field">
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    id="telefone"
                    name="telefone"
                    type="text"
                    value={perfil.telefone}
                    onChange={handleChange}
                    disabled={!editando}
                  />
                </div>
              </div>
              <div className="dashboard-form-actions">
                {editando ? (
                  <>
                    <button type="submit" className="dashboard-btn dashboard-btn-primary">
                      Salvar
                    </button>
                    <button
                      type="button"
                      className="dashboard-btn"
                      onClick={handleCancelar}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="dashboard-btn dashboard-btn-primary"
                    onClick={handleEditar}
                  >
                    Editar Perfil
                  </button>
                )}
              </div>
              {mensagem && (
                <div className="dashboard-success-message">{mensagem}</div>
              )}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}