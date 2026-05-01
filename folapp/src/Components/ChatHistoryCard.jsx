import React from 'react';
import './ChatHistoryCard.css';

const ChatHistoryCard = ({ date, title, subtitle, Icon }) => {
    return (
        <div className='chatHistoryCard'>
            <div className='chatHistoryCardHeader'>
                <span className='chatHistoryDate'>{date}</span>
                <div className='chatHistoryIcon'>
                    <Icon size={20} weight='fill' color='#5FA777' />
                </div>
            </div>

            <h3 className='chatHistoryTitle'>{title}</h3>
            <p className='chatHistorySubtitle'>{subtitle}</p>
        </div>
    );
};

export default ChatHistoryCard;
