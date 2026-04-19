import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx'; 
// import { Sun, Drop, TrendUp, Plus } from '@phosphor-icons/react';


import './Community.css';


import Logo from '../Assets/logo.svg';

import Nav from '../Components/Nav.jsx';
import PageTitle from '../Components/PageTitle.jsx';
import SearchBar from '../Components/SearchBar.jsx';
import Filter from '../Components/Filter.jsx';
import SectionTitle from '../Components/SectionTitle.jsx';
import PlantStats from './../Components/PlantStats';


const Community = () => {

    const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });

useEffect(() => {
    const fetchPageTitle = async () => {
        const { data, error } = await supabase
            .from('PageTitle')
            .select('Title, Description')
            .eq('id', 8) 
            .single();

        if (data) {
            setPageInfo({
                title: data.Title,
                desc: data.Description
            });
        }
    };
    fetchPageTitle();
}, []);


    return ( <>

    <main>

        <section className='header'>
            <img src={Logo} alt="logo" />
        </section>

        <div className='title'>
           <PageTitle title={pageInfo.title} desc={pageInfo.desc} />
        </div>
    
    
    
    
    
    
    
    
        <Nav /> 

    </main>

    
    </> );
}
 
export default Community;