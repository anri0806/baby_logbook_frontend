import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "./App";


import LogbookPage from "./LogbookPage";
import NavBar from "./NavBar";

function LogbookContainer({ onLogout }) {
  const [babies, setBabies] = useState([]);

  const currentUser = useContext(CurrentUserContext);


  // SET user associated baby
  // BACKEND
  // 1. create new routes - get "/user_baby_records/:id" in Baby controller
  //    render baby <= user_id = (params[:id])

  // 2. Add user_id upon adding baby

  // FRONTEND
  // 1. GET request with currentUser.id, then set it to state

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
