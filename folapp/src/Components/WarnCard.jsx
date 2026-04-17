import React, { Component } from 'react';
import './WarnCard.css';
const WarnCard = (props) => {
    return ( 
        <div className='warnCard'>

            <div className='imgCont'>
                <img src={props.img} alt="" />
            </div>

            <div className='textCol'>
                <h2>{props.title}</h2>
                <p>{props.desc}</p>
            </div>
        </div>
     );
}
 
export default WarnCard;