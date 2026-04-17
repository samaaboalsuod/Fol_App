import React from 'react';
import { Drop, Waves } from "@phosphor-icons/react";
import DoneCheck from './DoneCheck'; // Import the new component
import './TaskCard.css';

const TaskCard = ({ task }) => {
    if (!task?.User_Plants?.Plant) return null;

    const { Nickname } = task.User_Plants;
    const { NameAR, TaskPng } = task.User_Plants.Plant;

    const renderIcon = (type) => {
        const iconProps = { 
            size: 22, 
            color: "#FAFAEA", 
            style: { opacity: 0.7 } 
        };
        return type === 'تسميد' 
            ? <Waves {...iconProps} weight="light" /> 
            : <Drop {...iconProps} weight="light" />;
    };

    return (
        <div className="task-card">
            {/* 1. The Pop-out Image (Far Right in RTL) */}
            {TaskPng && (
                <div className="img-container">
                    <img src={TaskPng} alt={NameAR} className="task-plant-img" />
                </div>
            )}

            {/* 2. The Text Info Section */}
            <div className="task-info">
                <div className="title-group">
                    <h2 className="plant-nick">{Nickname}</h2>
                    <h4 className="real-name">{NameAR}</h4>
                </div>
                
                <div className="instruction-row">
                    {renderIcon(task.Activity_Type)}
                    <p>{task.InstructionAR || task.Value}</p>
                </div>
            </div>

            {/* 3. The Separated Done Check Component (Far Left in RTL) */}
            <DoneCheck onToggle={() => console.log('Toggled!')} />
        </div>
    );
};

export default TaskCard;