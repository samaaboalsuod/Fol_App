import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx'; 

import './MyPlants.css';


import Logo from '../Assets/logo.svg';

import Nav from './../Components/Nav';
import PageTitle from '../Components/PageTitle.jsx';
import PlantStats from '../Components/PlantStats.jsx';
import SearchBar from '../Components/SearchBar.jsx';
import Filter from '../Components/Filter.jsx';
import PlantCard from './../Components/PlantCard';
import SectionTitle from '../Components/SectionTitle.jsx';

const MyPlants = () => {

    const userId = 1;
        const [allPlants, setAllPlants] = useState([]);
        const [activeFilter, setActiveFilter] = useState('الكل');
        const [myPlants, setMyPlants] = useState([]);
        const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchPlants = async () => {
        try {
            setLoading(true);
            // 1. Fetch from User_Plants AND join with the Plant table for images/names
            const { data, error } = await supabase
                .from('User_Plants')
                .select(`
                    *,
                    Plant_Details:Plant (*)
                `)
                .eq('User', 1); // Filtering for your specific user ID

            if (error) throw error;

            if (data) {
                // 2. Format the date for the "Watering" text on the card
                const formattedData = data.map(plant => {
                    let wateringStatus = "لم تسقَ بعد";
                    
                    if (plant.Last_Watered) {
                        const lastDate = new Date(plant.Last_Watered).toDateString();
                        const today = new Date().toDateString();
                        const yesterday = new Date(Date.now() - 86400000).toDateString();

                        if (lastDate === today) wateringStatus = "اليوم";
                        else if (lastDate === yesterday) wateringStatus = "أمس";
                        else wateringStatus = "منذ فترة";
                    }

                    return {
                        ...plant,
                        displayWatering: wateringStatus
                    };
                });

                setAllPlants(formattedData);
            }
        } catch (err) {
            console.error("Error loading plants:", err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchPlants();
}, []);

    // This logic performs the actual filtering based on your table values
    const displayedPlants = allPlants.filter(plant => {
        if (activeFilter === 'الكل') return true;
        return plant['Health_Status(AR)'] === activeFilter;
    });

    return ( <>
    
    <main>

        <section className='header'>
              <img src={Logo} alt="logo" />
        </section>

        <div className='title'>
            <PageTitle title="نباتاتي" />
            <PlantStats userId={userId} />
        </div>

        <SearchBar placeholder="ابحث عن نباتك..." />

            <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <section className='warnSec'>
            
            <SectionTitle title="مجموعتك" />

            <section className='plantGrid'>
    {/* Change allPlants to displayedPlants to enable filtering */}
    {displayedPlants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
    ))}
</section>

        </section>






        <Nav /> 

    </main>
    
    </> );
}
 
export default MyPlants;