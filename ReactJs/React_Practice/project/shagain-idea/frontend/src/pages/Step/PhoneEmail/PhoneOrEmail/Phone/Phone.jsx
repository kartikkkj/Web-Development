import React, { useState } from "react";
import Card from "../../../../../Components/Shared/Card/Card";
import Button from "../../../../../Components/Shared/Button/Button";
import styles from "../../../Step.module.css";
import TextInput from "../../../../../Components/Shared/TextInput/TextInput";
import { sendOtp } from "../../../../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../../store/authSlice";
export default function Phone({onNext}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [err,setErr] = useState();
  const dispatch = useDispatch();
  async function submit(){
    if(!phoneNumber){
      setErr("Please enter phone number")
      setTimeout(()=>{
        setErr("")
      },5000)
      return;
    }
    const {data} = await sendOtp({phoneNo:phoneNumber})
    console.log(data);
    dispatch(setOtp({phoneNo: data.phoneNo, hash : data.hash, expire: data.expire} ))
    onNext();
  }
  return (
    <Card title={"Enter your phone number"} icon={"☎️"}>
    {err? <p className={styles.buttomPara}>{err}</p>:"" }
      <TextInput
        type="number"
        placeholde="**********"
        value={phoneNumber} 
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div className={styles.btnWrapper}>
        <Button onclicked={submit} text={"Next"}></Button>
        <p className={styles.buttomPara}>
          By entering your phone number, you're agreeing to our terms of service
          and privacy policy. Thanks
        </p>
      </div>
    </Card>
  );
}
