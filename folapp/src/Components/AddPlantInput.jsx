import React from 'react';
import './AddPlantInput.css';

const AddPlantInput = ({ placeholder, subtitle, value, onChange }) => {
    return (
        <div className="add-plant-input-wrap">
            <input 
                type="text" 
                placeholder={placeholder} 
                value={value} 
                onChange={(e) => onChange(e.target.value)} 
                className="add-plant-input"
            />
            {subtitle && <p className="add-plant-subtitle">{subtitle}</p>}
        </div>
    );
};

export default AddPlantInput;
