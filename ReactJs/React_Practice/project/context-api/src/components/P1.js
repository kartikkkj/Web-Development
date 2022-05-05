import React, {useContext} from 'react'
import { context } from '../context'
import C from './C'
export default function P1() {
    const val = useContext(context)
  return (
    <div className={val? "dark": "light"}>
      p1 
      <C theme={val}></C>
    </div>
  )
}
