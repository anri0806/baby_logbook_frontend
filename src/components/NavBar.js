import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Navbar, Nav } from "react-bootstrap";

function NavBar({ onLogout }) {
  
  function handleClick() {
    fetch("http://localhost:9292/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <div>
      <Navbar
        fixed="bottom"
        variant="dark"
        className="justify-content-center"
        style={{ backgroundColor: "#f8c395", fontSize: "23px" }}
      >
        <Nav>
          <Nav.Link style={{ marginLeft: "20px" }} href="/logbook">
            Logbook
          </Nav.Link>
          <Nav.Link onClick={handleClick} style={{ marginLeft: "20px" }}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
