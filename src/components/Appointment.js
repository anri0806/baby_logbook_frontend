import React from "react"

var moment = require("moment");

function Appointment({selectedBaby}) {

    const babyAppointments = selectedBaby.appointments.map((app) => (
        <div key={app.id}>
          <p>{app.date}</p>
          <p>{moment.parseZone(app.time).format("LT")}</p>
          <p>{app.doctor_name}</p>
          <p>{app.notes}</p>
          <br />
        </div>
      ));

    return (
        <>
        {babyAppointments}
        </>
    )
}

export default Appointment