import React, { useState } from "react";

import Milestone from "./Milestone";
import Appointment from "./Appointment";
import Immunization from "./Immunizations";

function BabyLog({
  selectedBaby,
  milestones,
  apps,
  onSubmitAddMile,
  onSubmitAddApp,
  onSubmitUpdateMile,
  onSubmitUpdateApp,
  onClickDeleteMiles,
  onClickDeleteApp,
}) {
  const [showMileForm, setShowMileForm] = useState(false);
  const [showAppForm, setShowAppForm] = useState(false);
  const [mileFormData, setMileFormData] = useState({
    development: "",
    notes: "",
    date: "",
  });
  const [appFormData, setAppFormData] = useState({
    date: "",
    time: "",
    doctor_name: "",
    notes: "",
  });

  //////////// Iterate logs and render each component ////////////

  const babyMilestones = milestones.map((milestone) => (
    <Milestone
      key={milestone.id}
      milestone={milestone}
      onSubmitUpdateMile={onSubmitUpdateMile}
      onClickDeleteMiles={onClickDeleteMiles}
    />
  ));

  const babyApps = apps.map((app) => (
    <Appointment
      key={app.id}
      app={app}
      onSubmitUpdateApp={onSubmitUpdateApp}
      onClickDeleteApp={onClickDeleteApp}
    />
  ));

  //////////////////// Toggle add form /////////////////////

  function handleShowMileForm() {
    setShowMileForm((showMileForm) => !showMileForm);
  }

  function handleShowAppForm() {
    setShowAppForm((showAppForm) => !showAppForm);
  }

  //////////////// Add new milestone ///////////////////

  function handleMileChange(e) {
    setMileFormData({ ...mileFormData, [e.target.name]: e.target.value });
  }

  function handleMilePostRequest(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/babies/${selectedBaby.id}/milestones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mileFormData),
    })
      .then((res) => res.json())
      .then((newMilestone) => onSubmitAddMile(newMilestone));

    setMileFormData({ development: "", notes: "", date: "" });
    setShowMileForm((showMileForm) => !showMileForm);
  }

  //////////////// Add new milestone ///////////////////

  function handleAppChange(e) {
    setAppFormData({ ...appFormData, [e.target.name]: e.target.value });
  }

  function handleAppPostRequest(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/babies/${selectedBaby.id}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appFormData),
    })
      .then((res) => res.json())
      .then((newApp) => onSubmitAddApp(newApp));

    setAppFormData({ date: "",
    time: "",
    doctor_name: "",
    notes: ""});
    setShowAppForm((showAppForm) => !showAppForm);
  }

  //////////////////////////////////////////////////////////

  return (
    <div>
      <h4>Milestones</h4>
      <button onClick={handleShowMileForm}>+ Add Milestone</button>
      {showMileForm ? (
        <form onSubmit={handleMilePostRequest}>
          <input
            value={mileFormData.development}
            onChange={handleMileChange}
            type="text"
            name="development"
            placeholder="development"
          />
          <input
            value={mileFormData.notes}
            onChange={handleMileChange}
            type="text"
            name="notes"
            placeholder="notes"
          />
          <input
            value={mileFormData.date}
            onChange={handleMileChange}
            type="date"
            name="date"
          />
          <input type="submit" value="Add" />
        </form>
      ) : null}
      {babyMilestones}
      <h4>Appointments</h4>
      <button onClick={handleShowAppForm}>+ Add Appointment</button>
      {showAppForm ? (
        <form onSubmit={handleAppPostRequest}>
          <input
            value={appFormData.date}
            onChange={handleAppChange}
            type="date"
            name="date"
          />
          <input
            value={appFormData.time}
            onChange={handleAppChange}
            type="time"
            name="time"
          />
          <input
            value={appFormData.doctor_name}
            onChange={handleAppChange}
            type="text"
            name="doctor_name"
            placeholder="Doctor name"
          />
          <input
            value={appFormData.notes}
            onChange={handleAppChange}
            type="text"
            name="notes"
            placeholder="Notes"
          />
          <input type="submit" value="Add" />
        </form>
      ) : null}
      {babyApps}
      <h4>Immunization</h4>
      <Immunization />
    </div>
  );
}

export default BabyLog;
