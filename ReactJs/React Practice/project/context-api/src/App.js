import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import P1 from './components/P1';
import P2 from './components/P2';
import ContextProviderDemo from './components/ContextProviderDemo';
import {useState} from "react";
import { context } from './context';

function App() {
  const [theme, settheme] = useState(false);
  return (
    <context.Provider value={theme}>
      <div className="App">
      <button onClick={()=>settheme(!theme)}>Change theme</button>
        <Nav></Nav>
        <P1></P1>
        <P2></P2>
      </div>
    </context.Provider>
  );
}

export default App;
