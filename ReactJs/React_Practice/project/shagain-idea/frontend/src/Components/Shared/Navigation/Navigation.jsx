import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
export default function Navigation() {
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    frontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItem: "center",
  };
  return (
    <div className={`${styles.navbar} container`}>
      {/* <Link style={brandStyle} to="/">
        <span>
          <span>👋</span>Shagain Idea
        </span>
      </Link> */}
{/* <Link to='/login'>Sign In</Link> */}

    </div>
  );
}
