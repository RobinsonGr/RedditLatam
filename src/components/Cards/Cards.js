import Card from "./Card"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { selectCountries } from "../../features/contriesSlice"


export default function Cards () {
    const countries = useSelector(selectCountries);
    const {pathname} = useLocation();
    const actualCountry = pathname.slice(1) /*get the string without / */
    const {subreddits} = countries[actualCountry]

    const allCountryCards = []
    subreddits.forEach(({posts}) => {
        posts.forEach(card => allCountryCards.push(card))
        })

     /*Ordened by upvotes */   
    const allCardsOrdened = allCountryCards.sort((a,b) => b.ups - a.ups)
    .slice(0,20)
    .filter(cardData => !cardData.text.includes('https'))
 

    
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