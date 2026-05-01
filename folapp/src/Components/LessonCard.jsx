import React from 'react';
import './LessonCard.css';
import Tag from './Tag';

const LessonCard = ({ data, size = 'small' }) => {
  if (!data) return null;

  return (
    <article className={`lessonPageCard ${size}`}>
      <div className="lessonCardImage">
        <img src={data.img_url} alt={data.alt_text || data.title} />
        {data.level_tag && <Tag text={data.level_tag} />}
      </div>

      <div className="lessonCardBody">
        <div className="lessonCopy">
          <h3>{data.title}</h3>
          <p>{data.subtitle}</p>
        </div>

        <hr />

        <div className="lessonCardFooter">
          <span>{data.duration}</span>
        </div>
      </div>
    </article>
  );
};

export default LessonCard;
