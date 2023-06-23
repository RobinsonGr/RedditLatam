import Card from "./Card"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { selectCountries } from "../../features/contriesSlice"

export default function Cards () {
    const countries = useSelector(selectCountries)
    const {pathname} = useLocation()
    console.log(pathname.slice(1))

    

        const {subreddits} = countries[pathname.slice(1)]
        console.log(subreddits)
   
    console.log(subreddits)

    return (
    <>
    
   
    </>
    )
}