import { redirect } from "react-router-dom"
import { StorageOver } from "../../utils/storage"

export const  profileLoader = () => {
    if (StorageOver.getItem("jwtToken") === null) {
        return redirect("/login")
    }
    return null
}