import logo from './logo.svg';
import './App.css';
import {Provider} from "react-redux"
import User from './components/User';
import store from './thunk/store';

function App() {
  return (
    <div className="App">
        <center>
          <Provider store={store}>
          <User />
          </Provider>
        </center>
    </div>
  );
}

export default App;
