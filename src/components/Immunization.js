import React from "react";

function Immunization({ imm, onClickDeleteImm }) {


  ////////////////// Delete immunization /////////////////

  function handleDelete() {
    fetch(`http://localhost:9292/immunizations/${imm.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedItem) => onClickDeleteImm(deletedItem));
  }

  //////////////////////////////////////////////////////////

  return (
    <>
      <tr>
        <td>
          <p>{imm.date}</p>
        </td>
        <td>
          <p>{imm.vaccine}</p>
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

export default Immunization;
