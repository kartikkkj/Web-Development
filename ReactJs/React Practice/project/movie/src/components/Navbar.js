import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
      <div  style={{display:"flex",backgroundColor:'#3f51b5', color:"white" , alignItems:"center"}}>
        <Link to="/" style={{textDecoration:"none",color:"white"}}> <h1 className='m-3'>Trending Movies</h1></Link>
        <Link to="/favourites"  style={{textDecoration:"none",color:"white"}}> <h2 className='ms-3'>Favourites</h2></Link>
      </div>
    )
  }
} 