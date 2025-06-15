import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Homepage from "./assets/Component/Home-page";
import Login from "./assets/Component/Login";
import Register from "./assets/Component/Register";
import Addpost from "./assets/Component/Addpost";
import WelcomePage from "./assets/Component/Welcome-page";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/posts" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<Addpost />} />
      </Routes>
    </>
  );
}

export default App;
