import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./NavBar";
import Home from "./Home";
import LogbookPage from "./LogbookPage";

function App() {
  const [babies, setBabies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/babies")
      .then((res) => res.json())
      .then((data) => setBabies(data));
  }, []);

  //////////////// Render new Baby on DOM ////////////////

  function handleRenderBaby(newBaby) {
    setBabies([...babies, newBaby]);
  }

  //////////////// Render updated Baby on DOM ////////////////

  function handleEditBaby(updatedItem) {
    const updatedBaby = babies.map((baby) =>
      baby.id === updatedItem.id ? updatedItem : baby
    );

    setBabies(updatedBaby);
  }

  //////////////////////////////////////////////////////////

  return (
    <div>
      <div className="logbook_content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/logbook"
            element={
              <LogbookPage
                babies={babies}
                onSubmitAddBaby={handleRenderBaby}
                onSubmitEditBaby={handleEditBaby}
              />
            }
          />
        </Routes>
        <NavBar />
      </div>
    </div>
  );
}

export default App;
