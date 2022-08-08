import React, { useRef, useState, useEffect } from "react";

import morse from "morse";
import owoify from "owoify-js";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 24);

function ChatRoom(params) {
  const dummy = useRef();
  const messagesRef = firebase.firestore().collection(params.id);
  const [formValue, setFormValue] = useState("");
  const query = messagesRef.orderBy("createdAt").limit(1000);
  const [messages] = useCollectionData(query, { idField: "id" });

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      localStorage.setItem("id", nanoid());
    }
    dummy.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

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
    } else if (params.id === "emoji") {
      await messagesRef.add({
        text: formValue,
        by: localStorage.getItem("id"),
        urlId: params.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else if (params.id === "morse") {
      await messagesRef.add({
        text: morse.encode(formValue),
        by: localStorage.getItem("id"),
        urlId: params.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      await messagesRef.add({
        text: formValue,
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
          maxLength="1000"
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
    C: "☪️",
    D: "↩️",
    E: "📧",
    F: "🔥",
    G: "⛽️",
    H: "♓️",
    I: "🍔",
    J: "☔",
    K: "✨",
    L: "🕒",
    M: "♏️",
    N: "📈",
    O: "⭕️",
    P: "🅿️",
    Q: "🪁",
    R: "🧵",
    S: "⚡️",
    T: "✝️",
    U: "⛎",
    V: "♈️",
    W: "🐰",
    X: "❌",
    Y: "🌱",
    Z: "💤",
    Ä: "👀",
    Å: "✋🏼",
    Ö: "💡",
    "!": "🆗",
    "?": "🆒",
    "#": "⚠️",
    "*": "🔔",
    "+": "💹",
    0: "🈷️",
    1: "🈶",
    2: "🈚",
    3: "🈸",
    4: "🈺",
    5: "🈳",
    6: "🈴",
    7: "🈹",
    8: "🈯",
    9: "🈂️",
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
  return (
    <div className={`message ${messageClass}`}>
      <img src={`https://spryte.herokuapp.com/${by}.png`} alt="avatar" />
      {urlId === "emoji" ? <p>{emojifyText(text)}</p> : <p>{text}</p>}
    </div>
  );
}

export default ChatRoom;
