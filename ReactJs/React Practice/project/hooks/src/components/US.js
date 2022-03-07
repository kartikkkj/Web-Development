import React from 'react'
import { useState } from 'react';

export default function US() {
    const[count , setCount] = useState(0);
    const[obj, setObj] = useState({message:"hello", name:"Abhi"})
  
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={()=>setCount(count+1)} >plus</button>
      <div>{obj.message+"!  " +obj.name }</div>
      <input type={"text"} onChange={()=>setObj({message:"Hello",name:document.querySelector("input").value})} ></input>
    </div>
  )
}
