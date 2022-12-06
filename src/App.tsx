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

  const contrastingColor = (hexColor: string, invert?: boolean) => {
    const pattern:RegExp = /[\da-f]{2}/gi;
    const result = hexColor.match(pattern)?.map(v=>parseInt(v.toLowerCase(),16));
    if (result === undefined) return '#f0f';
    // const lightness = (Math.max(...result) + Math.min(...result)) / 2 / 255;
	// const intensity = result.reduce((acc,cv)=>acc+cv) / 3 / 255;
	const luma = (result[0] * 0.299 + result[1] * 0.587 + result[2] * 0.114) / 255;
    if (luma > 0.5) return invert?'#fff':'#000';
    return invert?'#000':'#fff';
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
        style={{ 
          backgroundColor: displayedColor, 
          color: contrastingColor(displayedColor),
          textShadow: '2px 2px '+contrastingColor(displayedColor, true),
        }}>
          whats my #hex?
      </div>
      <div className="colorButtons">
        {colorChoices.map((e,i)=>
          <button onClick={() => btnClick(e)} key={i}>{e}</button>
        )}
      </div>
      <div className="message">
        {message.text}
        <div style={{
          backgroundColor: message.hex,
          color: contrastingColor(message.hex),
          textShadow: '1px 1px '+contrastingColor(message.hex, true),
        }}>
          {message.hex}
        </div>
      </div>
    </div>
  );
}

export default App;
