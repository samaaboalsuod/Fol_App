import React from 'react';
import './CommunityPost.css';
import { Heart, ChatCircle, BookmarkSimple } from "@phosphor-icons/react";

const CommunityPost = ({ data }) => {
    // If the data hasn't loaded yet, return null to avoid errors
    if (!data) return null;

    return (
        <div className="community-post-card">
            {/* Header: User Info */}
            <div className="post-header">

                <img src={data.user_img} alt={data.user_name} className="user-avatar" />
                <div className="user-meta">
                    <span className="user-name">{data.user_name}</span>
                    <p className="post-time">منذ ساعتين</p>
                </div>
                
            </div>

            {/* Content: Arabic Text */}
            <h4 className="post-text">{data.content_ar}</h4>
            
            {/* Main Image */}
            <div className="post-image-container">
                <img src={data.img_url} alt="Community" className="post-main-img" />
            </div>

            {/* Tags: Mapping from the DB Array */}
            <div className="post-tags">
                {data.tags && data.tags.map((tag, i) => (
                    <span key={i} className="tag">#{tag}</span>
                ))}
            </div>

            {/* Footer: Interaction Bar */}
            <div className="post-footer">
                <div className="footer-left">
                    <BookmarkSimple size={22} weight="light" color="#4A6D64" />
                </div>
                <div className="footer-right">
                    <div className="interaction-item">
                        <span>{data.comments_count}</span>
                        <ChatCircle size={22} weight="light" color="#4A6D64" />
                    </div>
                    <div className="interaction-item">
                        <span>{data.likes_count}</span>
                        <Heart size={22} weight="light" color="#4A6D64" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityPost;