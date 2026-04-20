import React, { Component } from 'react';
import './AchieveCard.css';

const AchieveCard = ({ Icon, title, desc, weight = "fill" }) => {
    return ( 
        <div className='achieveCard'>
            <Icon size={48} weight={weight} />
            <h2>{title}</h2>
            <p>{desc}</p>
        </div>
     );
}
 
export default AchieveCard;