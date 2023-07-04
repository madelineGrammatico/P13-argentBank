import { redirect } from "react-router-dom"
// import { useSelector } from "react-redux"

export const  loginLoader = () => {
    // const user = useSelector((state) => state.user)
    console.log(localStorage.getItem("jwtToken"))
    if (localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")) {
        console.log("j'ai un token!!")
        return redirect("/profile")
    }
    return null
}