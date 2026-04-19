import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx'; 



import './Community.css';


import Logo from '../Assets/logo.svg';

import Nav from '../Components/Nav.jsx';
import PageTitle from '../Components/PageTitle.jsx';
import SearchBar from '../Components/SearchBar.jsx';
import Filter from '../Components/Filter.jsx';
import SectionTitle from '../Components/SectionTitle.jsx';
import PlantStats from './../Components/PlantStats';
import WritePost from './../Components/WritePost';
import CommunityPost from '../Components/CommunityPost.jsx';


const Community = () => {

    const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });
    const [activeFilter, setActiveFilter] = useState('الكل');
    const [featuredPosts, setFeaturedPosts] = useState([]);
    
    const communityOptions = [
    { id: 'الكل', label: 'الكل' },
    { id: 'منشورات مميزة', label: 'منشورات مميزة' },
    { id: 'مشاكل', label: 'مشاكل' },
    { id: 'الرائج', label: 'الرائج' },
    { id: 'نصائح', label: 'نصائح' },
    { id: 'دروس', label: 'دروس' },
    { id: 'فعاليات', label: 'فعاليات' }
];

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
    const fetchFeaturedPosts = async () => {
        const { data, error } = await supabase
            .from('Community_Posts')
            .select('*')
            .order('id', { ascending: true }) // Ensures they appear in order of creation
            .limit(3); // Only fetches the first 3 posts

        if (data) {
            setFeaturedPosts(data);
        }
    };

    fetchFeaturedPosts();
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

        <SearchBar placeholder="ابحث عن ما تريد..." />

        <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} options={communityOptions} />

        <WritePost />

        <section className='warnSec'>

            <SectionTitle title="منشورات مميزة" />

            <div className='postsSec'>
                {featuredPosts.map((post) => (
                  <CommunityPost key={post.id} data={post} />
                ))}
            </div>
        </section>


    
    
    
    
    
    
    
    
        <Nav /> 

    </main>

    
    </> );
}
 
export default Community;