import React, { Component } from 'react'
export default class Navbar extends Component {
  render() {
    return (
      <div  style={{display:"flex",backgroundColor:'skyblue' , alignItems:"center"}}>
        <h1 className='m-3'>Trending Movies</h1>
        <h2 className='ms-3'>Favourites</h2>
      </div>
    )
  }
} 