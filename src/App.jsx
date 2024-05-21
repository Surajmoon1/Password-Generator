import { useState, useCallback, useEffect, useRef } from "react";
import "./index.css";

export default function App() {
  const [numberAllow, setNumberAllow] = useState(false);
  const [symbolAllow, setSymbolAllow] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const copyPassword = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuwxyz";

    if (numberAllow) str += "1234567890";
    if (symbolAllow) str += "~!@#$%^&*-_";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [numberAllow, symbolAllow, length, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [numberAllow, symbolAllow, length]);
  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="input">
        <input type="text" readOnly value={password} ref={passRef} />
        <button onClick={copyPassword}>Copy</button>
      </div>
      <div className="allowInput">
        <input
          type="range"
          value={length}
          min={8}
          max={20}
          onChange={(e) => setLength(e.target.value)}
        />
        <label>Length: {length}</label>
        <input
          type="checkbox"
          onChange={() => setNumberAllow((prev) => !prev)}
        />
        <label htmlFor="">Number</label>
        <input
          type="checkbox"
          onChange={() => setSymbolAllow((prev) => !prev)}
        />
        <label htmlFor="">Symbols</label>
      </div>
    </div>
  );
}
