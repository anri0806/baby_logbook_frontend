import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import NavBarHome from "./NavBarHome";
import Login from "./Login";
import LogbookPage from "./LogbookPage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [babies, setBabies] = useState([]);

  ///////////// keep user logged in /////////////

  // START FROM HERE
  // Move babies useState to new compo
  // Add tenerary to render Babylogbook.js

  useEffect(() => {
    fetch("http://localhost:9292/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log(user);
          setCurrentUser(user);
        });
      }
    });
  }, []);

  ///////////////////////////////////////////////////////

  useEffect(() => {
    fetch("http://localhost:9292/babies")
      .then((res) => res.json())
      .then((data) => setBabies(data));
  }, []);

  //////////////// Render new Baby on DOM ////////////////

  function handleRenderBaby(newBaby) {
    setBabies([...babies, newBaby]);
  }

  /////////////// Render updated Baby on DOM ///////////////

  function handleEditBaby(updatedItem) {
    const updatedBaby = babies.map((baby) =>
      baby.id === updatedItem.id ? updatedItem : baby
    );

    setBabies(updatedBaby);
  }

  function handleDeleteBaby(deletedItem) {
    const updatedBaby = babies.filter((baby) => baby.id !== deletedItem.id);

    setBabies(updatedBaby);
  }

  //////////////////////////////////////////////////////////

  return (
    <div>
      <div className="logbook_content">
        <NavBarHome />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            path="/logbook"
            element={
              <LogbookPage
                babies={babies}
                onSubmitAddBaby={handleRenderBaby}
                onSubmitEditBaby={handleEditBaby}
                onClickDelete={handleDeleteBaby}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
