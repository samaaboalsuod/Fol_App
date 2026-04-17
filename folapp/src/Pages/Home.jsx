import React, { useEffect, useState } from 'react';
import { supabase } from '../Supabase.jsx'; 

import './Home.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';
import { User } from '@phosphor-icons/react';
import UserGreeting from '../Components/UserGreeting';
import GardenHealth from './../Components/GardenHealth';
import TaskCard from '../Components/TaskCard';
import WarnCard from '../Components/WarnCard.jsx';
import SectionTitle from '../Components/SectionTitle.jsx';
import CommunityPost from '../Components/CommunityPost.jsx';
import SuggestedCard from '../Components/SuggestedCard.jsx';

const Home = () => {

    const userId = 1;
    const [tasks, setTasks] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [featuredPost, setFeaturedPost] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

useEffect(() => {
    // 1. Create one master function to handle all fetching
    const loadAllData = async () => {
        try {
            // Fetch Tasks
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

            // Fetch Alerts
            const { data: alertsData } = await supabase
                .from('Plant_Alerts')
                .select('*')
                .eq('IsActive', true)
                .order('created_at', { ascending: false });
            setAlerts(alertsData || []);

            // Fetch Featured Community Post (ID: 2)
            const { data: postData } = await supabase
                .from('Community_Posts')
                .select('*')
                .eq('id', 2)
                .single();
            setFeaturedPost(postData);

            // Fetch Plant Suggestions
            const { data: suggestionsData } = await supabase
                .from('Plant_Suggestions')
                .select('*')
                .eq('id', 1);
            setSuggestions(suggestionsData || []);

        } catch (error) {
            console.error("Critical error loading Home data:", error);
        }
    };

    // 2. Execute the master function
    loadAllData();

}, []);

    return ( <>
    
<main>

    <section className='header'>
        <img src={Logo} alt="logo" />
    </section>

    <UserGreeting userId={userId} />

    <GardenHealth userId={userId} />

    <section className='taskSec'>

        <div className="tasks-list">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
        </div>

    </section>

    <section className='warnSec'>

        <SectionTitle title="تنبيهات النباتات" />

        <div className='cardCol'>
            {alerts.map((alert) => (
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
        <SectionTitle title="من المجتمع" more="المزيد" />
        <CommunityPost data={featuredPost} />
    </section>

    <section className='warnSec'>
        <SectionTitle title="نباتات مقترحة لك" more="المزيد" />
        {suggestions.map((item) => (
        <SuggestedCard key={item.id} data={item} />
         ))}
    </section>


    <Nav /> 

</main>
    
    </> );
}
 
export default Home;