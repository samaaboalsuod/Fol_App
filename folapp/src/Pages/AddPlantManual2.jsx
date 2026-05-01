import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import './AddPlantManual.css';

import TopHeader from '../Components/TopHeader';
import PageTitle from '../Components/PageTitle';
import AddPlantProgress from '../Components/AddPlantProgress';
import LocationOption from '../Components/LocationOption';
import NextButton from '../Components/NextButton';
import SecondButton from '../Components/SecondButton';
import Nav from '../Components/Nav';

const locations = ['غرفة المعيشة', 'المطبخ', 'الحمام', 'الشرفة', 'المكتب', 'الحديقة'];

const AddPlantManual2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const prevData = location.state || {};
    const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });
    const [selectedLocation, setSelectedLocation] = useState(prevData.plantLocation || '');

    useEffect(() => {
        const fetchPageTitle = async () => {
            const { data } = await supabase.from('PageTitle').select('Title, Description').eq('id', 23).single();
            if (data) setPageInfo({ title: data.Title, desc: data.Description });
        };
        fetchPageTitle();
    }, []);

    const handleNext = () => {
        navigate('/AddPlantManual3', { state: { ...prevData, plantLocation: selectedLocation } });
    };

    return (
        <main className="add-plant-manual-page">
            <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} isClose={true} />
            <PageTitle title={pageInfo.title} desc={pageInfo.desc} />
            <AddPlantProgress currentStep={2} totalSteps={6} />

            <div className="add-plant-manual-content">
                <div className="add-plant-card">
                    <h2 className="add-plant-card-title">أين يوجد النبات؟</h2>
                    <div className="location-grid">
                        {locations.map((loc) => (
                            <LocationOption
                                key={loc}
                                label={loc}
                                isSelected={selectedLocation === loc}
                                onClick={() => setSelectedLocation(loc)}
                            />
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

export default AddPlantManual2;
