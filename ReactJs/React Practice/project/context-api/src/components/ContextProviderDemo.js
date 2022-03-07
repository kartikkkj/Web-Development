import React ,{useState} from 'react'
import { context } from '../context'
export default function ContextProviderDemo() {
    const [theme, settheme] = useState(false);
  return (
    <context.Provider value={theme}>
      <button onClick={()=>settheme(!theme)}>Change theme</button>
    </context.Provider>
  )
}
