import React, { useState, useEffect } from "react";

import LogbookPage from "./LogbookPage";

function LogbookContainer() {
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
      <LogbookPage
        babies={babies}
        onSubmitAddBaby={handleRenderBaby}
        onSubmitEditBaby={handleEditBaby}
        onClickDelete={handleDeleteBaby}
      />
    </>
  );
}

export default LogbookContainer;
