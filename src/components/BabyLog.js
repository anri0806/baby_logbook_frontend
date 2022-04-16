import React from "react";

var moment = require("moment");
//START FROM HERE - Create compo for each below **move moment as well

function BabyLog({ selectedBaby }) {
  const babyMilestones = selectedBaby.milestones.map((milestone) => (
    <div key={milestone.id}>
      <p>{milestone.development}</p>
      <p>{milestone.notes}</p>
      <p>{moment(milestone.created_at).format("L")}</p>
      <br />
    </div>
  ));

  const babyAppointments = selectedBaby.appointments.map((app) => (
    <div key={app.id}>
      <p>{app.date}</p>
      <p>{moment.parseZone(app.time).format("LT")}</p>
      <p>{app.doctor_name}</p>
      <p>{app.notes}</p>
      <br />
    </div>
  ));

  const babyImmunizations = selectedBaby.immunizations.map((imm) => (
    <div key={imm.id}>
      <p>{imm.vaccine}</p>
      <p>{moment(imm.date).format("L")}</p>
      <br />
    </div>
  ));

  return (
    <div>
      <h4>Milestones</h4>
      {babyMilestones}
      <h4>Appointments</h4>
      {babyAppointments}
      <h4>Immunization</h4>
      {babyImmunizations}
    </div>
  );
}

export default BabyLog;
