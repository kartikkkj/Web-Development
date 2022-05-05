import React, {useContext} from 'react';
import { context } from '../context'

export default function P2() {
    const val = useContext(context)
  return (
    <div className={val? "dark": "light"}>
      p2
    </div>
  )
}
