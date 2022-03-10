import logo from './logo.svg';
import './App.css';
import FireAuth from './components/FireAuth';
import FirebaseDB from './components/FirebaseDB';
import FirebaseStorage from './components/FirebaseStorage';

function App() {
  return (
    <div className="App">
      <FireAuth/>
      <FirebaseDB/>
      <FirebaseStorage/>
    </div>
  );
}

export default App;
  