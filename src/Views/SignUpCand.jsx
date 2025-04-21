/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUpCand = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    mdp: "",
    mdpConfirm: "",
    niveauEtude: "",
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
    if (formData.mdp !== formData.mdpConfirm) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    const dataToSend = {
      nom: formData.nom,
      email: formData.email,
      mdp: formData.mdp,
      niveauEtude: formData.niveauEtude,
    };

    try {
      const response = await fetch(
        "https://localhost:7020/api/auth/register/candidat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || "Inscription réussie !");
        setFormData({
          nom: "",
          email: "",
          mdp: "",
          mdpConfirm: "",
          niveauEtude: "",
        });
      } else {
        setMessage(result.message || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      setMessage("Erreur réseau. Veuillez réessayer.");
    }
  };

  return (
    <>
      <section
        className="section-hero overlay inner-page bg-image"
        style={{
          backgroundImage:
            "url('https://themewagon.github.io/jobboard/images/hero_1.jpg')",
          fontFamily: "'Roboto', sans-serif",
        }}
        id="home-section"
      >
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card shadow-lg border-0">
                <div className="card-body p-4">
                  <h3 className="text-center mb-4">Créer un compte</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="nom" className="text-black font-weight-bold">Nom</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          id="nom"
                          name="nom"
                          className="form-control"
                          placeholder="Votre nom"
                          value={formData.nom}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="text-black font-weight-bold">Email</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-envelope"></i>
                          </span>
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Adresse email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mdp" className="text-black font-weight-bold">Mot de passe</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-lock"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          id="mdp"
                          name="mdp"
                          className="form-control"
                          placeholder="Mot de passe"
                          value={formData.mdp}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mdpConfirm" className="text-black font-weight-bold">Confirmer le mot de passe</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-lock_outline"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          id="mdpConfirm"
                          name="mdpConfirm"
                          className="form-control"
                          placeholder="Confirmez le mot de passe"
                          value={formData.mdpConfirm}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="niveauEtude" className="text-black font-weight-bold">Niveau d'étude</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-school"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          id="niveauEtude"
                          name="niveauEtude"
                          className="form-control"
                          placeholder="Niveau d'étude"
                          value={formData.niveauEtude}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-3 d-flex align-items-center justify-content-center"
                    >
                      <i className="icon-check mr-2"></i>S'inscrire
                    </button>

                    <div className="text-center mt-3">
                      <span>Déjà un compte ? </span>
                      <Link to="/login" className="text-primary font-weight-bold">
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
    </>
  );
};

export default SignUpCand;
