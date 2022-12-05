import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [colorChoices, setColorChoices] = useState<string[]>([]);
  const [displayedColor, setDisplayedColor] = useState<string>("");
  const [message, setMessage] = useState<{text: string, hex: string}>({text:'', hex:''});

  useEffect(() => {
    createNewQuiz();
  }, []);

  const createNewColor = () => {
    let value = '#' + Math.floor(Math.random() * 16777215).toString(16); // 256 ^ 3 base 16
    while (value.length < 7) value = value + '0'; // it doesn't add a 0 sometimes??
    return value;
  };

  const contrastingColor = (hexColor: string) => {
    const pattern:RegExp = /[0-9a-f]{2}/gi;
    const result = hexColor.match(pattern)?.map(v=>parseInt(v.toLowerCase(),16));
    console.log(result);
    if (result === undefined) return '#ffff00';
    const maxValue = Math.max(...result);
    const minValue = Math.min(...result);
    const lum = (maxValue + minValue) / 2;
    console.log(maxValue, minValue, lum);
    if (lum > 127) return '#000000';
    return '#ffffff';
  }

  const createNewQuiz = () => {
    // create 3 new colors
    const colors = [createNewColor(), createNewColor(), createNewColor()];
    setColorChoices(colors);
    // choose one to display
    setDisplayedColor(colors[Math.floor(Math.random() * 3)]);
  };

  const btnClick = (hex: string) => {
    if (hex === displayedColor) {
      // u win!
      setMessage({text: "correct!", hex: displayedColor});
    } else {
      // u loose!
      setMessage({text:"incorrect!", hex: displayedColor});
    }
    createNewQuiz();
  };

  return (
    <div className="App">
      <div
        className="colorDisplay"
        style={{ backgroundColor: displayedColor }}
      ></div>
      <div className="colorButtons">
        {colorChoices.map((e,i)=>
          <button onClick={() => btnClick(e)} key={i}>{e}</button>
        )}
      </div>
      <div className="message">
        {message.text}
        <div style={{backgroundColor: message.hex, color: contrastingColor(message.hex)}}>
          {message.hex}
          </div>
      </div>
    </div>
  );
}

export default App;
