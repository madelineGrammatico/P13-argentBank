import { useSelector, useDispatch} from "react-redux"
import { disconnectUser } from "../../features/user/userSlice"
import { Navigate } from "react-router-dom"

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
            localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")? 
              <button onClick={handleDisconnect}>deconnect</button>
            : 
              <a href="/login">login</a> 
        }
        
    </nav>
  )
}
