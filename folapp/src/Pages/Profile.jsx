import React, { Component } from 'react';
import './Profile.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';
import ProfileTop from './../Components/ProfileTop';

const Profile = () => {
    return ( <>

    <main>

        <section className='header'>
            <img src={Logo} alt="logo" />
        </section>

        <ProfileTop />
























        <Nav /> 
        



    </main>
    
    
    </> );
}
 
export default Profile;