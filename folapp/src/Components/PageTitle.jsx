import React, { Component } from 'react';
import './PageTitle.css';

const PageTitle = (props) => {
    return ( 
        <div className='pageTitle'>
            <h1>{props.title}</h1>
            <h4>{props.desc}</h4>
        </div>
     );
}
 
export default PageTitle;