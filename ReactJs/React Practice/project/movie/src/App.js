import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import AllMovies from "./components/AllMovies";
import { Favourites } from "./components/Favourite";
import { BrowserRouter as Router, Routes, Route, Link,Switch } from "react-router-dom";
import "./App.css";
import React from "react";

function App() {
  return (
    
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <> <Navbar/> <Banner /> <AllMovies /></>
          }
        ></Route>
        <Route exact path="/favourites" element={<> <Navbar/> <Favourites /></>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
