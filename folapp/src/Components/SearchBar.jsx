import React, { Component } from 'react';
import './SearchBar.css'

import searchIcon from '../Assets/searchIcon.svg'

const SearchBar = (props) => {
    return ( 
        <div className='searchBar'>
            <img src={searchIcon} alt="" />
            <input type="text" placeholder={props.placeholder} />
        </div>
     );
}
 
export default SearchBar;