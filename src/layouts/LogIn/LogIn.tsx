import { useState, useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { monAxios } from '../../features/utils/getCustomAxios'

import styles from "./LogIn.module.css"

import { 
    connectedUser,
    rememberMe,
    modifyEmail,
    modifyPassword,
} from '../../features/user/userSlice' 
import { StorageOver } from '../../features/utils/storage'

export function LogIn() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    
    const [errMsg, setErrMsg] = useState("")
    
    useEffect(() => {
        if (StorageOver.getItem("jwtToken")) {
          navigate("/profile")
        }
      }, [StorageOver])

    useEffect(() => {
        setErrMsg("")
    }, [ user ])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await monAxios
                .post(
                    "user/login", 
                    { 
                        body:{
                            email: e.target.email.value,
                            password: e.target.password.value
                        }
                    }
                )
                .json()
                .then((result) => {
                    dispatch(modifyEmail(e.target.email.value))
                    dispatch(modifyPassword(e.target.password.value))
                    dispatch(connectedUser(true))
                    if (e.target.rememberMe.checked) {
                        dispatch(rememberMe())
                    }
                    StorageOver.setItem("jwtToken", result.body.token , e.target.rememberMe.checked )
                })
            
        } catch(error: any) {
            setErrMsg(error.message)
        }
    }

    return(
        <>
            <main className={styles["bg-dark"]}>
                <section className={styles["sign-in-content"]}>
                        <>
                            { errMsg !== "" && <p  className= "errmsg">{ errMsg }</p> }
                            { (
                                StorageOver.getItem('jwtToken')
                                ) && (
                                <Navigate to="/profile" />
                            )}

                            <i className="fa fa-user-circle sign-in-icon"/>
                            <h1>Sign In</h1>

                            <form id="formElem" onSubmit={handleSubmit}>
                                <div className={styles["input-wrapper"]}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                    />
                                </div>

                                <div className={styles["input-wrapper"]}>
                                    <label htmlFor="password">password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                    />
                                </div>
                                
                                <div className={styles["input-wrapper-remember"]}>
                                    <input type="checkbox" id="rememberMe" name="rememberMe"/>
                                    <label htmlFor="rememberMe" >Remember me</label>
                                </div>
                                
                                <button className={styles["sign-in-button"]}>
                                    Sign In
                                </button>
                            </form>
                        </>
                </section>
                    
            </main>
            
        </>
        
    )
}