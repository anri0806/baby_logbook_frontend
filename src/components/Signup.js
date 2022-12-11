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
  const [errors, setErrors] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();


    fetch("http://localhost:9292/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newUser) => {
          console.log(newUser);
          onSignup(newUser);
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });

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
          <Form.Group>
            <Form.Control
              value={formData.password_confirmation}
              onChange={handleChange}
              name="password_confirmation"
              type="password"
              placeholder="Password confirmation"
              className="login-form-input"
              required
            />
          </Form.Group>
          <Button type="submit" className="login-form-button">
            Signup
          </Button>
          {errors ? (
            <>
              {errors.map((err) => (
                <p className="error" key={err}>{err}</p>
              ))}
            </>
          ) : null}
        </Form>
      </Container>
    </>
  );
}

export default Signup;
