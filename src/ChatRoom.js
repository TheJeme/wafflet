import React, { useRef, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, limit, serverTimestamp } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatRoom(params) {
  const app = initializeApp({
    apiKey: "AIzaSyDn0CsqD1u4fpK0hhoSYeQP5HSpRHXyroA",
    authDomain: "wafflet-chat.firebaseapp.com",
    projectId: "wafflet-chat",
    storageBucket: "wafflet-chat.appspot.com",
    messagingSenderId: "1077477497384",
    appId: "1:1077477497384:web:cf5c28be958a23c9bd731d",
    measurementId: "G-H4XBJXBC0X",
  });

  const firestore = getFirestore(app);

  const dummy = useRef();
  const messagesRef = collection(firestore, params.id);
  const [formValue, setFormValue] = useState("");
  const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(1000));
  const [messages] = useCollectionData(messagesQuery, { idField: "id" });

  useEffect(() => {
    dummy.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    setFormValue("");
    await addDoc(messagesRef, {
      text: formValue,
      uid: uid,
      createdAt: serverTimestamp(),
    });
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <main>
        {messages?.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
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

function ChatMessage(props) {
  const { text, uid } = props.message;
  const messageClass = uid === localStorage.getItem("uid") ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <img src={`https://robohash.org/${uid}`} alt="avatar" />
      <p>{text}</p>
    </div>
  );
}

export default ChatRoom;
