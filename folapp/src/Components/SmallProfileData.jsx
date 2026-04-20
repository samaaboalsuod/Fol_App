import React, { Component } from 'react';
import './SmallProfileData.css';


const SmallProfileData = (props) => {
    return ( 
        <div className='smallProfileData'>
            <p>{props.text}</p>
            <h1>{props.value}</h1>
        </div>
     );
}
 
export default SmallProfileData;