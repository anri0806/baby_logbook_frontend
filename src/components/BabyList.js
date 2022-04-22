import React, { useState } from "react";

import BabyEditForm from "./BabyEditForm";

function BabyList({
  babies,
  onClickRender,
  isSelected,
  selectedBaby,
  onSubmitEditBaby,
  onClickDelete,
  onClickRemoveLog,
}) {
  const [showForm, setShowForm] = useState(false);
  const [clickedBaby, setClickedBaby] = useState("");


  
  ///////////////////// Show & close edit form ////////////////////

  function handleShowForm(babyId) {
    setShowForm((showForm) => !showForm);

    const baby = babies.find((baby) => baby.id === babyId);
    setClickedBaby(baby);
  }

  function handleCloseForm() {
    setShowForm(false);
  }


  //////////////////////// Delete baby /////////////////////////


  function handleDeleteBaby(babyId) {
    fetch(`http://localhost:9292/babies/${babyId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedItem) => onClickDelete(deletedItem));

    onClickRemoveLog(false);
  }


  /////////////////////// Render baby list //////////////////////


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
        <p className="p3" onClick={() => handleDeleteBaby(baby.id)}>
          / DELETE
        </p>
      </div>
    </div>
  ));


  ////////////////////////////////////////////////////////////////

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
