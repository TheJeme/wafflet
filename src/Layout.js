import React from "react";

import ChatRoom from "./ChatRoom";

function App(params) {
  return (
    <div>
      <header>
        {params.id === "frontpage" ? (
          <>
            <div />
            <h1 className="navheader">Wafflet</h1>
          </>
        ) : (
          <>
            <button onClick={() => window.open(`/`, "_self")}>{"«"}</button>
            <h1 className="navheader">
              Wafflet-{params.id[0].toUpperCase() + params.id.substring(1)}
            </h1>
          </>
        )}
      </header>

      <section>
        {params.id === "frontpage" ? (
          <>
            <div>
              <h1 className="frontheader">Choose chat</h1>
              <button
                className="frontdiv"
                onClick={() => window.open(`/owo`, "_self")}
              >
                OwO
              </button>
              <button
                className="frontdiv"
                onClick={() => window.open(`/emoji`, "_self")}
              >
                Emoji
              </button>
              <button
                className="frontdiv"
                onClick={() => window.open(`/morse`, "_self")}
              >
                Morse
              </button>
            </div>
            <form>
              <input disabled="true" />
              <button disabled="true"></button>
            </form>{" "}
          </>
        ) : (
          <ChatRoom id={params.id} />
        )}
      </section>
    </div>
  );
}

export default App;
