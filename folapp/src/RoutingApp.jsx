import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import MyPlants from './Pages/MyPlants';




const RoutingApp = () => {
    return ( <>
    

    <BrowserRouter>

        <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/MyPlants' element={<MyPlants />} />


        </Routes>

    </BrowserRouter>
    
    
    
    
    </> );
}
 
export default RoutingApp;