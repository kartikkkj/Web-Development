import React, {useState,useEffect}from 'react'
import { auth } from '../firebaseConfig'

export default function FireAuth() {
    const [email , setEmail] = useState("")
    const [password , setPass] = useState("")
    const [user , setUser] = useState("")

    async function create(){
      const res = await auth.createUserWithEmailAndPassword(email,password);
      console.log(res);
    } 
    useEffect(() => {
      const unsub = auth.onAuthStateChanged((user)=>{
        setUser(user)
      })
      return ()=>{
        unsub()
      }
    },[])
    async function logout(){
      await auth.signOut()
    }
    async function signin(){
      await auth.signInWithEmailAndPassword(email,password)
    }
  return (
      <>
      
      <center>
      {
        user==null?
      
        <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} style={{width:"40%", margin:"1rem" }} type="email" placeholder="Email"></input>
        <input value={password} onChange={(e)=>setPass(e.target.value)} style={{width:"40%", margin:"1rem" }} type="password" placeholder="Password"></input>
        <button style={{width:"40%", margin:"1rem" }} onClick={signin}>signin</button>
        </div>
        : <><div>{user.uid}</div>
          <button onClick={logout}>logOut</button>
          </>
      }</center>
    </>
  )
}
