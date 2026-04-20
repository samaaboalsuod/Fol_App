import React, { Component } from 'react';
import './BigCardProfile.css';

const BigCardProfile = (props) => {
    return ( 
        <div className='bigCardProfile'>
            <h1>{props.value}</h1>
            <h2>{props.title}</h2>
        </div>
     );
}
 
export default BigCardProfile;