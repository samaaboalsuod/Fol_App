import React, { Component } from 'react';
import { supabase } from '../Supabase.jsx';
import './AskService.css';


import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';


const AskService = () => {
    return ( <>
    
    <main>

    <section className='header'>
        <img src={Logo} alt="logo" />
    </section>






    <Nav />     

    </main>
    
    </> );
}
 
export default AskService;