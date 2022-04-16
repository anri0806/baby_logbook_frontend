import React, { useState } from "react";
import BabyList from "./BabyList";
import BabyForm from "./BabyForm";
import BabyLog from "./BabyLog";

function LogbookPage({ babies }) {
  const [selectedBaby, setSelectedBaby] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  function handleClick(babyId) {
    const selectedBaby = babies.find((baby) => baby.id === babyId);
    setSelectedBaby(selectedBaby);
    setIsSelected(true);
  }

  return (
    <div>
      <BabyForm />
      <BabyList babies={babies} onClickRender={handleClick} />
      {isSelected ? <BabyLog selectedBaby={selectedBaby} /> : null}
    </div>
  );
}

export default LogbookPage;
