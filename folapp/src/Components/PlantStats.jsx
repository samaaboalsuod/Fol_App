import React, { useEffect, useState } from 'react';
import { supabase } from '../Supabase.jsx';
import './PlantStats.css';

const PlantStats = ({ userId }) => {
    const [totalPlants, setTotalPlants] = useState(0);
    const [needsWater, setNeedsWater] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            // Fetch 1: Total plants for the user
            const { count: total } = await supabase
                .from('User_Plants')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);
            setTotalPlants(total || 0);

            // Fetch 2: Plants needing water (scheduled tasks)
            const { count: water } = await supabase
                .from('Plant_Activities')
                .select('*', { count: 'exact', head: true })
                .eq('Activity_Type', 'ري')
                .eq('Status', 'مجدول');
            setNeedsWater(water || 0);
        };

        fetchStats();
    }, [userId]);

    return (
        <div className="stats-container">

            <div className="stat-item">
                <div className="dot"></div>
                <span>{totalPlants} نبات</span>
            </div>

            <div className="stat-item">
                <div className="dot"></div>
                <span>{needsWater} تحتاج الري</span>
            </div>

        </div>
    );
};

export default PlantStats;