import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './layout';
import { FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import './Offres.css';

const Offres = () => {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const fetchOffres = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('https://localhost:7020/api/Offre/pending');
      setOffres(res.data);
    } catch (error) {
      console.error("Erreur de chargement des offres :", error);
      setError("Erreur lors du chargement des offres : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffres();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const approveOffre = async (id) => {
    setActionLoading(prev => ({ ...prev, [id]: 'approve' }));
    setError(null);
    try {
      await axios.put(`https://localhost:7020/api/Offre/approve/${id}`);
      await fetchOffres();
      showNotification("L'offre a été approuvée avec succès", "success");
    } catch (error) {
      console.error("Erreur lors de l'approbation :", error);
      const errorMessage = error.response?.status === 400
        ? error.response.data.message || "L'offre est déjà validée."
        : `Erreur lors de l'approbation : ${error.message}`;
      setError(errorMessage);
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: null }));
    }
  };

  const cancelOffre = async (id) => {
    setActionLoading(prev => ({ ...prev, [id]: 'cancel' }));
    setError(null);
    try {
      await axios.put(`https://localhost:7020/api/Offre/cancel/${id}`);
      await fetchOffres();
      showNotification("L'offre a été annulée avec succès", "danger");
    } catch (error) {
      console.error("Erreur lors de l'annulation :", error);
      const errorMessage = error.response?.status === 400
        ? error.response.data.message || "L'offre est déjà non validée."
        : `Erreur lors de l'annulation : ${error.message}`;
      setError(errorMessage);
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: null }));
    }
  };

  return (
    <Layout>
      <div className="offres-container">
        <div className="offres-header">
          <h2>Offres en attente</h2>
          <button 
            className="refresh-button" 
            onClick={fetchOffres} 
            disabled={loading}
          >
            {loading ? <FaSpinner className="spinner" /> : "Actualiser"}
          </button>
        </div>

        {notification && (
          <div className={`notification notification-${notification.type}`}>
            {notification.message}
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-container">
            <FaSpinner className="spinner" />
            <p>Chargement des offres...</p>
          </div>
        ) : (
          <div className="offres-table-container">
            {offres.length === 0 ? (
              <div className="empty-state">
                <p>Aucune offre en attente de validation</p>
              </div>
            ) : (
              <div className="offres-grid">
                {offres.map(offre => (
                  <div key={offre.id} className="offre-card">
                    <div className="offre-content">
                      <h3 className="offre-title">{offre.titre}</h3>
                      <p className="offre-description">{offre.description}</p>
                    </div>
                    <div className="offre-actions">
                      <button
                        className="action-button approve"
                        onClick={() => approveOffre(offre.id)}
                        disabled={actionLoading[offre.id]}
                      >
                        {actionLoading[offre.id] === 'approve' ? (
                          <FaSpinner className="spinner" />
                        ) : (
                          <>
                            <FaCheck /> Approuver
                          </>
                        )}
                      </button>
                      <button
                        className="action-button cancel"
                        onClick={() => cancelOffre(offre.id)}
                        disabled={actionLoading[offre.id]}
                      >
                        {actionLoading[offre.id] === 'cancel' ? (
                          <FaSpinner className="spinner" />
                        ) : (
                          <>
                            <FaTimes /> Annuler
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Offres;