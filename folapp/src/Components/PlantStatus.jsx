import React from 'react';
import { Heart } from "@phosphor-icons/react";
import ProgressBar from './ProgressBar';
import './PlantStatus.css';

const PlantStatus = ({ status, healthPercent, moisturePercent }) => {
    // Logic for health dots (1 dot per 20%)
    const dotCount = Math.ceil(healthPercent / 20);
    const dots = Array(5).fill(0).map((_, i) => i < dotCount);

    return (
        <div className="statusCard">
            <div className="statusTopRow">
                <div className="healthDots">
                    {dots.map((active, i) => (
                        <div key={i} className={`healthDot ${active ? 'active' : ''}`}></div>
                    ))}
                </div>
                <div className="statusLabelGroup">
                    <h2 className="statusText">{status}</h2>
                    <Heart size={32} weight="fill" color="#4A8B60" />
                </div>
            </div>

            <div className="statusBars">
                <ProgressBar label="الصحة العامة" percentage={healthPercent} />
                <ProgressBar label="رطوبة التربة" percentage={moisturePercent} />
            </div>
        </div>
    );
};

export default PlantStatus;
