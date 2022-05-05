import React from 'react'
import HOC from './HOC'
export default HOC(function Button(props) {
  return (
    <div style={props.style}>
      <button>button</button>
    </div>
  )
}
)