import React from "react";
import { useEffect, useState, createContext } from "react";

import { useNavigate } from "react-router-dom";

import LogbookContainer from "./LogbookContainer";
import WelcomePage from "./WelcomePage";

export const CurrentUserContext = createContext();

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
    setCurrentUser(newUser);

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
      <CurrentUserContext.Provider value={currentUser}>
        <div className="logbook_content">
          {currentUser ? (
            <LogbookContainer
              onLogout={handleLogout}
            />
          ) : (
            <WelcomePage onLogin={handleLogin} onSignup={handleSignup} />
          )}
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
