import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectCountries } from "../../features/contriesSlice";
import Card from "../Cards/Card";


export default function SeachResult () {

    const countries = useSelector(selectCountries);
    const  [query] = useSearchParams();
    const currentQuery = query.get('q');

    /*search that query in the title or text of the card*/
    const matchQueryCards = []
     Object.values(countries).forEach(({subreddits}) => {
        subreddits.map(subreddit => {
            subreddit.posts?.forEach(post => {
                if(post.title.includes(currentQuery) || post.text.includes(currentQuery)) {
                    matchQueryCards.push(post)
                };
            });
        });
    });
    
    return (
        <ul>
            {
                matchQueryCards.map(cardMatched => (
                    <li> 
                        <Card card={cardMatched}/>
                    </li>
                ))
            }
        </ul>
    )

}