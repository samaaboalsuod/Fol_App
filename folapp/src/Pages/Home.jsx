import React, { useEffect, useState } from 'react';
import { supabase } from '../Supabase.jsx'; 

import './Home.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';
import { User } from '@phosphor-icons/react';
import UserGreeting from '../Components/UserGreeting';
import GardenHealth from './../Components/GardenHealth';
import TaskCard from '../Components/TaskCard';

const Home = () => {

    const userId = 1;
    const [tasks, setTasks] = useState([]);

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
        fetchTasks();
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


    <Nav /> 

</main>
    
    </> );
}
 
export default Home;