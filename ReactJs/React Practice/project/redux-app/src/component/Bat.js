import React from 'react'
import { connect } from 'react-redux';

const mapStateToProps = (state)=>{
  return {
    bats:state.bat.bats
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    buyBat:()=>dispatch({type:"BUY_BAT"})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(function Bat(props) {
  return (
    <div>
      <h1>{props.bats}</h1>
      <button onClick={props.buyBat}>Down</button>
    </div>
  )
})

