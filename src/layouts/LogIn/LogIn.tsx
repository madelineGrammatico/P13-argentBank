import { useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { monAxios } from '../../features/utils/getCustomAxios'

import { connectedUser , disconnectUser, modifyEmail, modifyFistName, modifyId, modifyLastName, modifyPassword } from '../../features/user/userSlice' 
// import { UseGetUserQuery } from '../../features/apiSlice'

export function LogIn() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()   
    const [errMsg, setErrMsg] = useState("")
    const [succes, setSucces] = useState(false)

    // const monAxios = getCustomAxios("http://localhost:3001/api/v1/", {
    // headers: {
    //     "accept": "application/json",
    //     "Content-Type": "application/json"
    // },
    // })
    // const { userData } = UseGetUserQuery()

    useEffect(() => {
        setErrMsg("")
    },[user.email, user.password])

    const handleSumit = async (e) => {
        e.preventDefault()
        
        // console.log(userData)

        // const object = JSON.stringify({ email: user.email, password: user.password})
        try{
            await monAxios
                .post("user/login", { body:{ email: user.email, password: user.password}})
                .json()
                .then((result) => {
                    setSucces(true)
                    console.log(result)
                    localStorage.setItem('jwtToken', result.body.token)
                    dispatch(connectedUser(true))
                    
                    
                })
            
            await monAxios
                .post("user/profile", { headers: {'Authorization': 'Bearer' + localStorage.getItem("jwtToken")}})
                .json()
                .then((result) => {
                    console.log(result)
                    dispatch(modifyFistName(result.body.firstName))
                    dispatch(modifyLastName(result.body.lastName))
                    dispatch(modifyId(result.body.id))
                    
                })

            
        } catch(error: any) {
            console.log(error.message)
        }
        
        console.log(user) 
        console.log("----------------------")
    }
    const handleDisconnect = async (e) => {
        e.preventDefault()
        dispatch(disconnectUser())
        setSucces(false)
        localStorage.clear()
        // dispatch(connectedUser(false))
        console.log(user)
        console.log("----------------------")
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