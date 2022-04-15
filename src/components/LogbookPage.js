import React from "react";
import BabyLogList from "./BabyLogList";
import BabyLogForm from "./BabyLogForm";

function LogbookPage({ babies }) {
  const babylist = babies.map((baby) => (
    <BabyLogList key={baby.id} baby={baby} />
  ));

  return (
    <div>
      <BabyLogForm />
      {babylist}
    </div>
  );
}

export default LogbookPage;
