import React from "react";
import { useNavigate } from "react-router-dom";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghkmnopqrstuvwxyz", 8);

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
          <button
            className="front-div"
            onClick={() => navigate("c/" + nanoid(6))}
          >
            Create new chat
          </button>
          <button
            className="front-div"
            onClick={() => navigate("p/" + nanoid(6))}
          >
            Create new poll
          </button>
        </div>
      </section>
    </div>
  );
}

export default Landing;
