import React, { createRef } from 'react'

export default function Uncontrol() {
    const inputValue = React.createRef(); // this function is used to store the reference of the element
    function ok(){
        console.log(inputValue.current.value);
    }
  return (
    <div>
      <input type= "text" ref={inputValue}></input>
      <button onClick={ok}>submit</button>
    </div>
  )
}
