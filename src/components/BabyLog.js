import React, { useState } from "react";

import Milestone from "./Milestone";
import Appointment from "./Appointment";
import Immunization from "./Immunizations";

// DO NOT use selectedBaby.id - how can i get access to current content id?
// 1. Change backend post to babies/:id/milestones 
//    so that i don't need to specify baby id


// Check Woof Woof example for patch


function BabyLog({
  selectedBaby,
  milestones,
  onSubmitAddMiles,
  onSubmitUpdateMiles,
  onClickDeleteMiles,
}) {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [formData, setFormData] = useState({
    development: "",
    notes: "",
    date: "",
  });

  //////////// Iterate logs and render each component ////////////

  const babyMilestones = milestones.map((milestone) => (
    <Milestone
      key={milestone.id}
      selectedBaby={selectedBaby}
      milestone={milestone}
      onSubmitUpdateMiles={onSubmitUpdateMiles}
      onClickDeleteMiles={onClickDeleteMiles}
    />
  ));

  //////////////////// Toggle milestone form /////////////////////

  function handleShowSubmitForm() {
    setShowSubmitForm((showSubmitForm) => !showSubmitForm);
  }

  //////////////// Add new milestone ///////////////////

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handlePostRequest(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/babies/${selectedBaby.id}/milestones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newMilestone) => onSubmitAddMiles(newMilestone));

    setFormData({ development: "", notes: "", date: "" });
    setShowSubmitForm((showSubmitForm) => !showSubmitForm)
  }

  //////////////////////////////////////////////////////////

  return (
    <div>
      <h4>Milestones</h4>
      <button onClick={handleShowSubmitForm}>+ Add Milestone</button>
      {showSubmitForm ? (
        <form onSubmit={handlePostRequest}>
          <input
            value={formData.development}
            onChange={handleChange}
            type="text"
            name="development"
            placeholder="development"
          />
          <input
            value={formData.notes}
            onChange={handleChange}
            type="text"
            name="notes"
            placeholder="notes"
          />
          <input
            value={formData.date}
            onChange={handleChange}
            type="date"
            name="date"
          />
          <input type="submit" value="Add" />
        </form>
      ) : null}
      {babyMilestones}
      <h4>Appointments</h4>
      <Appointment />
      <h4>Immunization</h4>
      <Immunization />
    </div>
  );
}

export default BabyLog;
