import SearchBar from "./SerachBar"
import MenuCountry from "./MenuCountry"
import { useState } from "react";
   

export default function MobileMenu () {
    const [menu, setMenu] = useState(false);

return (     
    <div  className="md:hidden"> 
    <img onClick={() => {setMenu(!menu)}} className="mid:hidden w-5 h-5" 
    src={'https://i.ibb.co/Bfy56JM/menu-redditlatam.png'} />

    {Boolean(menu) && 
    (<menu className="absolute z-10 right-2 top-20 p-3 bg-white rounded-lg"> 
        <SearchBar isMobile={menu}/>
        <div onClick={() => {setMenu(!menu)}}> 
        <MenuCountry  isMobile={menu}/>
        </div>
    </menu>)}
    </div> 
)
}