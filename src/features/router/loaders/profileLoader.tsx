import { redirect } from "react-router-dom"
import { StorageOver } from "../../utils/storage"
// import { getData } from "../../utils/getData"

export const  profileLoader = () => {
    if (StorageOver.getItem("jwtToken") === null) {
        return redirect("/login")
    }
    return null
}