import React from "react";

function BabyLogList({ baby }) {
  return (
    <div>
      <img
        src={baby.baby_image_url}
        alt={baby.name}
        style={{ width: "200px" }}
      />
      <h3>{baby.name}</h3>
      <p>{baby.sex}</p>
      <p>{baby.birthday}</p>
    </div>
  );
}

export default BabyLogList;
