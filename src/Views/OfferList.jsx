import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OffreListManager.css"; // Reuse the same CSS for styling consistency

const OffreList = () => {
  const [offres, setOffres] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOffres();
  }, []);

  const fetchOffres = async () => {
    try {
      const response = await fetch("https://localhost:7020/api/offre/list");
      const result = await response.json();
      if (response.ok) {
        setOffres(result);
      } else {
        setMessage("Erreur lors du chargement des offres");
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
        setMessage(result.message);
        fetchOffres();
      } else {
        setMessage(result.message || "Erreur lors de la suppression");
      }
    } catch (error) {
      setMessage("Erreur réseau");
    }
  };

  const handleEdit = (offre) => {
    // Navigate to the OffreListManager page with the offer data
    navigate("/offres", { state: { offreToEdit: offre } });
  };

  return (
    <div className="site-wrap">
      {/* Hero Section */}
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
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white"><strong>Offer List</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-12">
              <h2 className="mb-4">All Job Offers</h2>
              {message && <p className="text-center text-danger mt-3">{message}</p>}
            </div>
          </div>

          {/* Offers Table */}
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
                      <th>Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offres.map((offre) => (
                      <tr key={offre.id}>
                        <td>{offre.titre}</td>
                        <td>{offre.description}</td>
                        <td>{offre.typeContrat}</td>
                        <td>{offre.societeId}</td>
                        <td>{offre.idSpecialite}</td>
                        <td>{offre.time}</td>
                        <td>
                          <button
                            onClick={() => handleEdit(offre)}
                            className="btn btn-sm btn-warning mr-2"
                          >
                            <span className="icon-edit"></span>
                          </button>
                          <button
                            onClick={() => handleDelete(offre.id)}
                            className="btn btn-sm btn-danger"
                          >
                            <span className="icon-trash"></span>
                          </button>
                        </td>
                      </tr>
                    ))}
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