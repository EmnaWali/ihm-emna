import { Route, Routes } from "react-router-dom";
import SignUpCand from "./Views/SignUpCand";
import LoginCand from "./Views/LoginCand";
import OffreListManager from "./Views/OffreListManager";
import OffreManager from "./Views/OfferManager";
import OffreList from "./Views/OfferList";

function App() {
  return (
    <Routes>
      <Route path="/signupcand" element={<SignUpCand />} />
      <Route path="/login" element={<LoginCand />} />
      <Route path="/offre-list-manager" element={<OffreListManager />} />
      <Route path="/offre" element={<OffreManager />} />
      <Route path="/offre-list" element={<OffreList />} />

    </Routes>
  );
}

export default App;