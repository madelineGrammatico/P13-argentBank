import React, { useRef } from "react"
import { useAppSelector, useAppDispatch} from "../../app/hooks"
import { StorageOver } from "../../features/utils/storage"
import { monAxios } from '../../features/utils/getCustomAxios'
import { 
    modifyFistName, 
    modifyLastName, 
} from '../../features/user/userSlice' 

import styles from "./EditUser.module.css"

export function EditUser({ setShowEditComponent }: { setShowEditComponent: React.Dispatch<React.SetStateAction<boolean>> }) {
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async(e: React.FormEvent<EventTarget>) => {
        e.preventDefault()
        if(!formRef.current) return
        const form = new FormData(formRef.current)
        const firstName =  form.get("firstName") || user.firstName
        const lastName = form.get("lastName") || user.lastName
        form.set("firstName", firstName)
        form.set("lastName", lastName)
        try{
            const result = monAxios.put(
                "user/profile", 
                { 
                    headers: { 'Authorization': 'Bearer' + StorageOver.getItem("jwtToken") },
                    body: Object.fromEntries(form),
                })
            const data = await result.json()
            dispatch(modifyFistName(data.body.firstName))
            dispatch(modifyLastName(data.body.lastName))
            setShowEditComponent(false)
        } catch(error) {
            console.log(error)
        }
        
    }

  return (
    <form ref={ formRef }>
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
            <button onClick={ handleSubmit } type="submit">Save</button>
            <button onClick={() => setShowEditComponent(false)} type="button">Cancel</button>
        </div>
        
    </form>
  )
}
