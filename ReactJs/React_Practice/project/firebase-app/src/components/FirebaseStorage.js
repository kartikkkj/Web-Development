import React, {useState,useEffect}from 'react'
import { storage } from '../firebaseConfig'

export default function FirebaseStorage() {
 const [file, setFile] = useState("")
 function upload(){
   console.log("ok");
    const data = storage.ref("/data/"+file.name).put(file)
    data.on("state_changed", fn1,fn2,fn3);
    function fn1(snapshot){
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
        console.log("upload",progress);
    }
    function fn2(){
        console.log("error");
    }

    function fn3(){
        data.snapshot.ref.getDownloadURL().then((url)=>{
            console.log(url);
    })
    }
 } 
  return (
    <div>
     <input type="file" accept='image/*' onChange={(e)=>setFile(e.target.files[0])} />
     <button onClick={upload} >Upload</button>
    </div>
  )
}
