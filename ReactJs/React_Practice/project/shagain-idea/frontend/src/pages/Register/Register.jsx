import React from 'react'
import styles from 'register.module.css'
export default function Register() {
    const step={
        1: PhoneEmail,
        2:Otp,
        3:Name,
        4:Avatar,
        5:UserName
    }
  return (
    <div className={styles.cardWrapper}>
      <Card title={"Welcome to shagain Idea"} icon={"👋"}>
        <p className={styles.text}>
          We're working hard to get Shagain Idea ready for everyone! While we
          wrap up the finishing youches, we're adding people gradually to make
          sure nothing breaks.
        </p>
        <Button onclicked = {startRegister} text ={"Get your username"}></Button>
        <div className={styles.signinWrapper}>
          <span>Have an invite text </span>
          <Link style={{cursor:"pointer", fontWeight:"bold", textDecoration:"none" , color:"#00A6ED"}} to="/login">Sign In</Link>
        </div>
      </Card>
    </div>
  )
}