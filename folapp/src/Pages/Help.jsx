import React, { useEffect, useState } from 'react';
import { supabase } from '../Supabase.jsx'; 
import './Help.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';
import SectionTitle from '../Components/SectionTitle.jsx';
import AskServiceCard from './../Components/AskServiceCard';



const Help = () => {

    const [services, setServices] = useState({ call: null, chat: null, ai: null });

    useEffect(() => {
    const fetchServices = async () => {
        const { data: call } = await supabase.from('Asking_Service').select('*').eq('id', 1).single();
        const { data: chat } = await supabase.from('Asking_Service').select('*').eq('id', 2).single();
        const { data: ai } = await supabase.from('Asking_Service').select('*').eq('id', 3).single();

        setServices({ call, chat, ai });
    };

    fetchServices();
}, []);
    return ( <>
    
    <main>

    <section className='header'>
        <img src={Logo} alt="logo" />
    </section>

    <section className='warnSec'>
        <SectionTitle title="اختر الأنسب لك" />

        <div className='askCardsSec'>

            <div className='askRow'>
                <AskServiceCard data={services.ai} isWide={false} />
                <AskServiceCard data={services.chat} isWide={false} className="chat-card" />
            </div>

            <AskServiceCard data={services.call} isWide={true} />
        </div>
        
    </section>




    <Nav /> 
    
    </main>


    </> );
}
 
export default Help;