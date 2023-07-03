import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { Footer } from "../Footer/Footer";

export function RootLayout() {
    return(
        <>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </>
    )
}