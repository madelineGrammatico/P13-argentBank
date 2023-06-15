import { useRef, useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"


import { disconnectUser, modifyEmail, modifyPassword, setUser } from '../../features/user/userSlice' 

export function LogIn() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()   
    // const userRef = useRef()
    // const errRef = useRef()

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
        const object = JSON.stringify({ email: user.email, password: user.password})
    
        await fetch("http://localhost:3001/api/v1/user/login",
            {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: object
            }
        ).then((res) =>{
            const data = res.json()
            console.log(res)
        })
        // dispatch(setUser)
        
        console.log(user)
        // setSucces(true)
        // setErrMsg("jkbkjb")
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
                        {errMsg !== "" && <p  className= "errmsg">{ errMsg }</p>}
                        
                        <h1>Sign In</h1>
                        <form id="formElem" onSubmit={handleSumit}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={(e) => dispatch(modifyEmail(e.target.value))}
                                // value={email}
                                required
                            />

                            <label htmlFor="password">password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
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