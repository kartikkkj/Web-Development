import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Components/Shared/Button/Button";
import Card from "../../../Components/Shared/Card/Card";
import TextInput from "../../../Components/Shared/TextInput/TextInput";
import { setName } from "../../../store/ativateSlice";
import styles from "../Step.module.css";
export default function Name({ onNext }) {
  const { name } = useSelector((state) => state.activate);
  const [fname, setFname] = useState("");
  const dispatch = useDispatch();
  const [err, setErr] = useState("")
  function nextStep() {
    if(!fname){
      setErr("Please enter your name")
      setTimeout(()=>{
        setErr("")
      },5000)
      return;
    }
    dispatch(setName(fname));
    onNext();
  }
  return (
    <>
    <div className={styles.cardWrapper}>
      <Card title={"What is your name?"} icon={"😎"}>
      {err? <p className={styles.buttomPara}>{err}</p>:"" }
        <TextInput
          type="text"
          placeholde="**********"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <div className={styles.btnWrapper}>
          <p className={styles.buttomParaName}>
            people use their original name here....!
          </p>
          <Button onclicked={nextStep} text={"Next"}></Button>
        </div>
      </Card>
      </div>
    </>
  );
}
