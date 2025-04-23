import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // <-- Fichier CSS pour le background flou

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [message, setMessage] = useState("");
  const [adminInfo, setAdminInfo] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7020/api/Auth/login/admin", {
        email,
        mdp,
      });

      setAdminInfo(response.data);
      setMessage("Connexion réussie ");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setMessage("Échec de la connexion ");
      setAdminInfo(null);
    }
  };

  return (
    <div className="admin-login-bg">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4 shadow bg-white bg-opacity-75" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4">Connexion Admin</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Adresse email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mdp" className="form-label">Mot de passe</label>
              <input
                type="password"
                id="mdp"
                className="form-control"
                placeholder="••••••••"
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}
                required
              />
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">Se connecter</button>
            </div>
          </form>

          {message && (
            <div className="alert alert-info text-center py-2" role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;