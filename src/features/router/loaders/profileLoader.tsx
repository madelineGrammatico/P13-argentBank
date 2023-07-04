import { redirect } from "react-router-dom"

export const  profileLoader = () => {
    console.log(localStorage.getItem("jwtToken"))
    if (localStorage.getItem("jwtToken") === null && sessionStorage.getItem("jwtToken") === null) {
        console.log("j'ai plus un token!!")
        return redirect("/login")
    }
    return null
}