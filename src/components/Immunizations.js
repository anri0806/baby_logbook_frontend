import React, { useState } from "react";

function Immunization({ imm, onSubmitUpdateImm, onClickDeleteImm }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({
    vaccine: imm.vaccine,
    date: imm.date,
  });

  //////////////////// Toggle form ////////////////////

  function handleShowUpdateForm() {
    setShowUpdateForm((showUpdateForm) => !showUpdateForm);
  }

  ////////////////// Update milestone ////////////////

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handlePatchRequest(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/immunizations/${imm.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedImm) => onSubmitUpdateImm(updatedImm));

    setShowUpdateForm((showUpdateForm) => !showUpdateForm);
  }

  ////////////////// Delete milestone /////////////////

  function handleDelete() {
    fetch(`http://localhost:9292/immunizations/${imm.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedItem) => onClickDeleteImm(deletedItem));
  }

  //////////////////////////////////////////////////////////

  return (
    <div>
      <p>{imm.vaccine}</p>
      <p>{imm.date}</p>
      <button onClick={handleShowUpdateForm}>✏</button>
      <button onClick={handleDelete}>🗑</button>
      {showUpdateForm ? (
        <form onSubmit={handlePatchRequest}>
          <input
            value={formData.vaccine}
            onChange={handleChange}
            type="text"
            name="vaccine"
          />
          <input
            value={formData.date}
            onChange={handleChange}
            type="date"
            name="date"
          />
          <input type="submit" value="Edit" />
        </form>
      ) : null}
      <br />
    </div>
  );
}

export default Immunization;
