import React, { useEffect, useState } from "react";
import Layout from "./layout";

const Specialite = () => {
  const [specialites, setSpecialites] = useState([]);
  const [form, setForm] = useState({ nom: "", disciplineId: 1 });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null); // Pour afficher une erreur si l'API échoue

  const fetchSpecialites = async () => {
    try {
      const res = await fetch("https://localhost:7020/api/Specialite");


      if (!res.ok) {
        throw new Error(`Erreur API: ${res.status}`);
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setSpecialites(data);
        setError(null); // Réinitialise l'erreur si tout va bien
      } else {
        throw new Error("La réponse n'est pas un tableau.");
      }
    } catch (err) {
      console.error("Erreur lors du chargement des spécialités:", err);
      setSpecialites([]);
      setError("Impossible de charger les spécialités.");
    }
  };

  const handleAdd = async () => {
    await fetch("https://localhost:7020/api/Specialite/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    fetchSpecialites();
  };

  const handleUpdate = async () => {
    await fetch(`https://localhost:7020/api/Specialite/update/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    fetchSpecialites();
    setEditId(null);
  };

  const handleDelete = async (id) => {
    await fetch(`https://localhost:7020/api/Specialite/delete/${id}`, {
      method: "DELETE",
    });
    fetchSpecialites();
  };

  useEffect(() => {
    fetchSpecialites();
  }, []);

  return (
    <Layout>
      <div className="container mt-5">
        <h2>Gestion des Spécialités</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <button
          className="btn btn-success mb-3"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        >
          Ajouter une spécialité
        </button>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nom</th>
              <th>ID Discipline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(specialites) &&
              specialites.map((s) => (
                <tr key={s.specialiteId}>
                  <td>{s.nom}</td>
                  <td>{s.disciplineId}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => {
                        setForm({ nom: s.nom, disciplineId: s.disciplineId });
                        setEditId(s.specialiteId);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(s.specialiteId)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Modal Add */}
        <div className="modal fade" id="addModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAdd();
                }}
              >
                <div className="modal-header">
                  <h5 className="modal-title">Ajouter une spécialité</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom"
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <button className="btn btn-success" type="submit">
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Modal Edit */}
        <div className="modal fade" id="editModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
              >
                <div className="modal-header">
                  <h5 className="modal-title">Modifier la spécialité</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <button className="btn btn-info" type="submit">
                    Modifier
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Specialite;