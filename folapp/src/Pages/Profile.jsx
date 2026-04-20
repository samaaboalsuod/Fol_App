import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx';
import { UsersThree, Confetti, PottedPlant } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

import './Profile.css';
import './AchievementsCarousel.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';
import ProfileTop from './../Components/ProfileTop';
import SectionTitle from '../Components/SectionTitle.jsx';
import DataLine from '../Components/DataLine.jsx';
import BigCardProfile from '../Components/BigCardProfile.jsx';
import AchieveCard from './../Components/AchieveCard';



const Profile = () => {
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        joinedDate: ''
    });
    const [stats, setStats] = useState({ total: 0, healthPercent: 0 });
    const [achievements, setAchievements] = useState({
       posts: 0,
       plantOrdinal: '',
       daysOfCare: 0
    });

    // Added: State to manage carousel positions
    const [positionIdx, setPositionIdx] = useState([0, 1, 2]);

    // Added: Function to swap cards
    const handleSwap = () => {
        setPositionIdx((prevIdx) => prevIdx.map((prev) => (prev + 1) % 3));
    };

    const positions = ['left', 'center', 'right'];

const cardVariants = {
    left: { x: '-75%', scale: 0.8, zIndex: 1, opacity: 0.5 },
    center: { x: '0%', scale: 1.1, zIndex: 5, opacity: 1 },
    right: { x: '75%', scale: 0.8, zIndex: 1, opacity: 0.5 },
};

    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Fetch User Data
                const { data: user } = await supabase
                    .from('Users')
                    .select('FirstName, LastName, "E-mail", created_at, Posts')
                    .eq('id', 1)
                    .single();

                if (user) {
                    const joinedDate = new Date(user.created_at);
                    const today = new Date();
                    const diffTime = Math.abs(today - joinedDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    setProfileData({
                        fullName: `${user.FirstName} ${user.LastName}`,
                        email: user["E-mail"],
                        joinedDate: new Date(user.created_at).toLocaleDateString('en-GB')
                    });

                    setAchievements(prev => ({
                        ...prev,
                        posts: user.Posts || 8, // cite: Users_rows.sql
                        daysOfCare: diffDays
                    }));
                }

                // 2. Fetch Plant Data
                const { data: plants } = await supabase
                    .from('User_Plants')
                    .select('"Health_Status(AR)"') 
                    .eq('User', 1);

                if (plants) {
                    const totalCount = plants.length; // 6 plants
                    const healthyCount = plants.filter(p => p['Health_Status(AR)'] === 'صحي').length;
                    const percentage = totalCount > 0 ? Math.round((healthyCount / totalCount) * 100) : 0;

                    setStats({ total: totalCount, healthPercent: percentage });

                    const ordinals = ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع"];
                    setAchievements(prev => ({
                        ...prev,
                        plantOrdinal: ordinals[totalCount - 1] || totalCount // "السادس"
                    }));
                }
            } catch (err) {
                console.error("Data loading failed:", err);
            }
        };
        loadData();
    }, []);

    // Create a data array for the map in return
    const achievementData = [
        { id: 0, Icon: UsersThree, title: "اجتماعي", desc: `${achievements.posts} في فل منشورات` },
        { id: 1, Icon: Confetti, title: "منتظم", desc: `${achievements.daysOfCare} أيام من العناية` },
        { id: 2, Icon: PottedPlant, title: "الخضار", desc: `أضفت النبات ${achievements.plantOrdinal}` }
    ];


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

<section className='warnSec'>
    <SectionTitle title="الإنجازات" />

    <div className='carousel-container'>
    <div className='carousel-inner'>
        {achievementData.map((card, index) => (
            <motion.div
                key={card.id}
                animate={positions[positionIdx[index]]}
                variants={cardVariants}
                transition={{ duration: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                    if (info.offset.x < -30) handleSwap();
                    if (info.offset.x > 30) handleSwap();
                }}
                className="carousel-item"
            >
                <AchieveCard 
                    Icon={card.Icon} 
                    title={card.title} 
                    desc={card.desc} 
                />
            </motion.div>
        ))}
    </div>
</div>
</section>

        <section className='warnSec'>
            <SectionTitle title="نشاط المجتمع" />

            <div className='whiteRoundCard'>
                <DataLine title="الاسم" value={profileData.fullName} />
                <hr className='datastrap' />
                <DataLine title="البريد الإلكتروني" value={profileData.email} />
                <hr className='datastrap' />
                <DataLine title="تاريخ الانضمام" value={profileData.joinedDate} />
            </div>
            
        </section>









        <Nav /> 
        



    </main>
    
    
    </> );
}
 
export default Profile;