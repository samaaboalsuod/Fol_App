import React from 'react';
import './QuickActionCard.css';

const QuickActionCard = ({ Icon, img, title, color, onClick }) => {
    return (
        <div className="quickActionCard" onClick={onClick}>
            <div className="actionIconCont">
                {img ? (
                    <img src={img} alt={title} className="actionImg" />
                ) : (
                    <Icon size={40} weight="regular" color={color} />
                )}
            </div>
            <p className="actionTitle">{title}</p>
        </div>
    );
};

export default QuickActionCard;
