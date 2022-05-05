import React, { useState, useEffect } from 'react'
import { database } from '../firebaseConfig';
import CircularProgress from '@mui/material/CircularProgress';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
export default function Comments({ postData }) {
    const [comment, setComment] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const arr = [];
            for (let i = 0; i < postData.comment.length; i++) {
                const data = await database.comments.doc(postData.comment[i]).get()
                arr.push(data.data());
            }
            setComment([...arr]);
            console.log(comment);
        }
        fetchData();  
    },[postData])


    return (
        <>
            <div style={{ width: "100%" }}>
                {
                    comment == null ? <Box sx={{ display: 'flex' , justifyContent:"center" }}>
                        <CircularProgress />
                    </Box>
                        :
                        comment.map((c)=>(
                        <div style={{display:"flex" , alignItems: "center" , padding:"1rem"}}  key={c.cId}>
                            <Avatar style={{padding:".5rem", fontWeight:"bold"}} src={c.uProfileImage} />
                            <p  style={{display:"flex", flexDirection:"column"}}>
                                <span style={{ fontWeight:"bold"}}>{c.uName}</span>
                                <span>{c.text}</span>
                            </p>
                        </div>
                        ))
                }
            </div>
        </>

    )
}
