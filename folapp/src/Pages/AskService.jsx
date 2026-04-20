import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import { CaretLeft, ClockCounterClockwise, Scissors, Sun, Drop } from "@phosphor-icons/react";
import { fetchChatHistory, saveMessage } from '../services/database_service';
import { getAIResponse } from '../services/ai_service';

import './AskService.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';
import Chat from '../Components/Chat.jsx';
import GeneralCard from '../Components/GeneralCard.jsx';
import PreQuestion from '../Components/PreQuestion.jsx';

const AskService = () => {
    const { id } = useParams(); // '2' for chat, '3' for AI
    const navigate = useNavigate();
    const [serviceData, setServiceData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = React.useRef(null);

    // Using a fixed session ID for now - in a real app, this would be per-conversation or per-user
    const sessionId = 'caa8050f-c599-4b83-b189-d64e930daa40';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const loadServiceAndHistory = async () => {
            // Fetch service info
            const { data } = await supabase
                .from('Asking_Service')
                .select('NameAR, AppDisc')
                .eq('id', id)
                .single();

            if (data) setServiceData(data);

            // Fetch history
            const history = await fetchChatHistory(sessionId, parseInt(id));
            setMessages(history);
        };

        loadServiceAndHistory();
    }, [id]);

    const handleSendMessage = async (content) => {
        if (!content.trim()) return;

        console.log("--- New Message Flow Started ---");
        console.log("User Input:", content);
        setIsLoading(true);

        try {
            // 1. Save user message to Supabase
            console.log("Saving user message to Supabase...");
            let userMsg;
            try {
                userMsg = await saveMessage(sessionId, parseInt(id), content, 'user');
                console.log("User message saved successfully:", userMsg);
            } catch (dbError) {
                console.warn("DB Save failed for user message, using fallback local object:", dbError);
                userMsg = { content, sender_type: 'user', created_at: new Date().toISOString() };
            }

            setMessages(prev => [...prev, userMsg]);

            // 2. If it's the AI service, get AI response
            if (id === '3') {
                console.log("AI Service detected (ID 3). Fetching AI response...");

                const context = messages.slice(-5).map(m => ({
                    role: m.sender_type === 'user' ? 'user' : 'assistant',
                    content: m.content
                }));
                context.push({ role: 'user', content });

                const aiResponseContent = await getAIResponse(context);
                console.log("AI Response Received:", aiResponseContent);

                // 3. Save AI response to Supabase
                console.log("Saving AI message to Supabase...");
                let aiMsg;
                try {
                    aiMsg = await saveMessage(sessionId, parseInt(id), aiResponseContent, 'ai');
                    console.log("AI message saved successfully:", aiMsg);
                } catch (dbError) {
                    console.warn("DB Save failed for AI response, using fallback local object:", dbError);
                    aiMsg = { content: aiResponseContent, sender_type: 'ai', created_at: new Date().toISOString() };
                }

                setMessages(prev => [...prev, aiMsg]);
            }
        } catch (error) {
            console.error("!!! CRITICAL ERROR in handleSendMessage !!!", error);
        } finally {
            setIsLoading(false);
            console.log("--- Message Flow Ended ---");
        }
    };

    return (
        <main>
            <div className="fixed-top-container">
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
            </div>

            <div className="scrollable-content">
                {messages.length === 0 ? (
                    <div className="empty-state-container">
                        <section className='generalSec2'>
                            <GeneralCard Icon={Drop} title="الري" />
                            <GeneralCard Icon={Sun} title="الإضاءة" />
                            <GeneralCard Icon={Scissors} title="التقليم" className='card-icon4' />
                        </section>

                        <section className='preQuestionSec'>
                            <PreQuestion text="أفضل نباتات للمبتدئين" />
                            <PreQuestion text="نباتات تنقي الهواء" />
                            <PreQuestion text="لماذا تذبل الأوراق؟" />
                            <PreQuestion text="كم مرة أسقي الصبار؟" />
                        </section>
                    </div>
                ) : (
                    <div className='messagesList'>
                        {messages.map((msg, index) => (
                            <div key={msg.id || index} className={`messageBubble ${msg.sender_type}`}>
                                <div className="messageContent">
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="messageBubble ai loading">
                                <div className="messageContent">...</div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            <Chat
                onSend={handleSendMessage}
                isLoading={isLoading}
            />

            <Nav />
        </main>
    );
}

export default AskService;
