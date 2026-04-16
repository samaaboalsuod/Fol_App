import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { supabase } from '../Supabase.jsx';
import { TrendUp } from "@phosphor-icons/react";

import './GardenHealth.css';


const GardenHealth = ({ userId }) => {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const calculateHealth = async () => {
            // 1. Get all activity for the user's plants
            const { data: activities } = await supabase
                .from('Plant_Activities')
                .select('Status');

            if (activities && activities.length > 0) {
                const total = activities.length;
                const completed = activities.filter(a => a.Status === 'تم التنفيذ').length;
                setPercentage(Math.round((completed / total) * 100));
            }
        };
        calculateHealth();
    }, [userId]);

    return (
        <div className="health-container">

            <div className="circle-wrapper">
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    strokeWidth={4}
                    styles={buildStyles({
                        pathColor: '#A4C3A2',
                        trailColor: 'rgba(255, 255, 255, 0.05)',
                        strokeLinecap: 'round',
                        textSize: '40px',
                    })}
                />
            </div>

            <div className="health-label">
                <TrendUp size={24} weight="bold" />
                <h2>الصحة العامة لحديقتك</h2>
            </div>

        </div>
    );
};

export default GardenHealth;