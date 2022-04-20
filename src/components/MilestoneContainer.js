import React from "react";
import Table from "react-bootstrap/Table";

import Milestone from "./Milestone";

function MilestoneContainer({ milestones, onClickDeleteMile }) {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Development</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((milestone) => (
            <Milestone
              key={milestone.id}
              milestone={milestone}
              onClickDeleteMile={onClickDeleteMile}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default MilestoneContainer;