import React, { useState } from "react";
import BabyList from "./BabyList";
import BabyForm from "./BabyForm";
import BabyLog from "./BabyLog";

function LogbookPage({ babies, onSubmitAddBaby }) {
  const [selectedBaby, setSelectedBaby] = useState(null);
  const [selectedBabyMiles, setSelectedBabyMiles] = useState([]);
  const [selectedBabyApps, setSelectedBabyApps] = useState([]);
  const [selectedBabyImms, setSelectedBabyImms] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [showForm, setShowForm] = useState(false);

  //////////// Show/ Close form on Click ////////////

  function handleShowForm() {
    setShowForm((showForm) => !showForm);
  }

  function handleCloseForm() {
    setShowForm(false);
  }

  //////////// Store selected baby & its logs on Click ////////////

  function handleClick(babyId) {
    const baby = babies.find((baby) => baby.id === babyId);
    setSelectedBaby(baby);
    setIsSelected(true);

    //onClick on img, i want to toggle className on selected element

    ////// GET milestone data //////

    fetch("http://localhost:9292/milestones")
      .then((res) => res.json())
      .then((milestones) => {
        const selectedMiles = milestones
          .filter((mile) => mile.baby_id === babyId)
          .sort((a, b) => a.date.localeCompare(b.date));

        setSelectedBabyMiles(selectedMiles);
      });

    ////// GET appointment data //////

    fetch("http://localhost:9292/appointments")
      .then((res) => res.json())
      .then((appointments) => {
        const selectedApps = appointments
          .filter((app) => app.baby_id === babyId)
          .sort((a, b) => a.date.localeCompare(b.date));

        setSelectedBabyApps(selectedApps);
      });

    ////// GET immunization data //////

    fetch("http://localhost:9292/immunizations")
      .then((res) => res.json())
      .then((immunizations) => {
        const selectedImms = immunizations
          .filter((imm) => imm.baby_id === babyId)
          .sort((a, b) => a.date.localeCompare(b.date));

        setSelectedBabyImms(selectedImms);
      });
  }

  //////// Milestones ////////

  function handlePostMile(newMilestone) {
    setSelectedBabyMiles([...selectedBabyMiles, newMilestone]);
  }

  function handleDeleteMile(deletedMilestone) {
    const baby = babies.find((baby) => baby.id === deletedMilestone.baby_id);
    const updatedMilestones = baby.milestones.filter(
      (mile) => mile.id !== deletedMilestone.id
    );

    setSelectedBabyMiles(updatedMilestones);
  }

  //////// Appointments ////////

  function handlePostApp(newApp) {
    setSelectedBabyApps([...selectedBabyApps, newApp]);
  }

  function handleDeleteApp(deletedApp) {
    const baby = babies.find((baby) => baby.id === deletedApp.baby_id);
    const updatedApps = baby.appointments.filter(
      (app) => app.id !== deletedApp.id
    );
    setSelectedBabyApps(updatedApps);
  }

  //////// Immunizations ////////

  function handlePostImm(newImm) {
    setSelectedBabyImms([...selectedBabyImms, newImm]);
  }

  function handleDeleteImm(deletedImm) {
    const baby = babies.find((baby) => baby.id === deletedImm.baby_id);
    const updatedImms = baby.immunizations.filter(
      (imm) => imm.id !== deletedImm.id
    );
    setSelectedBabyImms(updatedImms);
  }

  /////////////////////////////////////////////////////////

  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <p
        style={{
          textAlign: "right",
          marginRight: "30px",
          fontSize: "30px",
          color: "#B86F27",
        }}
      >
        <i
          style={{ cursor: "pointer" }}
          className="bi bi-plus-circle-fill"
          onClick={handleShowForm}
        ></i>
      </p>
      <br />
      {showForm ? (
        <BabyForm
          onSubmitAddBaby={onSubmitAddBaby}
          onClickClose={handleCloseForm}
        />
      ) : null}
      <BabyList
        babies={babies}
        onClickRender={handleClick}
        isSelected={isSelected}
        selectedBaby={selectedBaby}
      />
      {isSelected ? (
        <BabyLog
          selectedBaby={selectedBaby}
          milestones={selectedBabyMiles}
          apps={selectedBabyApps}
          imms={selectedBabyImms}
          onSubmitAddMile={handlePostMile}
          onSubmitAddApp={handlePostApp}
          onSubmitAddImm={handlePostImm}
          onClickDeleteMile={handleDeleteMile}
          onClickDeleteApp={handleDeleteApp}
          onClickDeleteImm={handleDeleteImm}
        />
      ) : null}
    </div>
  );
}

export default LogbookPage;
