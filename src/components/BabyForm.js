import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";

function BabyForm({ onSubmitAddBaby, onClickClose }) {
  const [formData, setFormData] = useState({
    name: "",
    baby_image_url: "",
    birthday: "",
  });

  ////////////////////// Add baby ///////////////////////

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
    onClickClose();
  }

  //////////////////////////////////////////////////////
  

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
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                value={formData.baby_image_url}
                onChange={handleChange}
                name="baby_image_url"
                placeholder="Icon Image URL"
                required
              />
            </Form.Group>
            <br />
            <Form.Group style={{ textAlign: "left", fontSize: "15px" }}>
              <Form.Label>Birth date:</Form.Label>
              <Form.Control
                value={formData.birthday}
                onChange={handleChange}
                type="date"
                name="birthday"
                required
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
                required
              />
              <Form.Check
                inline
                onChange={handleChange}
                type="radio"
                name="sex"
                id="boy"
                value="Boy"
                label="Boy"
                required
              />
            </Form.Group>
            <br />
            <style type="text/css">
              {`
              .btn-flat {
                background-color: #f1b988;
                color: white;
              }
              `}
            </style>
            <Button variant="flat" type="submit" value="Add">
              Add
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default BabyForm;
