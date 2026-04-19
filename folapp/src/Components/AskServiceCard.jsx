import React from 'react';
import './AskServiceCard.css';

const AskServiceCard = ({ data, isWide, className }) => {
    if (!data) return null;

    return ( 
        /* Added a dynamic class 'wide' for the call card layout */
        <div className={`askCard ${isWide ? 'wide' : ''} ${className || ''}`}>
            <div className='iconCircle'>
                <img src={data.HIcon} alt={data.alt} />
            </div>

            <div className="askText">
                <h3>{data.NameAR}</h3>
                <p>{data.AppDisc}</p>
            </div>
        </div>
    );
}

export default AskServiceCard;