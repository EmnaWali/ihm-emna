/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUpSoc = () => {
  const [formData, setFormData] = useState({
    raisonSociale: "",
    email: "",
    adresse: "",
    numTele: "",
    mdp: "",
    image: "",
    isBloqued: false, // valeur par défaut
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7020/api/Auth/register/societe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || "Société inscrite avec succès !");
        setFormData({
          raisonSociale: "",
          email: "",
          adresse: "",
          numTele: "",
          mdp: "",
          image: "",
          isBloqued: false,
        });
      } else {
        setMessage(result.message || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      setMessage("Erreur réseau. Veuillez réessayer.");
    }
  };

  return (
    <section
      className="section-hero overlay inner-page bg-image"
      style={{
        backgroundImage: "url('https://themewagon.github.io/jobboard/images/hero_1.jpg')",
        fontFamily: "'Roboto', sans-serif",
      }}
      id="home-section"
    >
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">Créer un compte Société</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="raisonSociale">Raison Sociale</label>
                    <input
                      type="text"
                      id="raisonSociale"
                      name="raisonSociale"
                      className="form-control"
                      value={formData.raisonSociale}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="adresse">Adresse</label>
                    <input
                      type="text"
                      id="adresse"
                      name="adresse"
                      className="form-control"
                      value={formData.adresse}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="numTele">Numéro Téléphone</label>
                    <input
                      type="text"
                      id="numTele"
                      name="numTele"
                      className="form-control"
                      value={formData.numTele}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mdp">Mot de passe</label>
                    <input
                      type="password"
                      id="mdp"
                      name="mdp"
                      className="form-control"
                      value={formData.mdp}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">URL de l'image (optionnelle)</label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      className="form-control"
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Champ isBloqued retiré du formulaire */}

                  <button type="submit" className="btn btn-primary btn-block mt-3">
                    Créer le compte
                  </button>
                  <div className="text-center mt-3">
                    <span>Déjà un compte ? </span>
                    <Link to="/loginsoc" className="text-primary font-weight-bold">
                      Se connecter
                    </Link>
                  </div>
                  {message && (
                    <div className="alert alert-info text-center mt-4" role="alert">
                      {message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpSoc;
