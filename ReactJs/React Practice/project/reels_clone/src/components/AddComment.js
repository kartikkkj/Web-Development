import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import {database} from "../firebaseConfig"
export default function AddComment({userData, postData}) {
    const [text, setText] = useState("")
    function handleClick(){
        if(!text)
            return;
        const obj={
            text:text,
            uProfileImage : userData.profileUrl,
            uName:userData.name,
            cId:
        }
        database.comments.add(obj).then((doc)=>{
            database.posts.doc(postData.postsId).update({
                comment: [...postData.comment,doc.id]
            })
        })
        setText("");
    }
    return (
        <div style={{width:"100%"}}>
            <TextField size='small' style={{paddingBottom:".5rem"}} onChange={(e) => setText(e.target.value)}  label="Comment" variant="outlined" />
            <Button onClick={handleClick}><SendIcon style={{height:"100%"}}/></Button>
        </div> 
    )
}
