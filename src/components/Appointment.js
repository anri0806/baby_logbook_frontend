import React from "react";

var moment = require("moment");

function Appointment({ app, onClickDeleteApp }) {
  /////////////////// Delete milestone /////////////////

  function handleDelete() {
    fetch(`http://localhost:9292/appointments/${app.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedItem) => onClickDeleteApp(deletedItem));
  }

  return (
    <>
      <tr>
        <td>
          <p>{app.date}</p>
        </td>
        <td>
          <p>{moment.parseZone(app.time).format("LT")}</p>
        </td>
        <td>
          <p>{app.doctor_name}</p>
        </td>
        <td>
          <p>{app.notes}</p>
        </td>
        <td>
          <button className="log_button" onClick={handleDelete}>
            <i className="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    </>
  );
}

export default Appointment;
