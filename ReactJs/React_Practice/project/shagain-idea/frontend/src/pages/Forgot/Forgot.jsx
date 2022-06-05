import React, { useState } from "react";
import Email from "./PhoneOrEmail/Email/Email";
import Phone from "./PhoneOrEmail/Phone/Phone";
import styles from "../Step/Step.module.css";
export default function Forgot() {
  const phoneEmail = {
    phone: Phone,
    email: Email,
  };
  const [type, setType] = useState("phone");
  const CompType = phoneEmail[type];
  return (
    <>
      <div className={styles.cardWrapper}>
        <div className={styles.cardWrapper}>
          <div className={styles.buttonWrap}>
            <span
              className={`${styles.tabBtn} ${
                type === "phone" ? styles.active : ""
              } `}
              onClick={() => setType("phone")}
            >
              ☎️
            </span>
            <span
              className={`${styles.tabBtn} ${
                type === "email" ? styles.active : ""
              } `}
              onClick={() => setType("email")}
            >
              📧
            </span>
          </div>
          <div>
            <CompType />
          </div>
        </div>
      </div>
    </>
  );
}
