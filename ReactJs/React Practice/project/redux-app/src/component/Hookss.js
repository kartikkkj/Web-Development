import React from 'react'
import { useSelector, useDispatch} from 'react-redux';

export default function Hookss() {
    const laps = useSelector(state=>state.lap.laps)
    const dispatch = useDispatch();
    return (
    <div>
      <h1>{laps}</h1>
      <button onClick={()=>dispatch({type:"SELL_LAP"})}>UP</button>
      <button onClick={()=>dispatch({type:"BUY_LAP"})}>Down</button>
    </div>
  )
}

