import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector} from "../../app/hooks"

import { Greetings } from '../Greetings/Greetings'
import { EditUser } from '../EditUser/EditUser'

import { StorageOver } from '../../features/utils/storage'

import styles from "./Profile.module.css"

export function Profile() {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  const [showEditCompoment, setShowEditComponent] = useState(false)
  useEffect(() => {
    if (!StorageOver.getItem("jwtToken")) {
      console.log("dans la condition")
      navigate("/login")
    }
    }, [user, navigate]
)
  return (
    
    <main className={styles["bg-dark"]}>
      <header className={styles["header"]}>
        {
          showEditCompoment? <EditUser setShowEditComponent={setShowEditComponent}/> : 
          <Greetings setShowEditComponent={setShowEditComponent}/>
        }
      </header>

      <h2 className={styles["sr-only"]}>Accounts</h2>

      <section className={styles["account"]}>
        <div className={styles["account-content-wrapper"]}>
          <h3 className={styles["account-title"]}>Argent Bank Checking (x8349)</h3>
          <p className={styles["account-amount"]}>$2,082.79</p>
          <p className={styles["account-amount-description"]}>Available Balance</p>
        </div>
        <div className={styles["account-content-wrapper-cta"]}>
          <button className={styles["transaction-button"]}>View transactions</button>
        </div>
      </section>

      <section className={styles["account"]}>
        <div className={styles["account-content-wrapper"]}>
          <h3 className={styles["account-title"]}>Argent Bank Savings (x6712)</h3>
          <p className={styles["account-amount"]}>$10,928.42</p>
          <p className={styles["account-amount-description"]}>Available Balance</p>
        </div>
        <div className={styles["account-content-wrapper-cta"]}>
          <button className={styles["transaction-button"]}>View transactions</button>
        </div>
      </section>

      <section className={styles["account"]}>
        <div className={styles["account-content-wrapper"]}>
          <h3 className={styles["account-title"]}>Argent Bank Credit Card (x8349)</h3>
          <p className={styles["account-amount"]}>$184.30</p>
          <p className={styles["account-amount-description"]}>Current Balance</p>
        </div>
        <div className={styles["account-content-wrapper-cta"]}>
          <button className={styles["transaction-button"]}>View transactions</button>
        </div>
      </section>
      
    </main>
  )
}
