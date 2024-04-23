import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ChatRoom from "./ChatRoom";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghkmnopqrstuvwxyz", 8);

function App() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <header>
        {!params?.id ? (
          <>
            <img
              style={{ visibility: "hidden" }}
              src={`https://robohash.org/${localStorage.getItem("uid")}`}
              alt="avatar"
            />
            <h1>Wafflet</h1>
            <img
              src={`https://robohash.org/${localStorage.getItem("uid")}`}
              alt="avatar"
            />
          </>
        ) : (
          <>
            <FiArrowLeft
              size={40}
              className="clickable"
              onClick={() => navigate("/")}
            />
            <h1>Chat-{params.id}</h1>
          </>
        )}
      </header>

      <section>
        {!params?.id ? (
          <button
            className="front-div"
            onClick={() => navigate(nanoid(6))}
          >
            Create new chat
          </button>
        ) : (
          <ChatRoom id={params.id} />
        )}
      </section>
    </div>
  );
}

export default App;
