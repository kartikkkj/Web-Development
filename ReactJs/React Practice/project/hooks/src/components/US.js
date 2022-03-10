import React from 'react'
import { useState } from 'react';
// const initialState ={
//   count:0
// }
// const reducer = (state,action)=>{
//   switch(action.type){
//     case "p":
//       return {count:state.count+1}
//     case "m" :
//       return {count:state.count-1}
//     default:
//       return state
//   }
// }
export default function US() {
    const[count , setCount] = useState(0);
    const[obj, setObj] = useState({message:"hello", name:"Abhi"})
  
  // useReducer[state,dispatch]  = useReducer(reducer, initialstate)
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={()=>setCount(count+1)} >plus</button>
      <div>{obj.message+"!  " +obj.name }</div>
      <input type={"text"} onChange={()=>setObj({message:"Hello",name:document.querySelector("input").value})} ></input>
    </div>
  )
}
