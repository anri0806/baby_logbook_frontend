import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

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
          <Nav.Link style={{ marginRight: "20px" }} href="/">
            home
          </Nav.Link>
          <Nav.Link style={{ marginLeft: "20px" }} href="/logbook">
            logbook
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
