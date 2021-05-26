import React, { useRef, useState, useEffect } from "react";

import uniqid from "uniqid";

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
    await messagesRef.add({
      text: formValue,
      by: localStorage.getItem("id"),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
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

function ChatMessage(props) {
  const { text, by } = props.message;
  const messageClass = by === localStorage.getItem("id") ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={`http://evatar.io/${by}ddg.png`} alt="avatar" />
        <p>{text}</p>
      </div>
    </>
  );
}

export default ChatRoom;
