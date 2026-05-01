import React from 'react';
import './CommentCard.css';

const CommentCard = ({ comment }) => {
    if (!comment) return null;

    return (
        <div className="comment-block">
            <div className="comment-item">
                <img className="comment-avatar" src={comment.user_img} alt={comment.user_name} />
                <div className="comment-bubble">
                    <h4>{comment.user_name}</h4>
                    <p>{comment.content_ar}</p>
                </div>
            </div>
            <span className="comment-time">{comment.created_at_text}</span>
        </div>
    );
};

export default CommentCard;
