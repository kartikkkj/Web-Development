import React, {useState} from "react";
import Button from "../../../../Components/Shared/Button/Button";
import Card from "../../../../Components/Shared/Card/Card";
import TextInput from "../../../../Components/Shared/TextInput/TextInput";
import styles from "../../../Step/Step.module.css"
export default function Email({onNext}) {
  
  const [email, setEmail] = useState("");
  return (
    <div>
      <Card title={"Enter your email"} icon={"📧"}>
        <TextInput
          type="email"
          placeholde="example@idea.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles.btnWrapper}>
          <Button onclicked={onNext} text={"Next"}></Button>
          <p className={styles.buttomPara}>
            Your password will be send to your registered email {email}
          </p>
        </div>
      </Card>
    </div>
  );
}
