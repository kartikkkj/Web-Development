import React from 'react'
import styles from "./Button.module.css";
export default function Button({text, onclicked}) {
  return (
    <div onClick={onclicked} className={styles.color}>
          <h1>
            <span>{text+" "}</span> <span>➡️</span>
          </h1> 
    </div>
  )
}