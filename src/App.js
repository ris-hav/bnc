import React, { useState } from "react";
import Confetti from "react-confetti";

function generateUniqueRandomNumber() {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const uniqueDigits = [];
  while (uniqueDigits.length !== 4) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    const digit = digits.splice(randomIndex, 1)[0];
    uniqueDigits.push(digit);
    if (uniqueDigits[0] === 0) uniqueDigits.shift();
  }
  const randomNumber = Number(uniqueDigits.join(""));
  return randomNumber;
}
const uniqueRandomNumber = generateUniqueRandomNumber();

export default function App() {
  const [win, setWin] = useState(false);
  const [list, setList] = useState([]);
  const [mainNumber, setMainNumber] = useState(uniqueRandomNumber);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const arr = String(inputValue).split("");
    const arr1 = String(mainNumber).split("");
    let newBulls = 0;
    let newCows = 0;
    for (const [i, el] of arr.entries()) {
      if (Number(arr1[i]) === Number(el)) {
        newBulls++;
      } else if (arr1.includes(arr[i])) {
        newCows++;
      }
    }
    newBulls === 4 && setWin(true);
    setList((list) => [
      ...list,
      { inputValue, bulls: newBulls, cows: newCows },
    ]);
    // console.log("Submitted value:", inputValue);
    console.log("Main value:", mainNumber);
    setInputValue("");
  };

  function handleReset() {
    setList([]);
    setWin(false);
    setMainNumber(generateUniqueRandomNumber());
  }

  return (
    <div className="App">
      {win ? (
        <h2 style={{ color: "#262a7d" }}>
          Yayyyy 🎊🎉!! Khub Bhaalo, ekhon ghumiye poro sonamoni 🫶🏻.
        </h2>
      ) : (
        <h2>Siyana's & Extra Siyana's</h2>
      )}
      {win && <Confetti />}
      {list.length > 0 && (
        <button
          className="reset"
          onClick={handleReset}
          style={{
            padding: "5px 12px",
            backgroundColor: "black", // Red color as an example
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="1000"
          max="9999"
          placeholder="Enter a 4-digit number"
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
          required
          style={{
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "13px",
            width: "180px",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "5px 8px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      {/* <h2>{bulls}  {cows}</h2> */}
      {list.map((item, index) => (
        <div className="list" key={Math.random()}>
          <h3>
            <span style={{ fontWeight: "100" }}>{index + 1}. </span>
            <span style={{ color: "darkgrey", marginLeft: "5px" }}>
              {" "}
              {item.inputValue}
            </span>
            <span style={{ color: "green", marginLeft: "10px" }}>
              {" "}
              {item.bulls}B
            </span>
            <span style={{ color: "orange", marginLeft: "10px" }}>
              {" "}
              {item.cows}C
            </span>{" "}
          </h3>
        </div>
      ))}
    </div>
  );
}
