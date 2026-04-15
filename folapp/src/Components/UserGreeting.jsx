import React, { useEffect, useState } from 'react';
import './UserGreeting.css';

import { supabase } from '../Supabase.jsx'; 

const UserGreeting = ({ userId }) => { 
    
    const [name, setName] = useState('');
    const [taskCount, setTaskCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            // 1. Fetch User Name
            const { data: userData } = await supabase
                .from('Users')
                .select('FirstName')
                .eq('id', userId)
                .single();
            if (userData) setName(userData.FirstName);

            // 2. Count "Scheduled" tasks (مجدول)
            const { count } = await supabase
                .from('Plant_Activities')
                .select('*', { count: 'exact', head: true })
                .eq('Status', 'مجدول'); 
            setTaskCount(count || 0);
        };

        fetchData();
    }, [userId]);

    return (
        <div className="greeting-section">

            <h1>مرحباً <span>{name || '...'}</span></h1>
            <div className="task-pill">
                لديك {taskCount} مهام عناية اليوم
            </div>

        </div>
    );
};

export default UserGreeting;