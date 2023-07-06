import { useSelector } from "react-redux"

import styles from "./Greetings.module.css"
import { useNavigate } from "react-router-dom"

export function Greetings() {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()

    const showEditUser = (e) => {
        e.preventDefault()
        navigate("./user")
      }
  return (
    <>
        <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
        <button onClick={showEditUser} className={styles["edit-button"]}>Edit Name</button>
    </>
  )
}
