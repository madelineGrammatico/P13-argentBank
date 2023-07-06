// import { useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { monAxios } from '../../features/utils/getCustomAxios'

import styles from "./Profile.module.css"
import { StorageOver } from "../../features/utils/storage"

import { 
  // connectedUser, 
  // disconnectUser,
  // rememberMe,
  // modifyEmail, 
  modifyFistName, 
  modifyId, 
  modifyLastName, 
} from '../../features/user/userSlice' 
import { NavLink, Outlet } from "react-router-dom"
import { Greetings } from '../Greetings/Greetings'

export function Profile(props) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch() 
  const navigate = useNavigate()

    async function getData() {
      try {
        await monAxios
          .post("user/profile", { headers: {'Authorization': 'Bearer' + StorageOver.getItem("jwtToken")}})
          .json()
          .then((result) => {
              console.log(result)
              console.log(result.body)

              dispatch(modifyFistName(result.body.firstName))
              dispatch(modifyLastName(result.body.lastName))
              dispatch(modifyId(result.body.id))
          
          })
      } catch(error: any) {
        console.log(error.message)
      }
    }
    getData()
    // console.log(window.location.pathname)
  

  return (
    
    <main className={styles["bg-dark"]}>
    <div className={styles["header"]}>
      { window.location.pathname==="/profile/user"? 
      <Outlet/> : <Greetings/> }
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
