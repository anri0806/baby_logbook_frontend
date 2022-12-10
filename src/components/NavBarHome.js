import React from "react";
import { Button } from "react-bootstrap";

function NavBarHome() {
  return (
    <div className="login-signup-btn">
      <Button href="/login" variant="light" style={{ margin: "10px" }}>
        Login
      </Button>
      <Button href="/signup" variant="light" style={{ margin: "10px" }}>
        Signup
      </Button>
    </div>
  );
}

export default NavBarHome;
