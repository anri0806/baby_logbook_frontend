import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";

function Signup({ onSignup }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:9292/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newUser) => onSignup(newUser));

    setFormData({
      username: "",
      password: "",
      password_confirmation: "",
    });
  }

  return (
    <>
      <Container>
        <Form className="login-form" onSubmit={handleSubmit}>
          <h4>Signup</h4>
          <br />
          <Form.Group>
            <Form.Control
              value={formData.username}
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Username"
              className="login-form-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              value={formData.password}
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
              className="login-form-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              value={formData.password_confirmation}
              onChange={handleChange}
              name="password_confirmation"
              type="password"
              placeholder="Password confirmation"
              className="login-form-input"
            />
          </Form.Group>
          <Button type="submit" className="login-form-button">
            Signup
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Signup;
