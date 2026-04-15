import React, { Component } from 'react';
import './Home.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';
import { User } from '@phosphor-icons/react';
import UserGreeting from '../Components/UserGreeting';

const Home = () => {

    const userId = 1;


    return ( <>
    
<main>
    <section className='header'>
        <img src={Logo} alt="logo" />
    </section>

    <UserGreeting userId={userId} />

    <Nav /> 
</main>
    
    </> );
}
 
export default Home;