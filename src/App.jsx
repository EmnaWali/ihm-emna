import { Route, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import SignUpCand from "./Views/SignUpCand";
import LoginCand from "./Views/LoginCand";
import JobListings from "./Views/JobListings";

function App() {
  return (
    <Routes>
     <Route path="/" element={<JobListings />} />
      <Route path="/signupcand" element={<SignUpCand />} />
      <Route path="/login" element={<LoginCand />} />
    </Routes>
  );
}

export default App;
