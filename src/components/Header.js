

import SearchBar from "./SerachBar";
import MobileMenu from "./MobileMenu";

export default function Header () {

    return (
        <header className="col-span-2 w-full flex justify-between items-center px-8 py-4 "> 
            {/*Logo*/}
            <div className="flex items-center "> 
            <img className="w-10 h-10" src={'https://i.ibb.co/1bzMShp/Reddit-Latam.png'} />
            <p className="font-bold px-2 text-lg">Reddit<span className=" text-green-latam">Latam</span></p>
            </div>

            {/* Search bar */}
            <SearchBar/>
            {/*Mobile dropdown menu*/}
            <MobileMenu/>    
        </header>
        
    )
}