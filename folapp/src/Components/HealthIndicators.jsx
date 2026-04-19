import React from 'react';
import './HealthIndicators.css';

const HealthIndicators = ({ counts }) => {
    // 1. Ensure counts exists to prevent "0" on first render
    const excellent = counts?.excellent || 0;
    const good = counts?.good || 0;
    const needsCare = counts?.needsCare || 0;

    // 2. Calculate dynamic total (so bars are always relative to your collection)
    const total = (excellent + good + needsCare) || 1; 

    return (
        <div className="healthCard">
            <h2>مؤشرات الصحة</h2>
            
            <div className="indicator-row">
                <p>ممتاز</p>
                <div className="bar-bg">
                    <div className="bar excellent" style={{ width: `${(excellent / total) * 100}%` }}></div>
                </div>
                <p>{excellent}</p>
            </div>

            <div className="indicator-row">
                <p>جيد</p>
                <div className="bar-bg">
                    <div className="bar good" style={{ width: `${(good / total) * 100}%` }}></div>
                </div>
                <p>{good}</p>
            </div>

            <div className="indicator-row">
                <p>يحتاج عناية</p>
                <div className="bar-bg">
                    <div className="bar needs-care" style={{ width: `${(needsCare / total) * 100}%` }}></div>
                </div>
                <p>{needsCare}</p>
            </div>
        </div>
    );
};

export default HealthIndicators;