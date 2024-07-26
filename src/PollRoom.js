import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdefghkmnopqrstuvwxyz", 36);

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

  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([{text: "", votes: 0, id: nanoid()}, {text: "", votes: 0, id: nanoid()}, {text: "", votes: 0, id: nanoid()}]);
  const [voters, setVoters] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const [isCreated, setIsCreated] = useState(null);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const getPoll = async () => {
      const pollRef = doc(firestore, "polls", params.id);
      const pollDoc = await getDoc(pollRef);
      if (pollDoc.exists()) {
        setTitle(pollDoc.data().title);
        setOptions(pollDoc.data().options);
        setVoters(pollDoc.data().voters);
        setIsVoted(pollDoc.data().voters.includes(uid));
        setIsCreated(true);
      } else {
        setIsCreated(false)
      }
    };
    getPoll();
  }, [params.id, firestore, uid]);

  const sendVote = async (index) => {
    setIsVoted(true);
    if (isVoted) {
      return;
    }
  
    const pollRef = doc(firestore, "polls", params.id);
    const pollDoc = await getDoc(pollRef);
  
    if (pollDoc.exists()) {
      const pollData = pollDoc.data();
      const updatedOptions = [...pollData.options];
      updatedOptions[index].votes += 1;
  
      const updatedVoters = [...pollData.voters, uid];
  
      await setDoc(pollRef, {
        title: pollData.title,
        options: updatedOptions,
        uid: pollData.uid,
        id: pollData.id,
        voters: updatedVoters,
        createdAt: pollData.createdAt,
      });
  
      setOptions(updatedOptions);
      setVoters(updatedVoters);
    }
  };

  const createPoll = async (e) => {
    e.preventDefault();

    if (title === "" || options.length === 0 || options.find((option) => option.text === "")) {
      alert("Title and options cannot be empty");
      return;
    }

    await setDoc(doc(firestore, "polls", params.id), {
      title: title,
      options: options,
      uid: uid,
      id: params.id,
      voters: voters,
      createdAt: serverTimestamp(),
    });
    setIsCreated(true);
  };

  const newOption = () => {
    setOptions([...options, {text: "", votes: 0, id: nanoid()}]);
  };


  const deleteOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <main>
      {isCreated === true && <div>
        <h1>{title}</h1>
        <div className="polls">
        {options?.map((option, index) =>  <div className="row" key={option.id}>
          <div className='poll'>
            <div className="row">
              <p>{option.votes} votes</p>
              <p>{voters.length > 0 ? option.votes / voters.length * 100 : 0}%</p>
            </div>
            <p>{option.text}</p>
          </div>
            <button className="vote-button" disabled={isVoted} onClick={() => sendVote(index)}>Vote</button>
          </div>
        )}
        </div>
        <h2>Total votes {voters.length}</h2>
      </div>}
      {isCreated === false && <div>
        <h1>New Poll</h1>
        <h2>Title</h2>
        <input
          maxLength="1000"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <h2>Options</h2>
          {options.map((option, index) => (
          <div className="row" key={option.id}>
            <input
              maxLength="1000"
              value={option.text}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index].text = e.target.value;
                setOptions(newOptions);
              }}
              placeholder={`Option ${index + 1}`}
            />
            <button className="option-button" onClick={() => deleteOption(index)}>-</button>
          </div>
          ))}
          <button className="option-button" onClick={newOption}>+</button>
        </div>
        <button className="front-div" onClick={createPoll}>Create</button>  
      </div>}
    </main>
  );
}

export default ChatRoom;
