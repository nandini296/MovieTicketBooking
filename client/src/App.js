import React from 'react'
import Seat from "./pages/Seat";
import {BrowserRouter,Route,Routes} from "react-router-dom";
// import SelectCity from './pages/SelectCity';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path= "/" element={<Seat></Seat>}></Route>
      </Routes>
    </BrowserRouter>
    
  )
}

