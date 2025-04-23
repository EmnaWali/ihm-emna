// Layout.js
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Layout = ({ children }) => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "250px", height: "100vh", position: "fixed" }}
      >
        <h4 className="mb-4">Menu</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/dashboard">
              <i className="fas fa-home me-2"></i> Accueil
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/societes">
              <i className="fas fa-cogs me-2"></i> Liste des sociétés
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/offres">
              <i className="fas fa-tags me-2"></i> Listes des offres
            </a>
          </li>
        </ul>
      </div>

      {/* Contenu principal avec navbar */}
      <div style={{ marginLeft: "250px", width: "100%" }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              AdminBoard
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <a
              className="nav-link text-dark d-flex align-items-center"
              href="/loginadmin"
              style={{ marginLeft: 'auto' }}
            >
              <i className="fas fa-user-slash me-2"></i>
              <span>Déconnexion</span>
            </a>
          </div>
        </nav>

        {/* Contenu injecté dynamiquement */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
