import React, { useState } from "react";

function OffreManager() {
  // États pour la création ou la mise à jour
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [typeContrat, setTypeContrat] = useState("");
  const [societeId, setSocieteId] = useState("");
  const [idSpecialite, setIdSpecialite] = useState("");
  const [isValid, setIsValid] = useState(false);

  // État pour l'identifiant de l'offre à mettre à jour ou à supprimer
  const [offreId, setOffreId] = useState("");

  // État pour afficher les messages de succès ou d'erreur
  const [message, setMessage] = useState("");

  // ======================================
  // =============== CREATE ===============
  // ======================================
  const handleCreateOffre = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch("https://votre-domaine/api/Offre/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre,
          description,
          typeContrat,
          societeId: parseInt(societeId),     // si c'est un nombre
          idSpecialite: parseInt(idSpecialite),
          isValid,                            // est facultatif dans le DTO
        }),
      });

      if (!response.ok) {
        // Erreur HTTP => on récupère le message
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la création");
      }

      const data = await response.json();
      setMessage(`Création réussie ! ID de l'offre: ${data.offreId}`);
      // Réinitialiser les champs
      setTitre("");
      setDescription("");
      setTypeContrat("");
      setSocieteId("");
      setIdSpecialite("");
      setIsValid(false);
    } catch (error) {
      setMessage(`Erreur: ${error.message}`);
    }
  };

  // ======================================
  // =============== UPDATE ===============
  // ======================================
  const handleUpdateOffre = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!offreId) {
      setMessage("Veuillez renseigner l'ID de l'offre à mettre à jour.");
      return;
    }

    try {
      const response = await fetch(`https://votre-domaine/api/Offre/update/${offreId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre,
          description,
          typeContrat,
          societeId: parseInt(societeId),
          idSpecialite: parseInt(idSpecialite),
          isValid, // Facultatif (si l’admin ou autre veut le changer)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la mise à jour");
      }

      const data = await response.json();
      setMessage(`Mise à jour réussie ! ID de l'offre: ${data.offreId}`);
      // Réinitialiser les champs
      setOffreId("");
      setTitre("");
      setDescription("");
      setTypeContrat("");
      setSocieteId("");
      setIdSpecialite("");
      setIsValid(false);
    } catch (error) {
      setMessage(`Erreur: ${error.message}`);
    }
  };

  // ======================================
  // =============== DELETE ===============
  // ======================================
  const handleDeleteOffre = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!offreId) {
      setMessage("Veuillez renseigner l'ID de l'offre à supprimer.");
      return;
    }

    try {
      const response = await fetch(`https://votre-domaine/api/Offre/delete/${offreId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression");
      }

      const data = await response.json();
      setMessage(`Suppression réussie ! ID de l'offre supprimée: ${data.offreId}`);
      setOffreId("");
    } catch (error) {
      setMessage(`Erreur: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Gestion d'Offre</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleCreateOffre}>
        <h3>Créer une Offre</h3>
        <div>
          <label>Titre :</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type de Contrat :</label>
          <input
            type="text"
            value={typeContrat}
            onChange={(e) => setTypeContrat(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ID Société :</label>
          <input
            type="number"
            value={societeId}
            onChange={(e) => setSocieteId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ID Spécialité :</label>
          <input
            type="number"
            value={idSpecialite}
            onChange={(e) => setIdSpecialite(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Valide ?</label>
          <input
            type="checkbox"
            checked={isValid}
            onChange={(e) => setIsValid(e.target.checked)}
          />
        </div>
        <button type="submit">Créer</button>
      </form>

      <form onSubmit={handleUpdateOffre}>
        <h3>Mettre à jour une Offre</h3>
        <div>
          <label>ID de l'Offre à mettre à jour :</label>
          <input
            type="number"
            value={offreId}
            onChange={(e) => setOffreId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nouveau Titre :</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </div>
        <div>
          <label>Nouvelle Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Nouveau Type de Contrat :</label>
          <input
            type="text"
            value={typeContrat}
            onChange={(e) => setTypeContrat(e.target.value)}
          />
        </div>
        <div>
          <label>Nouvel ID Société :</label>
          <input
            type="number"
            value={societeId}
            onChange={(e) => setSocieteId(e.target.value)}
          />
        </div>
        <div>
          <label>Nouvel ID Spécialité :</label>
          <input
            type="number"
            value={idSpecialite}
            onChange={(e) => setIdSpecialite(e.target.value)}
          />
        </div>
        <div>
          <label>Valide ?</label>
          <input
            type="checkbox"
            checked={isValid}
            onChange={(e) => setIsValid(e.target.checked)}
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>

      <form onSubmit={handleDeleteOffre}>
        <h3>Supprimer une Offre</h3>
        <div>
          <label>ID de l'Offre à supprimer :</label>
          <input
            type="number"
            value={offreId}
            onChange={(e) => setOffreId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Supprimer</button>
      </form>
    </div>
  );
}

export default OffreManager;
    