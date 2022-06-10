import React, {useState} from "react";
import Card from "../../../../../Components/Shared/Card/Card";
import Button from "../../../../../Components/Shared/Button/Button";
import styles from "../../../Step.module.css";
import TextInput from "../../../../../Components/Shared/TextInput/TextInput";
export default function Email({onNext}) {
  
  const [email, setEmail] = useState("");
  return (
    <div>
      <Card title={"Enter your email"} icon={"📧"}>
      {/* {err? <p className={styles.buttomPara}>{err}</p>:"" } */}
        <TextInput
          type="email"
          placeholde="example@idea.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles.btnWrapper}>
          <Button onclicked={onNext} text={"Next"}></Button>
          <p className={styles.buttomPara}>
            By entering your email, you're agreeing to our terms of
            service and privacy policy. Thanks
          </p>
        </div>
      </Card>
    </div>
  );
}
