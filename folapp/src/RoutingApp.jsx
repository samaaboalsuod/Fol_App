import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import MyPlants from './Pages/MyPlants';
import Community from './Pages/Community';




const RoutingApp = () => {
    return ( <>
    

    <BrowserRouter>

        <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/MyPlants' element={<MyPlants />} />
            <Route path='/Community' element={<Community />} />


        </Routes>

    </BrowserRouter>
    
    
    
    
    </> );
}
 
export default RoutingApp;