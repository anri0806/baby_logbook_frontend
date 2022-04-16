import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./NavBar";
import Home from "./Home";
import LogbookPage from "./LogbookPage";


function App() {
  const [babies, setBabies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/babies")
      .then((res) => res.json())
      .then((data) => setBabies(data));
  }, []);


  return (
    <div>
      <NavBar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/logbook" element={<LogbookPage babies={babies} />} />
      </Routes>
    </div>
  );
}

export default App;
