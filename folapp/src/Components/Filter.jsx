// import React, { Component } from 'react';
// const Filter = (props) => {
//     return ( 
//         <div className='filterCont'>
//             <p>{props.option}</p>
//         </div>
//      );
// }
 
// export default Filter;

import React from 'react';
import './Filter.css';

const Filter = ({ activeFilter, setActiveFilter }) => {
    // These labels match the 'Health_Status(AR)' values in your SQL file
    const filterOptions = [
        { id: 'الكل', label: 'الكل' },
        { id: 'صحي', label: 'ممتاز' },
        { id: 'تحتاج للري', label: 'تحتاج عناية' },
        { id: 'تحتاج للضوء', label: 'جيد' }
    ];

    return (
        <div className="filter-wrapper">
            {filterOptions.map((option) => (
                <button
                    key={option.id}
                    className={`filter-pill ${activeFilter === option.id ? 'active' : ''}`}
                    onClick={() => setActiveFilter(option.id)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default Filter;