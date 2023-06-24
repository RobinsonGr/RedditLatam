import Card from "./Card"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { selectCountries } from "../../features/contriesSlice"

export default function Cards () {
    const countries = useSelector(selectCountries)
    const {pathname} = useLocation()
    const {subreddits} = countries[pathname.slice(1)]

    const allCountryCards = []
    subreddits.forEach(({posts}) => {
        posts.forEach(card => allCountryCards.push(card))
        })
    const allCardsOrdened = allCountryCards.sort((a,b) => b.ups - a.ups)

    console.log(allCardsOrdened)

    return (
        <ul className=""> 
        {allCardsOrdened.map(card => 
           (
            <li> 
            <Card card={card}></Card>
            </li>
            )
        )        
        }
        </ul>
    )
}