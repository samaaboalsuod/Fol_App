import React, { Component } from 'react';
import { supabase } from '../Supabase.jsx'; 

import './MyPlants.css';


import Logo from '../Assets/logo.svg';

import Nav from './../Components/Nav';
import PageTitle from '../Components/PageTitle.jsx';
import PlantStats from '../Components/PlantStats.jsx';
import SearchBar from '../Components/SearchBar.jsx';

const MyPlants = () => {

    const userId = 1;

    return ( <>
    
    <main>

        <section className='header'>
              <img src={Logo} alt="logo" />
        </section>

        <div className='title'>
            <PageTitle title="نباتاتي" />
            <PlantStats userId={userId} />
        </div>

        <SearchBar placeholder="ابحث عن نباتك..." />








        <Nav /> 

    </main>
    
    </> );
}
 
export default MyPlants;