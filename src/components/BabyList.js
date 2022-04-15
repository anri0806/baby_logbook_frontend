import React, { useEffect, useState } from "react";
import Log from "./BabyLog";
import LogForm from "./BabyLogForm";

function BabyList({ baby }) {
  const [babyDetails, setBabyDetails] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/babies/${baby.id}`)
      .then((res) => res.json())
      .then((babyInfo) => {
        setBabyDetails(babyInfo);
        // const milestones = babyInfo.milestones.map((milestone) => {
        //   console.log(milestone.development)
        // })
      });
  }, []);

  // console.log(babyDetails.milestones)

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
      <br />
      <Log babyDetails={babyDetails} />
      <LogForm />
    </div>
  );
}

export default BabyList;
