import React, { useState } from "react";

function BabyForm({ onSubmitAddBaby }) {
  const [formData, setFormData] = useState({
    name: "",
    baby_image_url: "",
    birthday: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;

    if (e.target.type === "radio") {
      value = e.target.value;
    }

    setFormData({ ...formData, [name]: value });
  }

  function handleSubmitBaby(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/babies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newBaby) => onSubmitAddBaby(newBaby));

    setFormData({ name: "", baby_image_url: "", birthday: "" });
  }


  return (
    <div>
      <form onSubmit={handleSubmitBaby}>
        <input
          value={formData.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Baby name"
        />
        <br />
        <input
          onChange={handleChange}
          type="radio"
          name="sex"
          id="girl"
          value="Girl"
        />
        <label>Girl</label>
        <input
          onChange={handleChange}
          type="radio"
          name="sex"
          id="boy"
          value="Boy"
        />
        <label>Boy</label>
        <br />
        <input
          value={formData.baby_image_url}
          onChange={handleChange}
          type="text"
          name="baby_image_url"
          placeholder="Image url"
        />
        <br />
        <label>Birthday:</label>{" "}
        <input
          value={formData.birthday}
          onChange={handleChange}
          type="date"
          name="birthday"
        />
        <br />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

export default BabyForm;
