import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';

import './PlantDetail.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';
import TopHeader from '../Components/TopHeader';
import PlantCover from '../Components/PlantCover';

const PlantDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plantData, setPlantData] = useState(null);
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
            } catch (err) {
                console.error("Error fetching plant details:", err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPlantDetails();
    }, [id]);

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
                </div>
            )}

            <Nav />
        </main>
    );
};

export default PlantDetail;