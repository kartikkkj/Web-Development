import React , {useState}from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Components/Shared/Button/Button";
import Card from "../../../Components/Shared/Card/Card";
import TextInput from "../../../Components/Shared/TextInput/TextInput";
import { verifyOtp } from "../../../http";
import { setAuth } from "../../../store/authSlice";
import styles from "../Step.module.css";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const {phoneNo, hash, expire} = useSelector((state)=> state.auth.otp)
  const [err, setErr] = useState("")
  const dispatch = useDispatch();
async function submit(){

    if(!otp){
      setErr("Please enter OTP")
      setTimeout(()=>{
        setErr("")
      },5000)
      return;
    }

  try{
       const {data} = await verifyOtp({otp, phoneNo, hash, expire})
       console.log(data);
       dispatch(setAuth(data))
  }catch(err){
    console.log(err);
  }
}
  return (
    <>
      <Card title={"Enter the OTP we just texted your"} icon={"🔒"}>
      {err? <p className={styles.buttomPara}>{err}</p>:"" }
        <TextInput
          type="number"
          placeholde="******"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <div className={styles.btnWrapper}>
          <Button onclicked={submit} text={"Next"}></Button>
          <p className={styles.buttomPara}>
            By entering the OTP, you're register with us then you have to
            activate your account. Thanks
          </p>
        </div>
      </Card>
    </>
  );
}
