import React from "react";
import "../components/Home.css";
import { useLocation } from "react-router-dom";

function Home() {
  let location = useLocation();

  return (
    <div className="home-container">
      <div>
        <h1>{location.state.pageinfo}</h1>
      </div>
    </div>
  );
}

export default Home;
