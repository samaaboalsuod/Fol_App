import React, { useState, useEffect, useRef } from 'react';
import { Paperclip, PaperPlaneTilt } from '@phosphor-icons/react';
import './Chat.css';

const Chat = ({ onSend, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() && !isLoading) {
            onSend(input);
            setInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className='chatCont'>
            <div className='chatMain'>
                <input 
                    type="text" 
                    placeholder='اسأل عن ما تريد...' 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                />
                <Paperclip size={24} color='#647C68' />
            </div>

            <div 
                className={`sendCircl ${isLoading ? 'disabled' : ''}`} 
                onClick={handleSend}
            >
                <PaperPlaneTilt size={24} color='#FAFAEA' />
            </div>
        </div>
    );
}

export default Chat;