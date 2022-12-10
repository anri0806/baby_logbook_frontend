import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Navbar, Nav } from "react-bootstrap";

// ADD logout link

function NavBar() {
  return (
    <div>
      <Navbar
        fixed="bottom"
        variant="dark"
        className="justify-content-center"
        style={{ backgroundColor: "#f8c395", fontSize: "25px" }}
      >
        <Nav>
          <Nav.Link style={{ marginLeft: "20px" }} href="/logbook">
            logbook
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
