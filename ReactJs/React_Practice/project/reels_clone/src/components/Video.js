import React from 'react'
import "./cp.css"
import ReactDOM  from 'react-dom';
export default function Video({src}) {
    function handleClick(e){
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }
    function handleScroll(e){
        const next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling ;
        if(next)
        {
            next.scrollIntoView()
        }
    }
  return (
    <video onEnded={(e)=>handleScroll(e)} muted autoPlay onClick={(e)=>handleClick(e)} className='video-styling' src={src}>
    </video>
  )
}
