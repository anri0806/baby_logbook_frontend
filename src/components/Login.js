import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:9292/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        // console.log(res);
        res.json().then((currentUser) => onLogin(currentUser));
      } else {
        res.json().then((err) => setError(err.error));
      }
    });

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
              type="text"
              placeholder="Username"
              className="login-form-input"
              required
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
              required
            />
          </Form.Group>
          <Button type="submit" className="login-form-button">
            Login
          </Button>
          {error ? <p className="error">{error}</p> : null}
        </Form>
      </Container>
    </>
  );
}

export default Login;
