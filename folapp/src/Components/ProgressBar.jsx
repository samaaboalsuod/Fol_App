import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ label, value, percentage }) => {
    return (
        <div className="progress-item">
            <div className="progress-text">
                <p className="progress-label">{label}</p>
                <p className="progress-percent">{percentage}%</p>
            </div>
            <div className="progress-bar-bg">
                <div 
                    className="progress-bar-fill" 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
