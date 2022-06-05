import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./Components/Shared/Navigation/Navigation";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Authentication from "./pages/Authentication/Authentication";
import Activate from "./pages/Activate/Activate";
import UserName from "./pages/Step/UserName/UserName";
import PublicRooms from "./pages/PublicRooms/PublicRooms";
import Forgot from "./pages/Forgot/Forgot";
const isAuth = false;
const user = {
  activated: false,
};

function App() {
  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuth && user.activated ? (
                <Navigate replace to="/PublicRooms" />
              ) : isAuth && !user.activated ? (
                <Navigate replace to="/activate" />
              ) : (
                <Home />
              ) 
            }
          ></Route>

          <Route
            path="/authentication"
            element={
              !isAuth ? (
                <Authentication />
              ) : !user.activated ? (
                <Navigate replace to="/activate" />
              ) : (
                <Navigate replace to="/PublicRooms" />
              )
            }
          ></Route>

          <Route
            path="/activate"
            element={
              !isAuth ? (
                <Navigate replace to="/" />
              ) : !user.activated ? (
                <Activate />
              ) : (
                <Navigate replace to="/PublicRooms" />
              )
            }
          ></Route>
<Route path="/forgotPassword" element={<Forgot />}/>
          <Route
            path="/PublicRooms"
            element={
              isAuth && user.activated ? (
                <PublicRooms />
              ) : isAuth && !user.activated ? (
                <Navigate replace to="/activate" />
              ) : (
                <Home />
              )
            }
          ></Route>
          {/* <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
