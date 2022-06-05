import React, { useState } from "react";
import Button from "../../../../Components/Shared/Button/Button";
import Card from "../../../../Components/Shared/Card/Card";
import TextInput from "../../../../Components/Shared/TextInput/TextInput";
import styles from "../../../Step/Step.module.css"
export default function Phone({onNext}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <Card title={"Enter your phone number"} icon={"☎️"}>
      <TextInput
        type="number"
        placeholde="**********"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div className={styles.btnWrapper}>
        <Button onclicked={onNext} text={"Next"}></Button>
        <p className={styles.buttomPara}>
        Your password will be send to your registered Phone number {`+91-${phoneNumber}`}

        </p>
      </div>
    </Card>
  );
}
