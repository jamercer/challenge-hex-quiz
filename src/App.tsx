import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [colorChoices, setColorChoices] = useState<string[]>([]);
  const [displayedColor, setDisplayedColor] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    createNewQuiz();
  }, []);

  const createNewColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
  };

  const createNewQuiz = () => {
    // create 3 new colors
    // choose one to display
    const colors = [createNewColor(), createNewColor(), createNewColor()];
    setColorChoices(colors);
    setDisplayedColor(colors[Math.floor(Math.random() * 3)]);
  };

  const btnClick = (hex: string) => {
    if (hex === displayedColor) {
      // u win!
      setMessage("correct!");
    } else {
      // u loose!
      setMessage("incorrect!");
    }
    createNewQuiz();
  };

  return (
    <div className="App">
      <div
        className="colorDisplay"
        style={{ backgroundColor: "#" + displayedColor }}
      ></div>
      <div className="colorButtons">
        {colorChoices.map((e,i)=>
          <button onClick={() => btnClick(e)} key={i}>{e}</button>
        )}
      </div>
      <div className="message">
        {message.text}
        <div style={{backgroundColor: message.hex}}>{message.hex}</div>
      </div>
    </div>
  );
}

export default App;
