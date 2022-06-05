import React from "react";
import Button from "../../../Components/Shared/Button/Button";
import Card from "../../../Components/Shared/Card/Card";
import styles from "../Step.module.css";
export default function UserName({onNext}) {
  return (
    <>
    <Card title={"he"} icon={"asdf"}>
      <Button onclicked={onNext} text={"Next"}></Button>
    </Card>
  </>
  )
}
