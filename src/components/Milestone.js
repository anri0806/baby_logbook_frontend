import React, { useState } from "react";

function Milestone({ selectedBaby, milestone }) {

  const [showUpdateForm, setShowUpdateForm] = useState(false);


  //////////////// Toggle form ////////////////

  function handleShowUpdateForm() {
    setShowUpdateForm((showUpdateForm) => !showUpdateForm);
  }

  //////////////// Update milestones ////////////////

  

  //////////////////////////////////////////////////////////

  return (
    <>
      <p>{milestone.development}</p>
      <p>{milestone.notes}</p> <p>{milestone.date}</p>
      <button onClick={handleShowUpdateForm}>✏</button>
      <button>🗑</button>
      {showUpdateForm ? (
        <form>
          <input type="text" name="development" />
          <input type="text" name="notes" />
          <input type="text" name="date" />
          <input type="submit" value="Edit" />
        </form>
      ) : null}
      <br />
    </>
  );
}

export default Milestone;
