import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import App from "./App";

firebase.initializeApp({
  apiKey: "AIzaSyDn0CsqD1u4fpK0hhoSYeQP5HSpRHXyroA",
  authDomain: "wafflet-chat.firebaseapp.com",
  projectId: "wafflet-chat",
  storageBucket: "wafflet-chat.appspot.com",
  messagingSenderId: "1077477497384",
  appId: "1:1077477497384:web:cf5c28be958a23c9bd731d",
  measurementId: "G-H4XBJXBC0X",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
