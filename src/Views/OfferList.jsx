import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OffreListManager.css";

const OffreList = () => {
  const [offres, setOffres] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setMessage(location.state.successMessage);
      // Effacer le message après 5 secondes
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
    fetchOffres();
  }, [location]);

  const fetchOffres = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://localhost:7020/api/offre/all");
      if (!response.ok) {
        throw new Error(`Erreur lors du chargement des offres: ${response.statusText}`);
      }
      const result = await response.json();
      const mappedOffres = result.map(offre => ({
        id: offre.id ?? null,
        titre: offre.titre ?? "N/A",
        description: offre.description ?? "N/A",
        typeContrat: offre.typeContrat ?? "N/A",
        societeId: offre.societeId ?? null,
        idSpecialite: offre.idSpecialite ?? null,
        isValid: offre.isValid ?? false,
        time: offre.time ?? "N/A",
      }));
      setOffres(mappedOffres);
      setMessage("");
    } catch (error) {
      setMessage(error.message || "Erreur réseau");
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
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || "Offre supprimée avec succès !");
        fetchOffres();
      } else {
        setMessage(result.message || "Erreur lors de la suppression");
      }
    } catch (error) {
      setMessage("Erreur réseau");
    }
  };

  const handleEdit = (offre) => {
    navigate("/offre-list-manager", { state: { offreToEdit: offre } });
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
              <h1 className="text-white font-weight-bold">List of Job Offers</h1>
              <div className="custom-breadcrumbs">
                <a href="/">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white"><strong>Offer List</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-12">
              <h2 className="mb-4">All Job Offers</h2>
              {message && <p className="text-center text-success mt-3">{message}</p>}
              {loading && <p className="text-center">Loading offers...</p>}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Contract Type</th>
                      <th>Company ID</th>
                      <th>Specialty ID</th>
                      <th>Valid</th>
                      <th>Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading && offres.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center">No offers available</td>
                      </tr>
                    ) : (
                      offres.map((offre, index) => (
                        <tr key={offre.id || index}>
                          <td>{offre.titre}</td>
                          <td>{offre.description}</td>
                          <td>{offre.typeContrat}</td>
                          <td>{offre.societeId ?? "N/A"}</td>
                          <td>{offre.idSpecialite ?? "N/A"}</td>
                          <td>{offre.isValid ? "Yes" : "No"}</td>
                          <td>{offre.time}</td>
                          <td>
                            <button
                              onClick={() => handleEdit(offre)}
                              className="btn btn-sm btn-warning mr-2"
                            >
                              <span className="icon-edit"></span> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(offre.id)}
                              className="btn btn-sm btn-danger"
                            >
                              <span className="icon-trash"></span> Delete
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