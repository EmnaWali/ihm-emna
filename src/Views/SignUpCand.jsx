import React, { useState } from "react";
import "./SignUp.css";
const SignUpCand = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    mdp: "",
    mdpConfirm: "",
    niveauEtude: "",
  });
  const [message, setMessage] = useState(""); 

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier que les mots de passe correspondent
    if (formData.mdp !== formData.mdpConfirm) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    // Préparer les données à envoyer à l'API
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Candidat inscrit avec succès !");
        setFormData({
          nom: "",
          email: "",
          mdp: "",
          mdpConfirm: "",
          niveauEtude: "",
        }); // Réinitialiser le formulaire
      } else {
        setMessage(result.message || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      setMessage("Erreur réseau. Veuillez réessayer.");
    }
  };

  return (
    <section className="site-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-5">
            <h2 className="mb-4">Sign Up To JobBoard</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded">
              <div className="row form-group">
                <div className="col-md-12 mb-3 mb-md-0">
                  <label className="text-black" htmlFor="nom">
                    Nom
                  </label>
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
              <div className="row form-group">
                <div className="col-md-12 mb-3 mb-md-0">
                  <label className="text-black" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-md-12 mb-3 mb-md-0">
                  <label className="text-black" htmlFor="mdp">
                    Password
                  </label>
                  <input
                    type="password"
                    id="mdp"
                    name="mdp"
                    className="form-control"
                    placeholder="Password"
                    value={formData.mdp}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row form-group mb-4">
                <div className="col-md-12 mb-3 mb-md-0">
                  <label className="text-black" htmlFor="mdpConfirm">
                    Re-Type Password
                  </label>
                  <input
                    type="password"
                    id="mdpConfirm"
                    name="mdpConfirm"
                    className="form-control"
                    placeholder="Re-type Password"
                    value={formData.mdpConfirm}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <label className="text-black" htmlFor="niveauEtude">
                    Niveau d'étude
                  </label>
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

              <div className="row form-group">
                <div className="col-md-12">
                  <input
                    type="submit"
                    value="Sign Up"
                    className="btn px-4 btn-primary text-white"
                  />
                </div>
              </div>
              {message && <p className="text-center mt-3">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpCand;
