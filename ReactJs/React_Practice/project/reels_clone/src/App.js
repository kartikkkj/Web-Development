import { Routes, BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login'
import { AuthProvider } from './context/authContext';
import Feed from './components/Feed';
import {PrivateRoute, PrivateRoute1} from './components/PrivateRoute';
import { AuthContext } from './context/authContext';
import { useContext } from 'react';

function App() {
  // const {user} = useContext(AuthContext)
  // console.log(user);
  console.log("ok");
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<SignUp />} />
          <Route path='/' exact element={<PrivateRoute />} />
          {/* <Route path={`/Profile/${user.userId}`} element={<PrivateRoute1 />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;