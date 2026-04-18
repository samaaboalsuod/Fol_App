import React, { useEffect, useState } from 'react';
import { supabase } from '../Supabase.jsx';
import './PlantStats.css';

const PlantStats = ({ userId }) => {
    const [totalPlants, setTotalPlants] = useState(0);
    const [needsWater, setNeedsWater] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            if (!userId) return;

            // Fetch 1: Total plants for the user (using 'User' column)
            const { count: total, error: totalError } = await supabase
                .from('User_Plants')
                .select('*', { count: 'exact', head: true })
                .eq('User', userId);

            if (!totalError) setTotalPlants(total || 0);

            // Fetch 2: Scheduled watering tasks for THIS user's plants
            // We use User_Plants!inner to filter activities by the plant owner
            const { count: water, error: waterError } = await supabase
                .from('Plant_Activities')
                .select('id, User_Plants!inner(User)', { count: 'exact', head: true })
                .eq('Activity_Type', 'ري')
                .eq('Status', 'مجدول')
                .eq('User_Plants.User', userId);

            if (!waterError) setNeedsWater(water || 0);
        };

        fetchStats();
    }, [userId]);

    return (
        <div className="stats-container">
            <div className="stat-item">
                <div className="dot total-dot"></div>
                <span className="stat-text">{totalPlants} نبات</span>
            </div>

            <div className="stat-item">
                <div className="dot water-dot"></div>
                <span className="stat-text">{needsWater} تحتاج الري</span>
            </div>
        </div>
    );
};

export default PlantStats;