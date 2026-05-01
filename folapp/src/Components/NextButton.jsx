import React from 'react';
import './NextButton.css';

const NextButton = ({ text = "التالي", onClick }) => {
    return (
        <button className="add-plant-next-btn" onClick={onClick}>
            {text}
        </button>
    );
};

export default NextButton;
