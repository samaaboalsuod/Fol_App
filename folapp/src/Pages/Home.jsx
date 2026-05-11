import React, { useEffect, useState } from 'react';
import { supabase } from '../Supabase.jsx'; 
import { useNavigate } from 'react-router-dom';
import { User } from '@phosphor-icons/react';

import './Home.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';
import UserGreeting from '../Components/UserGreeting';
import GardenHealth from './../Components/GardenHealth';
import TaskCard from '../Components/TaskCard';
import WarnCard from '../Components/WarnCard.jsx';
import SectionTitle from '../Components/SectionTitle.jsx';
import CommunityPost from '../Components/CommunityPost.jsx';
import SuggestedCard from '../Components/SuggestedCard.jsx';

const Home = () => {
    const navigate = useNavigate();
    const userId = 1;
    
    const [isLoading, setIsLoading] = useState(true); 
    const [tasks, setTasks] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [featuredPost, setFeaturedPost] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const loadAllData = async () => {
            try {
                // 1. Fetch Tasks
                const { data: tasksData } = await supabase
                    .from('Plant_Activities')
                    .select(`
                        id, Activity_Type, InstructionAR,
                        User_Plants (
                            Nickname,
                            Plant ( NameAR, TaskPng )
                        )
                    `)
                    .eq('Status', 'مجدول');
                setTasks(tasksData || []);

                // 2. Fetch Alerts
                const { data: alertsData } = await supabase
                    .from('Plant_Alerts')
                    .select('*')
                    .eq('IsActive', true)
                    .order('created_at', { ascending: false })
                    .limit(2);
                setAlerts(alertsData || []);

                // 3. Fetch Featured Community Post (ID: 2)
                const { data: postData } = await supabase
                    .from('Community_Posts')
                    .select('*')
                    .eq('id', 2)
                    .maybeSingle(); // Changed .single() to .maybeSingle() to prevent crash if missing
                setFeaturedPost(postData);

                // 4. Fetch Plant Suggestions
                const { data: suggestionsData } = await supabase
                    .from('Plant_Suggestions')
                    .select('*')
                    .eq('id', 1);
                setSuggestions(suggestionsData || []);

            } catch (error) {
                console.error("Critical error loading Home data:", error);
            } finally {
                setIsLoading(false); 
            }
        };

        loadAllData();
    }, []);

    // Loader View
    if (isLoading) {
        return (
            <div style={{background: '#f4f4f4', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', direction: 'rtl'}}>
                <img src={Logo} alt="logo" style={{ width: '80px', marginBottom: '20px' }} />
                <p>جاري تحميل البيانات...</p> 
            </div>
        );
    }

    // Error/Empty Connection View
    if (!featuredPost && tasks.length === 0 && alerts.length === 0) {
        return (
            <div style={{ padding: '40px 20px', textAlign: 'center', direction: 'rtl', height: '100vh' }}>
                <img src={Logo} alt="logo" style={{ width: '100px', marginBottom: '20px' }} />
                <h2>جاري الاتصال بقاعدة البيانات...</h2>
                <p>إذا استمر هذا الوضع، يرجى التأكد من اتصال الإنترنت أو مفاتيح Supabase.</p>
                <button onClick={() => window.location.reload()} style={{marginTop: '20px', padding: '10px 20px'}}>إعادة المحاولة</button>
            </div>
        );
    }

    return (
        <>
            <main>
                <section className='header'>
                    <img src={Logo} alt="logo" />
                </section>

                <UserGreeting userId={userId} />

                <GardenHealth userId={userId} />

                <section className='taskSec'>
                    <div className="tasks-list">
                        {tasks?.map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                </section>

                <section className='warnSec'>
                    <SectionTitle title="تنبيهات النباتات" />
                    <div className='cardCol'>
                        {alerts?.map((alert) => (
                            <WarnCard 
                                key={alert.id}
                                img={alert.TaskPng} 
                                title={alert.TitleAR}
                                desc={alert.MessageAR}
                            />
                        ))}
                    </div>
                </section>

                <section className='warnSec'>
                    <SectionTitle title="من المجتمع" more="المزيد" onMoreClick={() => navigate('/Community')} />
                    {/* Only render post if data exists */}
                    {featuredPost && <CommunityPost data={featuredPost} onClick={() => navigate('/InsidePost/2')} />}
                </section>

                <section className='warnSec'>
                    <SectionTitle title="نباتات مقترحة لك" more="المزيد" />
                    {suggestions?.map((item) => (
                        <SuggestedCard key={item.id} data={item} />
                    ))}
                </section>

                <Nav /> 
            </main>
        </>
    );
}

export default Home;