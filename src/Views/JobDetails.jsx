import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({
    idCandidat: localStorage.getItem('candidatId') || '',
    idOffre: '',
    dateCandidature: new Date().toISOString(),
    status: 'en attente',
    cv: null,
    lettreMotivation: null
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchJobData = async () => {
      console.log('Fetching job data for ID:', id);
      try {
        const response = await fetch(`https://localhost:7020/api/Offre/${id}`);
        console.log('Fetch response status:', response.status);
        if (!response.ok) {
          throw new Error('Échec du chargement des données');
        }
        const data = await response.json();
        console.log('Fetched job data:', data);

        const mappedData = {
          title: data.titre,
          company: data.raisonSociale,
          typeContrat: data.typeContrat,
          specialite: data.nomSpecialite,
          location: data.adresse,
          secteur: data.nomDiscipline,
          type: data.time,
          heroImage: data.image || 'https://via.placeholder.com/1920x1080',
          companyLogo: data.image || 'https://via.placeholder.com/100',
          bannerImage: data.image || 'https://via.placeholder.com/800x400',
          description: [data.description],
          responsibilities: [],
          education: [],
          benefits: [
            "Salaire compétitif",
            "Horaires flexibles",
            "Assurance santé"
          ],
          summary: {
            vacancy: 1,
            experience: '0 à 3ans',
            salary: '1000DT 2000DT',
            gender: 'Indifférent'
          }
        };

        setJobData(mappedData);
        setFormData(prev => ({ ...prev, idOffre: id }));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching job data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(`Handle change - ${name}:`, files ? files[0] : value);
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);

    if (!formData.idCandidat) {
      setError('ID Candidat requis. Veuillez vous connecter.');
      console.error('Missing idCandidat');
      return;
    }

    if (!formData.cv || !formData.lettreMotivation) {
      setError('Veuillez uploader un CV et une lettre de motivation.');
      console.error('Missing CV or LettreMotivation');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('IdCandidat', parseInt(formData.idCandidat));
    formDataToSend.append('IdOffre', parseInt(formData.idOffre));
    formDataToSend.append('DateCandidature', formData.dateCandidature);
    formDataToSend.append('Status', formData.status.toString());
    formDataToSend.append('CV', formData.cv);
    formDataToSend.append('LettreMotivation', formData.lettreMotivation);

    try {
      console.log('Sending request to API...');
      const response = await fetch('https://localhost:7020/api/Candidature/create', {
        method: 'POST',
        body: formDataToSend
      });

      console.log('API response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error details:', errorData);
        throw new Error(errorData.message || 'Échec de la soumission de la candidature');
      }

      const result = await response.json();
      console.log('Candidature soumise avec succès:', result);
      setSuccessMessage('Candidature soumise avec succès !');
      setIsModalOpen(false);
      setFormData({
        idCandidat: localStorage.getItem('candidatId') || '',
        idOffre: id,
        dateCandidature: new Date().toISOString(),
        status: 'en attente',
        cv: null,
        lettreMotivation: null
      });
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
      setError(err.message);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div>
      <section className="section-hero overlay inner-page bg-image" style={{ backgroundImage: "url('https://themewagon.github.io/jobboard/images/hero_1.jpg')" }} id="home-section">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">{jobData.title}</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Accueil</a> <span className="mx-2 slash">/</span>
                <a href="#">Offre</a> <span className="mx-2 slash">/</span>
                <span className="text-white"><strong>{jobData.title}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          <div className="row align-items-center mb-5">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <div className="d-flex align-items-center">
                <div className="border p-2 d-inline-block mr-3 rounded">
                  <img src={jobData.companyLogo} alt="Logo" style={{ width: '150px', height: '150px' }} />
                </div>
                <div>
                  <h2>{jobData.title}</h2>
                  <div>
                    <span className="ml-0 mr-2 mb-2"><span className="icon-briefcase mr-2"></span>{jobData.company}</span>
                    <span className="m-2"><span className="icon-room mr-2"></span>{jobData.location}</span>
                    <span className="m-2"><span className="icon-clock-o mr-2"></span><span className="text-primary">{jobData.type}</span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-6"></div>
                <div className="col-6">
                  <button className="btn btn-block btn-primary btn-md" onClick={() => setIsModalOpen(true)}>
                    Postuler
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <figure className="mb-5">
                <img src="https://themewagon.github.io/jobboard/images/job_single_img_1.jpg" alt="Bannière" className="img-fluid rounded" />
              </figure>

              <h3 className="h5 text-primary">Description du Poste</h3>
              {jobData.description.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              <h3 className="h5 text-primary">Autres Avantages</h3>
              <ul className="list-unstyled">
                {jobData.benefits.map((item, idx) => (
                  <li key={idx} className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-4">
              <div className="bg-light p-3 border rounded mb-4">
                <h3 className="text-primary h5 mb-3">Résumé de l'offre</h3>
                <ul className="list-unstyled mb-0">
                  <li><strong>Postes disponibles :</strong> {jobData.summary.vacancy}</li>
                  <li><strong>Expérience :</strong> {jobData.summary.experience}</li>
                  <li><strong>Type Contrat :</strong> {jobData.typeContrat}</li>
                  <li><strong>Salaire :</strong> {jobData.summary.salary}</li>
                  <li><strong>Sexe :</strong> {jobData.summary.gender}</li>
                  <li><strong>Spécialités :</strong> {jobData.specialite}</li>
                  <li><strong>Secteur :</strong> {jobData.secteur}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Postuler à l'offre</h5>
                  <button type="button" className="close" onClick={() => setIsModalOpen(false)}>
                    <span>×</span>
                  </button>
                </div>
                <div className="modal-body">

                  <div className="form-group">
                    <label>CV</label>
                    <input 
                      type="file" 
                      name="cv" 
                      className="form-control" 
                      onChange={handleChange} 
                      accept=".pdf,.doc,.docx"
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Lettre de Motivation</label>
                    <input 
                      type="file" 
                      name="lettreMotivation" 
                      className="form-control" 
                      onChange={handleChange} 
                      accept=".pdf,.doc,.docx"
                      required 
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Envoyer</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annuler</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;