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
import AskServiceCard from '../Components/AskServiceCard';
import { CloudRain, FirstAid, Leaf, Sun, ThermometerHot, SprayBottle } from "@phosphor-icons/react";

const CareHistory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pageTitle, setPageTitle] = useState('');
    const [plantName, setPlantName] = useState('');
    const [modelUrl, setModelUrl] = useState('');
    const [alerts, setAlerts] = useState([]);
    const [plantQuestions, setPlantQuestions] = useState([]);
    const [gallery, setGallery] = useState([]);
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
                    setGallery(parseGallery(userPlant.Gallery));

                    const plantId = userPlant.Plant;
                    const [
                        { data: alertsData },
                        { data: aiQuestionsData },
                        { data: expertQuestionsData },
                        { data: serviceIconsData }
                    ] = await Promise.all([
                        supabase
                            .from('Plant_Alerts')
                            .select('*')
                            .eq('Plant_ID', plantId)
                            .eq('IsActive', true)
                            .order('created_at', { ascending: false }),
                        supabase
                            .from('ai_messages')
                            .select('id, created_at, content')
                            .eq('Plant_ID', plantId)
                            .eq('service_id', 3)
                            .order('created_at', { ascending: false })
                            .limit(1),
                        supabase
                            .from('Expert_Requests')
                            .select('id, created_at, QuestionAR, Responser, Responser_TitleAR')
                            .eq('Plant_ID', plantId)
                            .order('created_at', { ascending: false })
                            .limit(1),
                        supabase
                            .from('Asking_Service')
                            .select('id, HIcon, alt')
                            .in('id', [2, 3])
                    ]);

                    const serviceIcons = (serviceIconsData || []).reduce((icons, service) => {
                        icons[service.id] = service;
                        return icons;
                    }, {});
                    const latestQuestions = [];
                    const latestExpertQuestion = expertQuestionsData?.[0];
                    const latestAiQuestion = aiQuestionsData?.[0];

                    if (latestAiQuestion) {
                        latestQuestions.push({
                            id: `ai-${latestAiQuestion.id}`,
                            className: 'ai-card',
                            data: {
                                NameAR: latestAiQuestion.content,
                                AppDisc: 'فل',
                                HIcon: serviceIcons[3]?.HIcon,
                                alt: serviceIcons[3]?.alt
                            }
                        });
                    }

                    if (latestExpertQuestion) {
                        latestQuestions.push({
                            id: `expert-${latestExpertQuestion.id}`,
                            className: 'chat-card',
                            data: {
                                NameAR: latestExpertQuestion.QuestionAR,
                                AppDisc: `${latestExpertQuestion.Responser || 'أحد خبراء فل'} ${latestExpertQuestion.Responser_TitleAR || ''}`.trim(),
                                HIcon: serviceIcons[2]?.HIcon,
                                alt: serviceIcons[2]?.alt
                            }
                        });
                    }

                    setAlerts(alertsData || []);
                    setPlantQuestions(latestQuestions);
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

    const parseGallery = (galleryValue) => {
        if (!galleryValue) return [];
        if (Array.isArray(galleryValue)) return galleryValue.filter(Boolean);

        try {
            const parsedGallery = JSON.parse(galleryValue);
            return Array.isArray(parsedGallery) ? parsedGallery.filter(Boolean) : [];
        } catch (error) {
            console.warn('Unable to parse plant gallery:', error);
            return [];
        }
    };

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

            <section className='warnSec'>
                <SectionTitle title="التنبيهات الصحية" more={alerts.length > 0 ? "عرض الكل" : undefined} />
                {alerts.length > 0 ? (
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
                ) : (
                    <div className='empty-section-card'>
                        <p>لا توجد تنبيهات حالياً</p>
                    </div>
                )}
            </section>

            <section className='warnSec'>
                <SectionTitle title="إجابات أسئلتك" more={plantQuestions.length > 0 ? "عرض الكل" : undefined} />
                {plantQuestions.length > 0 ? (
                    <div className='askRow'>
                        {plantQuestions.map((question) => (
                            <AskServiceCard
                                key={question.id}
                                data={question.data}
                                className={question.className}
                                variant="question"
                            />
                        ))}
                    </div>
                ) : (
                    <div className='empty-section-card'>
                        <p>لا توجد أسئلة حتى الآن</p>
                    </div>
                )}
            </section>

            {gallery.length > 0 && (
                <section className='warnSec'>
                    <SectionTitle title="صور للنبات" more="عرض الكل" />
                    <div className='plant-gallery-grid'>
                        {gallery.slice(0, 5).map((photo, index) => (
                            <div className={`gallery-tile tile-${index + 1}`} key={`${photo}-${index}`}>
                                <img src={photo} alt={`${plantName || 'النبات'} ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <Nav />
        </main>
    );
};

export default CareHistory;
