import React from 'react';
import MainButton from './MainButton';
import './WriterCard.css';

const WriterCard = ({ post }) => {
    if (!post) return null;

    return (
        <div className="writer-card">

            <div className="writer-data">
                <img className="writer-avatar" src={post.user_img} alt={post.user_name} />
                <div className="writer-meta">
                    <h4>{post.user_name}</h4>
                    <p>{post.user_posts_count || 0} منشور · {post.user_followers || 0} متابع</p>
                </div>
            </div>
            <MainButton text="متابعة" />

        </div>
    );
};

export default WriterCard;
