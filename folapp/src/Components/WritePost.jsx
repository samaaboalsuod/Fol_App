import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx';
import {Paperclip} from '@phosphor-icons/react';
import './WritePost.css';
import './CommunityPost.css';


const WritePost = () => {

    const [userImg, setUserImg] = useState('');
    useEffect(() => {
    const fetchUserImg = async () => {
        const { data, error } = await supabase
            .from('Users')
            .select('Photo')
            .eq('id', 1) 
            .single();

        if (data && data.Photo) {
            setUserImg(data.Photo);
        }
    };
    fetchUserImg();
}, []);


    return ( 

        <div className='writePostCont'>

            <div className='imgright'>
                <img src={userImg} className="user-avatar" alt="User Profile" />
                <input type="text"  placeholder='شارك مشكلتك أو خبرتك ...' />
            </div>

            <Paperclip size={24} color='#FAFAEA' />
        </div>

     );
}
 
export default WritePost;