import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import './Lessons.css';

import TopHeader from '../Components/TopHeader';
import PageTitle from '../Components/PageTitle';
import SearchBar from '../Components/SearchBar';
import Filter from '../Components/Filter';
import Nav from '../Components/Nav';

const lessonOptions = [
    { id: 'الكل', label: 'الكل' },
    { id: 'للمبتدئين', label: 'للمبتدئين' },
    { id: 'العناية', label: 'العناية' },
    { id: 'الرائج', label: 'الرائج' }
];

const Lessons = () => {
    const navigate = useNavigate();
    const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });
    const [activeFilter, setActiveFilter] = useState('الكل');

    useEffect(() => {
        const fetchPageTitle = async () => {
            const { data } = await supabase
                .from('PageTitle')
                .select('Title, Description')
                .eq('id', 18)
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

    return (
        <main className="lessons-page">
            <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} />

            <div className="title lessons-title">
                <PageTitle title={pageInfo.title} desc={pageInfo.desc} />
            </div>

            <SearchBar placeholder="ابحث عن ما تريد..." />

            <Filter
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                options={lessonOptions}
            />

            <Nav />
        </main>
    );
};

export default Lessons;
