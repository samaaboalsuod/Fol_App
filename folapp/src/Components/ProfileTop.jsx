import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx';
import SmallProfileData from './SmallProfileData';

import './ProfileTop.css';

const ProfileTop = () => {
    // 2. State for User Data and Plant Count
    const [userData, setUserData] = useState({ 
        name: '', 
        email: '', 
        photo: '', 
        posts: 0, 
        followers: 0 
    });
    const [plantCount, setPlantCount] = useState(0);

    // 3. UseEffect for fetching all data
    useEffect(() => {
        const fetchProfileData = async () => {
            // Fetch identity and social stats
            const { data: userStats } = await supabase
                .from('Users')
                .select('FirstName, LastName, "E-mail", Photo, Posts, Followers')
                .eq('id', 1)
                .single();

            if (userStats) {
                setUserData({
                    name: `${userStats.FirstName} ${userStats.LastName}`, 
                    email: userStats["E-mail"],
                    photo: userStats.Photo,
                    posts: userStats.Posts,
                    followers: userStats.Followers
                });
            }

            // Fetch plant count
            const { count, error } = await supabase
                .from('User_Plants')
                .select('*', { count: 'exact', head: true })
                .eq('User', 1);

            if (!error) {
                setPlantCount(count);
            }
        };

        fetchProfileData();
    }, []);

    return ( 
        <div className='profileTopCont'>

            <div className='profileNameImg'>
                <div className='profileImgCont'>
                    <img src={userData.photo} alt={userData.name} />
                </div>

                <h2>{userData.name}</h2>
                <p>{userData.email}</p>
            </div>

            <div className='profileInfoCont'>
                <SmallProfileData text="المنشورات" value={userData.posts} />
                <SmallProfileData text="المتابعون" value={userData.followers} />
                <SmallProfileData text="النباتات" value={plantCount} />
            </div>
        </div>
    );
}

export default ProfileTop;