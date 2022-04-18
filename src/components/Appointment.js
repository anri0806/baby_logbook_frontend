import React, { useState } from "react";

var moment = require("moment");

function Appointment({ app, onSubmitUpdateApp, onClickDeleteApp }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({
    date: app.date,
    time: moment
      .parseZone(app.time)
      .format("HH:mm a")
      .replace(/\s\w+m/, ""),
    doctor_name: app.doctor_name,
    notes: app.notes,
  });

  // //////////////////// Toggle form ////////////////////

  function handleShowUpdateForm() {
    setShowUpdateForm((showUpdateForm) => !showUpdateForm);
  }

  // //////////////// Update milestone ////////////////

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handlePatchRequest(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/appointments/${app.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedApp) => onSubmitUpdateApp(updatedApp));

    setShowUpdateForm((showUpdateForm) => !showUpdateForm);
  }

  // ////////////////// Delete milestone /////////////////

  function handleDelete() {
    fetch(`http://localhost:9292/appointments/${app.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedItem) => onClickDeleteApp(deletedItem));
  }

  //////////////////////////////////////////////////////////

  //change input time format? & change parse format when render?

  return (
    <div>
      <p>{app.date}</p>
      {/* Find a way to parse 1:00PM to 01:00PM */}
      <p>
        {moment
          .parseZone(app.time)
          .format("HH:mm a")
          .replace(/\s\w+m/, "")}
      </p>
      <p>{app.doctor_name}</p>
      <p>{app.notes}</p>
      <button onClick={handleShowUpdateForm}>✏</button>
      <button onClick={handleDelete}>🗑</button>
      {showUpdateForm ? (
        <form onSubmit={handlePatchRequest}>
          <input
            value={formData.date}
            onChange={handleChange}
            type="date"
            name="date"
          />
          <input
            value={formData.time}
            onChange={handleChange}
            type="time"
            name="time"
          />
          <input
            value={formData.doctor_name}
            onChange={handleChange}
            type="text"
            name="doctor_name"
          />
          <input
            value={formData.notes}
            onChange={handleChange}
            type="text"
            name="notes"
          />
          <input type="submit" value="Edit" />
        </form>
      ) : null}
      <br />
    </div>
  );
}

export default Appointment;
