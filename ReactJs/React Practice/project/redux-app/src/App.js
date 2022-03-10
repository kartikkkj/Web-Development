import logo from './logo.svg';
import './App.css';
import Bat from './component/Bat';
import {Provider} from "react-redux"
import store from './redux/store';
import Ball from './component/Ball';
import Hookss from './component/Hookss';


function App() {
  return (
    
    <div className="App">
      <Provider store={store}>
      <Bat></Bat>
      <Ball/>
      <Hookss/>
      </Provider>
    </div>
  );
}

export default App;
