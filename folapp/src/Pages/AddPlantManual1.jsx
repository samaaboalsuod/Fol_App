import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import './AddPlantManual.css';

import TopHeader from '../Components/TopHeader';
import PageTitle from '../Components/PageTitle';
import AddPlantProgress from '../Components/AddPlantProgress';
import AddPlantInput from '../Components/AddPlantInput';
import NextButton from '../Components/NextButton';
import Nav from '../Components/Nav';

const AddPlantManual1 = () => {
    const navigate = useNavigate();
    const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });
    const [plantName, setPlantName] = useState('');
    const [plantNickname, setPlantNickname] = useState('');

    useEffect(() => {
        const fetchPageTitle = async () => {
            // Row 23 is for Add Plant Manual steps
            const { data } = await supabase
                .from('PageTitle')
                .select('Title, Description')
                .eq('id', 23)
                .single();
            if (data) {
                setPageInfo({ title: data.Title, desc: data.Description });
            }
        };
        fetchPageTitle();
    }, []);

    return (
        <main className="add-plant-manual-page">
            <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} isClose={true} />

            <PageTitle title={pageInfo.title} desc={pageInfo.desc} />

            <AddPlantProgress currentStep={1} totalSteps={6} />

            <div className="add-plant-manual-content">
                <div className="add-plant-card">
                    <h2 className="add-plant-card-title">ما اسم النبات؟</h2>
                    <AddPlantInput 
                        placeholder="مثال: مونستيرا"
                        subtitle="اكتب اسمه الحقيقي"
                        value={plantName}
                        onChange={setPlantName}
                    />
                </div>

                <div className="add-plant-card">
                    <h2 className="add-plant-card-title">أعطِ صديقك اسمًا جميلًا؟</h2>
                    <AddPlantInput 
                        placeholder="مثال: صبري"
                        subtitle="اكتب اسمًا مستعارًا لصديقك"
                        value={plantNickname}
                        onChange={setPlantNickname}
                    />
                </div>
            </div>

            <div className="add-plant-manual-bottom">
                <NextButton onClick={() => navigate('/AddPlantManual2')} />
            </div>

            <Nav />
        </main>
    );
};

export default AddPlantManual1;
