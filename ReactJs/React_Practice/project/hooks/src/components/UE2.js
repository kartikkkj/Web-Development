import React , {useState,useEffect}from "react";

export default function UE(){
    const[count , setCount] = useState(0);
    useEffect(()=>{ // cmdm
        console.log("useEffect");
        document.title = count; 
        // if you update state in this then it will in infinte loop if new or prev state is not same
    },[])
    return (
        <>
            <h1>{count}</h1>
            <button onClick={()=>setCount(count+1)} >plus</button>
        </>
    )
}