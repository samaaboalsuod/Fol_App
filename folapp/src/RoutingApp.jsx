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
import Lessons from './Pages/Lessons';
import Settings from './Pages/Settings';
import Notification from './Pages/Notification';
import ChatHistory from './Pages/ChatHistory';
import LanguageSettings from './Pages/LanguageSettings';
import AddPlantManual1 from './Pages/AddPlantManual1';
import AddPlantManual2 from './Pages/AddPlantManual2';
import AddPlantManual3 from './Pages/AddPlantManual3';
import AddPlantManual4 from './Pages/AddPlantManual4';
import AddPlantManual5 from './Pages/AddPlantManual5';
import AddPlantManual6 from './Pages/AddPlantManual6';

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
                    <Route path='/Lessons' element={<Lessons />} />
                    <Route path='/Settings' element={<Settings />} />
                    <Route path='/Notification' element={<Notification />} />
                    <Route path='/ChatHistory' element={<ChatHistory />} />
                    <Route path='/LanguageSettings' element={<LanguageSettings />} />
                    <Route path='/AddPlantManual1' element={<AddPlantManual1 />} />
                    <Route path='/AddPlantManual2' element={<AddPlantManual2 />} />
                    <Route path='/AddPlantManual3' element={<AddPlantManual3 />} />
                    <Route path='/AddPlantManual4' element={<AddPlantManual4 />} />
                    <Route path='/AddPlantManual5' element={<AddPlantManual5 />} />
                    <Route path='/AddPlantManual6' element={<AddPlantManual6 />} />
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
