import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import './Lessons.css';

import TopHeader from '../Components/TopHeader';
import PageTitle from '../Components/PageTitle';
import SearchBar from '../Components/SearchBar';
import Filter from '../Components/Filter';
import SectionTitle from '../Components/SectionTitle';
import LessonCard from '../Components/LessonCard';
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
    const [lessons, setLessons] = useState([]);

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

        const fetchLessons = async () => {
            const { data } = await supabase
                .from('Plant_Lessons')
                .select('id, title_ar, subtitle_ar, duration_min, thumbnail_url, lesson_type, img_alt, level_tag_ar')
                .in('id', [8, 9, 10, 11, 12])
                .order('id', { ascending: true });

            if (data) {
                setLessons(data.map((lesson) => ({
                    id: lesson.id,
                    title: lesson.title_ar,
                    subtitle: lesson.subtitle_ar,
                    duration: `${lesson.duration_min} دقيقة`,
                    img_url: lesson.thumbnail_url,
                    alt_text: lesson.img_alt || lesson.title_ar,
                    level_tag: lesson.level_tag_ar
                })));
            }
        };

        fetchPageTitle();
        fetchLessons();
    }, []);

    return (
        <main className="lessons-page">
            <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} />

                <PageTitle title={pageInfo.title} desc={pageInfo.desc} />
     

            <SearchBar placeholder="ابحث عن ما تريد..." />

            <Filter
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                options={lessonOptions}
            />

            <section className='warnSec'>
                <SectionTitle title="الأكثر مشاهدة" />
                <div className='lessonsCards'>
                    {lessons[0] && (
                        <LessonCard key={lessons[0].id} data={lessons[0]} size="large" />
                    )}
                    <div className='lessonsGrid'>
                        {lessons.slice(1, 5).map((lesson) => (
                            <LessonCard key={lesson.id} data={lesson} size="small" />
                        ))}
                    </div>
                </div>
            </section>

            <Nav />
        </main>
    );
};

export default Lessons;
