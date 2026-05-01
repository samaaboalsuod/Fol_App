import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import { CaretDown } from '@phosphor-icons/react';
import './LanguageSettings.css';

import TopHeader from '../Components/TopHeader';
import PageTitle from '../Components/PageTitle';
import SearchBar from '../Components/SearchBar';
import Nav from '../Components/Nav';

const DropdownSettingRow = ({ title, subtitle, value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (opt) => {
        onChange(opt);
        setIsOpen(false);
    };

    return (
        <div className='language-setting-row'>
            <div className='language-setting-text'>
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>

            <div className='language-dropdown-container'>
                {isOpen && (
                    <div className="language-dropdown-overlay" onClick={() => setIsOpen(false)} />
                )}
                
                <div className='language-dropdown-btn' onClick={() => setIsOpen(!isOpen)}>
                    <span>{value}</span>
                    <CaretDown size={18} color="#FAFAEA" />
                </div>

                {isOpen && (
                    <div className="language-dropdown-menu">
                        {options.map((opt, i) => (
                            <div 
                                key={i} 
                                className={`language-dropdown-item ${opt === value ? 'selected' : ''}`}
                                onClick={() => handleSelect(opt)}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const LanguageSettings = () => {
    const navigate = useNavigate();
    const [pageInfo, setPageInfo] = useState({ title: '', desc: '' });
    const [appLang, setAppLang] = useState('العربية');
    const [textSize, setTextSize] = useState('متوسط');

    useEffect(() => {
        const fetchPageTitle = async () => {
            const { data } = await supabase
                .from('PageTitle')
                .select('Title, Description')
                .eq('id', 22)
                .single();

            if (data) {
                setPageInfo({
                    title: data.Title,
                    desc: data.Description
                });
            }
        };

        fetchPageTitle();
    }, []);

    return ( 
        <main className="language-settings-page">
            <TopHeader onBack={() => navigate(-1)} showLogo={true} hideShare={true} />

            <PageTitle title={pageInfo.title} desc={pageInfo.desc} />

            <SearchBar placeholder='ابحث في الإعدادات...' />

            <div className='language-settings-card'>
                <DropdownSettingRow 
                    title="لغة التطبيق" 
                    subtitle="اختر لغة واجهة التطبيق" 
                    value={appLang} 
                    options={['العربية', 'English']}
                    onChange={setAppLang}
                />
                <DropdownSettingRow 
                    title="حجم النص" 
                    subtitle="تحكم في حجم الخط لسهولة القراءة" 
                    value={textSize} 
                    options={['صغير', 'متوسط', 'كبير']}
                    onChange={setTextSize}
                />
            </div>

            <Nav />
        </main>
    );
}

export default LanguageSettings;
