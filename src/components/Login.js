import React from "react";
import { Form, Container, Button } from "react-bootstrap";

function Login() {
  return (
    <>
      <Container>
        <Form className="login-form">
          <Form.Group>
            <Form.Control name="username" placeholder="Username" />
          </Form.Group>
          <Form.Group>
            <Form.Control name="password" placeholder="Password" />
          </Form.Group>
          <Button variant="light" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Login;
