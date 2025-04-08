import React, { useState } from "react";
import "./Login.css"; // Fichier CSS pour le style

const LoginCand = () => {
  // État pour stocker les valeurs du formulaire
  const [formData, setFormData] = useState({
    email: "",
    mdp: "",
  });
  const [message, setMessage] = useState(""); // Pour afficher les messages de succès ou d'erreur

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

    // Préparer les données à envoyer à l'API
    const dataToSend = {
      email: formData.email,
      mdp: formData.mdp,
    };

    try {
      const response = await fetch(
        "https://localhost:7020/api/auth/login/candidat",
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
        setMessage(result.message || "Connexion réussie !");
        // Ici, vous pouvez stocker les informations de l'utilisateur (ex. dans localStorage)
        console.log("Utilisateur connecté :", result);
        setFormData({ email: "", mdp: "" }); // Réinitialiser le formulaire
      } else {
        setMessage(result.message || "Erreur lors de la connexion.");
      }
    } catch (error) {
      setMessage("Erreur réseau. Veuillez réessayer.");
    }
  };

  return (
    <div className="col-lg-6">
      <h2 className="mb-4">Log In To JobBoard</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded">
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
        <div className="row form-group mb-4">
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
        <div className="row form-group">
          <div className="col-md-12">
            <input
              type="submit"
              value="Log In"
              className="btn px-4 btn-primary text-white"
            />
          </div>
        </div>
        {message && <p className="text-center mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default LoginCand;
