import React, { useState } from "react";

import BabyEditForm from "./BabyEditForm";

function BabyList({
  babies,
  onClickRender,
  isSelected,
  selectedBaby,
  onSubmitEditBaby,
}) {
  const [showForm, setShowForm] = useState(false);
  const [clickedBaby, setClickedBaby] = useState("");

  function handleShowForm(babyId) {
    setShowForm((showForm) => !showForm);

    const baby = babies.find((baby) => baby.id === babyId);
    setClickedBaby(baby);
  }

  function handleCloseForm() {
    setShowForm(false);
  }

  const babyList = babies.map((baby) => (
    <div key={baby.id} className="baby_list">
      <img
        onClick={() => onClickRender(baby.id)}
        src={baby.baby_image_url}
        alt={baby.name}
        className={
          isSelected
            ? baby.id === selectedBaby.id
              ? "icon_image_selected"
              : "icon_image"
            : "icon_image"
        }
      />
      <br />
      <p id="baby_name">{baby.name}</p>
      <div className="profile">
        <p className="p2">
          <i className="bi bi-person"></i> {baby.sex}
        </p>
        <br />
        <p className="p2">
          <i className="bi bi-balloon"></i> {baby.birthday}
        </p>
        <br />
        <p className="p3" onClick={() => handleShowForm(baby.id)}>
          EDIT
        </p>
        <p className="p3">/ DELETE</p>
      </div>
    </div>
  ));

  return (
    <>
      {babyList}
      {showForm ? (
        <BabyEditForm
          clickedBaby={clickedBaby}
          onSubmitEditBaby={onSubmitEditBaby}
          onClickClose={handleCloseForm}
        />
      ) : null}
    </>
  );
}

export default BabyList;

// showForm ? render <BabyEditForm /> : null
// Create state to store s baby obj
// Add BabyEditForm.js
// Pass clickedBaby
// Create <Form> and controlled form
// formData state should be =>  name: clickedBaby.name
// !!! update backend to add patch for babies !!!
// onSubmit, Patch request with clickedBaby.id and callback from BabyList
// in BabyList, create function to render on DOM
// => const updatedBabies = babies.map...baby.id === updatedItem.id ?
// then updatedItem : babies

// Create close button
// Pop up window
