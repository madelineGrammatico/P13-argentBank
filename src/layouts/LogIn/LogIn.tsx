import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch} from "../../app/hooks"
import { monAxios } from '../../features/utils/getCustomAxios'

import styles from "./LogIn.module.css"

import { 
    connectedUser,
} from '../../features/user/userSlice' 
import { StorageOver } from '../../features/utils/storage'

export function LogIn() {
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch() 
    const navigate = useNavigate()
    
    const [errMsg, setErrMsg] = useState("")
    
    useEffect(() => {
        if (StorageOver.getItem("jwtToken")) {
          navigate("/profile")
        }
        }, [user, navigate]
    )

    useEffect(() => {
        setErrMsg("")
    }, [ user ])

    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault()
        const form = new FormData(e.target as HTMLFormElement)
        const event = e.target as HTMLFormElement
        const rememberMe = event.rememberMe.checked
        // const formData = new URLSearchParams(form as unknown as Record<string, string>)
        try{
            const result = await monAxios.post(
                "user/login", 
                { body: Object.fromEntries(form) as unknown as BodyInit })
            const data = await result.json()
            dispatch(connectedUser(true))
            StorageOver.setItem("jwtToken", data.body.token , rememberMe )
        } catch(error){
            if(error instanceof Error) {
              setErrMsg(error.message)
            } else {
                console.log(error)
            }
        }
    }

    const errorMessage = (errMsg !== "")? <p  className= "errmsg">{ errMsg }</p> : null 

    return(
        <main className={styles["bg-dark"]}>
            <section className={styles["sign-in-content"]}>
                    <>
                        { errorMessage}
                        
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
    )
}