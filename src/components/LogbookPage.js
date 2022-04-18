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

  //////////// Store selected baby & its logs on Click ////////////

  function handleClick(babyId) {
    const baby = babies.find((baby) => baby.id === babyId);
    setSelectedBaby(baby);
    setIsSelected(true);

    ////// GET milestone data //////

    fetch("http://localhost:9292/milestones")
      .then((res) => res.json())
      .then((milestones) => {
        const selectedMiles = milestones.filter(
          (mile) => mile.baby_id === babyId
        );
        setSelectedBabyMiles(selectedMiles);
      });

    ////// GET appointment data //////

    fetch("http://localhost:9292/appointments")
      .then((res) => res.json())
      .then((appointments) => {
        const selectedApps = appointments.filter(
          (app) => app.baby_id === babyId
        );
        setSelectedBabyApps(selectedApps);
      });

    ////// GET immunization data //////

    fetch("http://localhost:9292/immunizations")
      .then((res) => res.json())
      .then((immunizations) => {
        const selectedImms = immunizations.filter(
          (imm) => imm.baby_id === babyId
        );
        setSelectedBabyImms(selectedImms);
      });
  }

  function handleShowForm() {
    setShowForm((showForm) => !showForm);
  }

  //////////////////// Render updated logs on DOM ///////////////////

  //////// Milestones ////////

  function handlePostMile(newMilestone) {
    setSelectedBabyMiles([...selectedBabyMiles, newMilestone]);
  }

  function handlePatchMile(updatedMilestone) {
    const baby = babies.find((baby) => baby.id === updatedMilestone.baby_id);
    const updatedMilestones = baby.milestones.map((mile) =>
      mile.id === updatedMilestone.id ? updatedMilestone : mile
    );

    setSelectedBabyMiles(updatedMilestones);
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

  function handlePatchApp(updatedApp) {
    const baby = babies.find((baby) => baby.id === updatedApp.baby_id);
    const updatedApps = baby.appointments.map((app) =>
      app.id === updatedApp.id ? updatedApp : app
    );

    setSelectedBabyApps(updatedApps);
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

  function handlePatchImm(updatedImm) {
    const baby = babies.find((baby) => baby.id === updatedImm.baby_id);
    const updatedImms = baby.immunizations.map((imm) =>
      imm.id === updatedImm.id ? updatedImm : imm
    );

    setSelectedBabyImms(updatedImms);
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
      <button onClick={handleShowForm}>+ Add Baby</button>
      <br />
      {showForm ? <BabyForm onSubmitAddBaby={onSubmitAddBaby} /> : null}
      <BabyList babies={babies} onClickRender={handleClick} />
      {isSelected ? (
        <BabyLog
          selectedBaby={selectedBaby}
          milestones={selectedBabyMiles}
          apps={selectedBabyApps}
          imms={selectedBabyImms}
          onSubmitAddMile={handlePostMile}
          onSubmitAddApp={handlePostApp}
          onSubmitAddImm={handlePostImm}
          onSubmitUpdateMile={handlePatchMile}
          onSubmitUpdateApp={handlePatchApp}
          onSubmitUpdateImm={handlePatchImm}
          onClickDeleteMile={handleDeleteMile}
          onClickDeleteApp={handleDeleteApp}
          onClickDeleteImm={handleDeleteImm}
        />
      ) : null}
    </div>
  );
}

export default LogbookPage;
