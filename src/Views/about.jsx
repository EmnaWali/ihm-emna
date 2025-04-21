import React from "react";
import { Link } from "react-router-dom";

const About = () => {

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
                  <Link
                    to="/"
                    className="nav-link mr-3"
                    style={{ color: "white" }}
                  >
                    Accueil
                  </Link>
                  <Link
                    to="/about"
                    className="mr-4"
                    style={{ color: "white" }}
                  >
                    À propos
                  </Link>
                  <Link
                    to="/post-job"
                    className="btn btn-outline-primary border-width-2 d-none d-lg-inline-block mr-3"
                  >
                    <span className="mr-2 icon-add"></span>Publier une offre
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-primary border-width-2 d-none d-lg-inline-block"
                  >
                    <span className="mr-2 icon-lock_outline"></span>Se connecter
                  </Link>
                </div>
                <a
                  href="#"
                  className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"
                >
                  <span className="icon-menu h3 m-0 p-0 mt-2"></span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">À propos de JobBoard</h1>
              <div className="custom-breadcrumbs">
                <Link to="/">Accueil</Link>{" "}
                <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>À propos</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-5 bg-image overlay-primary fixed overlay"
        id="next-section"
        style={{
          backgroundImage:
            "url('https://themewagon.github.io/jobboard/images/hero_1.jpg')",
        }}
      >
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2 text-white">
                Nos chiffres clés
              </h2>
              <p className="lead text-white">
                Chaque jour, nous connectons des milliers de candidats avec des entreprises qui recrutent.
              </p>
            </div>
          </div>
          <div className="row pb-0 block__19738 section-counter">
            <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number" data-number="1930">1930</strong>
              </div>
              <span className="caption">Candidats inscrits</span>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number" data-number="54">54</strong>
              </div>
              <span className="caption">Offres publiées</span>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number" data-number="120">120</strong>
              </div>
              <span className="caption">Postes pourvus</span>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number" data-number="550">550</strong>
              </div>
              <span className="caption">Entreprises partenaires</span>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section pb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <a
                data-fancybox
                data-ratio="2"
                href="https://vimeo.com/317571768"
                className="block__96788"
              >
                <span className="play-icon">
                  <span className="icon-play"></span>
                </span>
                <img
                  src="https://themewagon.github.io/jobboard/images/sq_img_6.jpg"
                  alt="Vidéo Freelancer"
                  className="img-fluid img-shadow"
                />
              </a>
            </div>
            <div className="col-lg-5 ml-auto">
              <h2 className="section-title mb-3">
                JobBoard pour freelances et développeurs
              </h2>
              <p className="lead">
                Vous êtes développeur, designer ou freelance ? Notre plateforme vous aide à trouver des missions adaptées à votre profil.
              </p>
              <p>
                Nous simplifions la mise en relation entre les freelances et les entreprises pour garantir une collaboration fluide et efficace.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section pt-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0 order-md-2">
              <a
                data-fancybox
                data-ratio="2"
                href="https://vimeo.com/317571768"
                className="block__96788"
              >
                <span className="play-icon">
                  <span className="icon-play"></span>
                </span>
                <img
                  src="https://themewagon.github.io/jobboard/images/sq_img_8.jpg"
                  alt="Vidéo Worker"
                  className="img-fluid img-shadow"
                />
              </a>
            </div>
            <div className="col-lg-5 mr-auto order-md-1 mb-5 mb-lg-0">
              <h2 className="section-title mb-3">JobBoard pour chercheurs d'emploi</h2>
              <p className="lead">
                Que vous soyez en reconversion ou à la recherche de nouvelles opportunités, JobBoard vous accompagne à chaque étape.
              </p>
              <p>
                Créez votre profil, explorez les offres, postulez en un clic et suivez vos candidatures facilement depuis votre tableau de bord.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center" data-aos="fade">
              <h2 className="section-title mb-3">Notre équipe</h2>
            </div>
          </div>
          <div className="row align-items-center block__69944">
            <div className="col-md-6">
              <img
                src="https://themewagon.github.io/jobboard/images/person_6.jpg"
                alt="Elisabeth Smith"
                className="img-fluid mb-4 rounded"
              />
            </div>
            <div className="col-md-6">
              <h3>Elisabeth Smith</h3>
              <p className="text-muted">Directrice Créative</p>
              <p>
                Elisabeth est passionnée par l'innovation dans le recrutement. Elle supervise l’expérience utilisateur sur notre plateforme et travaille main dans la main avec les développeurs pour rendre votre recherche d’emploi plus intuitive.
              </p>
             
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

export default About;
