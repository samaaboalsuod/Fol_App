import React, { Component } from 'react';
import './GeneralCard.css';


const GeneralCard = ({ Icon, value, title }) => {
    return (
        <div className='generalCardCont'>
            {Icon && <Icon size={32} weight="regular" className="card-icon"  />}
            
            <h1>{value}</h1>
            <h2>{title}</h2>
        </div>
    );
}

export default GeneralCard;