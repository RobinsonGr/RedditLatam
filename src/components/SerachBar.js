
export default function SearchBar ({isMobile}) {


    return (
        <div className={`${isMobile ? 'flex' : 'hidden'} md:flex items-center`}> 
            <input className="px-3 mr-2 bg-stone-100" placeholder="Buscar"></input> 
            <img className="w-5 h-5" src={'https://i.ibb.co/DKfKH84/icons8-search-120.png'}/>
        </div>
    )
} 