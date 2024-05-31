import "../../App.css";
import { useContext } from "react";
import { CalcContext } from "../../context/CalcContext";

const getStyleName = (btn) => {
  const className = {
    '=': 'equals',
    '*': 'opt',
    '/': 'opt',
    '+': 'opt',
    '-': 'opt',
  };
  return className[btn] || '';
};

const isOperator = (symbol) => {
  return symbol === "+" || symbol === "/" || symbol === "-" || symbol === "*";
};

const Button = ({ value, label }) => {
  const { calc, setCalc } = useContext(CalcContext);
  const { answer,expression } = calc;
  console.log(answer,expression);
  const et=expression.trim();

  const resetClick = () => {
    setCalc({ answer:"",expression:"0" });};

    const invertClick = () => {
      if(answer==="")return
      const result=answer.toString().charAt(0)==="-"?answer.splice(1):"-"+answer;
      setCalc({...calc,answer:result})};

    const perClick = () => {
     if(answer==="") return
     const result= (parseFloat(answer) / 100).toString();
     setCalc({...calc,answer:result});
    };
   const opClick = () => {
      const result=et+" "+value+" ";
      console.log(result,"result");
      setCalc({...calc,expression:result});
    };
    const zeroClick=()=>{
      if (expression.charAt(0) !== "0") {
        setCalc({...calc,expression:expression+value});
      }}
     const dotClick = () => {
        // Split the expression by operators to get the last number
        const lastElement = expression.split(/[-+/*]/g).pop();
      // If there's no last element or it already contains a decimal, return early
        if (!lastElement || lastElement.includes(".")) return;
      // Add the decimal point to the expression
        const result = expression + value;
        setCalc({ ...calc, expression: result });
      };
      

  const handleClickButton = () => {
    if (expression.charAt(0) === "0") {
     setCalc({...calc,expression:expression.slice(1) + value});
    } else {
    setCalc({...calc,expression:expression+value});
    }
  };

  const EqualClick = async () => {
    const et = expression.trim();
  // If the last character is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    const parts = et.split(" ");
    const newparts = [];
  // Process the parts array backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newparts.unshift(parts[i]);
        let count = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          count++;
        }
        i -= count;
      } else {
        newparts.unshift(parts[i]);
      }
    }
const newExpression = newparts.join(" ");
    let ans;
try {
      if (isOperator(newExpression.charAt(0))) {
        ans = await eval(answer + newExpression).toString();
      } else {
        ans = await eval(newExpression).toString();
      }
    } catch (error) {
      ans = "Error";
    }
  
    setCalc({ ...calc, answer: ans, expression: "" });
  };
  
  
const handleBtnClick = () => {
    const result = {
      ".": dotClick,
      "C": resetClick,
      "/": opClick,
      "+": opClick,
      "-": opClick,
      "*": opClick,
      "=": EqualClick,
      "%": perClick,
      "+-": invertClick,
      "0": zeroClick
    };
    if (result[value]) {
      return result[value]();
    } else {
      handleClickButton();
    }
  };

  return (
    <button onClick={handleBtnClick} type="button" id={label} className={`${getStyleName(value)}`}>{value}</button>
  );
};



export default Button;


// const equalClick = (a, b, sign) => {
  //   const math = {
  //     "+": (a, b) => a + b,
  //     "-": (a, b) => a - b,
  //     "*": (a, b) => a * b,
  //     "/": (a, b) => a / b,
  //   };
  //   return math[sign](a, b);
  // };