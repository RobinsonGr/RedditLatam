import Cards from "../components/Cards/Cards.js";
import Root from "../components/Root";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>} > 
    <Route path="colombia" element={<Cards/>}/>
  </Route>
));

 function  App() {

  return (
    <RouterProvider router={router} /> 
  );
}

export default App;
