import React from 'react';
import './MethodCard.css';

const MethodCard = ({ Icon, title, desc, onClick }) => {
    return (
        <div className="add-plant-method-card" onClick={onClick}>
            <div className="method-icon-cont">
                <Icon size={40} weight="regular" color="#FAFAEA" />
            </div>
            <h3 className="method-title">{title}</h3>
            <p className="method-desc">{desc}</p>
        </div>
    );
};

export default MethodCard;
