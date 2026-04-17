import React, { Component } from 'react';
import './Tag.css';

const Tag = (props) => {
    return ( 
        <div className='tagCont'>
            <h6>{props.text}</h6>
        </div>
     );
}
 
export default Tag;