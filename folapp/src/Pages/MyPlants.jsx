import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx'; 
import { Sun, Drop, TrendUp, Plus } from '@phosphor-icons/react';

import './MyPlants.css';


import Logo from '../Assets/logo.svg';

import Nav from './../Components/Nav';
import PageTitle from '../Components/PageTitle.jsx';
import PlantStats from '../Components/PlantStats.jsx';
import SearchBar from '../Components/SearchBar.jsx';
import Filter from '../Components/Filter.jsx';
import PlantCard from './../Components/PlantCard';
import SectionTitle from '../Components/SectionTitle.jsx';
import GeneralCard from './../Components/GeneralCard';

const MyPlants = () => {

    const userId = 1;
        const [allPlants, setAllPlants] = useState([]);
        const [activeFilter, setActiveFilter] = useState('الكل');
        const [myPlants, setMyPlants] = useState([]);
        const [loading, setLoading] = useState(true);
        const [stats, setStats] = useState({ health: 0, lowLight: 0, needsWater: 0 });

useEffect(() => {
    const fetchPlants = async () => {
        try {
            setLoading(true);
            // 1. Fetch from User_Plants AND join with the Plant table
            const { data, error } = await supabase
                .from('User_Plants')
                .select(`
                    *,
                    Plant_Details:Plant (*)
                `)
                .eq('User', 1); 

            if (error) throw error;

            if (data) {
                // --- A. Logic for Individual Plant Cards ---
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

                // --- B. Logic for Dashboard Stats Cards ---
                const lowLightCount = data.filter(p => p['Health_Status(AR)'] === 'تحتاج للضوء').length;
                const needsWaterCount = data.filter(p => p['Health_Status(AR)'] === 'تحتاج للري').length;
                
                // Calculate General Health % based on status categories
                const total = data.length;
                const healthScore = data.reduce((acc, p) => {
                    if (p['Health_Status(AR)'] === 'ممتاز' || p['Health_Status(AR)'] === 'صحي') return acc + 1;
                    if (p['Health_Status(AR)'].includes('تحتاج')) return acc + 0.5;
                    return acc;
                }, 0);
                
                const healthPercentage = total > 0 ? Math.round((healthScore / total) * 100) : 0;

                setStats({
                    health: healthPercentage,
                    lowLight: lowLightCount,
                    needsWater: needsWaterCount
                });
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

        <section className='generalSec'>
           <GeneralCard 
        Icon={TrendUp} 
        value={`${stats.health}%`} 
        title="صحة عامة" 
    />
    <GeneralCard 
        Icon={Sun} 
        value={stats.lowLight} 
        title="إضاءة منخفضة" 
    />
    <GeneralCard 
        Icon={Drop} 
        value={stats.needsWater} 
        title="يحتاج سقاية" 
    />
        </section>

        <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <section className='warnSec'>
            
            <SectionTitle title="مجموعتك" />

            <section className='plantGrid'>
    {displayedPlants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
    ))}
</section>

        </section>

        <section className='addCard'>
            <div className='plusCircle'>
                <Plus size={32} color='#fff' />
            </div>
            <h2>أضف نباتًا جديد</h2>
            <p>امسح نبات أو اختر من الكتالوج</p>
        </section>







        <Nav /> 

    </main>
    
    </> );
}
 
export default MyPlants;