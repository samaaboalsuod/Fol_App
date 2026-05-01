import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import { Plant } from '@phosphor-icons/react';
import './AddPlantManual.css';

import TopHeader from '../Components/TopHeader';
import PageTitle from '../Components/PageTitle';
import AddPlantProgress from '../Components/AddPlantProgress';
import NextButton from '../Components/NextButton';
import SecondButton from '../Components/SecondButton';
import Nav from '../Components/Nav';

const sizeOptions = [
    { label: 'صغير', key: 'small', iconSize: 24 },
    { label: 'متوسط', key: 'medium', iconSize: 32 },
    { label: 'كبير', key: 'large', iconSize: 42 },
];

const AddPlantManual4 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const prevData = location.state || {};
    const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });
    const [selectedSize, setSelectedSize] = useState(prevData.plantSize || '');

    useEffect(() => {
        const fetchPageTitle = async () => {
            const { data } = await supabase.from('PageTitle').select('Title, Description').eq('id', 23).single();
            if (data) setPageInfo({ title: data.Title, desc: data.Description });
        };
        fetchPageTitle();
    }, []);

    const handleNext = () => {
        navigate('/AddPlantManual5', { state: { ...prevData, plantSize: selectedSize } });
    };

    return (
        <main className="add-plant-manual-page">
            <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} isClose={true} />
            <PageTitle title={pageInfo.title} desc={pageInfo.desc} />
            <AddPlantProgress currentStep={4} totalSteps={6} />

            <div className="add-plant-manual-content">
                <div className="add-plant-card">
                    <h2 className="add-plant-card-title">ما حجم الإصيص؟</h2>
                    <div className="size-options-list">
                        {sizeOptions.map((opt) => (
                            <button
                                key={opt.key}
                                className={`size-option-btn ${selectedSize === opt.key ? 'selected' : ''}`}
                                onClick={() => setSelectedSize(opt.key)}
                            >
                                <Plant size={opt.iconSize} weight="light" color={selectedSize === opt.key ? '#517142' : '#3a6b45'} />
                                <span>{opt.label}</span>
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

export default AddPlantManual4;
