import { useSelector, useDispatch} from "react-redux"
import { disconnectUser } from "../../features/user/userSlice"

import styles from "./NavBar.module.css"

import logo from "../../assets/icons/argentBankLogo.png"

export function NavBar() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

     const handleDisconnect = async (e) => {
        e.preventDefault()
        dispatch(disconnectUser())
        localStorage.clear()
        // dispatch(connectedUser(false))
        console.log(user)
        console.log("----------------------")
    }

  return (
    <nav>
      <a className={styles["main-nav-logo"]} href="/">
        <img
          className={styles["main-nav-logo-image"]}
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className={styles["sr-only"]}>Argent Bank</h1>
      </a>
      <div>
        <a className={styles["main-nav-item"]} href="/">
          <i className="fa fa-user-circle"></i>
          Sign In
        </a>
        </div>
  
        {
            !user.connected ? 
                <a href="./login">login</a> 
            : 
                <button onClick={handleDisconnect}>deconnect</button>
        }
        
    </nav>
  )
}
