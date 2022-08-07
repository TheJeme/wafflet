import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { FaShareSquare } from "react-icons/fa";

import uniqid from "uniqid";

import ChatRoom from "./ChatRoom";

function App() {
  const params = useParams();
  const history = useHistory();

  return (
    <div>
      <header>
        {!params?.id ? (
          <>
            <div />
            <h1 className="navheader">Wafflet</h1>
          </>
        ) : (
          <>
            <button onClick={() => history.push("")}>{"«"}</button>
            <h1
              className="navheader clickable"
              onClick={() =>
                navigator.clipboard.writeText(
                  `wafflet.netlify.com/${params.id}`
                )
              }
            >
              Wafflet-{params.id}
            </h1>
            <FaShareSquare />
          </>
        )}
      </header>

      <section>
        {!params?.id ? (
          <>
            <div>
              <h1 className="frontheader">Choose chat</h1>
              <button className="frontdiv" onClick={() => history.push("owo")}>
                OwO
              </button>
              <button
                className="frontdiv"
                onClick={() => history.push("emoji")}
              >
                Emoji
              </button>
              <button
                className="frontdiv"
                onClick={() => history.push("morse")}
              >
                Morse
              </button>
            </div>
            <button
              className="frontdiv"
              onClick={() => history.push(uniqid(6))}
            >
              Create New Chat Room
            </button>
            <input placeholder="Join by id" />
          </>
        ) : (
          <ChatRoom id={params.id} />
        )}
      </section>
    </div>
  );
}

export default App;
