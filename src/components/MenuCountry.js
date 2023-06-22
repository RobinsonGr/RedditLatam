import { selectCountriesByValues, fetchCountry, selectCountries } from "../features/contriesSlice";
import { useSelector, useDispatch } from "react-redux";


export default function MenuCountry ({isMobile}) {

    const contries = useSelector(selectCountriesByValues)
    const dispatch = useDispatch()


    const countryListState = useSelector(selectCountries)

    
    
    const handleClickCountry = () => {
        console.log(countryListState)
        dispatch(fetchCountry({country: 'colombia', countryList: countryListState} ))
    }





    return (
        <div className={`${isMobile ? '' : 'hidden'} md:flex flex-col col-start-2 p-4 pl-7 rounded-lg text-neutral-500`}>
            <h2 className="mb-5 text-2xl font-bold">Países</h2>
            <ul>
        {contries.map(({name, img}) => 
            <li onClick={() => handleClickCountry()}  key={name} className="flex items-center mb-8">
                <img className='h-10 w-10' src={img} alt={`Bandera de ${name}`}></img>              
                <span className="ml-3 text-lg font-bold">
                {name}
                </span>
            </li>
        )}
        </ul>
        </div> 
    )

}