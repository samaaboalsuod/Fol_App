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

const lightLabels = { direct: 'مباشرة', medium: 'متوسطة', low: 'منخفضة' };
const sizeLabels = { small: 'صغير', medium: 'متوسط', large: 'كبير' };

const SummaryRow = ({ label, value }) => (
    <div className="summary-row">
        <span className="summary-value">{value || '—'}</span>
        <span className="summary-label">{label}:</span>
    </div>
);

const AddPlantManual6 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state || {};
    const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchPageTitle = async () => {
            const { data: pd } = await supabase.from('PageTitle').select('Title, Description').eq('id', 23).single();
            if (pd) setPageInfo({ title: pd.Title, desc: pd.Description });
        };
        fetchPageTitle();
    }, []);

    const handleAdd = async () => {
        setIsSaving(true);
        try {
            const { error } = await supabase.from('User_Plants').insert({
                User: 1,
                Plant_Name: data.plantName || '',
                Nickname: data.plantNickname || '',
                Location: data.plantLocation || '',
                Light_Level: data.plantLight || '',
                Pot_Size: data.plantSize || '',
                Notes: data.plantNotes || '',
                Added_Method: 'Manual',
                'Health_Status(AR)': 'صحي',
            });
            if (!error) navigate('/MyPlants');
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <main className="add-plant-manual-page">
            <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} isClose={true} />
            <PageTitle title={pageInfo.title} desc={pageInfo.desc} />
            <AddPlantProgress currentStep={6} totalSteps={6} />

            <div className="add-plant-manual-content">
                <div className="add-plant-card">
                    <h2 className="add-plant-card-title">ملخص بيانات النبات</h2>
                    <div className="summary-list">
                        <SummaryRow label="الاسم" value={data.plantName} />
                        <SummaryRow label="الاسم المستعار" value={data.plantNickname} />
                        <SummaryRow label="الموقع" value={data.plantLocation} />
                        <SummaryRow label="الإضاءة" value={lightLabels[data.plantLight]} />
                        <SummaryRow label="حجم الأصيص" value={sizeLabels[data.plantSize]} />
                    </div>
                </div>
            </div>

            <div className="add-plant-manual-bottom">
                <NextButton text={isSaving ? '...' : 'إضافة النبات'} onClick={handleAdd} />
                <SecondButton onClick={() => navigate(-1)} />
            </div>

            <Nav />
        </main>
    );
};

export default AddPlantManual6;
