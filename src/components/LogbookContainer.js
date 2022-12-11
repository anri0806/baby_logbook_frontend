import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "./App";

import LogbookPage from "./LogbookPage";
import NavBar from "./NavBar";

function LogbookContainer({ onLogout }) {
  const [babies, setBabies] = useState([]);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    fetch(`http://localhost:9292//current_user_records/${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => {
        setBabies(data);
      });
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

  return (
    <>
      <Routes>
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
      <NavBar onLogout={onLogout} />
    </>
  );
}

export default LogbookContainer;
