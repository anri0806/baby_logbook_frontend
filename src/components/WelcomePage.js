import { Route, Routes } from "react-router-dom";

import NavBarHome from "./NavBarHome";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup"

function WelcomePage({ onLogin, onSignup }) {
  return (
    <>
      <NavBarHome />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/signup" element={<Signup onSignup={onSignup} />} />
      </Routes>
    </>
  );
}

export default WelcomePage;
