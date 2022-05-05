import React from 'react'
// const person ={
//   name:"hello"
// }
// React.useMemo(() => person, [])
// React,useCallback useCallback(()=>fn,[])
export default React.memo(function C() { // we can use useMemo hook also because memo fails in complex DS
  return (
    <div >
      c
    </div>
  )
}
)