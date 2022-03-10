import React from 'react'
import { connect } from 'react-redux';

const mapStateToProps = (state)=>{
  return {
    balls:state.ball.balls
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    buyball:()=>dispatch({type:"BUY_BALL"}),
    Sellball:()=>dispatch({type:"SELL_BALL"})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(function Ball(props) {
  return (
    <div>
      <h1>{props.balls}</h1>
      <button onClick={props.buyball}>Down</button>
      <button onClick={props.Sellball}>UP</button>
    </div>
  )
})

