import React from 'react'
import { useState,useEffect } from 'react';

export default function UE3() {
    const[count , setCount] = useState(0);
    const[obj, setObj] = useState({message:"hello", name:"Abhi"})
    useEffect(()=>{ // iff count update
        console.log("useEffect");
        document.title = count;
    },[count])
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={()=>setCount(count+1)} >plus</button>
      <div>{obj.message+"!  " +obj.name }</div>
      <input type={"text"} onChange={()=>setObj({message:"Hello",name:document.querySelector("input").value})} ></input>
    </div>
  )
}
