import React, { Component } from 'react';
import './ProblemCard.css';


const ProblemCard = ({ data }) => {
    return ( 
        <div className='problemCard'>
            <img src={data.img_url} alt={data.img_alt || "problem"} />

            <div className='problemInfo'>
                <h3>{data.title}</h3>
                <p>{data.subtitle}</p>

                <div className='bottRow'>
                    <p>{data.answers_count} إجابة</p>
                    <p>{data.time_posted}</p>
                </div>
            </div>
        </div>
    );
}
 
export default ProblemCard;