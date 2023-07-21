import { useSelector, useDispatch } from "react-redux"

import { StorageOver } from "../../features/utils/storage"
import { monAxios } from '../../features/utils/getCustomAxios'
import { 
    modifyFistName, 
    modifyLastName, 
} from '../../features/user/userSlice' 

import styles from "./EditUser.module.css"

export function EditUser({ setShowEditComponent }) {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            await monAxios
                .put("user/profile", 
                    { headers: { 'Authorization': 'Bearer' + StorageOver.getItem("jwtToken") },
                      body: 
                        { 
                            firstName: e.target.form.firstName.value || user.firstName,
                            lastName: e.target.form.lastName.value || user.lastName
                        }
                    })
                .json()
                .then((result) => {
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
                placeholder={user.firstName}
            />
            <label htmlFor="lastName" hidden>Last Name</label>
            <input 
                type="text"
                name="lastName"
                placeholder={user.lastName}
            />
        </div>
        <div className={styles["input-wrapper"]}>
            <button onClick={ handleSubmit }>Save</button>
            <button onClick={() => setShowEditComponent(false)}>Cancel</button>
        </div>
        
    </form>
  )
}
