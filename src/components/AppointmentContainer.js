import React from "react";
import Table from "react-bootstrap/Table";

import Appointment from "./Appointment";

function MilestoneContainer({ appointments, onClickDeleteApp }) {
  return (
    <>
      <Table striped>
        <thead style={{color: "#595959"}}>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor Name</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{color: "#595959"}}>
          {appointments.map((app) => (
            <Appointment
              key={app.id}
              app={app}
              onClickDeleteApp={onClickDeleteApp}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default MilestoneContainer;
