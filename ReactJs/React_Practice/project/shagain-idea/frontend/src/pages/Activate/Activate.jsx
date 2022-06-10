import React,{useState} from 'react'
import Avatar from '../Step/Avatar/Avatar'
import Name from '../Step/Name/Name'

export default function Activate() {
  const steps ={
    1:Name,
    2:Avatar
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
    <div>
      <Step onNext={onNext}></Step>
    </div>
  )
}
