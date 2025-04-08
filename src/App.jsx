import { Route, Routes } from "react-router-dom";
import SignUpCand from "./Views/SignUpCand";
import LoginCand from "./Views/LoginCand";

function App() {
  return (
    <Routes>
      <Route path="/signupcand" element={<SignUpCand />} />
      <Route path="/login" element={<LoginCand />} />
    </Routes>
  );
}

export default App;
