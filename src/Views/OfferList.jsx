import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OffreListManager.css";

const OffreList = () => {
  const [offres, setOffres] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer societeId depuis location.state ou localStorage
  const rawSocieteId = location.state?.societeId || localStorage.getItem("SocieteId");
  const societeId = parseInt(rawSocieteId, 10); // Assure qu'on a bien un number

  useEffect(() => {
    console.log("SocieteId from location.state:", location.state?.societeId);
    console.log("SocieteId from localStorage:", localStorage.getItem("SocieteId"));
    console.log("Using SocieteId:", societeId);

    if (!societeId || isNaN(societeId)) {
      console.log("No valid SocieteId found, redirecting to login...");
      setMessage("Veuillez vous connecter pour voir les offres.");
      navigate("/loginsoc", { state: { from: location.pathname } });
    }
  }, [societeId, navigate, location]);

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setMessage(location.state.successMessage);
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }

    if (societeId && !isNaN(societeId)) {
      fetchOffres();
    }
  }, [location, societeId]);

  const fetchOffres = async () => {
    console.log("fetchOffres started for SocieteId:", societeId);
    if (!societeId || isNaN(societeId)) {
      console.error("Invalid SocieteId:", societeId);
      setMessage("Erreur: ID de société invalide");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`https://localhost:7020/api/Offre/bysociete/${societeId}`);
      if (!response.ok) {
        throw new Error(`Erreur lors du chargement des offres: ${response.statusText}`);
      }
      const result = await response.json();
      console.log("Offres fetched:", result);
      const mappedOffres = result.map((offre) => ({
        id: offre.id ?? null,
        titre: offre.titre ?? "N/A",
        description: offre.description ?? "N/A",
        typeContrat: offre.typeContrat ?? "N/A",
        societeId: societeId,
        raisonSociale: offre.raisonSociale ?? "N/A",
        email: offre.email ?? "N/A",
        adresse: offre.adresse ?? "N/A",
        numTele: offre.numTele ?? "N/A",
        image: offre.image ?? "N/A",
        idSpecialite: offre.idSpecialite ?? null,
        nomSpecialite: offre.nomSpecialite ?? "N/A",
        nomDiscipline: offre.nomDiscipline ?? "N/A",
        isValid: offre.isValid ?? false,
        time: offre.time ?? "N/A",
      }));
      setOffres(mappedOffres);
      setMessage("");
    } catch (error) {
      console.error("Erreur dans fetchOffres:", error);
      setMessage(error.message || "Erreur lors de la récupération des offres");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      setMessage("Erreur: ID de l'offre non défini");
      return;
    }
    try {
      const response = await fetch(`https://localhost:7020/api/offre/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || "Offre supprimée avec succès !");
        fetchOffres();
      } else {
        setMessage(result.message || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l’offre:", error);
      setMessage(error.message || "Erreur lors de la suppression de l’offre");
    }
  };

  const handleEdit = (offre) => {
    navigate("/offre-edit", { state: { offreToEdit: offre, societeId } });
  };

  return (
    <div className="site-wrap">
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: "url('https://themewagon.github.io/jobboard/images/hero_1.jpg')" }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Liste des offres d'emploi</h1>
              <div className="custom-breadcrumbs">
                <a href="/">Accueil</a> <span className="mx-2 slash">/</span>
                <span className="text-white"><strong>Liste des offres</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-12">
              <h2 className="mb-4">Vos offres d'emploi</h2>
              {message && <p className="text-center text-success mt-3">{message}</p>}
              {loading && <p className="text-center">Chargement des offres...</p>}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Titre</th>
                      <th>Description</th>
                      <th>Type de contrat</th>
                      <th>Raison Sociale</th>
                      <th>Email</th>
                      <th>Spécialité</th>
                      <th>Discipline</th>
                      <th>Valide</th>
                      <th>Temps</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading && offres.length === 0 ? (
                      <tr>
                        <td colSpan="10" className="text-center">Aucune offre disponible</td>
                      </tr>
                    ) : (
                      offres.map((offre, index) => (
                        <tr key={offre.id || index}>
                          <td>{offre.titre}</td>
                          <td>{offre.description}</td>
                          <td>{offre.typeContrat}</td>
                          <td>{offre.raisonSociale}</td>
                          <td>{offre.email}</td>
                          <td>{offre.nomSpecialite}</td>
                          <td>{offre.nomDiscipline}</td>
                          <td>{offre.isValid ? "Oui" : "Non"}</td>
                          <td>{offre.time}</td>
                          <td>
                            <button
                              onClick={() => handleEdit(offre)}
                              className="btn btn-sm btn-warning mr-2"
                            >
                              <span className="icon-edit"></span> Modifier
                            </button>
                            <button
                              onClick={() => handleDelete(offre.id)}
                              className="btn btn-sm btn-danger"
                            >
                              <span className="icon-trash"></span> Supprimer
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OffreList;
