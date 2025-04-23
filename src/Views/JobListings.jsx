import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobListings.css";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [secteurs, setSecteurs] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [filters, setFilters] = useState({
    disciplineId: "", // Remplacé secteurId par disciplineId
    idSpecialite: "", // Remplacé specialiteId par idSpecialite
    typeContrat: "", // Gardé typeContrat
    time: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const secteurResponse = await axios.get(
          "https://localhost:7020/api/Secteur"
        );
        setSecteurs(secteurResponse.data);

        const specialiteResponse = await axios.get(
          "https://localhost:7020/api/Specialite"
        );
        setSpecialites(specialiteResponse.data);

        await fetchJobs();
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.disciplineId) params.disciplineId = filters.disciplineId;
      if (filters.idSpecialite) params.idSpecialite = filters.idSpecialite;
      if (filters.typeContrat) params.typeContrat = filters.typeContrat;
      if (filters.time) params.time = filters.time;

      const response = await axios.get(
        "https://localhost:7020/api/Offre/allValid",
        {
          params,
        }
      );
      setJobs(response.data.offres);
    } catch (error) {
      console.error("Erreur lors du chargement des offres:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
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
        <header className="site-navbar mt-3">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="site-logo col-6">
                <a href="/">JobBoard</a>
              </div>
              <div className="right-cta-menu d-flex align-items-center justify-content-between col-12 col-lg-8">
                <div
                  className="d-flex align-items-center"
                  style={{ marginLeft: "45%" }}
                >
                  <a
                    href="/"
                    className="nav-link mr-3"
                    style={{ color: "white" }}
                  >
                    Accueil
                  </a>
                  <a href="/about" className="mr-4" style={{ color: "white" }}>
                    À propos
                  </a>
                  <a
                    href="/loginsoc"
                    className="btn btn-outline-primary border-width-2 d-none d-lg-inline-block mr-3"
                  >
                    <span className="mr-2 icon-add"></span>Publier une mission
                  </a>
                  <a
                    href="/login"
                    className="btn btn-primary border-width-2 d-none d-lg-inline-block"
                  >
                    <span className="mr-2 icon-lock_outline"></span>Se connecter
                  </a>
                </div>
                <a
                  href=""
                  className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"
                >
                  <span className="icon-menu h3 m-0 p-0 mt-2"></span>
                </a>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="col-md-12">
            <div className="mb-5 text-center">
              <h1
                className="text-white font-weight-bold"
                style={{ marginTop: "40px" }}
              >
                La voie la plus rapide vers votre emploi idéal
              </h1>
              <p style={{ color: "#fff", marginTop: "25px" }}>
                Explorez des offres de travail adaptées à vos compétences et
                découvrez votre prochain défi professionnel
              </p>
            </div>
            <div className="d-flex justify-content-center">
              <form
                onSubmit={handleFilterSubmit}
                className="search-jobs-form w-100"
              >
                <div className="row mb-5">
                  <div
                    className="col-lg-2 mb-4 mb-lg-0"
                    style={{ marginRight: "15px", marginLeft: "40px" }}
                  >
                    <select
                      name="disciplineId"
                      value={filters.disciplineId}
                      onChange={handleFilterChange}
                      className="form-control form-control-lg"
                    >
                      <option value="">Secteurs</option>
                      {secteurs.map((secteur) => (
                        <option key={secteur.id} value={secteur.id}>
                          {secteur.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    className="col-lg-2 mb-4 mb-lg-0"
                    style={{ marginRight: "15px" }}
                  >
                    <select
                      name="idSpecialite"
                      value={filters.idSpecialite}
                      onChange={handleFilterChange}
                      className="form-control form-control-lg"
                    >
                      <option value="">Spécialités</option>
                      {specialites.map((specialite, index) => (
                        <option key={index} value={specialite.id}>
                          {specialite.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    className="col-lg-2 mb-4 mb-lg-0"
                    style={{ marginRight: "15px" }}
                  >
                    <select
                      name="time"
                      value={filters.time}
                      onChange={handleFilterChange}
                      className="form-control form-control-lg"
                    >
                      <option value="">Horaire</option>
                      <option value="Part Time">Temps partiel</option>
                      <option value="Full Time">Temps plein</option>
                    </select>
                  </div>
                  <div
                    className="col-lg-2 mb-4 mb-lg-0"
                    style={{ marginRight: "15px" }}
                  >
                    <select
                      name="typeContrat"
                      value={filters.typeContrat}
                      onChange={handleFilterChange}
                      className="form-control form-control-lg"
                    >
                      <option value="">Contrats</option>
                      <option value="CDI">CDI</option>
                      <option value="CDD">CDD</option>
                      <option value="CIVP">CIVP</option>
                    </select>
                  </div>
                  <div className="col-lg-2 mb-4 mb-lg-0">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-block text-white"
                    >
                      <span className="icon-search icon mr-2"></span>Filtrer
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <section className="site-section">
          <div className="container">
            <div className="row mb-5 justify-content-center">
              <div className="col-md-7 text-center">
                <h2 className="section-title mb-2">Chargement des offres...</h2>
              </div>
            </div>
          </div>
        </section>
      ) : jobs.length > 0 ? (
        <section className="site-section">
          <div className="container">
            <div className="row mb-5 justify-content-center">
              <div className="col-md-7 text-center">
                <h2 className="section-title mb-2">
                  {jobs.length} offre(s) trouvée(s)
                </h2>
              </div>
            </div>
            <ul className="job-listings mb-5">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center"
                >
                  <a href={`/job/${job.id}`}></a>
                  <div className="job-listing-logo">
                    <img
                      src={job.image || "/images/default_logo.jpg"}
                      alt={`${job.raisonSociale || "Company"} Logo`}
                      className="img-fluid"
                    />
                  </div>
                  <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                    <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                      <h2>{job.titre || "Untitled Job"}</h2>
                      <div className="d-flex align-items-center">
                        <span className="icon-building mr-2 text-primary "></span>
                        <strong>
                          {job.raisonSociale || "Unknown Company"}
                        </strong>
                      </div>
                      <p>
                        {job.description.length > 150
                          ? `${job.description.slice(0, 150)}... `
                          : job.description}
                        {job.description.length > 150 && (
                          <a href={`/job/${job.id}`}></a>
                        )}
                      </p>
                    </div>
                    <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25 text-center">
                      <span className="icon-room text-primary"></span>{" "}
                      {job.adresse || "Adresse non spécifiée"}
                    </div>
                    <div className="job-listing-meta text-center">
                      <span
                        className={`badge ${
                          job.time === "Temps partiel"
                            ? "badge-danger"
                            : job.time === "Temps plein"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {job.time || "N/A"}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="site-section">
          <div className="container">
            <div className="row mb-5 justify-content-center">
              <div className="col-md-7 text-center">
                <h2 className="section-title mb-2">Aucune offre trouvée</h2>
              </div>
            </div>
          </div>
        </section>
      )}
      <section
        className="py-5 bg-image overlay-primary fixed overlay"
        style={{
          backgroundImage:
            "url('https://themewagon.github.io/jobboard/images/hero_1.jpg')",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 className="text-white">Vous cherchez un emploi ?</h2>
              <p className="mb-0 text-white lead">
                Découvrez des opportunités intéressantes pour faire avancer
                votre carrière et rejoindre des projets passionnants.
              </p>
            </div>
            <div className="col-md-3 ml-auto">
              <a
                href="/signupcand"
                className="btn btn-warning btn-block btn-lg"
              >
                S'inscrire
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer" style={{ padding: "20px " }}>
        <a href="/" className="smoothscroll scroll-top">
          <span className="icon-keyboard_arrow_up"></span>
        </a>

        <div className="container" style={{ marginTop: "80px " }}>
          <div className="row mb-5">
            <div
              className="col-6 col-md-3 mb-4 mb-md-0"
              style={{ marginRight: "10px", marginLeft: "80px" }}
            >
              <a href="/about">
                <h3>
                  <i className="icon-building"></i> À propos
                </h3>
              </a>
            </div>

            <div
              className="col-6 col-md-3 mb-4 mb-md-0"
              style={{ marginRight: "150px" }}
            >
              <h3>
                <i className="icon-phone"></i> Téléphone : +216 30 000 111
              </h3>
            </div>

            <div className="col-6 col-md-3 mb-4 mb-md-0">
              <h3>
                <i className="icon-envelope"></i> Email : contact@gmail.com
              </h3>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default JobListings;
