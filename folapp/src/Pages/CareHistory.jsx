import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import './CareHistory.css';

import Nav from '../Components/Nav';
import TopHeader from '../Components/TopHeader';
import PageTitle from '../Components/PageTitle';
import SectionTitle from '../Components/SectionTitle';
import WateringHistoryCard from '../Components/WateringHistoryCard';
import BenefitCard from '../Components/BenefitCard';
import { CloudRain, FirstAid, Leaf, Sun, ThermometerHot, SprayBottle } from "@phosphor-icons/react";

const CareHistory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pageTitle, setPageTitle] = useState('');
    const [plantName, setPlantName] = useState('');
    const [modelUrl, setModelUrl] = useState('');
    const [alerts, setAlerts] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modelLoading, setModelLoading] = useState(false);
    const [modelError, setModelError] = useState('');
    const modelViewerRef = useRef(null);

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

                    const { data: alertsData } = await supabase
                        .from('Plant_Alerts')
                        .select('*')
                        .eq('Plant_ID', userPlant.Plant)
                        .eq('IsActive', true)
                        .order('created_at', { ascending: false });

                    setAlerts(alertsData || []);
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

    useEffect(() => {
        const modelViewer = modelViewerRef.current;
        if (!modelViewer || !modelUrl) return;

        setModelLoading(true);
        setModelError('');

        const handleLoad = () => {
            setModelLoading(false);

            if (process.env.NODE_ENV === 'development') {
                const materials = modelViewer.model?.materials || [];
                console.info('Loaded plant 3D model:', {
                    url: modelUrl,
                    materialCount: materials.length,
                    materials: materials.map((material) => material.name),
                });
            }
        };

        const handleError = (event) => {
            setModelLoading(false);
            setModelError('تعذر تحميل النموذج ثلاثي الأبعاد');
            console.error('Plant 3D model failed to load:', {
                url: modelUrl,
                event,
            });
        };

        modelViewer.addEventListener('load', handleLoad);
        modelViewer.addEventListener('error', handleError);

        return () => {
            modelViewer.removeEventListener('load', handleLoad);
            modelViewer.removeEventListener('error', handleError);
        };
    }, [modelUrl]);

    const getAlertIcon = (alert) => {
        const title = alert.TitleAR || '';
        const message = alert.MessageAR || '';
        const content = `${title} ${message}`;

        if (alert.Type === 'weather' || content.includes('ممطر') || content.includes('مطر')) return CloudRain;
        if (content.includes('إضاءة') || content.includes('ضوء')) return Sun;
        if (content.includes('حرارة')) return ThermometerHot;
        if (content.includes('تنظيف') || content.includes('نظف') || content.includes('الغبار')) return SprayBottle;
        if (content.includes('رطوبة') || content.includes('التربة')) return Leaf;

        return FirstAid;
    };


    return (
        <main className="care-history-page">
            <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} />

            <div className="title">
                <PageTitle title={pageTitle} desc={plantName} />
            </div>

            <section className="model-section">
                {loading && <p className="model-state">جاري تحميل النبات...</p>}
                {modelUrl && (
                    <model-viewer
                        ref={modelViewerRef}
                        key={modelUrl}
                        class="plant-model-viewer"
                        src={modelUrl}
                        alt={plantName || 'نموذج ثلاثي الأبعاد للنبات'}
                        auto-rotate
                        camera-controls
                        crossorigin="anonymous"
                        loading="eager"
                        reveal="auto"
                        shadow-intensity="2"
                        shadow-softness="0.8"
                        environment-image="neutral"
                        exposure="1.25"
                        tone-mapping="commerce"
                        interaction-prompt="none"
                        touch-action="pan-y"
                    ></model-viewer>
                )}
                {modelLoading && <p className="model-state">جاري تجهيز النموذج...</p>}
                {modelError && <p className="model-state model-error">{modelError}</p>}
            </section>

            <section className='warnSec'>
                <SectionTitle title="سجل الري" more="عرض الكل" />
                <WateringHistoryCard activities={activities} />
            </section>

            {alerts.length > 0 && (
                <section className='warnSec'>
                    <SectionTitle title="التنبيهات الصحية" more="عرض الكل" />
                    <div className='benefitsColumn'>
                        {alerts.map((alert) => (
                            <BenefitCard
                                key={alert.id}
                                Icon={getAlertIcon(alert)}
                                title={alert.TitleAR}
                                description={alert.MessageAR}
                            />
                        ))}
                    </div>
                </section>
            )}

            <Nav />
        </main>
    );
};

export default CareHistory;
