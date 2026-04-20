import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx';
import './Profile.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';
import ProfileTop from './../Components/ProfileTop';
import SectionTitle from '../Components/SectionTitle.jsx';
import DataLine from '../Components/DataLine.jsx';
import BigCardProfile from '../Components/BigCardProfile.jsx';



const Profile = () => {

    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        joinedDate: ''
    });
    const [stats, setStats] = useState({ total: 0, healthPercent: 0 });

useEffect(() => {
    const loadData = async () => {
        try {
            // 1. Fetch Profile Data
            const { data: user, error: userErr } = await supabase
                .from('Users')
                .select('FirstName, LastName, "E-mail", created_at')
                .eq('id', 1)
                .single();

            if (user) {
                const dateOnly = new Date(user.created_at).toLocaleDateString('en-GB'); 
                setProfileData({
                    fullName: `${user.FirstName} ${user.LastName}`,
                    email: user["E-mail"],
                    joinedDate: dateOnly 
                });
            }

            // 2. Fetch Plant Health Stats
            // We use double quotes for the column name with parentheses
            const { data: plants, error: plantErr } = await supabase
                .from('User_Plants')
                .select('"Health_Status(AR)"') 
                .eq('User', 1);

            if (plants) {
                const totalCount = plants.length; // This should be 6
                
                // Filtering for "صحي"
                const healthyCount = plants.filter(p => p['Health_Status(AR)'] === 'صحي').length;
                
                // 3 / 6 = 50%
                const percentage = totalCount > 0 ? Math.round((healthyCount / totalCount) * 100) : 0;

                setStats({
                    total: totalCount,
                    healthPercent: percentage
                });
            }
        } catch (err) {
            console.error("Data loading failed:", err);
        }
    };

    loadData();
}, []);


    return ( <>

    <main>

        <section className='header'>
            <img src={Logo} alt="logo" />
        </section>

        <ProfileTop />

        <section className='warnSec'>
            <SectionTitle title="معلومات الحساب" />

            <div className='whiteRoundCard'>
                <DataLine title="الاسم" value={profileData.fullName} />
                <hr className='datastrap' />
                <DataLine title="البريد الإلكتروني" value={profileData.email} />
                <hr className='datastrap' />
                <DataLine title="تاريخ الانضمام" value={profileData.joinedDate} />
            </div>
            
        </section>

        <section className='warnSec'>
            <SectionTitle title="نباتاتي" more="عرض الكل" />

            <div className='cardRow'>
                <BigCardProfile 
                title="النباتات النشطة" 
                value={stats.total} 
            />
            
            <BigCardProfile 
                title="الصحة العامة" 
                value={`${stats.healthPercent}%`} 
            />
            </div>
        </section>























        <Nav /> 
        



    </main>
    
    
    </> );
}
 
export default Profile;