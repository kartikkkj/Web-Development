import React , {useState,useEffect}from "react";

export default function UE(){
    const[count , setCount] = useState(0);
    useEffect(()=>{
        console.log("useEffect");
        document.title = count;
    })
    return (
        <>
            <h1>{count}</h1>
            <button onClick={()=>setCount(count+1)} >plus</button>
        </>
    )
}