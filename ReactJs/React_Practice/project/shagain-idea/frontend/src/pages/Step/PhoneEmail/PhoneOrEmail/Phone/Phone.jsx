import React, { useState } from "react";
import Card from "../../../../../Components/Shared/Card/Card";
import Button from "../../../../../Components/Shared/Button/Button";
import styles from "../../../Step.module.css";
import TextInput from "../../../../../Components/Shared/TextInput/TextInput";
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
          By entering your phone number, you're agreeing to our terms of service
          and privacy policy. Thanks
        </p>
      </div>
    </Card>
  );
}
