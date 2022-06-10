import React, {useState} from 'react'
import styles from './Authentication.module.css'
import Otp from '../Step/Otp/Otp';
import PhoneEmail from '../Step/PhoneEmail/PhoneEmail';
import Password from '../Step/Password/Password';
export default function Authentication() {
    const steps={
        1:PhoneEmail,
        2:Otp
    }
    const [step,setStep] = useState(1);
    const Step = steps[step];
    function onNext(){
        if(step==2){
            return;
        }
        setStep(step+1);
    }
  return (
    <div className={styles.cardWrapper}>
        <Step onNext ={onNext} />
    </div>
  )
}
 