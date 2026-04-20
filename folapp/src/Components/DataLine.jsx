import React, { Component } from 'react';
import './DataLine.css';

const DataLine = (props) => {
    return ( 
        <div className='dataLine'>

            <h6>{props.title}</h6>
            <h4>{props.value}</h4>

        </div>
     );
}
 
export default DataLine;