import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
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
        <Route path="/" element={<Layout />} />
        <Route path="/:id" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
