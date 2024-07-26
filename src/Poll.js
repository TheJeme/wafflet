import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import PollRoom from "./PollRoom";

function App() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <FiArrowLeft
          size={40}
          className="clickable"
          onClick={() => navigate("/")}
        />
        <h1>p/{params.id}</h1>
      </header>

      <section>
        <PollRoom id={params.id} />
      </section>
    </div>
  );
}

export default App;
