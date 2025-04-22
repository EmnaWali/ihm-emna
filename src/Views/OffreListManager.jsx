import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OffreListManager.css";

const OffreListManager = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: null,
    titre: "",
    description: "",
    typeContrat: "",
    societeId: "",
    idSpecialite: "",
    time: "",
  });
  const [offres, setOffres] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.offreToEdit) {
      const { offreToEdit } = location.state;
      setFormData({
        id: offreToEdit.id,
        titre: offreToEdit.titre,
        description: offreToEdit.description,
        typeContrat: offreToEdit.typeContrat,
        societeId: offreToEdit.societeId,
        idSpecialite: offreToEdit.idSpecialite,
        time: offreToEdit.time,
      });
    }
    fetchOffres();
  }, [location]);

  const fetchOffres = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://localhost:7020/api/offre/list");
      const result = await response.json();
      if (response.ok) {
        setOffres(result);
        setMessage("");
      } else {
        setMessage("Erreur lors du chargement des offres");
      }
    } catch (error) {
      setMessage("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7020/api/offre/create", {
        method: "POST",
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
        setMessage("Offre créée avec succès !");
        resetForm();
        navigate("/offre-list"); // Rediriger vers la page OffreList
      } else {
        setMessage(result.message || "Erreur lors de la création");
      }
    } catch (error) {
      setMessage("Erreur réseau");
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://localhost:7020/api/offre/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("Offre supprimée avec succès !");
        fetchOffres();
      } else {
        setMessage(result.message || "Erreur lors de la suppression");
      }
    } catch (error) {
      setMessage("Erreur réseau");
    }
  };

  const handleEdit = (offre) => {
    setFormData({
      id: offre.id,
      titre: offre.titre,
      description: offre.description,
      typeContrat: offre.typeContrat,
      societeId: offre.societeId,
      idSpecialite: offre.idSpecialite,
      time: offre.time,
    });
  };

  const resetForm = () => {
    setFormData({
      id: null,
      titre: "",
      description: "",
      typeContrat: "",
      societeId: "",
      idSpecialite: "",
      time: "",
    });
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
              <h1 className="text-white font-weight-bold">Manage Job Offers</h1>
              <div className="custom-breadcrumbs">
                <a href="/">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white"><strong>Manage Offers</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-12 mb-4 mb-lg-0">
              <div className="d-flex align-items-center">
                <h2>{formData.id ? "Edit Job Offer" : "Post a Job Offer"}</h2>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-lg-12">
              <form className="p-4 p-md-5 border rounded">
                <h3 className="text-black mb-5 border-bottom pb-2">Offer Details</h3>

                <div className="form-group">
                  <label htmlFor="titre">Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titre"
                    name="titre"
                    placeholder="e.g. Software Engineer"
                    value={formData.titre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Job Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Write Job Description!"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="typeContrat">Contract Type</label>
                  <select
                    className="form-control"
                    id="typeContrat"
                    name="typeContrat"
                    value={formData.typeContrat}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Contract Type</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="societeId">Company ID</label>
                  <input
                    type="number"
                    className="form-control"
                    id="societeId"
                    name="societeId"
                    placeholder="e.g. 1"
                    value={formData.societeId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="idSpecialite">Specialty ID</label>
                  <input
                    type="number"
                    className="form-control"
                    id="idSpecialite"
                    name="idSpecialite"
                    placeholder="e.g. 1"
                    value={formData.idSpecialite}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Work Time</label>
                  <select
                    className="form-control"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Work Time</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                </div>

                {message && <p className="text-center text-danger mt-3">{message}</p>}

                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-light btn-md mr-2"
                        onClick={resetForm}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-success btn-md"
                        onClick={formData.id ? handleUpdate : handleCreate}
                      >
                        Save Offer
                      </button>
                    </div>
                  </div>
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