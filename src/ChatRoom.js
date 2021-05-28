import React, { useRef, useState, useEffect } from "react";

import uniqid from "uniqid";

import morse from "morse";
import owoify from "owoify-js";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatRoom(params) {
  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      localStorage.setItem("id", uniqid());
    }
  }, []);

  const dummy = useRef();
  const messagesRef = firebase.firestore().collection(params.id);
  const query = messagesRef.orderBy("createdAt").limit(100);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    setFormValue("");

    if (params.id === "owo") {
      await messagesRef.add({
        text: owoify(formValue),
        by: localStorage.getItem("id"),
        urlId: params.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    if (params.id === "emoji") {
      await messagesRef.add({
        text: formValue,
        by: localStorage.getItem("id"),
        urlId: params.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    if (params.id === "morse") {
      await messagesRef.add({
        text: morse.encode(formValue),
        by: localStorage.getItem("id"),
        urlId: params.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          maxLength="500"
          placeholder="Type a message"
        />

        <button type="submit" disabled={!formValue}>
          》
        </button>
      </form>
    </>
  );
}

function emojifyText(text) {
  var emojify = {
    A: "🅰️",
    B: "🧇",
    C: ["©️", "☪️"],
    D: "↩️",
    E: "📧",
    F: "F",
    G: "⛽️",
    H: "♓️",
    I: "ℹ️",
    J: "☔",
    K: "K",
    L: "🕒",
    M: ["Ⓜ️", "♏️", "♍️", "〽"],
    N: "📈",
    O: ["🅾️", "⭕️"],
    P: "🅿️",
    Q: "Q",
    R: "®️",
    S: ["⚡️"],
    T: "✝️",
    U: "⛎",
    V: "♈️",
    W: "〰️",
    X: ["❎", "❌", "✖️"],
    Y: "🌱",
    Z: "💤",
    Ä: "👀",
    Å: "✋🏼",
    Ö: "💡",
    "!": ["❗️", "❕"],
    "?": ["❓", "❔"],
    "#": "#️⃣",
    "*": "*️⃣",
    "+": "➕",
    0: "0️⃣",
    1: "1️⃣",
    2: "2️⃣",
    3: "3️⃣",
    4: "4️⃣",
    5: "5️⃣",
    6: "6️⃣",
    7: "7️⃣",
    8: "8️⃣",
    9: "9️⃣",
  };
  var emojifiedText = "";
  for (var i = 0; i < text.length; i++) {
    let letter = emojify[text.charAt(i).toUpperCase()];
    if (letter == null) {
      letter = emojify["B"];
    }
    emojifiedText += letter;
  }
  return emojifiedText;
}

function ChatMessage(props) {
  const { text, by, urlId } = props.message;
  const messageClass = by === localStorage.getItem("id") ? "sent" : "received";
  console.log(urlId);
  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={`http://evatar.io/${by}ddg.png`} alt="avatar" />
        {urlId === "emoji" ? <p>{emojifyText(text)}</p> : <p>{text}</p>}
      </div>
    </>
  );
}

export default ChatRoom;
