import React from "react";

import ChatRoom from "./ChatRoom";

function App(params) {
  return (
    <div>
      <header>
        {params.id === "frontpage" ? (
          <>
            <div />
            <h1>Wafflet</h1>
          </>
        ) : (
          <>
            <button onClick={() => window.open(`/`, "_self")}>{"«"}</button>
            <h1>
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
                onClick={() => window.open(`/general`, "_self")}
              >
                General
              </button>
              <button
                className="frontdiv"
                onClick={() => window.open(`/crypto`, "_self")}
              >
                Crypto
              </button>
              <button
                className="frontdiv"
                onClick={() => window.open(`/games`, "_self")}
              >
                Games
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
