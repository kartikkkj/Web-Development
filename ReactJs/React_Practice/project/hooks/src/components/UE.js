import React , {useState,useEffect}from "react";

export default function UE(){
    const[count , setCount] = useState(0);
    useEffect(()=>{ // cmdm,cmdu
        console.log("useEffect");
        document.title = count;
    })
    // useLayoutEffect  this is similar to useEffect but run before render or cmdm
    return (
        <>
            <h1>{count}</h1>
            <button onClick={()=>setCount(count+1)} >plus</button>
        </>
    )
}