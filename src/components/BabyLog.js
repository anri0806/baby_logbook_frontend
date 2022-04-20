import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import MilestoneContainer from "./MilestoneContainer";
import AppointmentContainer from "./AppointmentContainer";
import ImmuContainer from "./ImmuContainer";

function BabyLog({
  selectedBaby,
  milestones,
  apps,
  imms,
  onSubmitAddMile,
  onSubmitAddApp,
  onSubmitAddImm,
  onClickDeleteMile,
  onClickDeleteApp,
  onClickDeleteImm,
}) {
  const [key, setKey] = useState("milestones");
  const [showMileForm, setShowMileForm] = useState(false);
  const [showAppForm, setShowAppForm] = useState(false);
  const [showImmForm, setShowImmForm] = useState(false);
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
  const [immFormData, setImmFormData] = useState({
    vaccine: "",
    date: "",
  });

  //////////////////// Toggle ADD form /////////////////////

  function handleShowMileForm() {
    setShowMileForm((showMileForm) => !showMileForm);
  }

  function handleShowAppForm() {
    setShowAppForm((showAppForm) => !showAppForm);
  }

  function handleShowImmForm() {
    setShowImmForm((showImmForm) => !showImmForm);
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

  //////////////// Add new appointment ///////////////////

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

    setAppFormData({ date: "", time: "", doctor_name: "", notes: "" });
    setShowAppForm((showAppForm) => !showAppForm);
  }

  //////////////// Add new immunization ///////////////////

  function handleImmChange(e) {
    setImmFormData({ ...immFormData, [e.target.name]: e.target.value });
  }

  function handleImmPostRequest(e) {
    e.preventDefault();
    fetch(`http://localhost:9292/babies/${selectedBaby.id}/immunizations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(immFormData),
    })
      .then((res) => res.json())
      .then((newImm) => onSubmitAddImm(newImm));

    setImmFormData({ vaccine: "", date: "" });
    setShowImmForm((showImmForm) => !showImmForm);
  }

  //////////////////////////////////////////////////////////

  return (
    <div className="log_page">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="milestones" title="Milestones">
          <MilestoneContainer
            milestones={milestones}
            onClickDeleteMile={onClickDeleteMile}
          />
          <button className="add_button" onClick={handleShowMileForm}>
            <i className="bi bi-plus-circle"></i>
          </button>
          {showMileForm ? (
            <form onSubmit={handleMilePostRequest}>
              <input
                value={mileFormData.date}
                onChange={handleMileChange}
                type="date"
                name="date"
              />
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
              <input type="submit" value="Add" />
            </form>
          ) : null}
        </Tab>

        <Tab eventKey="appointments" title="Appointments">
          <AppointmentContainer
            appointments={apps}
            onClickDeleteApp={onClickDeleteApp}
          />
          <button className="add_button" onClick={handleShowAppForm}>
            <i className="bi bi-plus-circle"></i>
          </button>
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
        </Tab>
        <Tab eventKey="immunizations" title="Immunizations">
          <ImmuContainer
            immunizations={imms}
            onClickDeleteImm={onClickDeleteImm}
          />
          <button className="add_button" onClick={handleShowImmForm}>
            <i className="bi bi-plus-circle"></i>
          </button>
          {showImmForm ? (
            <form onSubmit={handleImmPostRequest}>
              <input
                value={immFormData.vaccine}
                onChange={handleImmChange}
                type="text"
                name="vaccine"
                placeholder="Vaccine"
              />
              <input
                value={immFormData.date}
                onChange={handleImmChange}
                type="date"
                name="date"
              />
              <input type="submit" value="Add" />
            </form>
          ) : null}
        </Tab>
      </Tabs>
    </div>
  );
}

export default BabyLog;
