import React, { useContext, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import VideoLabel from "@material-ui/icons/VideoLabel";
import "./cp.css";
import { Alert, LinearProgress } from '@mui/material';
import { v4 as uuid } from "uuid"
import { storage, database } from "../firebaseConfig"
import { AuthContext } from '../context/authContext';
import Post from './Post';
import NavBar from './NavBar';
export default function Feed() {
  const { user, logout } = useContext(AuthContext)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState("")
  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot => {
      setUserData(snapshot.data())
    }))
    return () => {
      unsub();
    };
  }, [])

  async function handleChange(file) {
    if (!file) {
      setError("Please select a video")
      setTimeout(() => {
        setError("")
      }, 2000)
      return;
    }
    if ((file.size / (1024 * 1024)) > 50) {
      setError("File should be less than 50MB")
      setTimeout(() => {
        setError("")
      }, 2000)
    }



    try {
      setError("")
      setLoading(true)
      const uid = uuid()
      setLoading(true)
      const data = storage.ref("/posts/" + uid + file.name).put(file)
      data.on("state_changed", fn1, fn2, fn3);
      function fn1(snapshot) {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("upload", progress);
      }
      function fn2(err) {
        setError(err)
        setTimeout(() => {
          setError("")

        }, 2000)
        setLoading(false)
      }
      function fn3() {
        data.snapshot.ref.getDownloadURL().then((url) => {
          const obj = {
            likes: [],
            comment: [],
            pId: uid,
            pUrl: url,
            username: userData.name,
            upro: userData.profileUrl,
            userId: userData.userId,
            createAt: database.getTimeStamp()
          }
          database.posts.add(obj).then(async (ref) => {
            const res = await database.users.doc(user.userId).update({
              postIds: user.postIds != null ? [...user.postIds, ref.id] : [ref.id]
            })
          }).catch((err) => {
            setError(err)
            setTimeout(() => {
              setError("")

            }, 2000)
          })
        })
        setLoading(false)
      }
    }
    catch (err) {
      setError(err)
      setTimeout(() => {
        setError("")

      }, 2000)
    }


  }
  return (<>
      <NavBar userData={userData} fullWidth={true}/>
    <div className='feed-wrapper'>
      <div className='feed-btn'>
        {error ? <Alert severity="error">{error}</Alert> :
          <>          <CardContent>
            <Button component="label" size="small" fullWidth={true} margin="dense" color='secondary' variant="outlined" disabled={loading} startIcon={<VideoLabel />} >Upload Your MUJRA
              <input type="file" accept='video/*' hidden onChange={(e) => handleChange(e.target.files[0])}></input>
            </Button>
          </CardContent>
          </>
        }
        {loading && <LinearProgress className='loading-margin' color='secondary' />}
      </div>
      <div className='postWraper'>
        <Post userData={userData} />
      </div>
    </div>
    </>
  );
}

