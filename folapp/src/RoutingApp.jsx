import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Home from './Pages/Home';
import MyPlants from './Pages/MyPlants';
import Community from './Pages/Community';
import Help from './Pages/Help';
import AskService from './Pages/AskService';
import Profile from './Pages/Profile';
import PlantDetail from './Pages/PlantDetail';
import AddPlant from './Pages/AddPlant';
import CareHistory from './Pages/CareHistory';
import InsidePost from './Pages/InsidePost';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.995 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
                <Routes location={location}>
                    <Route path='/' element={<Home />} />
                    <Route path='/MyPlants' element={<MyPlants />} />
                    <Route path='/Community' element={<Community />} />
                    <Route path='/Help' element={<Help />} />
                    <Route path='/AskService/:id' element={<AskService />} />
                    <Route path='/Profile' element={<Profile />} />
                    <Route path='/PlantDetail/:id' element={<PlantDetail />} />
                    <Route path='/AddPlant' element={<AddPlant />} />
                    <Route path='/CareHistory/:id' element={<CareHistory />} />
                    <Route path='/InsidePost/:id' element={<InsidePost />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
};



const RoutingApp = () => {
    return (<>


        <BrowserRouter>

            <AnimatedRoutes />

        </BrowserRouter>




    </>);
}

export default RoutingApp;
