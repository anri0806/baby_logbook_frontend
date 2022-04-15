import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Link to="/">home</Link>
      {" "}
      <Link to="/logbook">logbook</Link>
    </div>
  );
}

export default NavBar;
