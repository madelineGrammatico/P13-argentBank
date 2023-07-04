import { useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { monAxios } from '../../features/utils/getCustomAxios'

import styles from "./Profile.module.css"

import { 
  connectedUser, 
  disconnectUser,
  rememberMe,
  // modifyEmail, 
  // modifyFistName, 
  // modifyId, 
  // modifyLastName, 
  // modifyPassword 
} from '../../features/user/userSlice' 

export function Profile() {
  const user = useSelector((state) => state.user)
    const dispatch = useDispatch() 

    
  return (
    
    <main className={styles["main bg-dark"]}>
    {
      (!user.connected || !localStorage.getItem("jwtToken"))  && <Navigate to="/login"/>
    }
    <div className={styles["header"]}>
      <h1>Welcome back<br />Tony Jarvis!</h1>
      <button className={styles["edit-button"]}>Edit Name</button>
    </div>
    <h2 className={styles["sr-only"]}>Accounts</h2>
    <section className={styles["account"]}>
      <div className={styles["account-content-wrapper"]}>
        <h3 className={styles["account-title"]}>Argent Bank Checking (x8349)</h3>
        <p className={styles["account-amount"]}>$2,082.79</p>
        <p className={styles["account-amount-description"]}>Available Balance</p>
      </div>
      <div className={styles["account-content-wrapper cta"]}>
        <button className={styles["transaction-button"]}>View transactions</button>
      </div>
    </section>
    <section className={styles["account"]}>
      <div className={styles["account-content-wrapper"]}>
        <h3 className={styles["account-title"]}>Argent Bank Savings (x6712)</h3>
        <p className={styles["account-amount"]}>$10,928.42</p>
        <p className={styles["account-amount-description"]}>Available Balance</p>
      </div>
      <div className={styles["account-content-wrapper cta"]}>
        <button className={styles["transaction-button"]}>View transactions</button>
      </div>
    </section>
    <section className={styles["account"]}>
      <div className={styles["account-content-wrapper"]}>
        <h3 className={styles["account-title"]}>Argent Bank Credit Card (x8349)</h3>
        <p className={styles["account-amount"]}>$184.30</p>
        <p className={styles["account-amount-description"]}>Current Balance</p>
      </div>
      <div className={styles["account-content-wrapper cta"]}>
        <button className={styles["transaction-button"]}>View transactions</button>
      </div>
    </section>
  </main>
  )
}
