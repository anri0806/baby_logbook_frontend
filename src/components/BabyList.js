import React from "react";

function BabyList({ babies, onClickRender }) {
  const babyList = babies.map((baby) => (
    <div
      key={baby.id}
      onClick={() => onClickRender(baby.id)}
      className="baby_list"
    >
      <img
        src={baby.baby_image_url}
        alt={baby.name}
        style={{ width: "200px" }}
      />
      <h3>{baby.name}</h3>
    </div>
  ));

  return <>{babyList}</>;
}

export default BabyList;
