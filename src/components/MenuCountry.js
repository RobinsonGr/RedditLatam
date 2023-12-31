import { NavLink } from "react-router-dom";
import { selectCountries } from "../features/contriesSlice";
import { useSelector } from "react-redux";


export default function MenuCountry ({isMobile}) {

    const countryListState = useSelector(selectCountries)
     /* the form of the slice is {country: {name, img, subreddits,,, etc} ...} so 
     the map that will iteratere and need img and name only needs the values that are objs, no 
     not the whole property
    */
    const countryValues = Object.values(countryListState)

    return (
        <div className={`${isMobile ? '' : 'hidden'} md:flex flex-col col-start-2 py-2 pl-4 rounded-lg text-neutral-500`}>
            <h2 className="mb-5 text-2xl font-bold">Países</h2>
            <ul>
        {countryValues.map(({name, img}) => 

        <NavLink 
        className={({isActive}) => isActive ? 'activeNav': null} 
        to={`/${name.toLowerCase()}`}>
            <li   
           
            key={name} 
            className={`menuItem flex items-center mb-1 p-4 border-l-4 
            border-l-green-200 hover:bg-gray-100 `}>
                <img className='h-10 w-10' src={img} alt={`Bandera de ${name}`}></img>              
                <span className="ml-3 text-lg font-bold">
                {name}
                </span>
            </li>
        </NavLink>
        )}
        </ul>
        </div> 
    )

}