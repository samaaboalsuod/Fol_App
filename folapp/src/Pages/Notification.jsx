import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import './Notification.css';

import TopHeader from '../Components/TopHeader';
import PageTitle from '../Components/PageTitle';
import SearchBar from '../Components/SearchBar';
import NotificationToggle from '../Components/NotificationToggle';
import Nav from '../Components/Nav';

const Notification = () => {

        const navigate = useNavigate();
        const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });
        const [toggleValues, setToggleValues] = useState({});
        const settings = [
            {
                key: 'notification.waterReminders',
                title: 'تذكيرات الري',
                subtitle: 'احصل على تنبيهات عندما تحتاج نباتاتك للماء'
            },
            {
                key: 'notification.plantHealth',
                title: 'تنبيهات صحة النبات',
                subtitle: 'تنبيهات حول حالة نباتاتك'
            },
            {
                key: 'notification.expertReplies',
                title: 'ردود الخبراء',
                subtitle: 'عندما يرد خبير على استفساراتك'
            },
            {
                key: 'notification.community',
                title: 'إشعارات المجتمع',
                subtitle: 'تفاعلات وتحديثات من المجتمع'
            },
            {
                key: 'notification.smartRecommendations',
                title: 'التوصيات الذكية للنباتات',
                subtitle: 'نصائح مخصصة لرعاية نباتاتك'
            }
        ];
    
        useEffect(() => {
            const fetchPageTitle = async () => {
                const { data } = await supabase
                    .from('PageTitle')
                    .select('Title, Description')
                    .eq('id', 20)
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

    useEffect(() => {
        const savedValues = {};
        settings.forEach((setting) => {
            const saved = localStorage.getItem(setting.key);
            savedValues[setting.key] = saved === 'true';
        });
        setToggleValues(savedValues);
    }, []);

    const handleToggle = (key, value) => {
        localStorage.setItem(key, value);
        setToggleValues((prev) => ({ ...prev, [key]: value }));
    };


    return ( 
        <main className='notification-page'>

            <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} />

                <PageTitle title={pageInfo.title} desc={pageInfo.desc} />


            <SearchBar placeholder='ابحث في الإعدادات...' />

            <div className='notification-card'>
                {settings.map((setting) => (
                    <NotificationToggle
                        key={setting.key}
                        title={setting.title}
                        subtitle={setting.subtitle}
                        storageKey={setting.key}
                        value={toggleValues[setting.key] || false}
                        onChange={handleToggle}
                    />
                ))}
            </div>
            











            <Nav />


        </main>
    );
}
 
export default Notification;