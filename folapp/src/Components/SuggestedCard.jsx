import React from 'react';
import './SuggestedCard.css';
import Tag from './Tag';

const SuggestedCard = ({ data }) => {
    // Return null if data is still loading to prevent errors
    if (!data) return null;

    return ( 
        <div className='suggestedCard'>
            {/* Plant Image with the radial green glow */}
            <div className='sugPlantCont'>
                <img src={data.img_url} alt={data.alt_text} />
                <div className='bgGreen'></div>
            </div>

            {/* Content Column */}
            <div className='dataCol'>
                <h4>{data.name_ar}</h4>
                <h6>{data.short_desc}</h6>

                <div className='tagsCont'>
                    <Tag text={data.light_level} />
                    <Tag text={data.water_need} />
                </div>
            </div>
        </div>
     );
}

export default SuggestedCard;