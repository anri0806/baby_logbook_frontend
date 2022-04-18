import React, { useState } from "react";
import BabyList from "./BabyList";
import BabyForm from "./BabyForm";
import BabyLog from "./BabyLog";

function LogbookPage({ babies, onSubmitAddBaby }) {
  const [selectedBaby, setSelectedBaby] = useState(null);
  const [selectedBabyMileStone, setSelectedBabyMilestone] = useState([]);

  const [isSelected, setIsSelected] = useState(false);
  const [showForm, setShowForm] = useState(false);

// 2. Add get request for milestone?
//    1. fetch request on handleClick in LogbookPage.js
//    const miles = fetchedData.filter.....data.baby_id === babyId(clicked one) 
//    then setMilestones(miles) <= array
//    2. then iterate & render in milestone


  //////////// Store selected baby logs & Display them on Click ////////////

  function handleClick(babyId) {
    const baby = babies.find((baby) => baby.id === babyId);
    setSelectedBaby(baby);
    setIsSelected(true);

    ///////////

    fetch("http://localhost:9292/milestones")
    .then((res) => res.json())
    .then((milestones) => {
      const selectedMilestones = milestones.filter((mile) => mile.baby_id === babyId)
      setSelectedBabyMilestone(selectedMilestones)
    });

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
