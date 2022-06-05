import React from "react";
import styles from "./Home.module.css";
import {useNavigate} from "react-router-dom";
import Card from "../../Components/Shared/Card/Card";
import Button from "../../Components/Shared/Button/Button";
export default function Home() {
    const history = useNavigate();

    function startRegister(){
        history("authentication")
    }
  return (
    <div className={styles.cardWrapper}>
      <Card title={"Welcome to shagain Idea"} icon={"👋"}>
        <p className={styles.text}>
          We're working hard to get Shagain Idea ready for everyone! While we
          wrap up the finishing youches, we're adding people gradually to make
          sure nothing breaks.
        </p>
        <Button onclicked = {startRegister} text ={"let's Go"}></Button>
        <div className={styles.signinWrapper}>
        </div>
      </Card>
    </div>
  );
}