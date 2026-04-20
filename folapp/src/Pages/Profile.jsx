import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx';
import './Profile.css';

import Logo from '../Assets/logo.svg';
import Nav from './../Components/Nav';
import ProfileTop from './../Components/ProfileTop';
import SectionTitle from '../Components/SectionTitle.jsx';
import DataLine from '../Components/DataLine.jsx';


const Profile = () => {

    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        joinedDate: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const { data, error } = await supabase
                .from('Users')
                .select('FirstName, LastName, "E-mail", created_at')
                .eq('id', 1)
                .single();

            if (data) {
                // Formatting the date to match your screenshot
                const dateOnly = new Date(data.created_at).toLocaleDateString('en-GB'); 

                setProfileData({
                    fullName: `${data.FirstName} ${data.LastName}`,
                    email: data["E-mail"],
                    joinedDate: dateOnly 
                });
            }
        };

        fetchUserData();
    }, []);


    return ( <>

    <main>

        <section className='header'>
            <img src={Logo} alt="logo" />
        </section>

        <ProfileTop />

        <section className='warnSec'>
            <SectionTitle title="معلومات الحساب" />

            <div className='whiteRoundCard'>
                <DataLine title="الاسم" value={profileData.fullName} />
                <hr className='datastrap' />
                <DataLine title="البريد الإلكتروني" value={profileData.email} />
                <hr className='datastrap' />
                <DataLine title="تاريخ الانضمام" value={profileData.joinedDate} />
            </div>
            
        </section>























        <Nav /> 
        



    </main>
    
    
    </> );
}
 
export default Profile;