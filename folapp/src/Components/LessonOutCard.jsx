import React from 'react';
import './LessonOutCard.css';
import './SuggestedCard.css';
import Tag from './Tag';

const LessonOutCard = ({ data }) => {
    // Return null if data is still loading
    if (!data) return null;

    return ( 
        <div className='lessonCard'>
             
                <div className='lessonImgCont'>
                    <img src={data.img_url} alt={data.alt_text} />
                </div>


            <div className='dataCol'>

                <h4>{data.title}</h4>
                <h6>{data.subtitle}</h6>

                <div className='tagsCont'>
                    <Tag text={data.lesson_type} />
                    <Tag text={data.duration} />
                </div>

            </div>


        </div>
    );
}

export default LessonOutCard;