import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OffreListManager.css";

const OffreListManager = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Récupérer societeId depuis location.state ou localStorage
  const societeIdFromState = location.state?.societeId;
  const societeIdFromStorage = localStorage.getItem("SocieteId");
  const societeId = societeIdFromState || societeIdFromStorage;

  const [formData, setFormData] = useState({
    id: null,
    titre: "",
    description: "",
    typeContrat: "",
    societeId: societeId || "",
    idSpecialite: "",
    time: "",
  });

  const [specialites, setSpecialites] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!societeId) {
      setMessage("Veuillez vous connecter pour gérer les offres.");
      navigate("/loginsoc", { state: { from: location.pathname } });
    }
  }, [societeId, navigate, location]);

  useEffect(() => {
    fetch("https://localhost:7020/api/Specialite")
      .then((res) => res.json())
      .then((data) => setSpecialites(data))
      .catch(() => setMessage("Erreur lors du chargement des spécialités."));
  }, []);

  useEffect(() => {
    if (location.state?.offreToEdit) {
      const { offreToEdit } = location.state;
      setFormData({
        id: offreToEdit.id,
        titre: offreToEdit.titre,
        description: offreToEdit.description,
        typeContrat: offreToEdit.typeContrat,
        societeId: societeId || offreToEdit.societeId,
        idSpecialite: offreToEdit.idSpecialite,
        time: offreToEdit.time,
      });
    }
  }, [location, societeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        titre: formData.titre,
        description: formData.description,
        typeContrat: formData.typeContrat,
        societeId: parseInt(formData.societeId),
        idSpecialite: parseInt(formData.idSpecialite),
        time: formData.time,
        isValid: true,
      };

      // Validation
      if (
        !payload.titre ||
        !payload.description ||
        !payload.typeContrat ||
        !payload.time
      ) {
        setMessage("Veuillez remplir tous les champs obligatoires.");
        setIsLoading(false);
        return;
      }
      if (
        !formData.idSpecialite ||
        isNaN(payload.societeId) ||
        isNaN(payload.idSpecialite)
      ) {
        setMessage("Veuillez sélectionner une spécialité valide.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        "https://localhost:7020/api/Offre/AddOffre",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok) {
        navigate("/offre-list", {
          state: { successMessage: "Offre créée avec succès !" },
        });
      } else {
        setMessage(result.message || "Erreur lors de la création de l’offre.");
      }
    } catch (error) {
      setMessage("Erreur réseau ou serveur indisponible.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.id) {
      setMessage("Aucune offre sélectionnée pour la mise à jour");
      return;
    }
    try {
      const response = await fetch(`https://localhost:7020/api/offre/update/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titre: formData.titre,
          description: formData.description,
          typeContrat: formData.typeContrat,
          societeId: parseInt(formData.societeId),
          idSpecialite: parseInt(formData.idSpecialite),
          time: formData.time,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("Offre mise à jour avec succès !");
        resetForm();
        navigate("/offre-list"); // Rediriger après mise à jour
      } else {
        setMessage(result.message || "Erreur lors de la mise à jour");
      }
    } catch (error) {
      setMessage("Erreur réseau");
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      titre: "",
      description: "",
      typeContrat: "",
      societeId: societeId || "",
      idSpecialite: "",
      time: "",
    });
    setMessage("");
  };

  return (
    <div className="site-wrap">
      <section
        className="section-hero overlay inner-page bg-image"
        style={{
          backgroundImage:
            "url('https://themewagon.github.io/jobboard/images/hero_1.jpg')",
        }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Gérer les offres</h1>
              <div className="custom-breadcrumbs">
                <a href="/">Accueil</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Gestion des offres</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-12 mb-4 mb-lg-0">
              <h2>
                {formData.id
                  ? "Modifier une offre"
                  : "Publier une nouvelle offre"}
              </h2>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-lg-12">
              <form
                className="p-4 p-md-5 border rounded"
                onSubmit={handleCreate}
              >
                <h3 className="text-black mb-5 border-bottom pb-2">
                  Détails de l’offre
                </h3>

                <input
                  type="hidden"
                  name="societeId"
                  value={formData.societeId}
                />

                <div className="form-group">
                  <label htmlFor="titre">Titre de l'offre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titre"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="typeContrat">Type de contrat</label>
                  <select
                    className="form-control"
                    id="typeContrat"
                    name="typeContrat"
                    value={formData.typeContrat}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="CIVP">CIVP</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="idSpecialite">Spécialité</label>
                  <select
                    className="form-control"
                    id="idSpecialite"
                    name="idSpecialite"
                    value={formData.idSpecialite}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez une spécialité</option>
                    {specialites.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="time">Temps de travail</label>
                  <select
                    className="form-control"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez un temps</option>
                    <option value="Temps plein">Temps plein</option>
                    <option value="Temps partiel">Temps partiel</option>
                  </select>
                </div>

                {message && (
                  <p className="text-danger text-center mt-3">{message}</p>
                )}

                <div className="d-flex justify-content-end mt-4">
                  <button
                    type="button"
                    className="btn btn-light btn-md mr-2"
                    onClick={resetForm}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="btn btn-success btn-md"
                    onClick={formData.id ? handleUpdate : handleCreate}
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OffreListManager;
