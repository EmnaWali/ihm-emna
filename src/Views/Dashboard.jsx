import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./layout";

const Dashboard = () => {
  const [stats, setStats] = useState({ candidats: 0, societes: 0, offres: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [authRes, offreRes] = await Promise.all([
          axios.get("https://localhost:7020/api/Auth/count"),
          axios.get("https://localhost:7020/api/Offre/allValid"),
        ]);

        setStats({
          candidats: authRes.data.candidats,
          societes: authRes.data.societes,
          offres: offreRes.data.count,
        });
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques :", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <h2 className="mb-4">Tableau de bord</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow border-start-primary h-100 py-2">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Sociétés
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {stats.societes}
                  </div>
                </div>
                <i className="fas fa-building fa-2x text-primary"></i>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow border-start-success h-100 py-2">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Offres publiées
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {stats.offres}
                  </div>
                </div>
                <i className="fas fa-briefcase fa-2x text-success"></i>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow border-start-warning h-100 py-2">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Candidats
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {stats.candidats}
                  </div>
                </div>
                <i className="fas fa-users fa-2x text-success"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
