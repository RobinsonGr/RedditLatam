import Header from "./components/Header";
import MenuCountry from "./components/MenuCountry";
import MobileMenu from "./components/MobileMenu";
import { getCardsApi } from "./services/api";

 function  App() {

  
getCardsApi('colombia')


  return (
    
      <>
      <Header >
      </Header>
      
      
      <MenuCountry/> 
      
      </>
  );
}

export default App;
