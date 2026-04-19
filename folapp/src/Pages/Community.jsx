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
import ProblemCard from '../Components/ProblemCard.jsx';
import AdviceCard from './../Components/AdviceCard';
import LessonCard from './../Components/LessonOutCard';
import PopularCard from '../Components/PopularCard.jsx';


const Community = () => {

    const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });
    const [activeFilter, setActiveFilter] = useState('الكل');
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [problems, setProblems] = useState([]);
    const [adviceList, setAdviceList] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [popularPlants, setPopularPlants] = useState({
        pothos: null,
        aloe: null,
        monstera: null
    });
    
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

    const fetchProblems = async () => {
            // 2. Fetch from your new 'Problems' table
            const { data, error } = await supabase
                .from('Problems')
                .select('*');

            if (data) {
                setProblems(data);
            }
   };

   const fetchAdvice = async () => {
        const { data, error } = await supabase
            .from('Advice')
            .select('*')
            .order('id', { ascending: true });

        if (data) setAdviceList(data);
    };

    const fetchLessons = async () => {
        const { data } = await supabase.from('Lessons').select('*');
        if (data) setLessons(data);
    };

    const fetchPopularData = async () => {
        // Fetching by IDs based on your Plant_rows.sql file
        const { data: pothos } = await supabase.from('Plant').select('NameAR, Cover_Photo, alt').eq('id', 1).single();
        const { data: aloe } = await supabase.from('Plant').select('NameAR, Cover_Photo, alt').eq('id', 2).single();
        const { data: monstera } = await supabase.from('Plant').select('NameAR, Cover_Photo, alt').eq('id', 9).single();

        setPopularPlants({ pothos, aloe, monstera });
    };

    fetchFeaturedPosts();
    fetchPageTitle();
    fetchProblems();
    fetchAdvice();
    fetchLessons();
    fetchPopularData();
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

        <section className='warnSec'>

            <SectionTitle title="مشاكل النباتات"  more="المزيد" />

            <div className='problemsRow'>

                {problems.map((item) => (
                    <ProblemCard key={item.id} data={item} />
                ))}
            </div>

        </section>

        <section className='warnSec'>

            <SectionTitle title="نصائح المجتمع"  more="المزيد" />

            <div className='adviceCont'>
                {adviceList.map((item) => (
                      <AdviceCard key={item.id} data={item} />
                ))}
            </div>

        </section>

        <section className='warnSec'>
            <SectionTitle title="أبرز الدروس"  more="كل الدروس" />
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} data={lesson} />
            ))}
        </section>

        <section className='warnSec'>
            <SectionTitle title="نباتات رائجة"  />

            <div className='popularRow'>

               <PopularCard data={popularPlants.aloe} hardcodedCount={120} />
               <PopularCard data={popularPlants.pothos} hardcodedCount={180} />
               <PopularCard data={popularPlants.monstera} hardcodedCount={245} />

            </div>

        </section>


    
    
    
    
    
    
    
    
        <Nav /> 

    </main>

    
    </> );
}
 
export default Community;