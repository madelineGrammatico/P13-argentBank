import { useRef, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./Register.module.css"
import { modifyFistName } from "../../features/user/userSlice"

const USER_REGEX = /^[A-Z][a-zA-Z0-9--]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

export function Register() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    // const userFirstNameRef = useRef()
    // const userLastNameRef = useRef()
    const errRef = useRef()

    const [inputFirstName, setInputFirstName] = useState("")
    const [validFirstName, setValidFirstName] = useState(false)
    const [userFirstNameFocus, setUserFirstNameFocus] = useState(false)

    const [inputLastName, setInputLastName] = useState("")
    const [validLastName, setValidLastName] = useState(false)
    const [userLastNameFocus, setUserLastNameFocus] = useState(false)

    const [pwd, setPwd] = useState("")
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState("")
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState("")
    const [succes, setSucces] = useState(false)

    useEffect(() => {
        const result = USER_REGEX.test(inputFirstName)
        dispatch(modifyFistName(result))
    }, [inputFirstName])

    useEffect(() => {
        const result = USER_REGEX.test(inputLastName)
        dispatch(modifyFistName(result))
    }, [inputLastName])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])
    
    useEffect(() => {
        setErrMsg('')
    }, [userLastName, userFirstName, pwd, matchPwd])

    const handleSumit = async (e: any) => {
        e.preventDefault()
        //if button enabled with Js hack
        const v1 = USER_REGEX.test(inputLastName)
        const v2 = USER_REGEX.test(inputFirstName)
        const v3 = PWD_REGEX.test(pwd)
        if(!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry")
            return
        }
        setErrMsg("yehhhhhhh")
    }

    return(
        <section>
            <p 
                ref={errRef} 
                className={errMsg? styles.errmsg : "offscreen"} 
                aria-live="assertive"
            >{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSumit}>
                <label htmlFor="lastName">
                    Nom:
                    <span className={ validLastName ? styles.valid : styles.hide}>
                        O
                    </span>
                    <span className={ validLastName || !inputLastName ? styles.hide : styles.invalid}>
                        X
                    </span>
                </label>
                <input
                    type="text"
                    id="lastName"
                    ref={inputLastNameRef}
                    autoComplete="off"
                    onChange={(e)=> setInputLastName(e.target.value)}
                    required
                    aria-invalid={validLastName ? "false" : "true" }
                    aria-describedby="lastnote"
                    onFocus={() => setUserLastNameFocus(true)}
                    onBlur={() => setUserLastNameFocus(false)}
                ></input>
                <p id ="lastnote" className={ userLastNameFocus && inputLastName && !validLastName ?
                "instructions" : styles.offscreen }>
                    4 à 24 caractères<br/>
                    Doit commencer par une lettre majuscule.<br/>
                    Les tirets sont autorisés mais pas les accents.
                </p>

                <label htmlFor="firstName">
                    Prémon:
                    <span className={ validFirstName ? styles.valid : styles.hide}>
                        O
                    </span>
                    <span className={ validFirstName || !inputFirstName ? styles.hide : styles.invalid}>
                        X
                    </span>
                </label>
                <input
                    type="text"
                    id="firstName"
                    ref={inputFirstNameRef}
                    autoComplete="off"
                    onChange={(e)=> setInputFirstName(e.target.value)}
                    required
                    aria-invalid={validFirstName ? "false" : "true" }
                    aria-describedby="firstnote"
                    onFocus={() => setUserFirstNameFocus(true)}
                    onBlur={() => setUserFirstNameFocus(false)}
                ></input>
                <p id ="firstnote" className={ userFirstNameFocus && inputFirstName && !validFirstName ?
                "instructions" : styles.offscreen }>
                    4 à 24 caractères<br/>
                    Doit commencer par une lettre majuscule.<br/>
                    Les tirets sont autorisés mais pas les accents.
                </p>

                <label htmlFor="password">
                    Mot de passe:
                    <span className={ validPwd ? styles.valid : styles.hide}>
                        O
                    </span>
                    <span className={ validPwd || !pwd ? styles.hide : styles.invalid}>
                        X
                    </span>
                </label>
                <input
                    type="password"
                    id="password"
                    // autoComplete="off"
                    onChange={(e)=> setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true" }
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id ="pwdnote" className={ pwdFocus && !validPwd ?
                "instructions" : styles.offscreen }>
                    8 à 24 caractères<br/>
                    Doit contenir au moins une minuscule, une majuscule,<br/>
                    un numéro et un caractères spécial.<br/>
                    caractère spécial autorisés : 
                    <span aria-label="point d'exclamation">!</span>
                    <span aria-label="arobase">@</span>
                    <span aria-label="hastag">#</span>
                    <span aria-label="dollar">$</span>
                    <span aria-label="poucentage">%</span>
                </p>

                <label htmlFor="confirm_pwd">
                    Confirmez mot de passe:
                    <span className={ validMatch && matchPwd? styles.valid : styles.hide}>
                        O
                    </span>
                    <span className={ validMatch || !matchPwd ? styles.hide : styles.invalid}>
                        X
                    </span>
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    autoComplete="off"
                    onChange={(e)=> setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true" }
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                ></input>
                <p id ="confirmnote" className={ matchFocus && !validMatch ?
                "instructions" : styles.offscreen }>
                    8 à 24 caractères<br/>
                    Doit contenir au moins une minuscule, une majuscule,<br/>
                    un numéro et un caractères spécial.<br/>
                    caractère spécial autorisés :
                    <span aria-label="point d'exclamation"> !</span>
                    <span aria-label="arobase"> @</span>
                    <span aria-label="hastag"> #</span>
                    <span aria-label="dollar"> $</span>
                    <span aria-label="poucentage">%</span>
                </p>
                <button disabled = { !validLastName || !validFirstName || !validPwd || !validMatch ? true : false }>
                    Sign Up
                </button>
                <p>
                    Déjà un compte ? <br/>
                    {/* put router link here */}
                    <a href="#">Se connexter</a>
                </p>
            </form>
        </section>
    )
}