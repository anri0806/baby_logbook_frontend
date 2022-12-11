import React from "react";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import LogbookContainer from "./LogbookContainer";
import WelcomePage from "./WelcomePage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9292/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
        });
      }
    });
  }, []);

  function handleSignup(newUser) {
    setCurrentUser(newUser)

    navigate("/logbook");
  }

  function handleLogin(user) {
    setCurrentUser(user);

    navigate("/logbook");
  }

  function handleLogout() {
    setCurrentUser(null);
    navigate("/");
  }


  return (
    <div>
      <div className="logbook_content">
        {currentUser ? (
          <LogbookContainer onLogout={handleLogout} />
        ) : (
          <WelcomePage onLogin={handleLogin} onSignup={handleSignup} />
        )}
      </div>
    </div>
  );
}

export default App;
