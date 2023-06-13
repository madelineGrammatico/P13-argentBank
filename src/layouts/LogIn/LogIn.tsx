import { useRef, useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"

import { connectUser, disconnectUser, modifyEmail, modifyPassword } from '../../features/user/userSlice' 

export function LogIn() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()   
    const userRef = useRef()
    const errRef = useRef()

    // const [email, setEmail] = useState("")
    // const [user, setUser] = useState("")
    // const [pwd, setPwd] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [succes, setSucces] = useState(false)
    
    // useEffect(() => {
    //     userRef.current.focus()
    // }, [])

    useEffect(() => {
        setErrMsg("")
    },[user.email, user.password])

    const handleSumit = async (e) => {
        e.preventDefault()
        dispatch(connectUser)
        console.log(user)
        setSucces(true)
    }
    const handleDisconnect = async (e) => {
        e.preventDefault()
        dispatch(disconnectUser)
        setSucces(false)
    }
    return(
        <>
            { succes ? (
                    <section>
                        <h1>vous êtes connecté</h1>
                        <p>
                            <a href="#">allez à l'acceuil</a>
                        </p>
                        <button onClick={handleDisconnect}>se déconnecté</button>
                    </section>
                ) : (
                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen" }>
                            { errMsg }
                        </p>
                        <h1>Sign In</h1>
                        <form onSubmit={handleSumit}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                ref={userRef}
                                onChange={(e) => dispatch(modifyEmail(e.target.value))}
                                // value={email}
                                required
                            />

                            <label htmlFor="password">password</label>
                            <input
                                type="password"
                                id="password"
                                ref={userRef}
                                onChange={(e) => dispatch(modifyPassword(e.target.value))}
                                // value={pwd}
                                required
                            />
                            <button>
                                Sign In
                            </button>
                        </form>
                        <p>
                            Pas encore de compte?
                            <span className='line'>
                                <a href="#">devenir client</a>
                            </span>
                        </p>
                    </section>
                )
            }
            
        </>
        
    )
}