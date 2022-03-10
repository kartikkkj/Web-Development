import React,{ useState,useEffect } from 'react'
import { database } from '../firebaseConfig'
export default function FirebaseDB() {
    const [name , setName] = useState("")
    const [age , setAge] = useState("")
    async function add(){
        const res = await database.users.add({name, age});
        // const res2 = await database.users.doc(1111).set({name, age});
        // console.log(res);

    }
    useEffect(() => {
        async function hello(){
        const uid = "RjMHxOlhf9auXK8D0JYR"
        const t = await database.users.doc(uid).get()
        console.log(t.data())
        }
        hello();
    },[])
    async function update(){
        const uid = "RjMHxOlhf9auXK8D0JYR"
        await database.users.doc(uid).update({name, age})
    }
    async function deleteUser(){
        const uid = "RjMHxOlhf9auXK8D0JYR"
        await database.users.doc(uid).delete()
    }
  return (
    <center>
        <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
        <input value={name} onChange={(e)=>setName(e.target.value)} style={{width:"40%", margin:"1rem" }} type="text" placeholder="Name"></input>
        <input value={age} onChange={(e)=>setAge(e.target.value)} style={{width:"40%", margin:"1rem" }} type="number" placeholder="Age"></input>
        <button style={{width:"40%", margin:"1rem" }} onClick={add}>add</button>
        <button style={{width:"40%", margin:"1rem" }} onClick={update}>update</button>
        <button style={{width:"40%", margin:"1rem" }} onClick={deleteUser}>delete</button>
        </div>
    </center>
  )
}
