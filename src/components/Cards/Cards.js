import Card from "./Card.js"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { selectCountries, fetchCountry } from "../../features/contriesSlice"
import { selectIsLoading } from "../../features/contriesSlice"
import { CardSkeleton } from "./CardSkeleton"
import { useEffect, useState } from "react"

export default function Cards () {
    const [lastApiCall, setLastApiCall] = useState(0);
    const coolDownTime = 3 *60 *1000;

    const actualCountriesList = useSelector(selectCountries);
    const isPending = useSelector(selectIsLoading);
    const dispatch = useDispatch();
    const {pathname} = useLocation();



    /*get the string name country without '/' and set mexico as default country */
    const actualCountry = pathname.length >= 5  ? pathname.slice(1) : 'mexico' 

    /* Dispath and store all data from that country*/
    /*I've used useEffect because in the normal behiavor, there are many
    re-renders and here with useEffect avoid duplicateds and
    unnecesary dispatch's, this only will work in the initial first render (componentdidmountend)*/ 

    useEffect(() => {    
        const currentTime = Date.now();
        /*If that was dispatched, dispatch again after 3 min and avod restrictions with number api calls */
        if(actualCountriesList[actualCountry].subreddits[0].posts.length === 0) {
            dispatch(fetchCountry({country: actualCountry, countryList: actualCountriesList})) 
            console.log('1')
            setLastApiCall(currentTime)
        } else if (currentTime - lastApiCall > coolDownTime) {
             dispatch(fetchCountry({country: actualCountry, countryList: actualCountriesList}))
             console.log('2')
            setLastApiCall(currentTime)
            }
        }, [actualCountry, dispatch, lastApiCall, actualCountriesList, coolDownTime])
    
    /* All cards of the different subreddit of the same country in one place */
    const {subreddits} = actualCountriesList[actualCountry]
    const allCountryCards = []
    subreddits.forEach(({posts}) => {
        posts.forEach(card => allCountryCards.push(card))
        })

     /*Ordened by upvotes*/   
    const allCardsOrdened = allCountryCards.sort((a,b) => b.ups - a.ups)
    .slice(0,20)
    .filter(cardData => !cardData.text.includes('https'))


   return isPending ? (
   <>
         {
            /*Showing skeleton loading 5 times (less that the original cards
                for avoid the saturation)  */
        [...Array(5)].map((_, i) => (
            <CardSkeleton key={i}/>
        ))
    }
   </>
    
   ) :  (
    <ul> 
    {allCardsOrdened.map(card => 
       (
        <li key={card.id}> 
            <Card card={card}></Card>
        </li>
        )
    )        
    }
    </ul>
)

}