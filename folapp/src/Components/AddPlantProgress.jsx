import React from 'react';
import './AddPlantProgress.css';

const FlowerIcon = ({ isDone }) => {
    const fill = isDone ? 'rgba(250, 250, 234, 0.65)' : 'rgba(250, 250, 234, 0.1)';
    return (
        <div className={`progress-flower-wrap ${isDone ? 'done' : ''}`}>
            <svg width="24" height="24" viewBox="-10 -15 60 70">
                <path 
                    d="M20.7908 29.0698C20.6062 54.7249 -11.2319 31.1001 15.6228 25.1939C-11.2319 31.1001 1.31876 -6.55194 17.6531 19.1031C1.31876 -6.55194 41.001 -6.1828 24.113 19.1031C41.001 -6.1828 52.9057 31.5615 26.051 25.2862C52.9057 31.6538 20.6062 54.6326 20.7908 29.0698Z" 
                    fill={fill} 
                    stroke="#517142"
                    strokeWidth="3"
                />
            </svg>
        </div>
    );
};

const AddPlantProgress = ({ currentStep = 1, totalSteps = 6 }) => {
    return (
        <div className="add-plant-progress-container">
            <div className="progress-line"></div>
            <div className="progress-flowers">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <FlowerIcon key={index} isDone={index + 1 <= currentStep} />
                ))}
            </div>
        </div>
    );
};

export default AddPlantProgress;
