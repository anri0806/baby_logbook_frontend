import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  function handleSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((currentUser) => console.log(currentUser));

    setFormData({
      username: "",
      password: "",
    });
  }

  return (
    <>
      <Container>
        <Form className="login-form" onSubmit={handleSubmit}>
          <h4>Welcome back!</h4>
          <br />
          <Form.Group>
            <Form.Control
              value={formData.username}
              onChange={handleChange}
              name="username"
              placeholder="Username"
              className="login-form-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              value={formData.password}
              onChange={handleChange}
              name="password"
              placeholder="Password"
              className="login-form-input"
            />
          </Form.Group>
          <Button type="submit" className="login-form-button">
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Login;
