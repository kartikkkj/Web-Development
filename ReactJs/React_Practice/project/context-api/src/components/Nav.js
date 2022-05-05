import React, {useContext} from 'react'
import { context } from '../context'
export default function Nav() {
    const val = useContext(context)
  return (
    <div className={val? "dark": "light"}>
      Nav
    </div>
  )
}
