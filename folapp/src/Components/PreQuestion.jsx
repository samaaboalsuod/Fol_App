import React, { Component } from 'react';
import './PreQuestion.css';

const PreQuestion = (props) => {
    return ( 
        <div className='preQuestion'>
            <p>{props.text}</p>
        </div>
     );
}
 
export default PreQuestion;