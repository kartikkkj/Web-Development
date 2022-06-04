import React from "react";
import styles from "./Card.module.css";
export default function Card({title , icon, children}) {
  return (
    <div className={styles.card}>
      <div>
        <h1>
          <span>{icon}</span>{title}
        </h1>
      </div>
      {children}
    </div>
  );
}
