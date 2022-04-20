import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";

function BabyForm({ onSubmitAddBaby, onClickClose }) {
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
    <div className="popup_box">
      <div className="box">
        <p className="close_button" onClick={onClickClose}>
          <i className="bi bi-x-circle"></i>
        </p>
        <h5>Add baby</h5>
        <br />
        <Container>
          <Form onSubmit={handleSubmitBaby}>
            <Form.Group>
              <Form.Control
                value={formData.name}
                onChange={handleChange}
                name="name"
                placeholder="Baby's name"
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                value={formData.baby_image_url}
                onChange={handleChange}
                name="baby_image_url"
                placeholder="Icon Image URL"
              />
            </Form.Group>
            <br />
            <Form.Group style={{textAlign: "left", fontSize: "15px"}}>
              <Form.Label>Birth date:</Form.Label>
              <Form.Control
                value={formData.birthday}
                onChange={handleChange}
                type="date"
                name="birthday"
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Check
                inline
                onChange={handleChange}
                type="radio"
                name="sex"
                id="girl"
                value="Girl"
                label="Girl"
              />
              <Form.Check
                inline
                onChange={handleChange}
                type="radio"
                name="sex"
                id="boy"
                value="Boy"
                label="Boy"
              />
            </Form.Group>
            <br />
            <input type="submit" value="Add" />
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default BabyForm;
