import React from "react";
import { Button } from "react-bootstrap";

// style={{
//   cursor: "pointer",
//   fontSize: "30px",
//   marginLeft: "95%"
// }}

function Home() {
  return (
    <>
      <div className="login-signup-btn">
        <Button variant="light" style={{ margin: "10px" }}>
          Login
        </Button>
        <Button variant="light" style={{ margin: "10px" }}>
          Signup
        </Button>
      </div>
      <div style={{ textAlign: "center", margin: "15%" }}>
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "100px",
          }}
        >
          Baby Logbook
        </h1>
        <p style={{ fontSize: "30px" }}>
          Your baby's milestone and daily records
        </p>
      </div>
    </>
  );
}

export default Home;
