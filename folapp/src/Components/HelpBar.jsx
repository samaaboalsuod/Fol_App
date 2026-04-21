import React from 'react';
import { ArrowLeft, Question } from '@phosphor-icons/react';
import './HelpBar.css';

const HelpBar = ({ title, subtitle, onClick }) => {
    return (
        <div className="help-bar-container" onClick={onClick}>
            <div className="help-bar-right">
                <div className="help-icon-circle">
                    <Question size={32} color="#4A8B60" weight="regular" />
                </div>
                <div className="help-text-cont">
                    <h2 className="help-title">{title}</h2>
                    <p className="help-subtitle">{subtitle}</p>
                </div>
            </div>
            
            <div className="help-bar-left">
                <ArrowLeft size={24} color="#4A8B60" />
            </div>
        </div>
    );
};

export default HelpBar;
