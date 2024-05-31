import "./App.css";
import Button from "./components/Button/Button";
import Screen from "./components/Screen/Screen";
import CalProvider from "./context/CalcContext";

const btnvalue = [
  [{ "C": "clear" }, { "+-": "negative" }, { "%": "percent" }, { "/": "divide" }],
  [{ "7": "seven" }, { "8": "eight" }, { "9": "nine" }, { "*": "multiply" }],
  [{ "4": "four" }, { "5": "five" }, { "6": "six" }, { "-": "subtract" }],
  [{ "1": "one" }, { "2": "two" }, { "3": "three" }, { "+": "add" }],
  [{ "0": "zero" }, { ".": "decimal" }, { "=": "equals" }]
];

const App = () => {
  return (
    <CalProvider>
    <div className="wrapper">
      <Screen/>
      <div className="buttonBox">
    {btnvalue.flat().map((btn, i) => {
      //{6:six}
   const [key, value] = Object.entries(btn)[0];
   //object.entries when give a object like 
   //{c:"clear",6:"six"}
   //this will return an array of array of key and value
    //[["c","clear"],["6","six"]]
    return (
    <Button key={i} value={key} label={value} />
      );
    })}
    </div>
  </div>
  </CalProvider>
  )
}

export default App