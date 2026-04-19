import React from 'react';
import './PopularCard.css';

const PopularCard = ({ data, hardcodedCount }) => {
    if (!data) return null;

    return (
        <div className="popularCard">
            <div className="popImgCont">
                {/* Pulling from Cover_Photo and alt columns in Plant table */}
                <img src={data.Cover_Photo} alt={data.alt} />
            </div>

            <div className="popInfo">
                {/* Pulling from NameAR column in Plant table */}
                <h4>{data.NameAR}</h4>
                <p>{hardcodedCount} منشور</p>
            </div>
        </div>
    );
};

export default PopularCard;