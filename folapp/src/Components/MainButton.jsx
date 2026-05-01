import React from 'react';
import './MainButton.css';

const MainButton = ({ text, onClick }) => {
    return (
        <button className="main-button" type="button" onClick={onClick}>
            {text}
        </button>
    );
};

export default MainButton;
