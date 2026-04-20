import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import { CaretLeft, ClockCounterClockwise, Scissors, Sun, Drop} from "@phosphor-icons/react";

import './AskService.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';
import Chat from '../Components/Chat.jsx';
import GeneralCard from '../Components/GeneralCard.jsx';

const AskService = () => {
    const { id } = useParams(); // Catches '2' or '3' from the URL
    const navigate = useNavigate();
    const [serviceData, setServiceData] = useState(null);

    useEffect(() => {
        const fetchServiceHeader = async () => {
            const { data, error } = await supabase
                .from('Asking_Service')
                .select('NameAR, AppDisc')
                .eq('id', id)
                .single();

            if (data) setServiceData(data);
        };

        fetchServiceHeader();
    }, [id]);

    return (
        <main>

            
                <section className='header'>
                    <img src={Logo} alt="logo" />
                </section>

            <section className='chat-header'>

                <div className="header-right">
                    <ClockCounterClockwise size={28} color='#FAFAEA' />
                </div>

                <div className="header-center">
                    <h2>{serviceData?.NameAR || "تحميل..."}</h2>
                </div>

                <div className="header-left" onClick={() => navigate('/Help')}>
                    <CaretLeft size={28} color='#FAFAEA' />
                </div>


            </section>


            <section className='generalSec2'>
                <GeneralCard Icon={Drop} title="الري" />
                <GeneralCard  Icon={Sun} title="الإضاءة" />
                <GeneralCard Icon={Scissors} title="التقليم" className='card-icon4' />
            </section>


            {/* Chat content will go here */}
            <Chat />
            
            <Nav />
        </main>
    );
}

export default AskService;