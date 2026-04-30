import React from 'react';
import './AskServiceCard.css';

const AskServiceCard = ({ data, Icon, isWide, className, variant }) => {
    if (!data) return null;
    const isQuestion = variant === 'question';

    return ( 
        /* Added a dynamic class 'wide' for the call card layout */
        <div className={`askCard ${isWide ? 'wide' : ''} ${isQuestion ? 'question-card' : ''} ${className || ''}`}>
            <div className='iconCircle'>
                {Icon ? (
                    <Icon size={32} weight="regular" color="#88B378" />
                ) : (
                    <img src={data.HIcon} alt={data.alt} />
                )}
            </div>

            <div className="askText">
                {isQuestion ? (
                    <>
                        <p>{data.AppDisc}</p>
                        <h3>{data.NameAR}</h3>
                    </>
                ) : (
                    <>
                        <h3>{data.NameAR}</h3>
                        <p>{data.AppDisc}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default AskServiceCard;
