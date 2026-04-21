import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import MyPlants from './Pages/MyPlants';
import Community from './Pages/Community';
import Help from './Pages/Help';
import AskService from './Pages/AskService';
import Profile from './Pages/Profile';
import PlantDetail from './Pages/PlantDetail';




const RoutingApp = () => {
    return (<>


        <BrowserRouter>

            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/MyPlants' element={<MyPlants />} />
                <Route path='/Community' element={<Community />} />
                <Route path='/Help' element={<Help />} />
                <Route path='/AskService/:id' element={<AskService />} />
                <Route path='/Profile' element={<Profile />} />
                <Route path='/PlantDetail/:id' element={<PlantDetail />} />


            </Routes>

        </BrowserRouter>




    </>);
}

export default RoutingApp;