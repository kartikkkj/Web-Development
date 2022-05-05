import React, { useState } from 'react'
import icon from "../assets/sale.png"
import { v4 as uuidv4 } from "uuid";
import toast  from 'react-hot-toast';
import {useNavigate} from "react-router-dom"
export default function Join() {
  const navigate = useNavigate()
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const generateNewId = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id)
    toast.success("New Room ID is Created 😀");
  }
  const join = ()=>{
    if(!roomId){
      toast.error("Please enter Room ID 🙂")
      return;
    }else if(!name){
      toast.error("Please enter your Name 🙂")
      return;
    }
    navigate(`/editor/${roomId}`,{
      state:{
        name,
    }})
  }
  const enterTojoin = (e)=>{
      if(e.code === "Enter")
        join();
  }
  return (
    <div className='join-wrapper'>
      <div className="form-wrapper">
        <img src={icon} alt="icon" />
        <h5 className="lable">Paste invitation ROOM ID</h5>
        <div className="inputs">
          <input value={roomId} type="text" className='input' placeholder='ROOM ID' onChange={(e) => { setRoomId(e.target.value) }} onKeyUp={enterTojoin}/>
          <input value={name} type="text" className='input' placeholder='NAME' onChange={(e) => { setName(e.target.value) }} onKeyUp={enterTojoin}/>
          <button className="btn joinbtn" onClick={join}>JOIN</button>
          <span className="createInfo">Create a random &nbsp;<a  onClick={generateNewId} href="" className='createBtn'>new ROOM ID</a></span>
        </div>
      </div>
      <footer className='github'>
        <h4>Build with ❤️ by  <a href="https://github.com/AbhyArya" target="_blank" rel="noreferrer">Abhi Arya</a> </h4>
      </footer>
    </div>
  )
}
