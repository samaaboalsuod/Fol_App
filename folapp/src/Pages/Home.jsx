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

const Home = () => {

    const userId = 1;
    const [tasks, setTasks] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [featuredPost, setFeaturedPost] = useState(null);

useEffect(() => {
        const fetchTasks = async () => {
            const { data } = await supabase
                .from('Plant_Activities')
                .select(`
                    id, Activity_Type, InstructionAR,
                    User_Plants (
                        Nickname,
                        Plant ( NameAR, TaskPng )
                    )
                `)
                .eq('Status', 'مجدول');
            setTasks(data || []);
        };

        const fetchAlerts = async () => {
            const { data, error } = await supabase
                .from('Plant_Alerts')
                .select('*')
                .eq('IsActive', true)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching alerts:', error);
            } else {
                setAlerts(data || []);
            }
        };

        const fetchFeaturedPost = async () => {
        const { data, error } = await supabase
            .from('Community_Posts')
            .select('*')
            .eq('id', 2) // Targeting the 2nd row (Sarah Mahmoud)
            .single();

        if (error) {
            console.error('Error fetching post:', error);
        } else {
            setFeaturedPost(data);
        }
    };

        // CALL BOTH FUNCTIONS HERE
        fetchTasks();
        fetchAlerts();
        fetchFeaturedPost();

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


    {/* <Nav />  */}

</main>
    
    </> );
}
 
export default Home;