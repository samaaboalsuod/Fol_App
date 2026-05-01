import React from 'react';
import './SecondButton.css';

const SecondButton = ({ text = "السابق", onClick }) => {
    return (
        <button className="second-btn" onClick={onClick}>
            {text}
        </button>
    );
};

export default SecondButton;
