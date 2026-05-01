import React, { useState, useEffect } from 'react';
import { PaperPlaneTilt } from '@phosphor-icons/react';
import { supabase } from '../Supabase.jsx';
import './AddCommentBar.css';

const AddCommentBar = ({ postId, currentComments, onCommentAdded }) => {
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase
                .from('Users')
                .select('FirstName, LastName, Photo')
                .eq('id', 1)
                .single();
            if (data) {
                setCurrentUser({
                    user_name: `${data.FirstName} ${data.LastName}`,
                    user_img: data.Photo
                });
            }
        };
        fetchUser();
    }, []);

    const handleSubmit = async () => {
        if (!comment.trim() || isSubmitting || !currentUser) return;

        setIsSubmitting(true);

        const newComment = {
            user_img: currentUser.user_img,
            user_name: currentUser.user_name,
            content_ar: comment.trim(),
            content_en: comment.trim(), // Assuming same for now
            created_at_text: 'الآن'
        };

        const updatedComments = [...currentComments, newComment];
        
        try {
            // Update without JSON.stringify since Supabase JS SDK handles jsonb arrays automatically
            const { error } = await supabase
                .from('Community_Posts')
                .update({ 
                    comments_data: updatedComments,
                    comments_count: updatedComments.length
                })
                .eq('id', postId);

            if (error) throw error;

            setComment('');
            onCommentAdded(updatedComments);
        } catch (error) {
            console.error('Error adding comment:', error.message);
            // Handle error, maybe show a toast
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="add-comment-wrapper">
            <div className="add-comment-bar">
                <div 
                    className={`submit-circle ${isSubmitting || !comment.trim() ? 'disabled' : ''}`}
                    onClick={handleSubmit}
                >
                    <PaperPlaneTilt size={24} weight="regular" color="#FAFAEA" />
                </div>
                
                <input 
                    type="text" 
                    className="add-comment-input"
                    placeholder="اكتب تعليقاً..." 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isSubmitting}
                />
            </div>
        </div>
    );
};

export default AddCommentBar;
