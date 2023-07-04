import { useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { monAxios } from '../../features/utils/getCustomAxios'

import styles from "./LogIn.module.css"

import { 
    connectedUser, 
    disconnectUser,
    rememberMe,
    // modifyEmail, 
    // modifyFistName, 
    // modifyId, 
    // modifyLastName, 
    // modifyPassword 
} from '../../features/user/userSlice' 
// import { UseGetUserQuery } from '../../features/apiSlice'

export function LogIn() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch() 

    const [errMsg, setErrMsg] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [pwdInput, setPwdInput] = useState("")
    

    useEffect(() => {
        setErrMsg("")
    }, [ emailInput, pwdInput ])

    const handleSumit = async (e) => {
        e.preventDefault()
        console.log(e.target.rememberMe.checked)
        try{
            await monAxios
                .post("user/login", { body:{ email: emailInput, password: pwdInput}})
                .json()
                .then((result) => {
                    // dispatch(modifyEmail(emailInput))
                    // dispatch(modifyEmail(pwdInput))
                    dispatch(connectedUser(true))
                    if (e.target.rememberMe.checked) {
                        dispatch(rememberMe())
                        localStorage.setItem('jwtToken', result.body.token)
                    }
                    console.log(localStorage.getItem("jwtToken"))
                    // if (localStorage.jwtToken) {
                    //     console.log("connecté")
                    //     // return redirect("/profile")
                    //     return
                    // }
                    console.log("try again")
                })
            
            // await monAxios
            //     .post("user/profile", { headers: {'Authorization': 'Bearer' + localStorage.getItem("jwtToken")}})
            //     .json()
            //     .then((result) => {
            //         console.log(result)
            //         dispatch(modifyFistName(result.body.firstName))
            //         dispatch(modifyLastName(result.body.lastName))
            //         dispatch(modifyId(result.body.id))
                    
            //     })

            
        } catch(error: any) {
            console.log(error.message)
            setErrMsg(error.message)
        }
        
        console.log(user) 
        console.log("----------------------")
    }
    const handleDisconnect = async (e) => {
        e.preventDefault()
        dispatch(disconnectUser())
        localStorage.clear()
        console.log(user)
        console.log("----------------------")
    }
    return(
        <>
            <main className={styles["bg-dark"]}>
                <section className={styles["sign-in-content"]}>
                    {/* { user.connected ? (
                        <>
                            <h1>You are connected</h1>
                            <p>
                                <a href="/">Go home</a>
                            </p>
                            <button onClick={handleDisconnect}>disconnect</button>
                        </>
                    ) : ( */}
                        <>
                            { errMsg !== "" && <p  className= "errmsg">{ errMsg }</p> }
                            { (user.connected || localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken"))&& (
                                <Navigate to="/profile" replace={true}/>
                            )}

                            <i className="fa fa-user-circle sign-in-icon"/>
                            <h1>Sign In</h1>

                            <form id="formElem" onSubmit={handleSumit}>
                                <div className={styles["input-wrapper"]}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={(e) => setEmailInput(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles["input-wrapper"]}>
                                    <label htmlFor="password">password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={(e) => setPwdInput(e.target.value)}
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
                    {/* )} */}
                </section>
                    
            </main>
            
        </>
        
    )
}