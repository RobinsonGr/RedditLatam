import SearchBar from "./SerachBar"
import MenuCountry from "./MenuCountry"
import { useState } from "react";
   

export default function MobileMenu () {
    const [menu, setMenu] = useState(false);



    
return (  
   
    <div onClick={() => {setMenu(!menu)}} className="md:hidden"> 
    <img className="mid:hidden w-5 h-5" src={'https://i.ibb.co/Bfy56JM/menu-redditlatam.png'} />
    {Boolean(menu) && 
    (<menu className="relative top-5"> 
        <SearchBar isMobile={menu}/>
        <MenuCountry isMobile={menu}/>
        <p>works</p>
    </menu>)}
    </div> 
)
}