import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import './AddPlantManual.css';

import TopHeader from '../Components/TopHeader';
import PageTitle from '../Components/PageTitle';
import AddPlantProgress from '../Components/AddPlantProgress';
import NextButton from '../Components/NextButton';
import SecondButton from '../Components/SecondButton';
import Nav from '../Components/Nav';

const AddPlantManual5 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const prevData = location.state || {};
    const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });
    const [notes, setNotes] = useState(prevData.plantNotes || '');

    useEffect(() => {
        const fetchPageTitle = async () => {
            const { data } = await supabase.from('PageTitle').select('Title, Description').eq('id', 23).single();
            if (data) setPageInfo({ title: data.Title, desc: data.Description });
        };
        fetchPageTitle();
    }, []);

    const handleNext = () => {
        navigate('/AddPlantManual6', { state: { ...prevData, plantNotes: notes } });
    };

    return (
        <main className="add-plant-manual-page">
            <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} isClose={true} />
            <PageTitle title={pageInfo.title} desc={pageInfo.desc} />
            <AddPlantProgress currentStep={5} totalSteps={6} />

            <div className="add-plant-manual-content">
                <div className="add-plant-card">
                    <h2 className="add-plant-card-title">ملاحظات إضافية (اختياري)</h2>
                    <textarea
                        className="add-plant-textarea"
                        placeholder="أضف أي ملاحظات عن النبات..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={5}
                    />
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

export default AddPlantManual5;
