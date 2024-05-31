
import { createContext } from "react";
import { useState } from "react";

export const CalcContext=createContext();

const CalcProvider=({children})=>{
    const[calc,setCalc]=useState({
      answer:"",
      expression:""
    })
    const providerValue={
        calc,setCalc
    }
    return(
        <CalcContext.Provider value={providerValue}>
            {children}
        </CalcContext.Provider>
    )
}
export default CalcProvider
