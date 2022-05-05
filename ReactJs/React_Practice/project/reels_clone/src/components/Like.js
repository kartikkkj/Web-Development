import React,{useEffect, useState} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./cp.css"
import { database } from '../firebaseConfig';
export default function Like({userData, postData}) {
    const [like, setLike] = useState(null)

    useEffect(()=>{
      const check = postData.likes.includes(userData.userId)?true:false;
      setLike(check)  
    },[postData,userData])

    function handleLike(){
        if(like){
            const nArr = postData.likes.filter((el)=> el!==userData.userId)
            database.posts.doc(postData.postsId).update({
                likes:nArr
            })
        }else{
            const nArr = [...postData.likes, userData.userId] 
            database.posts.doc(postData.postsId).update({
                likes:nArr
            })
        }
    }
  return (
    <div>
      {
          like !== null ? <>{
            like === true?<FavoriteIcon onClick={handleLike} className={"icon-style like"} />:<FavoriteIcon onClick={handleLike} className={"icon-style unlike"} />
        }
          </>:<></>
      }
    </div>
  )
}
