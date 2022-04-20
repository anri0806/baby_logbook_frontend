import React from "react";
import Table from "react-bootstrap/Table";

import Immunization from "./Immunization";

function MilestoneContainer({ immunizations, onClickDeleteImm }) {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Vaccine</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {immunizations.map((imm) => (
            <Immunization
              key={imm.id}
              imm={imm}
              onClickDeleteImm={onClickDeleteImm}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default MilestoneContainer;
