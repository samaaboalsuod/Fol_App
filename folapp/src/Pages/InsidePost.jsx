import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X } from '@phosphor-icons/react';
import { supabase } from '../Supabase.jsx';
import './InsidePost.css';

import Logo from '../Assets/logo.svg';
import CommunityPost from '../Components/CommunityPost';
import CommentCard from '../Components/CommentCard';
import WriterCard from '../Components/WriterCard';
import Nav from '../Components/Nav';
import AddCommentBar from '../Components/AddCommentBar';

const InsidePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);

                const { data, error } = await supabase
                    .from('Community_Posts')
                    .select('*')
                    .eq('id', id)
                    .in('id', [1, 2, 3])
                    .single();

                if (error) throw error;

                setPost(data);
                setComments(parseComments(data?.comments_data));
            } catch (error) {
                console.error('Error loading community post:', error.message);
                setPost(null);
                setComments([]);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPost();
    }, [id]);

    const parseComments = (commentsData) => {
        if (!commentsData) return [];
        if (Array.isArray(commentsData)) return commentsData;

        try {
            const parsedComments = JSON.parse(commentsData);
            return Array.isArray(parsedComments) ? parsedComments : [];
        } catch (error) {
            console.warn('Unable to parse comments data:', error);
            return [];
        }
    };

    const handleCommentAdded = (updatedComments) => {
        setComments(updatedComments);
    };

    return (
        <main className="inside-post-page">
            <section className='header inside-post-logo-header'>
                <img src={Logo} alt="logo" />
            </section>

            <section className="inside-post-top-header">
                <div className="header-right"></div>
                <button className="close-post-btn header-left" type="button" onClick={() => navigate(-1)}>
                    <X size={28} color="#FAFAEA" weight="regular" />
                </button>
            </section>

            {loading ? (
                <p className="inside-post-state">جاري تحميل المنشور...</p>
            ) : post ? (
                <>
                    <section className="inside-post-card-wrap">
                        <CommunityPost data={post} />
                    </section>

                    <section className="warnSec inside-comments-section">
                        <div className="inside-section-heading">
                            <h2>التعليقات</h2>
                            <p>{comments.length} تعليقات</p>
                        </div>

                        <div className="comments-list">
                            {comments.map((comment, index) => (
                                <CommentCard key={`${comment.user_name}-${index}`} comment={comment} />
                            ))}
                        </div>
                    </section>

                    <section className="warnSec">
                        <div className="inside-section-heading writer-heading">
                            <h2>عن الكاتب</h2>
                        </div>
                        <WriterCard post={post} />
                    </section>
                </>
            ) : (
                <p className="inside-post-state">لم يتم العثور على المنشور</p>
            )}

            {post && (
                <AddCommentBar 
                    postId={post.id} 
                    currentComments={comments} 
                    onCommentAdded={handleCommentAdded} 
                />
            )}

            <Nav />
        </main>
    );
};

export default InsidePost;
