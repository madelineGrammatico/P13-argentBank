import { useSelector, useDispatch} from "react-redux"
import { disconnectUser } from "../../features/user/userSlice"
import { NavLink } from "react-router-dom"

import { StorageOver } from "../../features/utils/storage"
import styles from "./NavBar.module.css"

import logo from "../../assets/icons/argentBankLogo.png"

export function NavBar() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleDisconnect = async (e) => {
    dispatch(disconnectUser())
    StorageOver.clear()
  }

  return (
    <nav className={styles["main-nav"]}>
      <NavLink className={styles["main-nav-logo"]} to="/">
        <img
          className={styles["main-nav-logo-image"]}
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className={styles["sr-only"]}>Argent Bank</h1>
      </NavLink>
      <div>
        {
          user.connected || StorageOver.getItem("jwtToken")?
            <>
              <NavLink className={styles["main-nav-item"]} to="/profile">{user.firstName}</NavLink>
              <NavLink className={styles["main-nav-item"]} to="/" onClick={handleDisconnect}>Sign Out</NavLink>
            </>
          : 
            <NavLink className={styles["main-nav-item"]} to="/login">Sign In</NavLink>
        }
      </div>
    </nav>
  )
}
