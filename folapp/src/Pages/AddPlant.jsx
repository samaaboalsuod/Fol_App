import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import { CaretRight, CameraPlus, Hash, PencilSimple } from "@phosphor-icons/react";
import './AddPlant.css';

import TopHeader from '../Components/TopHeader';
import PageTitle from '../Components/PageTitle';
import SectionTitle from '../Components/SectionTitle';
import MethodCard from '../Components/MethodCard';

const AddPlant = () => {
    const navigate = useNavigate();
    const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });
    const [methods, setMethods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Page Title (id 9)
                const { data: titleData } = await supabase
                    .from('PageTitle')
                    .select('Title, Description')
                    .eq('id', 9)
                    .single();
                
                if (titleData) {
                    setPageInfo({ title: titleData.Title, desc: titleData.Description });
                }

                // Fetch Methods
                const { data: methodsData } = await supabase
                    .from('Add_Plant_Methods')
                    .select('*')
                    .order('id', { ascending: true });
                
                if (methodsData) {
                    setMethods(methodsData);
                }

            } catch (err) {
                console.error("Error fetching AddPlant data:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getIcon = (key) => {
        switch (key) {
            case 'camera_qr': return CameraPlus;
            case 'hash_code': return Hash;
            case 'edit_pencil': return PencilSimple;
            default: return CameraPlus;
        }
    };

    return (
        <main >
            <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} />

            <div className="title">
                <PageTitle title={pageInfo.title} desc={pageInfo.desc} />
            </div>

            <section className="warnSec">
                <SectionTitle title="اختر طريقة إضافة النبات" />
                <div className="methods-list">
                    {methods.map((method) => (
                        <MethodCard 
                            key={method.id}
                            Icon={getIcon(method.icon_key)}
                            title={method.title_ar}
                            desc={method.desc_ar}
                            onClick={() => navigate(method.route_path)}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default AddPlant;
