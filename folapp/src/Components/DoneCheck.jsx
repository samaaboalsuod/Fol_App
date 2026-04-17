import React, { useState } from 'react';
import { Check } from "@phosphor-icons/react";

const DoneCheck = ({ onToggle }) => {
    const [isDone, setIsDone] = useState(false);

    const handleContainerClick = () => {
        const newState = !isDone;
        setIsDone(newState);
        if (onToggle) onToggle(newState);
    };

    return (
        <div className="done-section" onClick={handleContainerClick}>
            <div className={`done-circle ${isDone ? 'checked' : ''}`}>
                {isDone && <Check size={20} weight="bold" color="#1B3022" />}
            </div>
            <span>{isDone ? 'تم' : 'تم؟'}</span>
        </div>
    );
};

export default DoneCheck;