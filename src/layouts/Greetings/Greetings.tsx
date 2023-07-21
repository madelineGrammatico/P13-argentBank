import { useSelector } from "react-redux"

import styles from "./Greetings.module.css"

export function Greetings({setShowEditComponent}) {
    const user = useSelector((state) => state.user)

  return (
    <>
        <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
        <button onClick={() => setShowEditComponent(true)} className={styles["edit-button"]}>Edit Name</button>
    </>
  )
}
