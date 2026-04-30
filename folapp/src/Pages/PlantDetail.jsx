import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';

import './PlantDetail.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';
import TopHeader from '../Components/TopHeader';
import PlantCover from '../Components/PlantCover';
import SectionTitle from '../Components/SectionTitle';
import PlantStatus from '../Components/PlantStatus';
import CareIndicatorCard from '../Components/CareIndicatorCard';
import QuickActionCard from '../Components/QuickActionCard';
import BenefitCard from '../Components/BenefitCard';
import LessonOutCard from '../Components/LessonOutCard';
import ActionCard from '../Components/ActionCard';
import { Sun, Drop, Info, Wind, Smiley, SelectionAll, ClockCounterClockwise, Leaf } from "@phosphor-icons/react";
import darkIcon from '../Assets/darkIcon.svg';

const PlantDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plantData, setPlantData] = useState(null);
    const [benefits, setBenefits] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlantDetails = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('User_Plants')
                    .select(`*, Plant_Details:Plant (*)`)
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setPlantData(data);
                
                // Fetch benefits
                const { data: benefitsData } = await supabase
                    .from('Plant_Benefits')
                    .select('*')
                    .eq('plant_id', data.Plant);
                
                if (benefitsData) setBenefits(benefitsData);

                // Fetch lessons
                const { data: lessonsData } = await supabase
                    .from('Plant_Lessons')
                    .select('*')
                    .eq('plant_id', data.Plant);
                
                if (lessonsData) {
                    const uniqueLessons = [];
                    const seenTitles = new Set();

                    lessonsData.forEach(lesson => {
                        if (!seenTitles.has(lesson.title_ar)) {
                            seenTitles.add(lesson.title_ar);
                            uniqueLessons.push({
                                id: lesson.id,
                                title: lesson.title_ar,
                                subtitle: lesson.subtitle_ar,
                                duration: `${lesson.duration_min} دقائق`,
                                lesson_type: "دليل شامل",
                                img_url: lesson.thumbnail_url,
                                alt_text: lesson.title_ar
                            });
                        }
                    });
                    setLessons(uniqueLessons);
                }

            } catch (err) {
                console.error("Error fetching plant details:", err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPlantDetails();
    }, [id]);

    const getBenefitIcon = (key) => {
        switch (key) {
            case 'air': return Wind;
            case 'mood': return Smiley;
            case 'easy': return SelectionAll;
            case 'leaf': return Leaf;
            default: return Wind;
        }
    };

    const handleShare = () => {
        // Implement share logic if needed
        console.log("Sharing plant:", plantData?.Nickname);
    };

    return (
        <main>
            <section className='header'>
                <img src={Logo} alt="logo" />
            </section>

            <TopHeader onBack={() => navigate(-1)} onShare={handleShare} />

            {loading ? (
                <div className="loading-state">جاري التحميل...</div>
            ) : (
                <div className="detail-content">
                    <PlantCover
                        photo={plantData?.Plant_Details?.Cover_Photo}
                        nickname={plantData?.Nickname}
                        species={plantData?.Plant_Details?.NameAR}
                    />

                    <section className='warnSec'>
                        <SectionTitle title="حالة النبات" />
                        <PlantStatus 
                            status={plantData?.['Health_Status(AR)']}
                            healthPercent={plantData?.General_Health}
                            moisturePercent={plantData?.Soil_Moisture}
                        />
                    </section>

                    <section className='warnSec'>
                        <SectionTitle title="مؤشرات العناية" />
                        <div className='cardRow'>
                            <CareIndicatorCard 
                                Icon={Drop}
                                title="السقاية"
                                subTitle="آخر سقاية"
                                value={plantData?.Last_Watered ? new Date(plantData.Last_Watered).toLocaleDateString('ar-EG', { weekday: 'long' }).split(',')[0] : "---"}
                                footer={`القادمة: بعد ${plantData?.Next_Watering_Days || 0} أيام`}
                                iconColor="#4A8B60"
                            />
                            <CareIndicatorCard 
                                Icon={Sun}
                                title="الإضاءة"
                                subTitle="المستوى"
                                value={plantData?.Light_Level_AR || "متوسطة"}
                                footer={
                                    typeof plantData?.Location === 'string' 
                                    ? JSON.parse(plantData.Location).room_ar 
                                    : plantData?.Location?.room_ar || "غرفة المعيشة"
                                }
                                iconColor="#F4B942"
                            />
                        </div>
                    </section>

                    <section className='warnSec'>
                        <SectionTitle title="إجراءات سريعة" />
                        <div className='cardRow'>

                            <QuickActionCard 
                                Icon={Drop}
                                title="سقاية"
                                color="#4A8B60"
                            />

                            <QuickActionCard 
                                Icon={Info}
                                title="ملاحظات"
                                color="#F4B942"
                            />

                            <QuickActionCard 
                                img={darkIcon}
                                title="اسأل خبير"
                            />
                        </div>
                    </section>

                    {benefits.length > 0 && (
                        <section className='warnSec'>
                            <SectionTitle title="فوائد هذا النبات" />
                            <div className='benefitsColumn'>
                                {benefits.map((benefit) => (
                                    <BenefitCard 
                                        key={benefit.id}
                                        Icon={getBenefitIcon(benefit.icon_key)}
                                        title={benefit.benefit_text_ar}
                                        description={benefit.benefit_desc_ar}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {lessons.length > 0 && (
                        <section className='warnSec'>
                            <SectionTitle title="دروس متعلقة بالنبات" more="المزيد" />
                            <div className='cardCol'>
                                {lessons.map((lesson) => (
                                    <LessonOutCard key={lesson.id} data={lesson} />
                                ))}
                            </div>
                        </section>
                    )}


                        <ActionCard 
                            Icon={ClockCounterClockwise}
                            title="السجل الكامل"
                            subtitle="عرض كل الأحداث منذ انضمامه لحديقتك"
                        />
                </div>
            )}

            <Nav />
        </main>
    );
};

export default PlantDetail;