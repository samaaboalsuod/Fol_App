import React from 'react';
import './AdviceCard.css';

const AdviceCard = ({ data }) => {
    
    return (

        <div className="adviceCard">

            <img src={data.icon_url} alt={data.icon_alt} />
            <h3>{data.title}</h3>
            <p>{data.subtitle}</p>

        </div>
    );
};

export default AdviceCard;