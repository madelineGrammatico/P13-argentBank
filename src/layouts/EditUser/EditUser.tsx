import { useSelector, useDispatch } from "react-redux"
import { useState} from 'react'

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

import styles from "./EditUser.module.css"

export function EditUser({setShowEditComponent}) {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
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
                setShowEditComponent(false)
        } catch(error) {
            console.log(error)
        }
        
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
            <button onClick={() => setShowEditComponent(false)}>Cancel</button>
        </div>
        
    </form>
  )
}
