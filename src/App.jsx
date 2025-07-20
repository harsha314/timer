import { useState } from "react";
import "./App.css";
import Timer from "./Timer.jsx";

function App() {
  const [timers, setTimers] = useState();

  return (
    <>
      {/* <input type="text" placeholder="timer name"></input> */}
      {/* <button>add timer</button> */}
      <Timer></Timer>
    </>
  );
}

export default App;
