import React, { useState } from "react";
import BabyList from "./BabyList";
import BabyForm from "./BabyForm";
import BabyLog from "./BabyLog";

function LogbookPage({ babies, onSubmitAddBaby }) {
  const [selectedBaby, setSelectedBaby] = useState(null);
  const [selectedBabyMileStone, setSelectedBabyMilestone] = useState(null);
  const [selectedBabyAppointment, setSelectedBabyAppointment] = useState(null);
  const [selectedBabyImmunization, setSelectedBabyImmunization] =
    useState(null);

  const [isSelected, setIsSelected] = useState(false);
  const [showForm, setShowForm] = useState(false);

  //////////// Store selected baby logs & Display them on Click ////////////

  function handleClick(babyId) {
    const baby = babies.find((baby) => baby.id === babyId);

    setSelectedBaby(baby);
    setSelectedBabyMilestone(baby.milestones);
    setSelectedBabyAppointment(baby.appointments);
    setSelectedBabyImmunization(baby.immunizations);

    setIsSelected(true);
  }

  function handleShowForm() {
    setShowForm((showForm) => !showForm);
  }

  //////////////// Render new/updated/ w/o deleted milestone on DOM ///////////////

  function handlePostRequest(newMilestone) {
    setSelectedBabyMilestone([...selectedBabyMileStone, newMilestone]);
  }


  function handlePatchRequest(updatedMilestone) {
    const baby = babies.find((baby) => baby.id === updatedMilestone.baby_id);
    const updatedMilestones = baby.milestones.map((mile) =>
      mile.id === updatedMilestone.id ? updatedMilestone : mile
    );

    setSelectedBabyMilestone(updatedMilestones);
  }


  function handleDeleteRequest(deletedMilestone) {
    const baby = babies.find((baby) => baby.id === deletedMilestone.baby_id);
    const updatedMilestones = baby.milestones.filter(
      (mile) => mile.id !== deletedMilestone.id
    );

    setSelectedBabyMilestone(updatedMilestones)
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
          milestones={selectedBabyMileStone}
          onSubmitAddMiles={handlePostRequest}
          onSubmitUpdateMiles={handlePatchRequest}
          onClickDeleteMiles={handleDeleteRequest}
        />
      ) : null}
    </div>
  );
}

export default LogbookPage;
