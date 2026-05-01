import React from 'react';
import './LocationOption.css';

const LocationOption = ({ label, isSelected, onClick }) => {
    return (
        <button 
            className={`location-option-btn ${isSelected ? 'selected' : ''}`} 
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default LocationOption;
