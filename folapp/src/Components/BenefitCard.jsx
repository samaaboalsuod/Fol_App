import React from 'react';
import './BenefitCard.css';

const BenefitCard = ({ Icon, title, description, isFlipped }) => {
    return (
        <div className={`benefitCard ${isFlipped ? 'flipped' : ''}`}>
            
            <div className="benefitIconCircle">
                <Icon size={32} weight="regular" color="#FAFAEA" />
            </div>

            <div className="benefitData">
                <h4 className="benefitTitle">{title}</h4>
                <p className="benefitDesc">{description}</p>
            </div>

        </div>
    );
};

export default BenefitCard;
