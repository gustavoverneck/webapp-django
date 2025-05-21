import React, { useEffect, useState, useContext } from "react";
import AuthContext from '../../context/AuthContext';
import Spinner from '../../components/Spinner';
import "./DashboardContent.css";

export default function PerfilPage() {
  const { user, authTokens } = useContext(AuthContext);
  const [perfil, setPerfil] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  const [perfilOriginal, setPerfilOriginal] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    setLoading(true);
    if (user) {
      const original = {
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
      };
      setPerfil(original);
      setPerfilOriginal(original);
    }
    setLoading(false);
  }, [user]);

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
    setLoading(true);
    setTimeout(() => {
      setPerfil(perfilOriginal);
      setLoading(false);
    }, 400);
  }

  function handleSalvar(e) {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    const payload = {
      first_name: perfil.first_name,
      last_name: perfil.last_name,
      email: perfil.email,
      phone_number: perfil.phone_number,
    };

    fetch("http://localhost:8000/api/perfil/", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authTokens?.access}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");

        if (!res.ok) {
          if (contentType && contentType.includes("application/json")) {
            const error = await res.json();
            throw new Error(error.detail || "Erro ao atualizar perfil");
          } else {
            throw new Error("Erro inesperado do servidor");
          }
        }

        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          throw new Error("Resposta inesperada do servidor");
        }
      })
      .then((data) => {
        setEditando(false);
        setPerfilOriginal(perfil);
        setMensagem("Perfil atualizado com sucesso!");
        if (typeof data === "object") {
          if (user) {
            Object.assign(user, payload);
          }
        }
      })
      .catch((err) => {
        setMensagem(err.message || "Erro ao atualizar perfil");
      })
      .finally(() => setLoading(false));
  }

  function houveAlteracao() {
    return (
      perfil.first_name !== perfilOriginal.first_name ||
      perfil.last_name !== perfilOriginal.last_name ||
      perfil.email !== perfilOriginal.email ||
      perfil.phone_number !== perfilOriginal.phone_number
    );
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
                  <label htmlFor="first_name">Nome</label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={perfil.first_name}
                    onChange={handleChange}
                    disabled={!editando}
                    required
                  />
                </div>
                <div className="dashboard-form-field">
                  <label htmlFor="last_name">Sobrenome</label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={perfil.last_name}
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
                  <label htmlFor="phone_number">Telefone</label>
                  <input
                    id="phone_number"
                    name="phone_number"
                    type="text"
                    value={perfil.phone_number}
                    onChange={handleChange}
                    disabled={!editando}
                  />
                </div>
              </div>
              <div className="dashboard-form-actions">
                {editando ? (
                  <>
                    <button
                      type="submit"
                      className="dashboard-btn dashboard-btn-primary"
                      disabled={!houveAlteracao()}
                    >
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
