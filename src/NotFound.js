import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <img
          style={{ visibility: "hidden" }}
          src={`https://robohash.org/${localStorage.getItem("uid")}`}
          alt="hidden"
        />
        <h1>Wafflet</h1>
        <img
          src={`https://robohash.org/${localStorage.getItem("uid")}`}
          alt="avatar"
        />
      </header>

      <section>
        <div className="start">
          <h1>404 - Not found</h1>
          <button
            className="front-div"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </section>
    </div>
  );
}

export default Landing;
