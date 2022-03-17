import { Routes, BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login'
import { AuthProvider } from './context/authContext';
import Feed from './components/Feed';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<SignUp />} />
          <Route path='/' exact element={<PrivateRoute />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;