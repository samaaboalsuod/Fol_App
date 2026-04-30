import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import './CareHistory.css';

import Logo from '../Assets/logo.svg';
import Nav from '../Components/Nav';
import TopHeader from '../Components/TopHeader';
import PageTitle from '../Components/PageTitle';
import SectionTitle from '../Components/SectionTitle';
import WateringHistoryCard from '../Components/WateringHistoryCard';

const CareHistory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pageTitle, setPageTitle] = useState('');
    const [plantName, setPlantName] = useState('');
    const [modelUrl, setModelUrl] = useState('');
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // 1. Fetch Page Title (id 17)
                const { data: titleData } = await supabase
                    .from('PageTitle')
                    .select('Title')
                    .eq('id', 17)
                    .single();
                if (titleData) setPageTitle(titleData.Title);

                // 2. Fetch Plant Details from User_Plants
                const { data: userPlant } = await supabase
                    .from('User_Plants')
                    .select('*, Plant_Details:Plant (*)')
                    .eq('id', id)
                    .single();

                if (userPlant) {
                    setPlantName(userPlant.Nickname || userPlant.Plant_Details?.NameAR);
                    setModelUrl(userPlant.Plant_Details?.["3DModel"]);
                }

                // 3. Fetch Watering Activities
                const { data: activitiesData } = await supabase
                    .from('Plant_Activities')
                    .select('*')
                    .eq('User_Plant', id)
                    .eq('Activity_Type', 'ري')
                    .order('created_at', { ascending: false });
                
                if (activitiesData) setActivities(activitiesData);

            } catch (err) {
                console.error("Error fetching history:", err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);


    return (
        <main className="care-history-page">
            <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} />

            <div className="title">
                <PageTitle title={pageTitle} desc={plantName} />
            </div>

            <section className="model-section">
                {modelUrl && (
                    <model-viewer
                        src={modelUrl}
                        alt="A 3D model of a plant"
                        auto-rotate
                        camera-controls
                        shadow-intensity="2"
                        environment-image="neutral"
                        exposure="1"
                        touch-action="pan-y"
                        style={{ width: '100%', height: '100%' }}
                    ></model-viewer>
                )}
            </section>

            <section className='warnSec'>
                <SectionTitle title="سجل الري" more="عرض الكل" />
                <WateringHistoryCard activities={activities} />
            </section>

            <Nav />
        </main>
    );
};

export default CareHistory;
