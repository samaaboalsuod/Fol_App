import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import { Sun, SunDim, Moon } from '@phosphor-icons/react';
import './AddPlantManual.css';

import TopHeader from '../Components/TopHeader';
import PageTitle from '../Components/PageTitle';
import AddPlantProgress from '../Components/AddPlantProgress';
import NextButton from '../Components/NextButton';
import SecondButton from '../Components/SecondButton';
import Nav from '../Components/Nav';

const lightOptions = [
    { label: 'إضاءة مباشرة', desc: 'ضوء شمس مباشر عدة ساعات.', Icon: Sun, key: 'direct' },
    { label: 'إضاءة متوسطة', desc: 'ضوء شمس جيد غير مباشر.', Icon: SunDim, key: 'medium' },
    { label: 'إضاءة منخفضة', desc: 'ضوء خافت أو بعيد عن النافذة.', Icon: Moon, key: 'low' },
];

const AddPlantManual3 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const prevData = location.state || {};
    const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });
    const [selectedLight, setSelectedLight] = useState(prevData.plantLight || '');

    useEffect(() => {
        const fetchPageTitle = async () => {
            const { data } = await supabase.from('PageTitle').select('Title, Description').eq('id', 23).single();
            if (data) setPageInfo({ title: data.Title, desc: data.Description });
        };
        fetchPageTitle();
    }, []);

    const handleNext = () => {
        navigate('/AddPlantManual4', { state: { ...prevData, plantLight: selectedLight } });
    };

    return (
        <main className="add-plant-manual-page">
            <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} isClose={true} />
            <PageTitle title={pageInfo.title} desc={pageInfo.desc} />
            <AddPlantProgress currentStep={3} totalSteps={6} />

            <div className="add-plant-manual-content">
                <div className="add-plant-card">
                    <h2 className="add-plant-card-title">ما مستوى الإضاءة؟</h2>
                    <div className="light-options-list">
                        {lightOptions.map((opt) => (
                            <button
                                key={opt.key}
                                className={`light-option-btn ${selectedLight === opt.key ? 'selected' : ''}`}
                                onClick={() => setSelectedLight(opt.key)}
                            >
                                <div className="light-option-text">
                                    <span className="light-option-label">{opt.label}</span>
                                    <span className="light-option-desc">{opt.desc}</span>
                                </div>
                                <opt.Icon size={32} weight="light" className="light-option-icon" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="add-plant-manual-bottom">
                <NextButton onClick={handleNext} />
                <SecondButton onClick={() => navigate(-1)} />
            </div>

            <Nav />
        </main>
    );
};

export default AddPlantManual3;
