import React, { useState, useEffect } from "react";
import "./JobListings.css";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://localhost:7020/api/Offre/all");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="site-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">Loading Jobs...</h2>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
    <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: "url('https://themewagon.github.io/jobboard/images/hero_1.jpg')" }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Manage Job Offers</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white"><strong>Manage Offers</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <header className="site-navbar mt-3">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="site-logo col-6"><a href="index.html">JobBoard</a></div>

          <nav className="mx-auto site-navigation">
            <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
              <li><a href="index.html" className="nav-link">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li className="has-children">
                <a href="job-listings.html" className="active">Job Listings</a>
                <ul className="dropdown">
                  <li><a href="job-single.html">Job Single</a></li>
                  <li><a href="post-job.html">Post a Job</a></li>
                </ul>
              </li>
              <li className="has-children">
                <a href="services.html">Pages</a>
                <ul className="dropdown">
                  <li><a href="services.html">Services</a></li>
                  <li><a href="service-single.html">Service Single</a></li>
                  <li><a href="blog-single.html">Blog Single</a></li>
                  <li><a href="portfolio.html">Portfolio</a></li>
                  <li><a href="portfolio-single.html">Portfolio Single</a></li>
                  <li><a href="testimonials.html">Testimonials</a></li>
                  <li><a href="faq.html">Frequently Ask Questions</a></li>
                  <li><a href="gallery.html">Gallery</a></li>
                </ul>
              </li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li className="d-lg-none"><a href="post-job.html"><span className="mr-2">+</span> Post a Job</a></li>
              <li className="d-lg-none"><a href="login.html">Log In</a></li>
            </ul>
          </nav>
          
          <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
            <div className="ml-auto">
              <a href="post-job.html" className="btn btn-outline-white border-width-2 d-none d-lg-inline-block"><span className="mr-2 icon-add"></span>Post a Job</a>
              <a href="login.html" className="btn btn-primary border-width-2 d-none d-lg-inline-block"><span className="mr-2 icon-lock_outline"></span>Log In</a>
            </div>
            <a href="#" className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"><span className="icon-menu h3 m-0 p-0 mt-2"></span></a>
          </div>

        </div>
      </div>
    </header>
      <section className="site-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">{jobs.length} Job Listed</h2>
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
                    <strong>{job.raisonSociale || "Unknown Company"}</strong>
                  </div>
                  <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                    <span className="icon-room"></span>{" "}
                    {job.adresse || "Address not specified"}
                  </div>
                  <div className="job-listing-meta">
                    <span
                      className={`badge ${
                        job.time === "Part Time" ? "badge-danger" : "badge-success"
                      }`}
                    >
                      {job.time || "Full Time"}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="row pagination-wrap">
            <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
              <span>Showing 1-{jobs.length} Of {jobs.length} Jobs</span>
            </div>
            <div className="col-md-6 text-center text-md-right">
              <div className="custom-pagination ml-auto">
                <a href="#" className="prev">
                  Prev
                </a>
                <div className="d-inline-block">
                  <a href="#" className="active">
                    1
                  </a>
                  <a href="#">2</a>
                  <a href="#">3</a>
                  <a href="#">4</a>
                </div>
                <a href="#" className="next">
                  Next
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-image overlay-primary fixed overlay">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 className="text-white">Looking For A Job?</h2>
              <p className="mb-0 text-white lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit tempora
                adipisci impedit.
              </p>
            </div>
            <div className="col-md-3 ml-auto">
              <a href="#" className="btn btn-warning btn-block btn-lg">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobListings;