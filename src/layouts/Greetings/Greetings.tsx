import { useAppSelector } from "../../app/hooks"
import { getData } from '../../features/utils/getData'

import styles from "./Greetings.module.css"

export function Greetings({setShowEditComponent}: { setShowEditComponent: React.Dispatch<React.SetStateAction<boolean>> }) {
  const user = useAppSelector((state) => state.user)
    getData()

  return (
    <>
      <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
      <button onClick={() => setShowEditComponent(true)} className={styles["edit-button"]}>Edit Name</button>
    </>
  )
}
