import { Link } from "react-router-dom";
import { fetchCountry, selectCountries } from "../features/contriesSlice";
import { useSelector, useDispatch } from "react-redux";


export default function MenuCountry ({isMobile}) {

    const dispatch = useDispatch()
    const countryListState = useSelector(selectCountries)
     /* the form of the slice is {country: {name, img, subreddits,,, etc} ...} so 
     the map that will iteratere and need img and name only needs the values that are objs, no 
     not the whole property
    */
   const countryValues = Object.values(countryListState)

    

    const handleClickCountry = (country) => {
        dispatch(fetchCountry({country, countryList: countryListState}))   
    }


    return (
        <div className={`${isMobile ? '' : 'hidden'} md:flex flex-col col-start-2 p-4 pl-7 rounded-lg text-neutral-500`}>
            <h2 className="mb-5 text-2xl font-bold">Países</h2>
            <ul>
        {countryValues.map(({name, img}) => 
        
        <Link to={`/${name.toLowerCase()}`}>
            <li onClick={() => handleClickCountry(name.toLowerCase())}  key={name} className="flex items-center mb-8">
                <img className='h-10 w-10' src={img} alt={`Bandera de ${name}`}></img>              
                <span className="ml-3 text-lg font-bold">
                {name}
                </span>
            </li>
        </Link>
        )}
        </ul>
        </div> 
    )

}