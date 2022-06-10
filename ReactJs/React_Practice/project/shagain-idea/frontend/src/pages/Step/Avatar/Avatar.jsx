import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Components/Shared/Button/Button";
import Card from "../../../Components/Shared/Card/Card";
import styles from "../Step.module.css";
import defaultProfile from "../../../images/profile.png";
import { setAvatar } from "../../../store/ativateSlice";
import { render } from "react-dom";
import { activate } from "../../../http";
import { setAuth } from "../../../store/authSlice";
export default function Name({ onNext }) {
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState(defaultProfile);
const dispatch = useDispatch();
  function captureImage(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
      setImage(reader.result);
      dispatch(setAvatar(render.result));
    }
    console.log(e);
  }
  async function submit() {
    try {
      const {data} = await activate({name, avatar})
      if(data.auth){
        dispatch(setAuth(data)); 
      }
      console.log(data);
    } catch (err){
        console.log(err);{
      }
    }
    onNext();
  }
  return (
    <>
    <div className={styles.cardWrapper}>
      <Card title={`Okey, ${name}`} icon={"🐵"}>
        <p className={styles.buttomPara}>How's this photo?</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={image} alt="profile picture" />
        </div>
        <div className={styles.avatarInputWrapper}>
          <input onChange={captureImage} id="avatarInput" type="file" className={styles.avatarInput} />
          <label  className={styles.avatarInputlevel} htmlFor="avatarInput">choose a different photo</label>
        </div>
        <div className={styles.btnWrapper}>
          <Button onclicked={submit} text={"Next"}></Button>
        </div>
      </Card>
      </div>
    </>
  );
}
