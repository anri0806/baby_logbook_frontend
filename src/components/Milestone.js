import React from "react";

function Milestone({ milestone, onClickDeleteMile }) {


  ////////////////// Delete milestone /////////////////

  function handleDelete() {
    fetch(`http://localhost:9292/milestones/${milestone.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedItem) => onClickDeleteMile(deletedItem));
  }


  return (
    <>
      <tr>
        <td>
          <p>{milestone.date}</p>
        </td>
        <td>
          <p>{milestone.development}</p>
        </td>
        <td>
          <p>{milestone.notes}</p>
        </td>
        <td>
          <button className="delete_button" onClick={handleDelete}>
            <i className="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    </>
  );
}

export default Milestone;
