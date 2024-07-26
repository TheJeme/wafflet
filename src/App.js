import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Landing";
import Chat from "./Chat";
import Poll from "./Poll";
import NotFound from "./NotFound";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdefghkmnopqrstuvwxyz", 36);

function App() {
  React.useEffect(() => {
    if (localStorage.getItem("uid") === null) {
      localStorage.setItem("uid", nanoid());
    }
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/c/:id" element={<Chat />} />
        <Route path="/p/:id" element={<Poll />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
