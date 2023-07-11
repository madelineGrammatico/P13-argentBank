import { useSelector, useDispatch } from "react-redux"
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { StorageOver } from "../../features/utils/storage"
import { monAxios } from '../../features/utils/getCustomAxios'
import { 
    // connectedUser, 
    // disconnectUser,
    // rememberMe,
    modifyEmail,
    // modifyPassword, 
    modifyFistName, 
    modifyId, 
    modifyLastName, 
} from '../../features/user/userSlice' 
// import { User } from "../../features/user/userSlice"

import styles from "./EditUser.module.css"

export function EditUser() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ firstNameInput, setFirstNameInput ] = useState(user.firstName)
    const [ lastNameInput, setLastNameInput ] = useState(user.lastName)

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            await monAxios
                .put("user/profile", 
                    { headers: { 'Authorization': 'Bearer' + StorageOver.getItem("jwtToken") },
                      body: { firstName: firstNameInput, lastName: lastNameInput }})
                .json()
                .then((result) => {
                    dispatch(modifyEmail(result.body.email))
                    dispatch(modifyId(result.body.id))
                    dispatch(modifyFistName(result.body.firstName))
                    dispatch(modifyLastName(result.body.lastName))
                })

                await monAxios
                .post("user/login", { body:{ email: user.email, password: user.password }})
                .json()
                .then((result) => {
                    
                    StorageOver.setItem("jwtToken", result.body.token , user.rememberMe )
                    console.log(result)
                    navigate("/profile")
                })
        } catch(error) {
            console.log(error)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        navigate("/profile")
    }
  return (
    <form>
        <h2>Welcome back</h2>
        <div className={styles["input-wrapper"]}>
            <label htmlFor="firstName" hidden>First Name</label>
            <input 
                type="text" 
                name="firstName"
                placeholder={firstNameInput}
                onChange={(e) => setFirstNameInput(e.target.value)}
            />
            <label htmlFor="lastName" hidden>Last Name</label>
            <input 
                type="text"
                name="lastName"
                placeholder={lastNameInput}
                onChange={(e) => setLastNameInput(e.target.value)}
            />
        </div>
        <div className={styles["input-wrapper"]}>
            <button onClick={handleSubmit}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
        
    </form>
  )
}
