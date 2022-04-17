import React, { useState } from "react";

function Milestone({
  selectedBaby,
  milestone,
  onSubmitUpdateMiles,
  onClickDeleteMiles,
}) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({
    development: milestone.development,
    notes: milestone.notes,
    date: milestone.date,
  });

  //////////////////// Toggle form ////////////////////

  function handleShowUpdateForm() {
    setShowUpdateForm((showUpdateForm) => !showUpdateForm);
  }

  //////////////// Update milestone ////////////////

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handlePatchRequest(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/milestones/${milestone.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedMilestone) => onSubmitUpdateMiles(updatedMilestone));

    setShowUpdateForm((showUpdateForm) => !showUpdateForm);
  }

  ////////////////// Delete milestone /////////////////

  function handleDelete() {
    fetch(`http://localhost:9292/milestones/${milestone.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedItem) => onClickDeleteMiles(deletedItem));
  }

  //////////////////////////////////////////////////////////

  return (
    <>
      <p>{milestone.development}</p>
      <p>{milestone.notes}</p> <p>{milestone.date}</p>
      <button onClick={handleShowUpdateForm}>✏</button>
      <button onClick={handleDelete}>🗑</button>
      {showUpdateForm ? (
        <form onSubmit={handlePatchRequest}>
          <input
            value={formData.development}
            onChange={handleChange}
            type="text"
            name="development"
          />
          <input
            value={formData.notes}
            onChange={handleChange}
            type="text"
            name="notes"
          />
          <input
            value={formData.date}
            onChange={handleChange}
            type="text"
            name="date"
          />
          <input type="submit" value="Edit" />
        </form>
      ) : null}
      <br />
    </>
  );
}

export default Milestone;
