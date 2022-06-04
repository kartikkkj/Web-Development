import React from "react";
import Button from "../../../Components/Shared/Button/Button";
import Card from "../../../Components/Shared/Card/Card";

export default function UserName({stepIncrease}) {
  return (
    <>
    <Card title={"he"} icon={"asdf"}>
      <Button onclicked={stepIncrease} text={"Next"}></Button>
    </Card>
  </>
  )
}
