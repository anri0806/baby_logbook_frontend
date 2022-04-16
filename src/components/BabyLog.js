import React, {useState} from "react";

import Milestone from "./Milestone";
import Appointment from "./Appointment";
import Immunization from "./Immunizations";

function BabyLog({ selectedBaby, onSubmitAdd }) {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [formData, setFormData] = useState({
    development: "",
    notes: "",
    date: "",
    baby_id: selectedBaby.id,
  });


  //////////// Iterate and render component ////////////

  const babyMilestones = selectedBaby.milestones.map((milestone) => (
    <Milestone
      key={milestone.id}
      selectedBaby={selectedBaby}
      milestone={milestone}
    />
  ));

  //////////////////// Toggle form /////////////////////


  function handleShowSubmitForm() {
    setShowSubmitForm((showSubmitForm) => !showSubmitForm);
  }

  //////////////// Add new milestones ///////////////////


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handlePostRequest(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/milestones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newMilestone) => onSubmitAdd(newMilestone));

    setFormData({ development: "", notes: "", date: "" });
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
      <Appointment selectedBaby={selectedBaby} />
      <h4>Immunization</h4>
      <Immunization selectedBaby={selectedBaby} />
    </div>
  );
}

export default BabyLog;
