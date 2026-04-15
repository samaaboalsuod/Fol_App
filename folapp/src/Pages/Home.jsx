import React, { Component } from 'react';
import './Home.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';

const Home = () => {
    return ( <>
    
<main>
    <section className='header'>
        <img src={Logo} alt="logo" />
    </section>

    {/* Content goes here */}

    <Nav /> 
</main>
    
    </> );
}
 
export default Home;