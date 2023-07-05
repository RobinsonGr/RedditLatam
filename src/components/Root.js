import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import MenuCountry from "../components/MenuCountry";


export default function Root () {

    
    return (
    <>
        <Header/>
        <main>
            <Outlet/>
        </main>
        <MenuCountry/> 
     </>
    )
}