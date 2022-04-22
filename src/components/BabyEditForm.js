import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";

function BabyEditForm({ clickedBaby, onSubmitEditBaby, onClickClose }) {
  const [formData, setFormData] = useState({
    name: clickedBaby.name,
    sex: clickedBaby.sex,
    baby_image_url: clickedBaby.baby_image_url,
    birthday: clickedBaby.birthday,
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/babies/${clickedBaby.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedItem) => onSubmitEditBaby(updatedItem));

    onClickClose();
  }

  return (
    <div className="popup_box">
      <div className="box">
        <p className="close_button" onClick={onClickClose}>
          <i className="bi bi-x-circle"></i>
        </p>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                value={formData.name}
                onChange={handleChange}
                type="text"
                name="name"
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                value={formData.sex}
                onChange={handleChange}
                type="text"
                name="sex"
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                value={formData.baby_image_url}
                onChange={handleChange}
                type="text"
                name="baby_image_url"
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                value={formData.birthday}
                onChange={handleChange}
                type="text"
                name="birthday"
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
            <Button variant="flat" type="submit">
              Edit
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default BabyEditForm;
