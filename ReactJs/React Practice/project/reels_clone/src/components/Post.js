import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react'
import { database } from "../firebaseConfig"
import Video from './Video';
import "./cp.css"
import { Avatar } from '@mui/material';
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Like2 from './Like2'
import AddComment from './AddComment';
import { display } from '@mui/system';
import Comments from './Comments';

export default function Posts({ userData }) {
  const [open, setOpen] = React.useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const [posts, setposts] = useState(null)

  useEffect(() => {
    let pArr = []
    const unsub = database.posts.orderBy("createAt", "desc").onSnapshot((querySnapshot) => {
      pArr = []
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data(), postsId: doc.id }
        pArr.push(data)
      })
      setposts(pArr)
    })
    return () => {
      unsub()
    };
  }, [])
  return (
    <div>
      {
        posts == null || userData == null ?
        
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box> :
          <>
            <div className='video-container'>
              {
                posts.map((post, index) => (
                  <React.Fragment key={index}>
                    <div className='videos'>
                      <Video src={post.pUrl} />
                      <div className="fa" style={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={userData.profileUrl} />
                        <h4>{userData.name}</h4>
                      </div>
                      <ChatBubbleIcon onClick={() => handleClickOpen(post.pId)} className='comment' />
                      <Dialog
                        open={open == post.pId}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth={true}
                        maxWidth="lg"
                      >
                        <div className='modal-cont'>
                          <div className='video-cont'><Video className="modal-video" src={post.pUrl} /></div>
                          <div className='comment-cont'>
                            <Card className='card1'>
                              <Comments postData={post} />
                            </Card>
                            <Card sx={{ maxWidth: 345, padding:".3rem"}}>
                              <Typography style={{paddingBottom:".3rem"}}>
                                {post.likes.length === 0 ? "Nobody liked this MUJRA" : `Liked by ${post.likes.length} people`}
                              </Typography>
                              <div className='comment-text'>
                                <Like2 className="like2" postData={post} userData={userData} />
                                <AddComment postData={post} userData={userData} />
                              </div>
                            </Card>
                          </div>
                        </div>
                      </Dialog>
                      <Like userData={userData} postData={post} />
                    </div>
                  </React.Fragment>
                ))
              }
            </div>
          </>
      }
    </div>
  )
}
