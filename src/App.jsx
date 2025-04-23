import { Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SignUpCand from "./Views/SignUpCand";
import LoginCand from "./Views/LoginCand";
import OffreListManager from "./Views/OffreListManager";
import OffreManager from "./Views/OfferManager";
import OffreList from "./Views/OfferList";
import JobListings from "./Views/JobListings";
import About from "./Views/about";
import JobDetails from "./Views/JobDetails";
import SignUpSoc from "./Views/SignUpSoc";
import LoginSoc from "./Views/loginSociete";
import Dashboard from "./Views/Dashboard";
import Offres from "./Views/Offres";
import Societes from "./Views/Societes";
import Layout from "./Views/layout";
import AdminLogin from './Views/AdminLogin';
import Specialite from "./Views/Specialite";
function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<JobListings />} />
      <Route path="/job/:id" element={<JobDetails />} />
      <Route path="/about" element={<About />} />

      {/* Candidate routes */}
      <Route path="/signupcand" element={<SignUpCand />} />
      <Route path="/login" element={<LoginCand />} />

      {/* Company routes */}
      <Route path="/signupsoc" element={<SignUpSoc />} />
      <Route path="/loginsoc" element={<LoginSoc
        title="Connexion Société"
        redirectPath="/offre-list-manager"
        onLoginSuccess={(userData) => console.log("Connexion réussie :", userData)}
      />} />

      {/* Offer management routes */}
      <Route path="/offre-list-manager" element={<OffreListManager />} />
      <Route path="/offre" element={<OffreManager />} />
      <Route path="/offre-list" element={<OffreList />} />
      
      <Route path="/loginadmin" element={<AdminLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/offres" element={<Offres />} />
      <Route path="/societes" element={<Societes/>} />
      <Route path="/specialite" element={<Specialite />} />
    </Routes>
  );
}

export default App;