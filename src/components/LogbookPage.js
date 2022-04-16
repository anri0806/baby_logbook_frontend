import React, { useState } from "react";
import BabyList from "./BabyList";
import BabyForm from "./BabyForm";
import BabyLog from "./BabyLog";

function LogbookPage({ babies, onSubmitAdd, onSubmitAddBaby }) {
  const [selectedBaby, setSelectedBaby] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [showForm, setShowForm] = useState(false);

  //////////////// Show baby info on Click ///////////////

  function handleClick(babyId) {
    const selectedBaby = babies.find((baby) => baby.id === babyId);
    setSelectedBaby(selectedBaby);
    setIsSelected(true);
  }

  function handleShowForm() {
    setShowForm((showForm) => !showForm);
  }


  /////////////////////////////////////////////////////////

  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <button onClick={handleShowForm}>+ Add Baby</button>
      <br />
      {showForm ? <BabyForm onSubmitAddBaby={onSubmitAddBaby} /> : null}
      <BabyList babies={babies} onClickRender={handleClick} />
      {isSelected ? (
        <BabyLog selectedBaby={selectedBaby} onSubmitAdd={onSubmitAdd} />
      ) : null}
    </div>
  );
}

export default LogbookPage;
