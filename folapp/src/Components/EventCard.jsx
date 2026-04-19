import React, { Component } from 'react';
import './EventCard.css';
import './LessonOutCard.css';

import Tag from './Tag';

const EventCard = ({ data }) => {
    if (!data) return null;

    return ( 
        <div className='eventCard'>
            {/* The Date Circle Badge */}
            <div className='dateCircle'>
                <h1>{data.event_day}</h1>
                <span>{data.event_month}</span>
            </div>

            <div className='dataCol2'>
                <h4>{data.event_title}</h4>
                <h6>{data.event_desc}</h6>

                <div className='tagsCont'>
                    {/* Using your Tag component for Type and Duration */}
                    <Tag text={data.event_type} />
                    <Tag text={data.duration} />
                </div>
            </div>
        </div>
    );
}
 
export default EventCard;