import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <div className='container' style={{display:"flex",backgroundColor:'skyblue' , alignItems:"center"}}>
        <h1 className='m-3 '>Movies</h1>
        <h4>Favourites</h4>
      </div>
    )
  }
}
