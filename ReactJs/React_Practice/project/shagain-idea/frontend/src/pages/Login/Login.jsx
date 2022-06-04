import React, {useState} from 'react'
import styles from './Login.module.css'
import Otp from '../Step/Otp/Otp';
import PhoneEmail from '../Step/PhoneEmail/PhoneEmail';
export default function Login() {
    const steps={
        1:PhoneEmail,
        2:Otp,
    }
    const [step,setStep] = useState(1);
    const Step = steps[step];
    function increase(){
        if(step==5){

            return;
        }
        setStep(step+1);
    }
  return (
    <div className={styles.cardWrapper}>
        <Step stepIncrease ={increase} />
    </div>
  )
}
