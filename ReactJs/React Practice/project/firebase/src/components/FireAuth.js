import React, {useState}from 'react'
import { auth } from '../firebase'

export default function FireAuth() {
    const [email , setEmail] = useState("")
    const [password , setPass] = useState("")
    const [user , setUser] = useState("")
    function create(){

    } 
  return (
      <>
        <div>
        <input type="email" placeholder="Email"></input>
        <input type="password" placeholder="Password"></input>
        <input type="text" placeholder="UserName"></input>
        <button onClick={create}>Create</button>
        </div>
    </>
  )
}
