import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function SearchBar ({isMobile}) {

    const [inputSearch, setInputSearch] = useState('');

    const navigate = useNavigate();

    const getValueSearch = (e) => {
        setInputSearch(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/search?q=${inputSearch}`)
    }

    return (
        <div className={`${isMobile ? 'flex' : 'hidden'} md:flex items-center`}> 
            <form onSubmit={handleSearch}> 
            <input onChange={getValueSearch} className="px-3 mr-2 bg-stone-100" placeholder="Buscar"></input> 
            </form>
            <img className="w-5 h-5" src={'https://i.ibb.co/DKfKH84/icons8-search-120.png'}/>
        </div>
    )
} 