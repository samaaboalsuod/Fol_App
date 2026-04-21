import React from 'react';
import { ArrowLeft } from '@phosphor-icons/react';
import './ActionCard.css';

const ActionCard = ({ Icon, title, subtitle, onClick, variant = 'settings' }) => {
    return (
        <div className={`action-card ${variant}`} onClick={onClick}>
            <div className='action-right'>
                <div className='action-icon-circle'>
                    <Icon size={28} weight="fill" color="#FAFAEA" />
                </div>
                <div className='action-text'>
                    <h2 className="action-title">{title}</h2>
                    {subtitle && <p className="action-subtitle">{subtitle}</p>}
                </div>
            </div>

            <div className='action-left'>
                 <ArrowLeft size={24} color="#4A8B60" />
            </div>
        </div>
    );
};

export default ActionCard;
