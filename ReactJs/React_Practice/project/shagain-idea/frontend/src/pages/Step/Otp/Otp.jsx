import React , {useState}from "react";
import Button from "../../../Components/Shared/Button/Button";
import Card from "../../../Components/Shared/Card/Card";
import TextInput from "../../../Components/Shared/TextInput/TextInput";
import styles from "../Step.module.css";
export default function Otp({ onNext }) {
  const [otp, setOtp] = useState("");

  return (
    <>
      <Card title={"Enter the OTP we just texted your"} icon={"🔒"}>
        <TextInput
          type="number"
          placeholde="******"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <div className={styles.btnWrapper}>
          <Button onclicked={onNext} text={"Next"}></Button>
          <p className={styles.buttomPara}>
            By entering the OTP, you're register with us then you have to
            activate your account. Thanks
          </p>
        </div>
      </Card>
    </>
  );
}
