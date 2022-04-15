import React from "react";
import BabyList from "./BabyList";
import BabyForm from "./BabyForm";

function LogbookPage({ babies }) {
  const babylist = babies.map((baby) => (
    <BabyList key={baby.id} baby={baby} />
  ));

  return (
    <div>
      <BabyForm />
      {babylist}
    </div>
  );
}

export default LogbookPage;
