import Cards from "../components/Cards/Cards.js";
import Root from "../components/Root";
import SeachResult from "../components/Search/SearchResult.js";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>} > 
      <Route path="/search" element={<SeachResult/>}/>
      <Route path="/:country" element={<Cards/>}/>
    
  </Route>
));

 function  App() {
  return (
    <RouterProvider router={router}/> 
  );
}

export default App;
