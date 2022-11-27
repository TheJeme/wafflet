import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { FiArrowLeft, FiShare2 } from "react-icons/fi";

import ChatRoom from "./ChatRoom";

import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 6);

function App() {
  const params = useParams();
  const history = useHistory();

  return (
    <div>
      <header>
        {!params?.id ? (
          <>
            <img
              style={{ visibility: "hidden" }}
              src={`https://evatar.io/${localStorage.getItem(
                "id"
              )}.png`}
              alt="avatar"
            />
            <h1>Wafflet</h1>
            <img
              src={`https://evatar.io/${localStorage.getItem(
                "id"
              )}.png`}
              alt="avatar"
            />
          </>
        ) : (
          <>
            <FiArrowLeft
              size={40}
              className="clickable"
              onClick={() => history.push("")}
            />
            <h1>Wafflet-{params.id}</h1>
            <FiShare2
              size={40}
              className="clickable"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://wafflet.netlify.com/${params.id}`
                )
              }
            />
          </>
        )}
      </header>

      <section>
        {!params?.id ? (
          <>
            <div>
              <h1 className="frontheader">Choose chat</h1>
              <button
                className="frontdiv"
                onClick={() => history.push("public")}
              >
                Public
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
            <h1 className="frontheader-alt">Or</h1>
            <button
              className="frontdiv"
              onClick={() => history.push(nanoid(6))}
            >
              Create New Private Chat
            </button>
          </>
        ) : (
          <ChatRoom id={params.id} />
        )}
      </section>
    </div>
  );
}

export default App;
