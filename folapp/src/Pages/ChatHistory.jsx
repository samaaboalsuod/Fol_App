import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import './ChatHistory.css';

import TopHeader from '../Components/TopHeader';
import PageTitle from '../Components/PageTitle';
import SectionTitle from '../Components/SectionTitle';
import ChatHistoryCard from '../Components/ChatHistoryCard';
import Nav from '../Components/Nav';
import { Drop, Sun } from '@phosphor-icons/react';


const ChatHistory = () => {

        const navigate = useNavigate();
        const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });
        const [cards, setCards] = useState([]);

            useEffect(() => {
                const loadPageData = async () => {
                    const { data: titleData } = await supabase
                        .from('PageTitle')
                        .select('Title, Description')
                        .eq('id', 21)
                        .single();

                    if (titleData) {
                        setPageInfo({
                            title: titleData.Title,
                            desc: titleData.Description
                        });
                    }

                    const [{ data: aiMessages }, { data: expertRequests }] = await Promise.all([
                        supabase
                            .from('ai_messages')
                            .select('id, created_at, content')
                            .eq('sender_type', 'ai')
                            .order('created_at', { ascending: false })
                            .limit(3),
                        supabase
                            .from('Expert_Requests')
                            .select('id, created_at, QuestionAR, ResponseAR, Responser_TitleAR, Responser')
                            .order('created_at', { ascending: false })
                            .limit(3)
                    ]);

                    const cardsData = [];

                    if (aiMessages) {
                        aiMessages.forEach((msg) => {
                            cardsData.push({
                                id: `ai-${msg.id}`,
                                date: formatDate(msg.created_at),
                                title: msg.content.length > 40 ? msg.content.slice(0, 40) + '...' : msg.content,
                                subtitle: 'رسالة شخصية من فل',
                                Icon: Drop
                            });
                        });
                    }

                    if (expertRequests) {
                        expertRequests.forEach((req) => {
                            const titleText = req.QuestionAR || req.ResponseAR || 'طلب خبير';
                            const subtitleText = req.Responser_TitleAR
                                ? `من ${req.Responser}`
                                : 'رسالة خبير';

                            cardsData.push({
                                id: `expert-${req.id}`,
                                date: formatDate(req.created_at),
                                title: titleText.length > 40 ? titleText.slice(0, 40) + '...' : titleText,
                                subtitle: subtitleText,
                                Icon: Sun
                            });
                        });
                    }

                    setCards(cardsData);
                };

                loadPageData();
            }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}\\${month}\\${year}`;
    };

    return ( <main className='chatHistoryPage'>

        <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} />

  
            <PageTitle title={pageInfo.title} desc={pageInfo.desc} />


        <section className='warnSec'>
            <SectionTitle title='المحادثات الأخيرة' />
            <div className='chatHistoryCards'>
                {cards.map((card) => (
                    <ChatHistoryCard
                        key={card.id}
                        date={card.date}
                        title={card.title}
                        subtitle={card.subtitle}
                        Icon={card.Icon}
                    />
                ))}
            </div>
        </section>

        <Nav />

















    </main> );
}
 
export default ChatHistory;