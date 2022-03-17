seimport React, { useState, useEffect } from 'react'
import { database } from '../firebaseConfig';
import CircularProgress from '@mui/material/CircularProgress';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';

export default function Comments({ postData }) {
    const [comment, setComment] = useState(null);
    useEffect(() => {
        async function hello(){
            const arr = [];
            for (let i = 0; i < postData.comment.length; i++) {
                const data = await database.comments.doc(postData.comment[i]).get()
                arr.push(data.data());
            }
            setComment([...arr]);
            console.log(comment);
        }
        hello();
    },[postData])


    return (
        <>
            <div style={{ width: "100%" }}>
                {
                    comment == null ? <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                        :
                        comment.map(()=>(
                        <div key={}>
                            <Avatar src={comment.uProfileImage} />
                            <p><span>{comment.uName}</span>&nbsp;&npsp; {comment.text}</p>
                        </div>
                        ))
                }
            </div>
        </>

    )
}
