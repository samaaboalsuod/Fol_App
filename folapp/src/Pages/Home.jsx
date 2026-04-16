import React, { Component } from 'react';
import './Home.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';
import { User } from '@phosphor-icons/react';
import UserGreeting from '../Components/UserGreeting';
import GardenHealth from './../Components/GardenHealth';

const Home = () => {

    const userId = 1;


    return ( <>
    
<main>
    <section className='header'>
        <img src={Logo} alt="logo" />
    </section>

    <UserGreeting userId={userId} />

    <GardenHealth userId={1} />

    <Nav /> 
</main>
    
    </> );
}
 
export default Home;