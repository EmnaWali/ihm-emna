/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginCand = () => {
  const [formData, setFormData] = useState({ email: "", mdp: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // pour redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { email: formData.email, mdp: formData.mdp };

    try {
      const response = await fetch("https://localhost:7020/api/auth/login/candidat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        // Stocker l'ID du candidat dans le localStorage
        localStorage.setItem("candidatId", result.id); // adapte selon ton retour d'API

        // Redirection vers /home
        navigate("/");
      } else {
        setMessage(result.message || "Erreur lors de la connexion.");
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
        }}
        id="home-section"
      >
        {/* Header omis pour plus de lisibilité */}
      </section>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow-lg border-0">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">Connexion Candidat</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email" className="text-black font-weight-bold">
                      Email
                    </label>
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
                    <label htmlFor="mdp" className="text-black font-weight-bold">
                      Mot de passe
                    </label>
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

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3 d-flex align-items-center justify-content-center"
                  >
                    <i className="icon-lock mr-2"></i> Se connecter
                  </button>

                  <div className="text-center mt-3">
                    <span>Pas encore de compte ? </span>
                    <Link to="/signupcand" className="text-primary font-weight-bold">
                      Créer un compte
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
    </>
  );
};

export default LoginCand;
