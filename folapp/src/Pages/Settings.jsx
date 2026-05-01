import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import './Settings.css';

import TopHeader from '../Components/TopHeader';
import PageTitle from '../Components/PageTitle';
import SearchBar from '../Components/SearchBar';
import ActionCard from '../Components/ActionCard';
import Nav from '../Components/Nav';
import { Bell, Globe, ShieldCheck, Info } from '@phosphor-icons/react';

const Settings = () => {
    const navigate = useNavigate();
    const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });

    useEffect(() => {
        const fetchPageTitle = async () => {
            const { data } = await supabase
                .from('PageTitle')
                .select('Title, Description')
                .eq('id', 19)
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
        <main>
            <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} />


                <PageTitle title={pageInfo.title} desc={pageInfo.desc} />


            <SearchBar placeholder='ابحث في الإعدادات...' />


                <div className='settings-actions'>
                    <ActionCard Icon={Bell} title='إعدادات الإشعارات' onClick={() => navigate('/Notification')} />
                    <ActionCard Icon={Globe} title='اللغة والعرض' />
                    <ActionCard Icon={ShieldCheck} title='الخصوصية والبيانات' />
                    <ActionCard Icon={Info} title='معلومات التطبيق' />
                </div>


            <Nav />
        </main>
    );
};

export default Settings;
