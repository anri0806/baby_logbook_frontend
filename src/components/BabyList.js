import React from "react";

function BabyList({ babies, onClickRender, isSelected, selectedBaby }) {
  // console.log(isSelected);
  // console.log(selectedBaby)

  const babyList = babies.map((baby) => (
    <div
      key={baby.id}
      onClick={() => onClickRender(baby.id)}
      className="baby_list"
    >
      <img src={baby.baby_image_url} alt={baby.name} className="icon_image" />
      <br />
      <p id="baby_name">{baby.name}</p>
      <div className="profile">
        <p className="p2">
          <i className="bi bi-person"></i> {baby.sex}
        </p>
        <br />
        <p className="p2">
          <i className="bi bi-balloon"></i> {baby.birthday}
        </p>
      </div>
    </div>
  ));

  return <>{babyList}</>;
}

export default BabyList;
