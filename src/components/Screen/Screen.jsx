
import { useContext } from "react"
import {CalcContext} from "../../context/CalcContext"


const Screen = () => {
  const{calc}=useContext(CalcContext);

  return (
    <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{calc.answer}</div>
            <div id="expression">{calc.expression}</div>
          </div>
  )
}

export default Screen