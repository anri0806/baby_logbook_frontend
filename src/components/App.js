import React from "react";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";

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

  // console.log(babies)

  return (
    <div className="App">
      <NavBar />
      {/* <Switch> */}
        {/* <Route exact path="/"> */}
          <Home />
        {/* </Route>
        <Route path="/logbook"> */}
          <LogbookPage />
        {/* </Route> */}
      {/* </Switch> */}
    </div>
  );
}

export default App;
