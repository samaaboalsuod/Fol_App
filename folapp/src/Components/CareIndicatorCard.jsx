import React from 'react';
import './CareIndicatorCard.css';

const CareIndicatorCard = ({ Icon, title, subTitle, value, footer, iconColor }) => {
    return (
        <div className="careIndicatorCard">
            <div className="cardHeader">
                <div className="iconContainer" style={{ backgroundColor: `${iconColor}22` }}>
                    <Icon size={24} weight="fill" color={iconColor} />
                </div>
                <p className="cardTitle">{title}</p>
            </div>
            
            <div className="cardBody">
                <p className="cardSubTitle">{subTitle}</p>
                <h3 className="cardValue">{value}</h3>
            </div>

            <div className="cardFooter">
                <p className="cardFooterText">{footer}</p>
            </div>
        </div>
    );
};

export default CareIndicatorCard;
