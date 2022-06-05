import React, {useState} from "react";
import { Link } from "react-router-dom";
import Button from "../../../Components/Shared/Button/Button";
import Card from "../../../Components/Shared/Card/Card";
import TextInput from "../../../Components/Shared/TextInput/TextInput";
import styles from "../Step.module.css";
export default function Password({ onNext }) {
  const [password, setPassword] = useState("");
  const passStyle={
    color: "#00A6ED",
    textDecoration : "none",
    marginTop :"10px",
  }
  return (
    <>
      <Card title={"Enter the Password"} icon={"🔒"}>
        <TextInput
          type="password"
          placeholde="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.btnWrapper}>
          <Button onclicked={onNext} text={"Next"}></Button>
          <Link style={passStyle} to={'/forgotPassword'}>forgot password</Link>
        </div>
        <div className={styles.btnWrapper}>
          <p>If you don't want to use password use OTP authentication</p>
          <Button onclicked={onNext} text={"Using OTP"}></Button>
        </div>
      </Card>
    </>
  );
}
